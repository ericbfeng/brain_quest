
import {Link} from "react-router-dom";
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import UserDash from "./UserDash";
import Stack from '@mui/material/Stack';
import FriendsTab from "./FriendsTab";
import PastTest from "./PastTests";
import { tabClasses } from "@mui/material";
import {useNavigate } from 'react-router-dom';




const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));


export default function HomePage() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Stack spacing={2}>
        <Grid container spacing={2}>
          <Grid xs={8} sx={{ height: "100%" }}>
            <UserDash />
          </Grid>
          <Grid xs={4} sx={{ height: "100%" }}>
            <FriendsTab tablabel={"Friends"} />
          </Grid>
          <Grid xs={8} sx={{ height: "100%" }}>
            <PastTest />
          </Grid>
          <Grid xs={4} sx={{ height: "100%" }}>
            <FriendsTab tablabel={"Add New Friends"} />
          </Grid>
        </Grid>
      </Stack>
    </Box>);
}
