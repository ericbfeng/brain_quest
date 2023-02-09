import React from "react";
import {Link} from "react-router-dom";

export default function HomePage() {  
    return (
      <div>
        This is the HomePage.
        <br></br>
        There will be a navigation bar on the top to different pages.
        <br></br>
        In the meantime here is links to existing pages:
        <br></br> 
        <Link to="/testbankpage">TestBankPage</Link>
        <br></br>
        <Link to="/profilepage">ProfilePage</Link>
      </div>
    );
  }