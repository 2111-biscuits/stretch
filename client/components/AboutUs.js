import React, { Component } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

const creatorInfo = [
  {
    id: 1,
    name: "Cara Dodge",
    imageURL: "resources/cara.png",
    linkedInURL: "https://www.linkedin.com/in/cara-dodge/",
    githubURL: "https://github.com/shxpxshxftxr",
  },
  {
    id: 2,
    name: "Nicole DeSantis",
    imageURL: "resources/nicole.png",
    linkedInURL: "https://www.linkedin.com/in/nicole-desantis/",
    githubURL: "https://github.com/NicoDesa13",
  },
  {
    id: 3,
    name: "Lucy Blagg",
    imageURL: "resources/lucy.png",
    linkedInURL: "https://www.linkedin.com/in/lucy-blagg/",
    githubURL: "https://github.com/lublagg",
  },
  {
    id: 4,
    name: "Yooboo Park",
    imageURL: "resources/yooboo.png",
    linkedInURL: "https://www.linkedin.com/in/yooboopark/",
    githubURL: "https://github.com/arihu1008",
  },
];
const techStack = [
  {
    id: 1,
    name: "nodejs",
    imageURL: "resources/logos/nodejsLogo.png",
  },
  {
    id: 2,
    name: "express",
    imageURL: "resources/logos/expressLogo.png",
  },
  {
    id: 3,
    name: "react",
    imageURL: "resources/logos/reactLogo.png",
  },
  {
    id: 4,
    name: "redux",
    imageURL: "resources/logos/reduxLogo.png",
  },
  {
    id: 5,
    name: "threejs",
    imageURL: "resources/logos/threejsLogo.png",
  },
  {
    id: 6,
    name: "postgreSQL",
    imageURL: "resources/logos/postgresqlLogo.png",
  },
  {
    id: 7,
    name: "blender",
    imageURL: "resources/logos/blenderLogo.png",
  },
];
class AboutUs extends Component {
  constructor() {
    super();
    this.state = {
      info: creatorInfo,
      tech: techStack,
    };
  }

  render() {
    const { info, tech } = this.state;
    return (
      <div className="aboutUs">
        <Navbar />
        <h2>Creators</h2>
        <div className="people">
          {info.map((creator) => (
            <div className="person" key={creator.id}>
              <div className="img-container">
                <img src={creator.imageURL} />
              </div>
              <div className="credits">
                <h4>{creator.name}</h4>
                <div className="links">
                  <a href={creator.linkedInURL}>
                    <img
                      className="logo"
                      src="resources/logos/linkedinLogo.png"
                    />
                  </a>
                  <a href={creator.githubURL}>
                    <img
                      className="logo"
                      src="resources/logos/githubLogo.png"
                    />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
        <a id="githubLink" href="https://github.com/2111-biscuits/stretch">
          <h4>Check out our Github repository</h4>
        </a>
        <div className="techStack">
          {tech.map((logo) => (
            <div className="logo-container" key={logo.id}>
              <img src={logo.imageURL} />
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default AboutUs;
{
  /* <div className="credits">
                <h4>{creator.name}</h4>
                <div className="links">
                  <a href={creator.linkedInURL}>
                    <img className="logo" src="resources/logos/linkedinLogo.png" />
                  </a>
                  <a href={creator.githubURL}>
                    <img className="logo" src="resources/logos/githubLogo.png" />
                  </a>
                </div>
              </div> */
}
