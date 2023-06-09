import React from 'react';
import { allQuestions } from '../question_bank/questions';
import { useSelector } from "react-redux";
import { Link, useParams, useNavigate } from "react-router-dom";
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

function SubheaderButton({questionType}) {
    const [open, setOpen] = React.useState(false);
    const navigate = useNavigate();

    const handleSubtypeClick = (questionSubtypeClicked) => {
        navigate("/testbankpage/" + questionType + "/" + questionSubtypeClicked);
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

export default function TestBankPage() {
    let { initialQuestionType, initialQuestionSubtype } = useParams();

    const questionType = initialQuestionType;
    const questionSubtype = initialQuestionSubtype;
    
    return (
        <div className="test-bank-container">
            <div className="test-bank-subheader">
                <Link className="arrow-icon-container-top-bar" to="/">
                    <BsArrowLeftShort className="arrow-icon-top-bar" />
                </Link>
                <SubheaderButton questionType="SAT"/>
                <SubheaderButton questionType="ACT"/>
                <SubheaderButton questionType="AP"/>
                <SubheaderButton questionType="CODING"/>
            </div>
            {questionType && questionSubtype ?
                <Questions questionType={questionType} questionSubtype={questionSubtype} />:
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