import React from 'react';
import RegistrationForm from './components/RegistrationForm';
import RoutesController from './components/RoutesController';
import { connect } from "react-redux";
import TopBar from './components/TopBar'
import './styles/App.css';

class App extends React.Component {
  render() {
    return (
      <div>
        <TopBar />
        {this.props.isLoggedIn ? 
          <RoutesController />:
          <RegistrationForm />
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isLoggedIn: state.session.isLoggedIn,
});

const mapActionsToProps = () => ({});

export default connect(mapStateToProps, mapActionsToProps())(App)
