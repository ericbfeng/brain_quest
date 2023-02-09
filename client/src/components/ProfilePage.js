import React from 'react';
import { connect } from "react-redux";
import { updateUser } from "../actions/sessionActions";
import {Link} from "react-router-dom";

function ProfilePage({userInfo, updateUser}) {  
    return (
      <div>
        <Link to="/">Go Back To HomePage</Link>
        <br></br>
        This is a rudimentary profile page. To enable account editing / viewing stats.
        <br></br>
        The idea would be that people 
        can edit their accounts (password, username, etc...) or even delete
        their accounts from this page. 

        <br></br>
        This is all the information we currently have on the user.

        <br></br>
        {JSON.stringify(userInfo)}

        <br></br>
        Note that 'record' above indicates the array of questionIds that the user
        has solved correctly.
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