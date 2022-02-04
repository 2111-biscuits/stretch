import React from "react";
import { Link, useHistory } from "react-router-dom";

class LandingPage extends React.Component {
  render() {
    return (
      <div id="landing">

        <div id="top">
          <h1>Galleria</h1>
        </div>

        <div>
        <Link to="/gallery">
            <button id="enter-button">ENTER</button>
          </Link>
          </div>

        <div id="bottom">
          <h4 id="dates">JAN 26 - FEB 18 2022</h4>




          <h4 id="artists">
            Featuring the works of Lucy Blaggs, Nicole DeSantis, Yooboo Park,
            Cara Dodge, and German Caceres
          </h4>
        </div>

      </div>
    );
  }
}

export default LandingPage;
