import React, { useEffect, useState } from "react";
import {Link} from "react-router-dom";
import SearchBar from "./SearchBar";

export default function CommunityPage() {  

  const [userData, setUserData] = useState([]);

  useEffect(() => {
    if(userData.length === 0) {
      fetch('/UserInfo')
      .then(res=> res.json())
      .then(data => setUserData(data))
      .then(error => console.error(error));
    }
  }, []);

    return (
      <div>
        <Link to="/">Go Back To HomePage</Link>
        <br></br>
        This is the Community Page.
        <br></br>
        We probably want the community page to have 2 main features:
        <br></br>
        1. A user should be able to search up other users. Idea being that
        they can ultimately search up a user, click on the user, be taken
        to that user's profile and send a friend request.
        <br></br> 
        2. A global chat should be present here. The idea being that this will
        foster the "social" aspect of the WebApp. Will rely on bidirectional communication
        between clients and servers (Socket.io seems promising).
        <br></br>

        <SearchBar data={userData} filterBy="username"/>
      </div>
    );
  }