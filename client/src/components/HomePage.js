import React from "react";
import {Link} from "react-router-dom";
import { connect } from "react-redux";
import { updateUser } from "../actions/sessionActions";

function HomePage({userInfo, updateUser}) {  
    return (
      <div>
        This is the HomePage. Welcome {userInfo.username}!
        <br></br>
        There will be a navigation bar on the top to different pages.
        <br></br>
        In the meantime here is links to existing pages:
        <br></br> 
        <Link to="/testbankpage">TestBankPage</Link>
        <br></br>
        <Link to={"/profilepage/" + userInfo.username}>ProfilePage</Link>
        <br></br>
        <Link to="/communitypage">CommunityPage</Link>
        <br></br>
        <Link to="/teampage">TeamPage</Link>
        <br></br>
        <Link to="/codeeditorpage">Code Editor</Link>
      </div>
    );
  }

  const mapStateToProps = state => ({
    userInfo: state.session.userInformation,
  });

  const mapActionsToProps = () => ({
    updateUser
  });
  
  export default connect(mapStateToProps, mapActionsToProps())(HomePage)