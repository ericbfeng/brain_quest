import React, {useState} from 'react';
import { connect } from "react-redux";
import { loginUser } from "../actions/sessionActions";
import logo from '../logo.png';
import '../styles/LoginPage.css'

function LoginOrRegister({loginUser}) {

  // Input Fields For Login View
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // Input Fields For Register View
  const [registerUsername, setRegisterUsername] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState("");

  // Keeps track of what view (Login vs Register) the user is on.
  const [userIsLoggingIn, setUserIsLoggingIn] = useState(true);

  const handleRegisterRequest = () => {
    // They needed to provide values to all required fields.
    if(!registerUsername || !registerPassword || !registerConfirmPassword){
      alert("Please fill all fields");
      return;
    }

    if(registerPassword !== registerConfirmPassword){
      alert("Passwords do not match!");
      return;
    }

    // Send info the server (attempt to register user).
    fetch(`/register`, {
      method: 'POST',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        userName: registerUsername,
        password: registerPassword
      })
    })
    .then((res) => {
      if(!res.ok) throw new Error(res.statusText);
      else return res.json();
    })
    .then(
      (result) => alert("Registration success!"),
      (error) => alert("Registration failed: " + error.message)
    )
  }

  const handleLoginRequest = () => {
    // They needed to provide values to all required fields.
    if(!loginUsername || !loginPassword){
      alert("Please fill all fields");
      return;
    }
    
    // Send info the server (attempt to login user). 
    fetch(`/login`, {
      method: 'POST',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        username: loginUsername,
        password: loginPassword
      })
    })
    .then((res) => {
      if(!res.ok) throw new Error(res.statusText);
      else return res.json();
    })
    .then(
      (result) => loginUser(result),
      (error) => alert("Login failure: " + error.message)
    )
  }

  const handleClick = (origin) => {
    if(origin === "REGISTER"){
      if(userIsLoggingIn){
        // The user was previously logging in. They clicked the register button.
        // Now we need to wipe clean any state and switch over to the register view.
        setLoginUsername("");
        setLoginPassword("");
        setUserIsLoggingIn(false);
      } else {
        // The user was on the register page and then clicked register. We need
        // to see if they filled out the proper fields.
        handleRegisterRequest();
      }
    } else {
      if(!userIsLoggingIn){
        // The user was previously registering. They clicked the login button.
        // Now we need to wipe clean any state and switch over to the login view.
        setRegisterUsername("");
        setRegisterPassword("");
        setRegisterConfirmPassword("");
        setUserIsLoggingIn(true);
      } else {
        // The user was on the login page and then clicked login. We need to 
        // see if they filled out the proper fields.
        handleLoginRequest();
      }
    }
  }

  return (
    <div className="login-register-container">
      <div className="login-register-input-fields">
        {userIsLoggingIn ? 
          <div className="login-input-field-container">
            <input placeholder="Username" className="user-input" value={loginUsername} onChange = {(e) => setLoginUsername(e.target.value)}/>
            <input placeholder="Password" className="user-input" value={loginPassword} type="password" onChange = {(e) => setLoginPassword(e.target.value)}/>
          </div>: 
          <div className="register-input-field-container">
            <input placeholder="Username" className="user-input" value={registerUsername} onChange = {(e) => setRegisterUsername(e.target.value)}/>
            <input placeholder="Password" className="user-input" value={registerPassword} type="password" onChange = {(e) => setRegisterPassword(e.target.value)}/>
            <input placeholder="Confirm Password" className="user-input" value={registerConfirmPassword} type="password" onChange = {(e) => setRegisterConfirmPassword(e.target.value)}/>
          </div>
        }
      </div>
      <div className="login-register-buttons">
        <button className="login-register-button" onClick={() => handleClick("REGISTER")}>Register</button>
        <button className="login-register-button" onClick={() => handleClick("LOGIN")}>Login</button>
      </div>
    </div>
  )
}


function LoginPage({loginUser}) {
  return (
    <div className="login-page-container">
      <div className="login-page-blurb">
        <div className="login-page-blurb-header">
          Introducing Brain Quest
        </div>
        <div className="login-page-blurb-text">
          Brain Quest is a  website that allows users to help practice for tests:
          Be that for the ACT, SAT, Algorithm problems, etc. The website will allow
          users to create accounts to track their progress, quickly share practice 
          problems, and even possibly allow users to compete/collaborate with each 
          other on tests in real time. Read more about the project here
        </div>
      </div>
      <div className="login-page-interactive-section">
          <div className="big-logo-container">
            <img className="big-logo-photo" src={logo} alt="Website Logo"/>
          </div>
          <div className="login-register-action">
            <LoginOrRegister loginUser={loginUser}/>
          </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({});

const mapActionsToProps = () => ({
  loginUser
});

export default connect(mapStateToProps, mapActionsToProps())(LoginPage)