import React from 'react';
import LoginPage from './components/LoginPage';
import RoutesController from './components/RoutesController';
import { useSelector } from "react-redux";
import TopBar from './components/TopBar';
import './styles/App.css';

export default function App() {
  const isLoggedIn = useSelector((state) => state.session.isLoggedIn);
  return (
    <div className="app-container">
      <div className="app-head-screen">
        <TopBar />
      </div>
      <div className="app-body-screen">
        {isLoggedIn ? 
          <RoutesController />:
          <LoginPage />
        }
      </div>
    </div>
  );
}