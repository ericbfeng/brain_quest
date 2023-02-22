import * as React from 'react';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import { CardContent } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Unstable_Grid2';
import { height } from '@mui/system';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import {useNavigate } from 'react-router-dom';



const Tests = [ 

    {      
        "test":  "SAT",
        "subject": "Science" 
    },

    {      
        "test":  "SAT",
        "subject": "Math" 
    },

    {      
        "test":  "ACT",
        "subject": "Math" 
    }, 


]


function generate(element) {
    return Tests.map((value) => {
    return React.cloneElement(element, value)}
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


    return( 
        <Card>
        <CardContent >
        <Typography sx={{ fontSize: 25 }} color="text.secondary" gutterBottom>
            Past Tests:
        </Typography>
        <Stack spacing={2}>
            {generate(<IndividualTest/>)}
        </Stack>
        </CardContent>
        </Card>
    )
} 