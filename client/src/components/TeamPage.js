import React, { useState, useEffect } from "react";
import {Link} from "react-router-dom";
import { BsArrowLeftShort } from 'react-icons/bs';
import { useSelector } from "react-redux";
import { allQuestions } from '../question_bank/questions';
import NumericInput from 'react-numeric-input';
import '../styles/TeamPage.css';

import { MathJax, MathJaxContext } from "better-react-mathjax";

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
    if(!messageEntered){
      return;
    }
    socket.emit('team_send_message', {name: userInformation.username, message: messageEntered, team});
    setMessageEntered("");  
  }
  
  return (
    <div>
      <div className="team-chat-display-container">
        {renderTeamChat()}
      </div>
      <div>
        <input 
          value={messageEntered} 
          type="text" 
          placeholder="Enter chat" 
          onChange={(e) => setMessageEntered(e.target.value)}
        />
        <button onClick={handleSubmit}>Send</button>
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
        <form className="answer-choices-container" onSubmit={this.handleSubmit}>
          <select className="answer-choices-options" value={this.state.value} onChange={this.handleChange}>
              {this.getOptions()}
          </select>
          <input className="question-submit-button" type="submit" value="Submit" />
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
        updateJoinCreateErrorMessage("Could not join team: " + team + ". Make sure the team exists and hasn't started quiz yet.");
      }
    });

    socket.on('leader_started_quiz', ({numQuizQuestions}) => {
      updatePageToShow("QUIZ");
      updateCurrentQuestionIndex(0);
      updateNumQuizQuestions(numQuizQuestions);
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
      if(socketId === teamLeaderSocketId && pageToShow !== "SCORES"){
        updatePageToShow("JOIN/CREATE");
        updateJoinCreateErrorMessage("Team Leader Has Suddenly Left! Please join / create a new team.")
        updateTeam('');
        updateTeamLeaderName('');
        updateTeamLeaderSocketId('');
      }

      // We only care if a team member leaves before the quiz is started.
      if(pageToShow === "QUIZ" || pageToShow === "SCORES"){
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
      if(!teamNameEntered){
        return;
      }
      socket.emit("user_wants_to_join_team",
       {team: teamNameEntered,
        username: userInformation.username});
    }
  
    const handleCreateTeam = () => {
      socket.emit("create_team", {username: userInformation.username});
    }

    return (
      <div className="create-join-container">
        <div className="create-join-text">
          Welcome to the TeamPage! 
          <br></br>
          Here you can join or create a team to complete one of our quizzes!
        </div>
        <div className="create-join-button-container">
          <div className="create-join-existing-team-container">
            <input 
              value={teamNameEntered} 
              type="text" 
              placeholder="Existing Team" 
              onChange={(e) => updateTeamNameEntered(e.target.value)}
            />
            <button className="create-join-button-existing-team" onClick={handleJoinTeam}>Join Team</button>
          </div>
          <div className="create-join-new-team-container">
            <button className="create-join-button-new-team" onClick={handleCreateTeam}>Create A Team</button>
          </div>
        </div>
        <div className="create-join-error-text">
          {joinCreateErrorMessage ? joinCreateErrorMessage: ""}
        </div>
      </div>
    );
  }

  // ---------------------------------------------------
  // WAITING VIEW
  // ---------------------------------------------------
  const GetWaitingView = () => {
    return <div className="waiting-view-container">
      {isTeamLeader && 
        <div className="waiting-view-leader-container">
          <div className="waiting-view-leader-text">
            You Are The Team Leader.
            <br></br>
            Please tell others to join your team: {team}
            <br></br>
            <br></br>
            Here Are The People Currently In Your Team: {JSON.stringify(teamMembers.map(member => member.username))}
          </div>
          <div className="waiting-view-leader-button">
            <NumericInput min={1} max={allQuestions.length} value={numQuizQuestions} onChange={(newValue) => updateNumQuizQuestions(newValue)}/>
            <button className="waiting-view-button" onClick={() => socket.emit("signal_quiz_start_to_team", {team, numQuizQuestions})}>Start Quiz</button>
          </div>
        </div>
      }
      {!isTeamLeader &&
        <div className="waiting-view-member-container">
          You have joined the following team: {team}
          <br></br>
          Please wait for your team leader, {teamLeaderName}, to start the quiz!
          <br></br>
          In the meanwhile, chat with your team!
        </div>
      }
    </div>
  }

  // ---------------------------------------------------
  // QUIZ VIEW
  // ---------------------------------------------------
  const GetQuizView = () => {
    const questionsToAsk = allQuestions.slice(-numQuizQuestions);

    // If we are here, then all the questions have already been asked.
    // We just need to wait for the leader to go ahead and show the results.
    if(currentQuestionIndex === questionsToAsk.length){
      return (
        <div className="quiz-view-text">
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
              <button className="quiz-view-button-complete" onClick={() => socket.emit("signal_scores_to_team",
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
        <div className="quiz-view-question-container">
          <div className="quiz-view-question-number">
            {"Question #" + (currentQuestionIndex + 1)}
          </div>
          <div className="quiz-view-question-text">
            <MathJax hideUntilTypeset={"first"}>
            {questionsToAsk[currentQuestionIndex].question}
            </MathJax>
          </div>
        </div>
        <div className="quiz-view-answer-container">
          <AnswerChoices choices={questionsToAsk[currentQuestionIndex].choices} onSubmit={onAnswerSubmission} />
        </div>
      </div>
    )
  }

  // ---------------------------------------------------
  // SCORES VIEW
  // ---------------------------------------------------
  const GetScoresView = () => {

    const calculateScore = (numCorrect, numAttempted) => {
      const numIncorrect = numAttempted - numCorrect;

      // Each correct quesiton is +1 points, each incorrect question is -0.5 points.
      return (numCorrect * 1) - (numIncorrect * 0.5);
    }

    const getUserRecords = () => {
      let userRecordsJson = {};
      for(let i = 0; i < teamMembers.length; i++){
        const username = teamMembers[i].username;
        const score = calculateScore(answerAttempts.filter(attempt => attempt.username === username && attempt.correct).length, answerAttempts.filter(attempt => attempt.username === username).length);
        userRecordsJson[username] = score;
      }
      return userRecordsJson;
    }

    const renderUserRecords = () => {
      const userRecords = getUserRecords();
      
      return teamMembers.map(({username}, index) => (
        <div key={index}>
          {username}: {userRecords[username]}
        </div>
      ))
    }

    const getWinners = () => {
      const userRecords = getUserRecords();
      const winners = [];
      let maxScore = Number.MIN_VALUE;

      for(let i = 0; i < teamMembers.length; i++){
        const username = teamMembers[i].username;
        if(userRecords[username] > maxScore){
          maxScore = userRecords[username];
        }
      }

      for(let i = 0; i < teamMembers.length; i++){
        const username = teamMembers[i].username;
        if(userRecords[username] === maxScore){
          winners.push(username);
        }
      }
      return winners;
    }

    return <div className="scores-view-text">
      You have all finished the quiz! 
      <br></br>
      Here are the results for each user:
      <br></br> 
      +1 for each correct answer
      <br></br>
      -0.5 for each incorrect answer
      <br></br>
      <br></br>
      {renderUserRecords()}
      <br></br>
      The winner(s): {getWinners().toString()}
    </div>
  }

  return (
    <div className="team-page-master-container">
      <div className="team-page-header-container">
        <Link onClick={() => socket.emit("indicate_user_left_page", {
          teamName: team,
        })} to="/" >
          <BsArrowLeftShort className="arrow-icon-team-page" />
        </Link>
        <div className="team-page-header-text-container">
          {pageToShow}
        </div>
      </div>
      <div className="team-page-body-container">
        <div className="team-page-body-view-container">
          {pageToShow === "JOIN/CREATE" && GetJoinCreateView()}
          {pageToShow === "WAITING" && GetWaitingView()}
          {pageToShow === "QUIZ" && GetQuizView()}
          {pageToShow === "SCORES" && GetScoresView()}
        </div>
        {pageToShow !== "JOIN/CREATE" && 
          <div className="team-page-body-text-container">
              <TeamChat socket={socket} team={team}></TeamChat>
          </div>
        }
      </div>
    </div>
  );
}