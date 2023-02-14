import React, { useState, useEffect } from "react";
import {Link} from "react-router-dom";
import { useSelector } from "react-redux";
import '../styles/CommunityPage.css';

function GlobalChat({socket}) {
  const [globalChat, setGlobalChat] = useState([]);
  const [messageEntered, setMessageEntered] = useState('');
  const userInformation = useSelector((state) => state.session.userInformation);

  useEffect(() => {
    socket.on('message_recieved', ({ name, message }) => {
      setGlobalChat([...globalChat, {name, message}])
    })
  })

  const renderGlobalChat = () => {
    return globalChat.map(({name, message}, index) => (
      <div key={index}>
        {name}: {message}
      </div>
    ))
  }

  const handleSubmit = () => {
    socket.emit('send_message', {name: userInformation.username, message: messageEntered });
    setMessageEntered("");  
  }
  
  return (
    <div className="global-chat-master-container">
      <div className="global-chat-input-container">
        <input 
          value={messageEntered} 
          type="text" 
          placeholder="Enter chat" 
          onChange={(e) => setMessageEntered(e.target.value)}
        />
        <button onClick={handleSubmit}>Send</button>
      </div>
      <div className="global-chat-display-container">
        {renderGlobalChat()}
      </div>
    </div>
  )
}

export default function HomePage({socket}) {  
    return (
      <div className="community-page-body-container">
        <Link to="/">Go Back To HomePage</Link>
        <div className="community-page-body-content-container">
          <div>
            This is the Community Page.
            <br></br>
            We probably want the community page to have 2 main features:
            <br></br>
            1. A user should be able to search up other users. Idea being that
            they can ultimately search up a user, click on the user, be taken
            to that user's profile and send a friend request.
          </div>
          <GlobalChat socket={socket}/>
        </div>
      </div>
    );
  }