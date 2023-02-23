import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TestBankPage from './TestBankPage';
import SoloProblemPage from './SoloProblemPage';
import HomePage from './HomePage';
import ProfilePage from './ProfilePage';
import CodeEditorPage from './CodeEditorPage'
import CommunityPage from './CommunityPage';
import TeamPage from './TeamPage';

import { io } from 'socket.io-client';
const socket = io('http://localhost:5000');

class RoutesController extends React.Component {
    render() {
      return (
        <BrowserRouter>
            <Routes>    
                <Route path="/" element={<HomePage />} />
                <Route path="/soloproblempage/:questionId" element={<SoloProblemPage/>}/>
                <Route path="/testbankpage/:initialQuestionType?/:initialQuestionSubtype?" element={<TestBankPage/>} />
                <Route path="/profilepage/:pageUsername" element={<ProfilePage/>} />
                <Route path="/communitypage" element={<CommunityPage socket={socket}/>} />
                <Route path="/teampage" element={<TeamPage socket={socket}/>} />
                <Route path="/codeeditorpage" element={<CodeEditorPage />} />
            </Routes>
        </BrowserRouter>
      );
    }
  }

export default RoutesController;