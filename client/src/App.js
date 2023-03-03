import React from 'react';
import LoginPage from './components/LoginPage';
import RoutesController from './components/RoutesController';
import { useSelector } from "react-redux";
import TopBar from './components/TopBar';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './styles/App.css';

import { MathJax, MathJaxContext } from "better-react-mathjax";

const config = {
  loader: { load: ["input/asciimath"] },
  asciimath: {
    displaystyle: true,
    delimiters: [
      ["$", "$"],
      ["`", "`"]
    ]
  }
};



export default function App() {
  const isLoggedIn = useSelector((state) => state.session.isLoggedIn);
  return (
    <BrowserRouter>
      <MathJaxContext config={config}>
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
      </MathJaxContext>
    </BrowserRouter>
  );
}