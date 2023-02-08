import React from 'react';
import { useSelector } from "react-redux";
import logo from '../logo.png';
import PersonIcon from './PersonIcon';
import '../styles/TopBar.css';

export default function TopBar() {
    const isLoggedIn = useSelector((state) => state.session.isLoggedIn);
    return (
        <div className="main-container">
            <div>
                <img className="logo-photo" src={logo} alt="Website Logo"/>
            </div>
            <div className="website-name-container">
                <div className="website-name-text">
                    BRAIN QUEST
                </div>
            </div>
            <div className="icon-container">
                {isLoggedIn ? 
                    <PersonIcon/>:
                    null
                }
            </div>
        </div>
    );
}