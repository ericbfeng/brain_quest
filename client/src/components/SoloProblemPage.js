import React from "react";
import {Link, useParams} from "react-router-dom";
import { allQuestions } from '../question_bank/questions';
import { connect } from "react-redux";
import { updateUser } from "../actions/sessionActions";
import { BsPatchQuestionFill, BsArrowLeftShort } from 'react-icons/bs';
import '../styles/SoloProblemPage.css';

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

function SoloProblemPage({updateUser}) {
    // We can use the `useParams` hook here to access
    // the dynamic pieces of the URL.
    let { questionId } = useParams();
    const question = allQuestions.filter(question => question.questionId === parseInt(questionId))[0];

    const onAnswerSubmission = (answerProvided) => {
        if(answerProvided !== question.answer){
            alert("Incorrect. You can try again or return back to the test bank.");
            return;
        }

        // User got the current question (questionId) correct. We need to update the DB
        // to reflect that the user has got this question correct!
          fetch(`/add-correct-question-id`, {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                questionId: questionId
            })
          })
          .then((res) => {
            if(!res.ok) throw new Error(res.statusText);
            else return res.json();
          })
          .then(
            (result) => {
              updateUser(result);
              alert("Correct!");
            },
            (error) => alert("Error: " + error.message)
          )
    };

    const getQuestionMetadata = () => {
      return <div>
        {question.type + " " + question.subType}
      </div>
    }

    return (
      <div className="solo-problem-page-container">
        <div className="solo-problem-page-subheader-container">
          <Link className="arrow-icon-container" to="/testbankpage">
            <BsArrowLeftShort className="arrow-icon" />
          </Link>
          <div>
            {getQuestionMetadata()}
          </div>
          <Link className="arrow-icon-container" to="/">
            Exit
          </Link>
        </div>
        <div className="solo-problem-page-body-container">
          <div className="solo-problem-page-body-question">
            {question.question}
          </div>
          <div className="solo-problem-page-body-choices">
            <AnswerChoices choices={question.choices} onSubmit={onAnswerSubmission} />
          </div>
        </div>
      </div>
    );
  }

  const mapStateToProps = state => ({});

  const mapActionsToProps = () => ({
    updateUser
  });
  
  export default connect(mapStateToProps, mapActionsToProps())(SoloProblemPage)