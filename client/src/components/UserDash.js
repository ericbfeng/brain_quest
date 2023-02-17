import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import Avatar from '@mui/material/Avatar';
import * as React from 'react';
import Stack from '@mui/material/Stack';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';


function Selector(){
    const [test, setTest] = React.useState('select test');
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
        <Tab label="Math"/>
        <Tab label="Reading" />
        <Tab label="English" />
        <Tab label="Science" />
        <Tab label="ETC " />
        <Tab label="ETC2" />
        <Tab label="ETC3" />
      </Tabs>
    </Box>);
}


export default function UserDash() {  
    const usrName  =  "Username";
    const usrImg = null;
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
                <Avatar>{usrName[0]}</Avatar>
                </Grid>
                <Grid xs={10}>
                    {usrName}'s Dashboard:
                </Grid>
            </Grid>
            <Selector/>
            <TestDisplay/> 
            </Paper>
       
        </Box>
        
        </div>


    );
}