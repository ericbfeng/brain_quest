
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import { CardContent } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Unstable_Grid2';
import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import {useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";
import { satQuestions, actQuestions, apQuestions, codingQuestions } from '../question_bank/questions';




function generate(element, quizes) {
    return quizes.map((value) => {
        return (<React.Fragment key={value.id}> {React.cloneElement(element, value)} </React.Fragment> 
        );}
    );
}



function IndividualTest(props){


    const navigate = useNavigate();
    const test = props["test"]
    const subject  = props["subject"]


    const handleChange = (event) => {
        navigate(`/testbankpage/${test}/${subject}`, { replace: true });
    }


    return(

        <Card sx={{ backgroundColor: "AntiqueWhite", height: 40, width: "100%"}}>         
            <Grid container spacing={2}>
                <Grid xs={3}>
                    <Avatar> T </Avatar>
                </Grid>
                <Grid xs={3}>
                    <Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>
                        {test} {subject}: 
                    </Typography>
                </Grid>
                <Grid xs={3} sx={{ marginLeft: "auto" }}>
                    <Button variant="contained" onClick={handleChange} > Review </Button>
                </Grid>
            </Grid>
        </Card>

    )
}
export default function PastTest(){
    const { pageUsername } = useParams();
    const [ p_quizes, setQuizes] = React.useState([]);



    /**
     * 
     * @param {*} questionid takes a question ID that the user has solved
     * @param {*} testSet the array of questions that the question could be associated with
     * @returns the subject related wit the question.
     */
    function checkTest(questionid, testSet){
        for(let i = 0; i < testSet.length; i++){
            if(testSet[i].questionId === questionid){
                return testSet[i].subType;
            }
        }
    }
    

    //on the loading of this component, makes the fetch call for the specific user.
    useEffect(() => {
          fetch(`/userByUsername/${pageUsername}`)
          .then(res=> res.json())
          .then((data) =>{
                let quizes = []  
                let item = data[0];
                    for(let i = 0; i < item.record.length; i++){
                        let curr = item.record[i];
                        let to_add =  {      
                            "test":  null,
                            "subject": null,
                            "id": curr
                        }
                        //As specified by the testbank, the quizes are stored in this way:
                        if(curr < 1000){
                            to_add.test = "SAT";
                            to_add.subject = checkTest(curr, satQuestions);
                            //SAT questions
                        }
                        else if(curr < 2000){
                            to_add.test = "ACT";
                            to_add.subject = checkTest(curr, actQuestions);
                            // actQuestions
                        }
                        else if(curr < 3000){
                            to_add.test = "AP";
                            to_add.subject = checkTest(curr, apQuestions);
                            // apQuestions
                        }else{ 
                            to_add.test = "CODING";
                            to_add.subject = checkTest(curr, codingQuestions);
                            // codingQuestions
                        }
                        quizes.push(to_add);
                    }
                setQuizes(quizes);
                
        })
          .then(error => console.error(error));
      }, []);


    return( 
        <Card>
        <CardContent >
        <Typography sx={{ fontSize: 25 }} color="text.secondary" gutterBottom>
            Past Tests:
        </Typography>
        <Stack spacing={2}>
            {p_quizes.length === 0? 
            <Typography>
                Practice quizes to see previous tests here
            </Typography>
            :generate(<IndividualTest/>, p_quizes)}
        </Stack>
        </CardContent>
        </Card>
    )
} 