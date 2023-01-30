import React from 'react';
import SessionName from './SessionName';
import SessionButton from './SessionButton';
import SessionInput from './SessionInput';

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

    render() {
      return (
        <div>
            <span>
                <SessionName /> 
                <SessionInput 
                    onSubmit={this.handleSubmit}
                    onUsernameChange={this.handleUsernameChange}
                    onPasswordChange={this.handlePasswordChange}
                />
                <SessionButton
                    enteredPasssword={this.state.password}
                    enteredUsername={this.state.username}
                />
            </span>
        </div>
      );
    }
  }

export default TopBar;