import React, { useState, useEffect } from "react";
import {Link} from "react-router-dom";
import { useSelector } from "react-redux";
import { allQuestions } from '../question_bank/questions';
import NumericInput from 'react-numeric-input';
import '../styles/TeamPage.css';

function TeamChat({socket, team}) {
  const [teamChat, setTeamChat] = useState([]);
  const [messageEntered, setMessageEntered] = useState('');
  const userInformation = useSelector((state) => state.session.userInformation);

  useEffect(() => {
    socket.on('team_message_recieved', ({name, message}) => {
      setTeamChat([...teamChat, {name, message}])
    })
  })

  const renderTeamChat = () => {
    return teamChat.map(({name, message}, index) => (
      <div key={index}>
        {name}: {message}
      </div>
    ))
  }

  const handleSubmit = () => {
    socket.emit('team_send_message', {name: userInformation.username, message: messageEntered, team});
    setMessageEntered("");  
  }
  
  return (
    <div>
      <div>
        <input 
          value={messageEntered} 
          type="text" 
          placeholder="Enter chat" 
          onChange={(e) => setMessageEntered(e.target.value)}
        />
        <button onClick={handleSubmit}>Send</button>
      </div>
      <div className="team-chat-display-container">
        {renderTeamChat()}
      </div>
    </div>
  )
}

class AnswerChoices extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
      event.preventDefault();
      if(this.state.value){
          this.props.onSubmit(this.state.value);
      }
  }

  getOptions = () => {
      const allOptions = [
          <option key={-1} value={""}></option>
      ];
      for(let j = 0; j < this.props.choices.length; j++){
          allOptions.push(
              <option key={j} value={this.props.choices[j]}>{this.props.choices[j]}</option>
          )
      }
      return allOptions;
  }

  render() {
      return (
        <form onSubmit={this.handleSubmit}>
          <select value={this.state.value} onChange={this.handleChange}>
              {this.getOptions()}
          </select>
          <input type="submit" value="Submit" />
        </form>
      );
    }
  }

export default function TestPage({socket}) {  
  const [team, updateTeam] = useState("");
  const [isTeamLeader, updateIsTeamLeader] = useState(false);
  const [teamLeaderName, updateTeamLeaderName] = useState("");
  const [teamLeaderSocketId, updateTeamLeaderSocketId] = useState("");
  const [teamMembers, updateTeamMembers] = useState([]);
  const [teamNameEntered, updateTeamNameEntered] = useState("");

  const [numQuizQuestions, updateNumQuizQuestions] = useState(2);
  const [currentQuestionIndex, updateCurrentQuestionIndex] = useState(0);
  const [answerAttempts, updateAnswerAttempts] = useState([]);

  const [joinCreateErrorMessage, updateJoinCreateErrorMessage] = useState("");

  // The user that opens up the TeamPage will have various stages.
  //         JOIN/CREATE -> A user needs to either join or create a team.
  //         WAITING -> A user is part of a team (either as the leader or member),
  //                    but is now waiting for the leader to start the competition.
  //         QUIZ -> A user's team is doing the quiz. 
  //         SCORES -> A user's team completed the quiz and are seeing results.
  const [pageToShow, updatePageToShow] = useState("JOIN/CREATE");

  const userInformation = useSelector((state) => state.session.userInformation);
  
  useEffect(() => {
    socket.on('user_created_a_team', ({ username }) => {
      // [username] is the name of the team that was just created.
      // If the current user has the name username, then they were the 
      // one that created the team and should be identified as the leader.
      if(username === userInformation.username){
        updateTeam(username);
        updateIsTeamLeader(true);
        updatePageToShow("WAITING");
      }
    });

    socket.on('user_failed_to_join_team', ({team, username}) => {
      if(username === userInformation.username){
        updatePageToShow("JOIN/CREATE");
        updateJoinCreateErrorMessage("Could not join team: " + team + ". Please make sure it exists.");
      }
    });

    socket.on('leader_started_quiz', () => {
      updatePageToShow("QUIZ");
    });

    socket.on('answer_was_attempted', ({correct, username}) => {
      if(isTeamLeader){
        updateAnswerAttempts([...answerAttempts, {username, correct}]);
      }

      if(correct){
        updateCurrentQuestionIndex(currentQuestionIndex + 1);
      }
    });

    socket.on('scores_page_ready', ({teamMembers, answerAttempts}) => {
      // Update the local state of all team members and then
      // show the results page!
      updateTeamMembers(teamMembers);
      updateAnswerAttempts(answerAttempts);
      updatePageToShow("SCORES");
    });

    socket.on('user_left_team_page', ({socketId}) => {
      // If the team leader left, we want all team members to be kicked from
      // the team and returned back to the JOIN/CREATE screen.
      if(socketId === teamLeaderSocketId){
        updatePageToShow("JOIN/CREATE");
        updateJoinCreateErrorMessage("Team Leader Has Suddenly Left! Please join / create a new team.")
        updateTeam('');
        updateTeamLeaderName('');
        updateTeamLeaderSocketId('');
      }

      // We only care if a team member leaves before the quiz is started.
      if(pageToShow !== "JOIN/CREATE" && pageToShow !== "WAITING"){
        return;
      }

      if(isTeamLeader){
        // Someone left the team page. Only team leaders would care, since
        // they would need to update their local state.
        for(let i = 0; i < teamMembers.length; i++){
          const currentTeamMember = teamMembers[i];
          if(currentTeamMember.socketId === socketId){
            updateTeamMembers(teamMembers.splice(i, i));
            break;
          }
        }
      }
    });

    socket.on('user_joined_team', ({team, teamLeaderSocketId, username, socketId}) => {
      if(isTeamLeader) {
        updateTeamMembers([...teamMembers, {username, socketId}]);
      } else {
        updateTeam(team);
        updateTeamLeaderName(team);
        updateTeamLeaderSocketId(teamLeaderSocketId);
      }

      updatePageToShow("WAITING");
      updateJoinCreateErrorMessage("");
    });
  })

  // ---------------------------------------------------
  // JOIN / CREATE VIEW
  // ---------------------------------------------------
  const GetJoinCreateView = () => {
    const handleJoinTeam = () => {
      socket.emit("user_wants_to_join_team",
       {team: teamNameEntered,
        username: userInformation.username});
    }
  
    const handleCreateTeam = () => {
      socket.emit("create_team", {username: userInformation.username});
    }

    return (
      <div>
        <div>
          Welcome to the TeamPage! Here you can join or create 
          a team to complete one of our quizzes!
        </div>
        <div className="team-page-create-join-container">
          <div>
            <input 
              value={teamNameEntered} 
              type="text" 
              placeholder="Existing Team" 
              onChange={(e) => updateTeamNameEntered(e.target.value)}
            />
            <button onClick={handleJoinTeam}>Join Team</button>
          </div>
          <button onClick={handleCreateTeam}>Create A Team</button>
        </div>
        <div>
          {joinCreateErrorMessage ? joinCreateErrorMessage: ""}
        </div>
      </div>
    );
  }

  // ---------------------------------------------------
  // WAITING VIEW
  // ---------------------------------------------------
  const GetWaitingView = () => {
    return <div>
      {isTeamLeader && 
        <div>
          You Are The Team Leader.
          <br></br>
          Please tell others to join your team: {team}
          <br></br>
          Here Are The People Currently In Your Team:
          <br></br>
          {JSON.stringify(teamMembers.map(member => member.username))}
          <br></br>
          You are responsible for starting the quiz and selecting the number of questions:
          <br></br>
          <br></br>
          <NumericInput min={1} max={allQuestions.length} value={numQuizQuestions} onChange={(newValue) => updateNumQuizQuestions(newValue)}/>
          <br></br>
          <button onClick={() => socket.emit("signal_quiz_start_to_team", {team})}>Start Quiz</button>
        </div>
      }
      {!isTeamLeader &&
        <div>
          You have joined the following team: {team}
          <br></br>
          Please wait for your team leader, {teamLeaderName}, to start the quiz!
        </div>
      }
    </div>
  }

  // ---------------------------------------------------
  // QUIZ VIEW
  // ---------------------------------------------------
  const GetQuizView = () => {
    // TODO: Currently we just get a slice. We need to do error
    // checking (see if the number they gave was too large) and also
    // RANDOMLY select N questions.
    const questionsToAsk = allQuestions.slice(-numQuizQuestions);

    // If we are here, then all the questions have already been asked.
    // We just need to wait for the leader to go ahead and show the results.
    if(currentQuestionIndex === questionsToAsk.length){
      return (
        <div>
          {!isTeamLeader && 
            <div>
              The Quiz Is Over.
              <br></br>
              Waiting For The Team Leader To Publish The Results!
            </div>}
            {isTeamLeader && 
            <div>
              The Quiz Is Over.
              <br></br>
              Please publish the results for the team when you're ready!
              <br></br>
              <button onClick={() => socket.emit("signal_scores_to_team",
               {team, teamMembers: [...teamMembers, {username: userInformation.username }], answerAttempts})}>Show Scores</button>
            </div>}
        </div>
      );
    }

    const onAnswerSubmission = (submittedAnswer) => {
      socket.emit("signal_answer_attempt_to_team",
       {team, correct: submittedAnswer === questionsToAsk[currentQuestionIndex].answer, username: userInformation.username});
      
      if(submittedAnswer !== questionsToAsk[currentQuestionIndex].answer){
        alert("Incorrect!");
      }
    }

    return (
      <div className="quiz-view-master-container">
        <div>
          {"Question #" + (currentQuestionIndex + 1)}
        </div>
        {questionsToAsk[currentQuestionIndex].question}
        <AnswerChoices choices={questionsToAsk[currentQuestionIndex].choices} onSubmit={onAnswerSubmission} />
      </div>
    )
  }

  // ---------------------------------------------------
  // SCORES VIEW
  // ---------------------------------------------------
  const GetScoresView = () => {

    const renderUserRecords = () => {
      return teamMembers.map(({username}, index) => (
        <div key={index}>
          {username}: 
            {answerAttempts.filter(attempt => attempt.username === username && attempt.correct).length} /
            {answerAttempts.filter(attempt => attempt.username === username).length}
        </div>
      ))
    }

    return <div>
      You have all finished the quiz! Here are the results for each user (Correct / Attempted):
      <br></br>
      <br></br>
      {renderUserRecords()}
      <br></br>
      TODO: We might want to update a user's profile to reflect how many quizzes they have won.
      Also, we might want to say who "WON" the competition by having a point system.
      Something like, every correct answer gives a user one point, every incorrect answer gives the user -0.5 points.
    </div>
  }

  return (
    <div>
      <Link onClick={() => socket.emit("indicate_user_left_page")} to="/">Go Back To HomePage</Link>
      <br></br>
      <div className="team-page-body-container">
        <div>
          {pageToShow === "JOIN/CREATE" && GetJoinCreateView()}
          {pageToShow === "WAITING" && GetWaitingView()}
          {pageToShow === "QUIZ" && GetQuizView()}
          {pageToShow === "SCORES" && GetScoresView()}
        </div>
        <div>
          {pageToShow !== "JOIN/CREATE" &&
            <TeamChat socket={socket} team={team}></TeamChat>
          }
        </div>
      </div>
    </div>
  );
}