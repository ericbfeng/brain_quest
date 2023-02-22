import {React, useState}  from "react";
import {Link} from "react-router-dom";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import HomePage from "./HomePage";

export default function HomePageIndex() {  

  const [value, setValue] = useState(0);
  const navigate = useNavigate();


  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
    if(newValue === 1){
      navigate('/teampage', { replace: true });
    } 
    if(newValue === 2){
      navigate('/testbankpage', { replace: true });
    }
  };

    return (
      <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} 
        variant="fullWidth"
         centered>
          <Tab label="HomePage" {...a11yProps(0)} />
          <Tab label="Form A Team" {...a11yProps(1)} />
          <Tab label="Solo Practice" {...a11yProps(2)} />
        </Tabs>
      </Box>
      {value === 0 ? <HomePage/> : value === 1 ?
      <div>
         TODO: LOBBY SCREEN
      </div>:
      <div>
        SoloProblemPage TODO: dont know if we should render in place here or route to solo problem page when clicked
      </div>}
    </Box>

    );
  }