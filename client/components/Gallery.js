import React from "react";
import Audio from "./Audio.js";
import { Link } from "react-router-dom";
import { socket } from "../socket";
import World from "../scripts/scene.js";

class Gallery extends React.Component {
  componentDidMount() {
    let reference = this.mount;
    new World(reference);
  }

  render() {
    return (
      <div id="gallery">
        <div id="navbar">
          <Audio />
          <span className="movement-directions">
            use arrow keys to move | click objects to learn more
          </span>
          <Link to="/">
            <button
              id="exit-button"
              onClick={() => {
                socket.emit("leaveGallery");
              }}
            >
              Exit
            </button>
          </Link>
        </div>
        <div id="3dworld" ref={(ref) => (this.mount = ref)}></div>
      </div>
    );
  }
}

export default Gallery;
