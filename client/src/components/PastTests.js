import * as React from 'react';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import { CardContent } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Unstable_Grid2';
import { height } from '@mui/system';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';


function IndividualTest(){
    return(

        <Card sx={{ backgroundColor: "AntiqueWhite", height: 40, width: "100%"}}>

            <Grid container spacing={2}>
                <Grid xs={3}>
                    <Avatar> T </Avatar>
                </Grid>
                <Grid xs={3}>
                    <Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>
                        ACT 2019 TEST: 
                    </Typography>
                </Grid>
                <Grid xs={3} sx={{ marginLeft: "auto" }}>
                    <Button variant="contained"> Review </Button>
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
            <IndividualTest/>
            <IndividualTest/>
            <IndividualTest/>
            <IndividualTest/>
        </Stack>
        </CardContent>
        </Card>
    )
} 