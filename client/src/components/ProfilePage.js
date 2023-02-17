import React, {useState}  from 'react';
import { BsArrowLeftShort } from 'react-icons/bs';
import { connect } from "react-redux";
import { updateUser } from "../actions/sessionActions";
import {Link} from "react-router-dom";
import '../styles/ProfilePage.css';
import '../styles/TestBankPage.css';

function ProfilePage({userInfo, updateUser}) {  
    let [username, setUsername] = useState(userInfo.username);
    let [password, setPassword] = useState(userInfo.password);
    let [occupation, setOccupation] = useState(userInfo.occupation);
    let [bEdit1, setbEdit1] = useState("Edit");
    let [bEdit2, setbEdit2] = useState("Edit");
    let [bEdit3, setbEdit3] = useState("Edit");
    let record = userInfo.record;

    if (!occupation) {occupation = "Unknown"};

    const handleClick = (origin) => {

      let update = false;

      // Start by editing the the correct button state
      switch (origin){
        case "username":
          if (bEdit1 === "Save") {update = true;}
          bEdit1 === "Edit" ? setbEdit1("Save") : setbEdit1("Edit");
          break;
        case "password":
          if (bEdit2 === "Save") {update = true;}
          bEdit2 === "Edit" ? setbEdit2("Save") : setbEdit2("Edit");
          break;
        case "occupation":
          if (bEdit3 === "Save") {update = true;}
          bEdit3 === "Edit" ? setbEdit3("Save") : setbEdit3("Edit");
          break;
        default:
          console.log("Error in handle click")
          break;
      }

      // Update the users information if a save was clicked
      if (update){
        
      }
    }
    
    // Returns normal (username/password/occupation) text by default but
    // returns an input field when editing (username/password/occupation) fields
    function FieldText(props) {
      let val = null;
      let setVal = null;
      switch (props.field){
        case "username":
          val = username;
          setVal = setUsername;
          break;
        case "password":
          val = password;
          setVal = setPassword;
          break;
        case "occupation":
          val = occupation;
          setVal = setOccupation;
          break;
        default:
          console.log("EditButton received invalid field");
          break;
      }

      if (props.type === "Edit"){
        // Bold the text if it is the username
        if (props.field === "username"){
          return (
            <b>{val}</b>
          )
        } else{
          return (
            <> {val} </>
          )
        }
      } else {
        return (
          <input placeholder={val} className="profile-input" value={val} onChange = {(e) => setVal(e.target.value)}/>
        )
      }

    }

    return (
      <div>
        <div className="profile-header"> 
          <Link className="arrow-icon-container" to="/" >
            <BsArrowLeftShort className="arrow-icon" />
          </Link>
          <div className="profile-questions-container">
            <img className="profile-picture" src="../default_profile_pic.jpeg" alt="../default_profile_pic.jpeg" />
            <div className="profile-question-text"> Questions Answered: {userInfo.record.filter((value, index, array) => array.indexOf(value) === index).length} </div>
          </div>
          <div className="profile-container">
            <div className="field-spacer"> 
              <div className="profile-text"> Username: </div>
              <FieldText type={bEdit1} field="username"/>
            </div>
            <button className="edit-button" onClick={() => handleClick("username")}> {bEdit1} </button>
          </div>
          <div className="profile-container">
            <div className="field-spacer"> 
              <div className="profile-text"> Password: </div>
              <FieldText type={bEdit2} field="password"/>
            </div>
            <button className="edit-button" onClick={() => handleClick("password")}> {bEdit2} </button>
          </div>
          <div className="profile-container">
            <div className="field-spacer"> 
              <div className="profile-text"> Occupation: </div>
              <FieldText type={bEdit3} field="occupation"/>
            </div>
            <button className="edit-button" onClick={() => handleClick("occupation")}> {bEdit3} </button>
          </div>
        </div>
      </div>
    );
  };

  const mapStateToProps = state => ({
    userInfo: state.session.userInformation,
  });

  const mapActionsToProps = () => ({
    updateUser
  });
  
  export default connect(mapStateToProps, mapActionsToProps())(ProfilePage)