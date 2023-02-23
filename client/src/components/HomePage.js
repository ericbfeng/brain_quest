import {React, useState}  from "react";
import {Link} from "react-router-dom";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { connect } from "react-redux";
import '../styles/HomePage.css';

function HomePage({userInfo}) {  

  const [value, setValue] = useState(0);

  const GetProfilePrompt = () => {
    return (
      <div className="home-page-prompt-subcontainer">
        <div className="home-page-prompt-page-description">
          There should be a description of what the profile page is, contains, etc..
        </div>
        <div className="home-page-prompt-page-link">
          <Link to={"/profilepage/" + userInfo.username}>Visit Page</Link>
        </div>
      </div>
    )
  }

  const GetCommunityPrompt = () => {
    return (
      <div className="home-page-prompt-subcontainer">
        <div className="home-page-prompt-page-description">
        There should be a description of what the community page is, contains, etc..
        </div>
        <div className="home-page-prompt-page-link">
          <Link to={"/communitypage"}>Visit Page</Link>
        </div>
      </div>
    )
  }

  const GetSoloPracticePrompt = () => {
    return (
      <div className="home-page-prompt-subcontainer">
        <div className="home-page-prompt-page-description">
        There should be a description of what the solo practice page is, contains, etc..
        </div>
        <div className="home-page-prompt-page-link">
          <Link to={"/testbankpage"}>Visit Page</Link>
        </div>
      </div>
    )
  }

  const  GetTeamPracticePrompt = () => {
    return (
      <div className="home-page-prompt-subcontainer">
        <div className="home-page-prompt-page-description">
          There should be a description of what the team page is, contains, etc..
        </div>
        <div className="home-page-prompt-page-link">
          <Link to={"/teampage"}>Visit Page</Link>
        </div>
      </div>
    )
  }

  const  GetCodingPracticePrompt = () => {
    return (
      <div className="home-page-prompt-subcontainer">
        <div className="home-page-prompt-page-description">
          There should be a description of what the coding page is, contains, etc..
        </div>
        <div className="home-page-prompt-page-link">
          <Link to={"/codeeditorpage"}>Visit Page</Link>
        </div>
      </div>
    )
  }

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

    return (
      <Box sx={{ width: '100%' , height: '100%'}}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} 
          variant="fullWidth"
          centered>
            <Tab label="Profile Page" {...a11yProps(0)} />
            <Tab label="Community Page" {...a11yProps(1)} />
            <Tab label="Solo Practice" {...a11yProps(2)} />
            <Tab label="Team Practice" {...a11yProps(3)} />
            <Tab label="Coding Practice" {...a11yProps(4)} />
          </Tabs>
        </Box>
      <div className="home-page-prompt-container">
        {value === 0 && GetProfilePrompt()}
        {value === 1 && GetCommunityPrompt()}
        {value === 2 && GetSoloPracticePrompt()}
        {value === 3 && GetTeamPracticePrompt()}
        {value === 4 && GetCodingPracticePrompt()}
      </div>
    </Box>

    );
  }

  const mapStateToProps = state => ({
    userInfo: state.session.userInformation,
  });

  const mapActionsToProps = () => ({});
  
  export default connect(mapStateToProps, mapActionsToProps())(HomePage)