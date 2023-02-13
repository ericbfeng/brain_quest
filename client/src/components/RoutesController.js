import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TestBankPage from './TestBankPage';
import SoloProblemPage from './SoloProblemPage';
import HomePage from './HomePage';
import ProfilePage from './ProfilePage';
import CommunityPage from './CommunityPage';

class RoutesController extends React.Component {
    render() {
      return (
        <BrowserRouter>
            <Routes>    
                <Route path="/" element={<HomePage />} />
                <Route path="/soloproblempage/:questionId" element={<SoloProblemPage/>}/>
                <Route path="/testbankpage/:initialQuestionType?/:initialQuestionSubtype?" element={<TestBankPage/>} />
                <Route path="/profilepage" element={<ProfilePage/>} />
                <Route path="/communitypage" element={<CommunityPage/>} />
            </Routes>
        </BrowserRouter>
      );
    }
  }

export default RoutesController;