import React from "react";
import { Link, useHistory } from "react-router-dom";

class LandingPage extends React.Component {
  render() {
    return (
      <div id="landing">
        <div id="header"></div>
        <div id="top">
          <h3>Artist Name</h3>
          <h3>Artist Name</h3>
          <h3>Artist Name</h3>
          <h3>Artist Name</h3>
          <h3>Artist Name</h3>
          <h3>Artist Name</h3>
        </div>
        <div id="bottom">
          <h1>Name of Exhibit</h1>
          <Link to="/gallery">
            <button id="enter-button">Enter</button>
          </Link>
          <div id="dates">
            <h4>JAN 28 - MAR 14 2022</h4>
          </div>
        </div>
        <div id="footer">
          <div id="left"></div>
          <div id="right"></div>
        </div>
      </div>
    );
  }
}

export default LandingPage;
