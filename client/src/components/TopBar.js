import React from 'react';
import { useSelector } from "react-redux";
import logo from '../logo.png';
import PersonIcon from './PersonIcon';
import {Link} from 'react-router-dom';
import '../styles/TopBar.css';

export default function TopBar() {
    const isLoggedIn = useSelector((state) => state.session.isLoggedIn);    
    return (
        <div className="main-container">
            <Link to="/" target="_self" rel="noreferrer">
                <img  className="logo-photo" src={logo} alt="Website Logo"/>
            </Link>
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