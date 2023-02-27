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

export default function FriendsTab({tablabel}){


    
    let [friends, setFriends] = useState([]);
    
  function generate(element) {
        return friends.map((friend,idx) =>
          React.cloneElement(element, {
            key: idx,
            fname: friend.usrname
          }),
        );
    }
    


  useEffect(() => {
    // Update the document title using the browser API
            
      fetch(`/getfriends`, {
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
          console.log(data)
          setFriends(data)

        })
        .catch((error) => {
          console.error(error);
        });

  }, [] );


    
    const [dense, setDense] = React.useState(false);
    const [secondary, setSecondary] = React.useState(false);


    const handleChange = async(event) => {
      if(tablabel ===  "Friends"){
        return
      }
      var friendName = "qq";
      const addFriend =  async (friendName) => {
        const url = `/friends`;
        const data = { friendName };
      
        try {
          const response = await fetch(url, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
          });
      
          const responseData = await response.json();
          console.log(responseData);
        } catch (error) {
          console.error(error);
        }
      };
      
      addFriend(friendName);

    };
    
    return(<Card  sx={{ backgroundColor: "AntiqueWhite" }} > 
        <CardContent >
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {tablabel}:
        </Typography>
        <Card sx={{ backgroundColor: "white" }}>
        <List dense={dense}>
                        {generate(
                            <ListItem
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
                                    primary= "Friend"
                                    secondary={secondary ? 'Secondary text' : null}
                                />
                            </ListItem>
                        )}
        </List>
        </Card>
        </CardContent>
    </Card>)

}


