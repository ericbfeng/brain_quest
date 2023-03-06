import { BsArrowLeftShort } from 'react-icons/bs';
import { connect } from "react-redux";
import { updateUser } from "../actions/sessionActions";
import {Link, useParams} from "react-router-dom";
import '../styles/ProfilePage.css';
import '../styles/TestBankPage.css';

import React, { useState, useEffect } from "react";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import UserDash from "./UserDash";
import Stack from '@mui/material/Stack';
import FriendsTab from "./FriendsTab";
import PastTest from "./PastTests";
import { Button, tabClasses } from "@mui/material";
import {useNavigate } from 'react-router-dom';
import ReccomendFriends from '../Utils/FriendRecommendation'
import '../styles/CommunityPage.css';




function Userinfo(props){

  useEffect(() => {
    // Update the document title using the browser API
            
      fetch(`/getfriends`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("Failed to retrieve friends");
          }
        })
        .then((data) => {
          console.log(data);
          // Do something with the response data
        })
        .catch((error) => {
          console.error(error);
          // Handle the error
        });

  });


  return(

    <Box sx={{ flexGrow: 1 }}>
    <Stack spacing={2}>
      <Grid container spacing={2}>
        <Grid xs={8} sx={{ height: "100%" }}>
          <UserDash />
        </Grid>
        <Grid xs={4} sx={{ height: "100%" }}>
          <FriendsTab tablabel={"Friends"} renderState={"accepted"}/>
        </Grid>
        <Grid xs={8} sx={{ height: "100%" }}>
          <PastTest />
        </Grid>
        <Grid xs={4} sx={{ height: "100%" }}>
          <FriendsTab tablabel={"Pending Invites"} renderState={"pending"}/>
        </Grid>
        <Grid xs={4} sx={{ height: "100%" }}>
          <FriendsTab user={props.user} tablabel={"Add New Friends"} renderState={true}/>
        </Grid>
      </Grid>
    </Stack>
  </Box>


  );
}

function ProfilePage({userInfo, updateUser}) {  

    // get the username of the current profile page we are viewing
    let { pageUsername } = useParams();

    let [friends, setFriends] = useState("Edit");
  


    let [username, setUsername] = useState(pageUsername);
    let [password, setPassword] = useState();
    let [occupation, setOccupation] = useState();
    let [bEdit1, setbEdit1] = useState("Edit");
    let [bEdit2, setbEdit2] = useState("Edit");
    let [bEdit3, setbEdit3] = useState("Edit");
    let record = userInfo.record;

    // TODO: Grab current page username user's info from backend.
    // for some reason, when I do it it is very inconsistent. The
    // code below does not work when page is refreshed, for example
    /*
    const [pageUserData, setPageUserData] = useState();

    // fetch the profile page user's data
    useEffect(() => {
      if(!pageUserData) {
        fetch(`/getUser`, {
          method: 'POST',
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({
            userName: pageUsername
          })
        })
        .then((res) => {
          if(!res.ok) throw new Error(res.statusText);
          else return res.json();
        })
        .then(data => setPageUserData(data))
      }
      
    }, []);
    */

  

    // boolean to denote if we are viewing our own profile or not
    let isCurrUser = (pageUsername === userInfo.username);    

    
    if (!occupation) {occupation = "Unknown"};

    const handleClick = (origin) => {
      console.log('hi');
      ReccomendFriends(0);
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
      <Stack spacing={2}>
        <div className="profile-header"> 
          <Link className="arrow-icon-container" to="/" >
            <BsArrowLeftShort className="arrow-icon" />
          </Link>
          {/* <div className="profile-questions-container">
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
          </div> */}
        </div>
      
      <Userinfo user={userInfo.username}/>
      
      </Stack>
    );
  };







  const mapStateToProps = state => ({
    userInfo: state.session.userInformation,
  });

  const mapActionsToProps = () => ({
    updateUser
  });
  
  export default connect(mapStateToProps, mapActionsToProps())(ProfilePage)