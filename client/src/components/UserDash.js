import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import Avatar from '@mui/material/Avatar';
import React, { useState, useEffect } from 'react';
import { Typography } from '@mui/material';
import Stack from '@mui/material/Stack';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import CalculateIcon from '@mui/icons-material/Calculate';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import LinearProgress from '@mui/material/LinearProgress';
import { useParams } from "react-router-dom";

function Selector(){
    const [test, setTest] = React.useState('ACT');
    
    
    const handleChange = (event) => {
        setTest(event.target.value);
    };

    return (  


    <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Test</InputLabel>
        <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={test}
        label="Test Selection"
        onChange={handleChange}
        >
        <MenuItem value={"ACT"}>ACT</MenuItem>
        <MenuItem value={"SAT"}>SAT</MenuItem>
        </Select>
    </FormControl>
    );
}




function TestDisplay(){ 
    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
      setValue(newValue);
    }; 



    return(
    <Box sx={{ maxWidth: { xs: 320, sm: 480 }, bgcolor: 'background.paper' }}>
      <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
        aria-label="scrollable auto tabs example"
      >
        <Tab label={<Stack spacing={2}>
                <CalculateIcon/>
                <LinearProgress  value = {0} variant="determinate" />
                </Stack>} />
        <Tab label={
            <Stack spacing={2}>
            <AutoStoriesIcon/> 
            <LinearProgress value = {0} variant="determinate" />
            </Stack>
        }/>
        <Tab label={<Stack spacing={2}>
        <MenuBookIcon/> <LinearProgress  value = {0}  variant="determinate"  />
        </Stack>} />
        <Tab label={
        <Stack spacing={2}>
            <LightbulbIcon/> <LinearProgress  value = {0} variant="determinate" /> 
        </Stack> } 
        />
      </Tabs>
    </Box>);
}


export default function UserDash() {  
    const usrName  =  "Username";
    const usrImg = null;
    const { pageUsername } = useParams();


    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    return(
        <div>
        <Box sx = {{ 
            paddingTop: 2
        }}>
            <Paper  
            sx = {{backgroundColor: 'primary.dark', px: "auto", py: "auto"}}
            elevation={5}>
            <Grid container spacing={2}>
                <Grid xs={2}>
                <Avatar>{pageUsername[0].toUpperCase()}</Avatar>
                </Grid>
                <Grid xs={10}>
                    <Typography>
                    {capitalizeFirstLetter(pageUsername)}'s Dashboard:
                    </Typography> 
                </Grid>
            </Grid>
            <Selector/>
            <TestDisplay/> 
            </Paper>
       
        </Box>
        
        </div>


    );
}