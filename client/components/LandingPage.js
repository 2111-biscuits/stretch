import React from "react";
import { Link, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { setOrbColor } from "../store/filter";
import Navbar from "./Navbar";

class LandingPage extends React.Component {
  render() {
    return (
      <div id="bg">
        <div id="landing">
          <Navbar />
          <div id="top">
            <h1>Galleria</h1>
          </div>

          <div className="orb-selector">
            Pick an Orb:{" "}
            <select onChange={(event) => this.props.setOrb(event.target.value)}>
              <option value="default">Default Orb</option>
              <option className="skyblue" value="skyblue">
                Sky Blue
              </option>
              <option className="darkorchid" value="darkorchid">
                Dark Orchid
              </option>
              <option className="lightpink" value="lightpink">
                Pink Ice
              </option>
              <option className="crimson" value="crimson">
                Crimson
              </option>
              <option className="darkorange" value="darkorange">
                Flaming Hot Cheeto
              </option>
              <option className="gold" value="gold">
                Golden Snitch
              </option>
              <option className="limegreen" value="limegreen">
                Lime Green
              </option>
              <option className="turquoise" value="turquoise">
                Turquoise
              </option>
            </select>
          </div>

          <div id="middle">
            <Link to="/gallery">
              <button id="enter-button">ENTER</button>
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

const mapState = (state) => {
  return {
    orbColor: state.filter,
  };
};

const mapDispatch = (dispatch) => {
  return {
    setOrb: (color) => dispatch(setOrbColor(color)),
  };
};

export default connect(mapState, mapDispatch)(LandingPage);
