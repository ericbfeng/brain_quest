import React from 'react';
import { connect } from "react-redux";

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
                <form>
                    <label onChange={this.props.onUsernameChange}>
                        Username:
                        <input type="text"></input>
                    </label>
                    <label onChange={this.props.onPasswordChange}>
                        Password:
                        <input type="text"></input>
                    </label>
                </form>
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