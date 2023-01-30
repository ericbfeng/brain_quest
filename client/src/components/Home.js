import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TopBar from './TopBar';

class Home extends React.Component {
    // The idea would be to make components / pages and have routes.
    // The user would be able to navigate between routes by using <Link>
    // Example: There might be a link that says "profile".
    render() {
      return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<div> <TopBar /> Home Page </div>} />
            </Routes>
        </BrowserRouter>
      );
    }
  }

export default Home;