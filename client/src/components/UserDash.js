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
import LinearProgress from '@mui/material/LinearProgress';
import { useParams } from "react-router-dom";
import { satQuestions, actQuestions, apQuestions, codingQuestions } from '../question_bank/questions';


function TestTab(subject, val){
    return(
    <div>
        <Tab label={<Stack spacing={2}>
        <Avatar>
           {subject[0]}
       </Avatar>
           <LinearProgress  value = {val} variant="determinate" />
           </Stack>} />
   </div>
    )
}






function preprocess(test_type){
    let subjects = {}
    for(let i = 0; i < test_type.length; i++){
        let curr_subType = test_type[i].subType
        if(!(curr_subType in subjects)){
            subjects[curr_subType] = 0
        } 
        subjects[curr_subType] += 1 
    }
    return subjects
}

function parseTest(record, test_info, preprocessed){
    let res = {}
    for(const key in preprocessed){
        res[key] = 0 

    }
    let seen_subjects = new Set();
    for(let i = 0; i < record.length; i ++){
        if(test_info[0] <=  record[i] <=  test_info[1]){
            let idx = record[i] % 100;
            let sub_type = test_info[2][idx].subType;
            if(!(seen_subjects.has(sub_type))){ 
                seen_subjects.add(sub_type)
                res[sub_type] = 0;
            }
            res[sub_type] +=  (1 * 100)/preprocessed[sub_type];
            if(res[sub_type] > 100){
                res[sub_type] = 100; 
            }
        }
    }
    return res
}


function TestDisplay(props){ 
    const [value, setValue] = React.useState(0);
    const [tests, setTests] = React.useState({})
    const handleChange = (event, newValue) => {
      setValue(newValue);
    }; 

    const index_ranges = 
        {
        "SAT": [0, 999, satQuestions],
         "ACT": [1000, 1999, actQuestions],
        "AP": [2000, 2999, apQuestions],
        "CODING": [3000, 3999, codingQuestions]
        };


    const { pageUsername } = useParams();
    
    useEffect(() => {
        
        fetch(`/userByUsername/${pageUsername}`)
        .then(res=> res.json())
        .then((data) =>{   
            let test_info =  index_ranges[props.test];
            let preprocessed = preprocess(test_info[2]);
            let record = data[0].record;
            let test_parsed = parseTest(record, test_info, preprocessed);
            setTests(test_parsed);
        }).catch(
            error => console.error(error));
        }, [props.test]);
    

    function generate(obj) {
        return Object.entries(obj).map(([subject, val]) => TestTab(subject, val));
     }

    return(
    <Box sx={{ maxWidth: { xs: 320, sm: 480 }, bgcolor: 'background.paper' }}>
      <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
      >
        {generate(tests)}
      </Tabs>
    </Box>);
}


export default function UserDash() {  
    const usrName  =  "Username";
    const usrImg = null;
    const { pageUsername } = useParams();

    const [test, setTest] = React.useState('ACT');
    const handleChange = (event) => {
        setTest(event.target.value);
    };

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
                <MenuItem value={"AP"}>AP</MenuItem>
                <MenuItem value={"CODING"}>CODING</MenuItem>
                </Select>
            </FormControl>
            <TestDisplay  test={test}/>
            </Paper>
       
        </Box>
        
        </div>


    );
}