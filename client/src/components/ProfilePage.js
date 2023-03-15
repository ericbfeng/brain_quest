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




function FriendInfo(props){
  let [friends, setFriends] = useState([]);
  console.log("FRIEND INFO")

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
        console.log("DATA: ", data);
        setFriends(data);
      })
      .catch((error) => {
        console.error(error);
      });

  }, []);

  return(

    <Box sx={{ flexGrow: 1 }}>
    <Stack spacing={2}>
      <Grid container spacing={2}>
        <Grid xs={8} sx={{ height: "100%" }}>
          <UserDash />
        </Grid>
        <Grid xs={4} sx={{ height: "100%" }}>
          <FriendsTab tablabel={"Friends"} friends={friends} setFriends={setFriends} renderState={"accepted"}/>
        </Grid>
        <Grid xs={8} sx={{ height: "100%" }}>
          <PastTest />
        </Grid>
        <Grid xs={6} sx={{ height: "100%" }}>
          <FriendsTab tablabel={"Pending Invites"} friends={friends} setFriends={setFriends} renderState={"pending"}/>
        </Grid>
        <Grid xs={4} sx={{ height: "100%" }}>
          <FriendsTab user={props.user} friends={friends}  setFriends={setFriends} tablabel={"Add New Friends"} renderState={true}/>
        </Grid>
      </Grid>
    </Stack>
  </Box>


  );
}

function ProfilePage({userInfo, updateUser}) {  
    return (
      <Stack spacing={2}>
        <div className="profile-header"> 
          <Link className="arrow-icon-container" to="/" >
            <BsArrowLeftShort className="arrow-icon" />
          </Link>
        </div> 
      <FriendInfo user={userInfo.username}/>
      
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