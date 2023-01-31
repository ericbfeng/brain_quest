import React from 'react';
import SessionName from './SessionName';
import SessionButton from './SessionButton';
import SessionInput from './SessionInput';
import '../styles/TopBar.css';

class TopBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: ""
        };
      }

    handleUsernameChange = (event) => {
        this.setState({
            username: event.target.value
        })
    }

    handlePasswordChange = (event) => {
        this.setState({
            password: event.target.value
        })
    }

    onLogoutSubmit = () => {
        // Fixes bug where a user logs in, logs out, then is able to login
        // again without entering a username and password. Has to do with the fact
        // that we are holding local state here for the entered password / username.
        this.setState({
            password: "",
            username: ""
        })
    }

    render() {
      return (
        <div className="top-bar-container">
            <div>
                <SessionName/> 
                <SessionInput 
                    onUsernameChange={this.handleUsernameChange}
                    onPasswordChange={this.handlePasswordChange}
                />
            </div>
            <SessionButton
                enteredPasssword={this.state.password}
                enteredUsername={this.state.username}
                onLogout={this.onLogoutSubmit}
                className="top-bar-button"
            />
        </div>
      );
    }
  }

export default TopBar;