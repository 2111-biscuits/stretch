import React from "react";

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
          <button id="enter-button" onClick={() => console.log("hello")}>
            Enter
          </button>
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
