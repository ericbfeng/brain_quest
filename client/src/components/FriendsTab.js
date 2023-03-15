import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';

import IconButton from '@mui/material/IconButton';
import ChatIcon from '@mui/icons-material/Chat';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import SearchBar from "./SearchBar";
import { Button } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';

import ReccomendFriends from '../Utils/FriendRecommendation'

export default function FriendsTab({tablabel, renderState, user, setFriends, friends}){

  const placeholder_text = "Add friends to chat with them here!";
  let [recommendedFriends, setRecommendedFriends] = useState([]);
  
  const [allUsersData, setAllUsersData] = useState([]);

  useEffect(() => {
    if(allUsersData.length === 0) {
      fetch('/UserInfo')
      .then(res=> res.json())
      .then(data => setAllUsersData(data))
      .then(error => console.error(error));
    }
  }, []);

  function AddSearchBar(){
    if (tablabel === "Add New Friends"){
      return (
        <>
        <SearchBar data={allUsersData} filterBy="username" page="profile"/>
        <ListItemText primary="Recommended Friends"></ListItemText>
        </>
      )
    } else{
      return null
    }
  }

  async function updateFriends(){
    await fetch(`/getfriends`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Failed to retrieve friends");
        }
      })
      .then((data) => {
        setFriends(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  async function removeFriend(e){
    const friend = e.target.value.toString();
    console.log("remove friend: ", friend);
    await fetch ('/unfriend', {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ friend })
    }).then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Failed to retrieve friends");
      }
    })
    .then((data) => {
      console.log(data);
      updateFriends();
    })
    .catch((error) => {
      console.error(error);
    })
  }

  async function addFriend(friendName){

    // Call API
    const data = { friendName };
    try {
      const response = await fetch("/friends", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
  
      const responseData = await response.json();
      setFriends(responseData.friend_list.friends);

    } catch(e) {
      console.error(e);
    }
  }

  function friendUI(friend){
    if (friend.state === renderState){
      console.log(friend.usrname);
      return (
            <ListItem key={friend._id.toString()}
            secondaryAction={
                <IconButton onClick = {handleChange} edge="end" aria-label="chat">
                    { tablabel ===  "Friends" ? <ChatIcon />: <PersonAddIcon/>} 
                </IconButton>
            }
            >
              <ListItemAvatar>
                  <Avatar>
                      U
                  </Avatar>
              </ListItemAvatar>
              <ListItemText
                  primary={friend.usrname}
                  secondary={secondary ? 'Secondary text' : null}
              />
              <Button onClick={removeFriend} value={friend.usrname}> X </Button>
              {renderState === "pending" ? <Button onClick={() => addFriend(friend.usrname)}><CheckIcon></CheckIcon></Button> : <></>}
            </ListItem>
  
          );
    } 
    return null;
  }
    
  function generate(items) {
    return items.map((friend) => friendUI(friend));
  }
    


  useEffect(() => {
    // Update the document title using the browser API
      if (renderState === true){  
        const fetchData = async () => {
          const f = await ReccomendFriends(3, user);
          setRecommendedFriends(f.map((x, indx) => { return {"usrname": x, "state": true, "_id": indx} }));
        }
        fetchData();
        return;
      }
  }, [] );


    
    const [dense, setDense] = React.useState(false);
    const [secondary, setSecondary] = React.useState(false);


    const handleChange = async(event) => {
      if(tablabel ===  "Friends"){
        return
      }
      var friendName = "ww";
      console.log("Quick Add");
      const addFriend =  async (friendName) => {
        const url = `/quickadd`;
        const data = { friendName };
      
        try {
          const response = await fetch(url, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
          });
      
          const responseData = await response.json();
          console.log(responseData);
        } catch(error) {
          
        }
      };
      
      addFriend(friendName);

    };
    
    return(<Card  sx={{ backgroundColor: "AntiqueWhite" }} > 
        <CardContent >
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              {tablabel}:
          </Typography>
          {/* <Button onClick={handleChange}>a,nks.jtHKJDH</Button> */}
          <Card sx={{ backgroundColor: "white" }}>
            <AddSearchBar></AddSearchBar>
            <List dense={dense}>
              {friends.length > 0 ? generate(friends): placeholder_text}
            </List>
          </Card>
        </CardContent>
    </Card>)

}
