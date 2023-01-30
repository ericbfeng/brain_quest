import React from "react";
import { connect } from "react-redux";
import { loginUser, logoutUser } from "../actions/sessionActions";

interface SessionButtonProps {
  enteredUsername: string,
  enteredPasssword: string,
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
    .then(res => res.json())
    .then(
      (result) => this.props.loginUser(result),
      (error) => alert("Login failure!")
    )
  }
  
  handleLogoutClick = () => {
    fetch(`/logout`)
    .then(res => res.json())
    .then(
      (result) => this.props.logoutUser(result),
      (error) => alert("Logout failure!")
    )
  }

  render() {
    return (
        <div>
          {
            this.props.isLoggedIn ? 
              <button 
                onClick={this.handleLogoutClick}>
                  Logout
              </button> :
              <button 
                onClick={this.handleLoginClick} 
                disabled={!this.props.enteredPasssword || !this.props.enteredUsername}>
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