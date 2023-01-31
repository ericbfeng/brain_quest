import React from 'react';
import { connect } from "react-redux";
import '../styles/SessionInput.css';

interface SessionInputProps {
    onUsernameChange: () => void,
    onPasswordChange: () => void
}

class SessionInput extends React.Component<SessionInputProps> {
    render() {
      return (
        <div>
            {this.props.isLoggedIn ? 
                <div></div>:
                <div className="session-input-container">
                    <input
                        type="text" 
                        placeholder='Username' 
                        onChange={this.props.onUsernameChange}
                        className="session-input-field"
                    />
                    <input 
                        type="password" 
                        placeholder="Password" 
                        onChange={this.props.onPasswordChange}
                        className="session-input-field"
                    />
                </div>
            }
        </div>
      );
    }
  }

const mapStateToProps = state => ({
    isLoggedIn: state.session.isLoggedIn,
});

const mapActionsToProps = () => ({});

export default connect(mapStateToProps, mapActionsToProps())(SessionInput)