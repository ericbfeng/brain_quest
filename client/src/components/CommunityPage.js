import React, { useEffect, useState } from "react";
import {Link} from "react-router-dom";
import SearchBar from "./SearchBar";
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

export default function CommunityPage({socket}) {  

  const [allUsersData, setAllUsersData] = useState([]);

  useEffect(() => {
    if(allUsersData.length === 0) {
      fetch('/UserInfo')
      .then(res=> res.json())
      .then(data => setAllUsersData(data))
      .then(error => console.error(error));
    }
  }, []);

  return (
    <div className="community-page-body-container">
      <Link to="/">Go Back To HomePage</Link>
      <div>
        This is the Community Page.
        <br></br>
        TODO: Change this text to tell people what the 2 components below do.
      </div>
      <div className="community-page-component-container">
        <div className="community-page-search-bar">
          <SearchBar data={allUsersData} filterBy="username"/>
        </div>
        <div className="community-page-global-chat">
          <GlobalChat socket={socket}/>
        </div>
      </div>
    </div>
    );
 }