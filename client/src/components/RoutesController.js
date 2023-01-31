import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

class RoutesController extends React.Component {
    // The idea would be to make components / pages and have routes.
    // The user would be able to navigate between routes by using <Link>
    // Example: There might be a link that says "profile".
    render() {
      return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<div> Home Page </div>} />
            </Routes>
        </BrowserRouter>
      );
    }
  }

export default RoutesController;