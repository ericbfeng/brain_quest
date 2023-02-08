import React from 'react';
import { BsPerson } from 'react-icons/bs';
import { connect } from "react-redux";
import { logoutUser } from "../actions/sessionActions";
import '../styles/PersonIcon.css';

function PersonIcon({logoutUser}) {
    const [open, setOpen] = React.useState(false);
  
    const handleIconClick = () => {
      setOpen(!open);
    };
  
    const handleLogoutClick = () => {
      fetch(`/logout`)
      .then(res => res.json())
      .then(
        (result) => {
          setOpen(false);
          logoutUser(result);
        },
        (error) => alert("Logout failure!")
      )
    }
  
    return (
      <div className="dropdown-container">
        <div className="container"  onClick={handleIconClick}>
            <BsPerson className="icon"/>
        </div>
        {open ? (
          <ul className="menu">
            <li className="menu-item">
              <button onClick={handleLogoutClick}>Logout</button>
            </li>
          </ul>
        ) : null}
      </div>
    );
  };

  const mapStateToProps = state => ({});

  const mapActionsToProps = () => ({
    logoutUser
  });
  
  export default connect(mapStateToProps, mapActionsToProps())(PersonIcon)