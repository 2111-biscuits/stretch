import React from "react";
import { Link, useHistory } from "react-router-dom";
import { socket } from "../socket";

class LandingPage extends React.Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    socket.emit("enter");
  }

  render() {
    return (
      <div id="bg">
        <div id="landing">
          <div id="top">
            <h1>Galleria</h1>
          </div>

          <div id="middle">
            <Link to="/gallery">
              <button id="enter-button" onClick={this.handleClick}>
                ENTER
              </button>
            </Link>
          </div>

          <div id="bottom">
            <h4 id="dates">JAN 26 - FEB 18 2022</h4>

            <h4 id="artists">
              Featuring the works of Lucy Blagg, Nicole DeSantis, Yooboo Park,
              Cara Dodge, and German Caceres
            </h4>
          </div>
        </div>
      </div>
    );
  }
}

export default LandingPage;
