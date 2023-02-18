import React, { useState, useEffect} from 'react';
import { connect } from "react-redux";
import { updateUser } from "../actions/sessionActions";
import {Link, useParams} from "react-router-dom";

function ProfilePage({userInfo, updateUser}) {  
  let {username} = useParams();
  if (!username) username = userInfo.username;

  const [userData, setUserData] = useState();

  console.log(username);

  useEffect(() => {
    console.log(username);
    fetch(`/getUser`, {
      method: 'POST',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        userName: username
      })
    })
    .then((res) => {
      if(!res.ok) throw new Error(res.statusText);
      else return res.json();
    })
    .then(data => setUserData(data))
    .then(console.log("hi"))
  }, []);


    return (
      <div>
        <Link to="/">Go Back To HomePage</Link>
        <br></br>
        This is the profile page of {username}
        <br></br>
        This is a rudimentary profile page. To enable account editing / viewing stats.
        <br></br>
        <br></br>
        The idea would be that people 
        can edit their accounts (password, username, etc...) or even delete
        their accounts from this page. 

        <br></br>
        <br></br>
        This is all the information we currently have on the user.

        <br></br>
        <br></br>
        {JSON.stringify(userData)}

        <br></br>
        THE PASSWORD IS RIGHT HERE ^^^ HACK INTO THEIR ACCOUNT NOW!!
        <br></br>
        Note that 'record' above indicates the array of questionIds that the user
        has solved correctly. Note that there can be repeats, so extract all the data
        into a set to see the number of UNIQUE questions the user has solved:
        {userInfo.record.filter((value, index, array) => array.indexOf(value) === index).length}
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