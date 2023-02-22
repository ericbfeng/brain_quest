import * as React from 'react';
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

    function generate(element) {
        return [0, 1, 2].map((value) =>
          React.cloneElement(element, {
            key: value,
          }),
        );
    }

    const [dense, setDense] = React.useState(false);
    const [secondary, setSecondary] = React.useState(false);
    
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
                    <IconButton edge="end" aria-label="chat">
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
                    primary="Friend"
                    secondary={secondary ? 'Secondary text' : null}
                  />
                </ListItem>,
              )}

        </List>
        </Card>
        </CardContent>
    </Card>)

}


