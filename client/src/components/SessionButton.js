import React from "react";
import { connect } from "react-redux";
import { loginUser, logoutUser } from "../actions/sessionActions";
import '../styles/SessionButton.css';

interface SessionButtonProps {
  enteredUsername: string,
  enteredPasssword: string,
  onLogout: () => void,
}

class SessionButton extends React.Component<SessionButtonProps> {
  handleLoginClick = () => {
    fetch(`/login`, {
      method: 'POST',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        username: this.props.enteredUsername,
        password: this.props.enteredPasssword
      })
    })
    .then((res) => {
      if(!res.ok) throw new Error(res.statusText);
      else return res.json();
    })
    .then(
      (result) => this.props.loginUser(result),
      (error) => alert("Login failure: " + error.message)
    )
  }
  
  handleLogoutClick = () => {
    fetch(`/logout`)
    .then(res => res.json())
    .then(
      (result) => {
        this.props.logoutUser(result);

        // Clear the local state of parent component (TopBar.js)
        this.props.onLogout();
      },
      (error) => alert("Logout failure!")
    )
  }

  render() {
    return (
        <div>
          {
            this.props.isLoggedIn ? 
              <button 
                onClick={this.handleLogoutClick}
                className="session-button enabled">
                  Logout
              </button> :
              <button 
                onClick={this.handleLoginClick} 
                disabled={!this.props.enteredPasssword || !this.props.enteredUsername}
                className={this.props.enteredPasssword && this.props.enteredUsername ? "session-button enabled": "session-button"}
                >
                  Login
              </button>
          }
        </div>
    );
  }
}

const mapStateToProps = state => ({
  isLoggedIn: state.session.isLoggedIn,
});

const mapActionsToProps = () => ({
  loginUser,
  logoutUser
});

export default connect(mapStateToProps, mapActionsToProps())(SessionButton)