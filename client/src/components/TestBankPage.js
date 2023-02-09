import React from 'react';
import { allQuestions } from '../question_bank/questions';
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BsPatchQuestionFill, BsArrowLeftShort } from 'react-icons/bs';
import '../styles/TestBankPage.css';

function Questions({questionType, questionSubtype}){
    const allQuestionIdsUserSolved = useSelector((state) => state.session.userInformation.record);

    const numberOfSolvedQuestions = allQuestions.filter(
        question => question.type === questionType && question.subType === questionSubtype &&
        allQuestionIdsUserSolved.includes(question.questionId)
    ).length;

    const numberOfTotalQuestions = allQuestions.filter(
        question => question.type === questionType && question.subType === questionSubtype
    ).length;

    const GetQuestions = () => {
        const allMatchingQuestions = allQuestions.filter(
            question => question.type === questionType && question.subType === questionSubtype
        );

        const allQuestionIdsUserSolved = useSelector((state) => state.session.userInformation.record);

        const allQuestionsToShow = [];
        for(let i = 0; i < allMatchingQuestions.length; i++){
            const question = allMatchingQuestions[i];
            const suffix =  allQuestionIdsUserSolved.includes(question.questionId) ? "solved": "unsolved";
            allQuestionsToShow.push(
                <Link key={question.questionId} className={"question-list-item-" + suffix} to={"/soloproblempage/" + question.questionId}>
                    <BsPatchQuestionFill className="question-icon"/>
                </Link>
            );
        }

        return <div className="question-list">
            {allQuestionsToShow}
        </div>;
    }

    return (
        <div className="question-container">
            <div className="question-header">
                <div>
                    {questionType + " (" + questionSubtype + ") Questions"}
                </div>
                <div>
                    {numberOfSolvedQuestions + " / " + numberOfTotalQuestions}  
                </div>  
            </div>
            {GetQuestions()}
        </div>
    )
}

function SubheaderButton({questionType, updateParentState}) {
    const [open, setOpen] = React.useState(false);

    const handleSubtypeClick = (questionSubtypeClicked) => {
        updateParentState(questionType, questionSubtypeClicked)
        setOpen(false);
    }

    const getSubtypes = () => {
        // Get all questions with the same type (ACT, SAT, etc..)
        const questionsWithSameType = allQuestions.filter(question => question.type === questionType);

        // Get all subtypes for said question (MATH, ENGLISH, etc..)
        const subtypesPresent = new Set();
        questionsWithSameType.forEach(question => subtypesPresent.add(question.subType));

        // Get the subtypes found and turn them into list items
        const allListItems = [];
        subtypesPresent.forEach(subtype => allListItems.push(
            <li key={subtype}>
              <button id={subtype} onClick={(e) => handleSubtypeClick(e.target.id)}>{subtype}</button>
            </li>
        ));

        return <ul className="test-bank-subtype">
            {allListItems}
          </ul>;
    }
  
    return (
      <div className="test-bank-dropdown-container">
        <button className="test-bank-subheader-item"  onClick={() => setOpen(!open)}>
            {questionType}
        </button>
        {open ? (
          getSubtypes()
        ) : null}
      </div>
    );
  };

class TestBankPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            questionType: null,
            questionSubtype: null,
        };
    }

    setParentState = (type, subtype) => {
        this.setState({
            questionType: type,
            questionSubtype: subtype,
        });
    }

    render() {
        return (
            <div className="test-bank-container">
                <div className="test-bank-subheader">
                    <Link className="arrow-icon-container" to="/">
                        <BsArrowLeftShort className="arrow-icon" />
                    </Link>
                    <SubheaderButton questionType="SAT" updateParentState={this.setParentState}/>
                    <SubheaderButton questionType="ACT" updateParentState={this.setParentState}/>
                    <SubheaderButton questionType="AP" updateParentState={this.setParentState}/>
                    <SubheaderButton questionType="CODING" updateParentState={this.setParentState}/>
                </div>
                {this.state.questionType && this.state.questionSubtype ?
                    <Questions questionType={this.state.questionType} questionSubtype={this.state.questionSubtype} />:
                    <div className="test-bank-prompt">
                        <div className="test-bank-prompt-header">
                            Welcome To The Test Bank!
                        </div>
                        <div className="test-bank-prompt-text">
                            Your brain's quest for knowledge begins today.
                        </div>
                    </div>}
            </div>
        );
    }
  }

  export default TestBankPage;