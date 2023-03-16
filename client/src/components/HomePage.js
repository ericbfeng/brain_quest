import {React}  from "react";
import {Link} from "react-router-dom";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { connect } from "react-redux";
import { Button } from '@mui/material';
import { updateTab } from "../actions/sessionActions";
import '../styles/HomePage.css';

function HomePage({userInfo, tabValue, updateTab}) {  
  const GetProfilePrompt = () => {
    return (
      <div className="home-page-prompt-subcontainer">
        <div className="home-page-prompt-page-description">
          Visit this page to see your profile page to check in on your progress and friends
        </div>
        <div className="home-page-prompt-page-link">
        <Link to={"/profilepage/" + userInfo.username}>
        <Button variant="contained">
        Visit Page
        </Button>
        </Link>
        </div>
      </div>
    )
  }

  const GetCommunityPrompt = () => {
    return (
      <div className="home-page-prompt-subcontainer">
        <div className="home-page-prompt-page-description">
        Visit this page to see the community page! Chat with new friends and find users!
        </div>
        <div className="home-page-prompt-page-link">
          <Link to={"/communitypage"}>
          <Button variant="contained">
        Visit Page
        </Button>
          </Link>
        </div>
      </div>
    )
  }

  const GetSoloPracticePrompt = () => {
    return (
      <div className="home-page-prompt-subcontainer">
        <div className="home-page-prompt-page-description">
        Visit this page to see your previous tests and practice solo questions.
        </div>
        <div className="home-page-prompt-page-link">
          <Link to={"/testbankpage"}>        <Button variant="contained">
        Visit Page
        </Button></Link>
        </div>
      </div>
    )
  }

  const  GetTeamPracticePrompt = () => {
    return (
      <div className="home-page-prompt-subcontainer">
        <div className="home-page-prompt-page-description">
        Visit this page to create a team and start practicing together!
        </div>
        <div className="home-page-prompt-page-link">
          <Link to={"/teampage"}>        <Button variant="contained">
        Visit Page
        </Button></Link>
        </div>
      </div>
    )
  }

  const  GetCodingPracticePrompt = () => {
    return (
      <div className="home-page-prompt-subcontainer">
        <div className="home-page-prompt-page-description">
        Visit this page to sharpen your coding skills! 
        </div>
        <div className="home-page-prompt-page-link">
          <Link to={"/codeeditorpage"}>        <Button variant="contained">
        Visit Page
        </Button></Link>
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
    // Update the last tab clicked in the Redux store. This ensures that the user is 
    // shown the same tab if they return back to the HomePage.
    updateTab(newValue);
  };

    return (
      <Box sx={{ width: '100%' , height: '100%'}}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', backgroundColor: '#FFDCC6'}}>
          <Tabs value={tabValue} onChange={handleChange} 
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
        {tabValue === 0 && GetProfilePrompt()}
        {tabValue === 1 && GetCommunityPrompt()}
        {tabValue === 2 && GetSoloPracticePrompt()}
        {tabValue === 3 && GetTeamPracticePrompt()}
        {tabValue === 4 && GetCodingPracticePrompt()}
      </div>
    </Box>

    );
  }

  const mapStateToProps = state => ({
    userInfo: state.session.userInformation,
    tabValue: state.session.lastTabClicked,
  });

  const mapActionsToProps = () => ({
    updateTab
  });
  
  export default connect(mapStateToProps, mapActionsToProps())(HomePage)