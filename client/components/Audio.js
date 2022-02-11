import React from "react";

class Audio extends React.Component {
  constructor() {
    super();
    this.state = { text: "pause" };
    this.audioURL =
      "https://storage.googleapis.com/juke-1379.appspot.com/juke-music/Dexter%20Britain/Zenith/02%20The%20Stars%20Are%20Out.mp3";
  }
  useRef() {
    let mySong = document.getElementById("mySong");
    mySong.volume = 0.2
  }

  render() {

    return (
      <div>
        <audio id="mySong" autoPlay={true} loop={true} controls={true} ref={this.useRef}>
          <source src={this.audioURL} type="audio/mp3" />
        </audio>
      </div>
    );
  }
}

export default Audio;

