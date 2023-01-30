import React from 'react';
import RegistrationForm from './components/RegistrationForm';
import Home from './components/Home';
import { connect } from "react-redux";
import './styles/App.css';

class App extends React.Component {
  render() {
    return (
      <div>
        {this.props.isLoggedIn ? <Home />: <RegistrationForm />}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isLoggedIn: state.session.isLoggedIn,
});

const mapActionsToProps = () => ({});

export default connect(mapStateToProps, mapActionsToProps())(App)
