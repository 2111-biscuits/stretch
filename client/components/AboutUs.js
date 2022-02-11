import React, { Component } from "react"
import { Link } from "react-router-dom";

const creatorInfo = [
  {
    id: 1, name: "Cara Dodge", imageURL: "resources/plumber_cara.PNG", linkedInURL: "https://www.linkedin.com/in/cara-dodge/", githubURL:
      "https://github.com/shxpxshxftxr"
  },
  {
    id: 2, name: "Nicole DeSantis", imageURL: "resources/Nicole.jpg", linkedInURL: "https://www.linkedin.com/in/nicole-desantis/", githubURL:
      "https://github.com/NicoDesa13"
  },
  {
    id: 3,
    name: "Lucy Blagg", imageURL: "resources/Lucy.jpg", linkedInURL: "https://www.linkedin.com/in/lucy-blagg/", githubURL:
      "https://github.com/lublagg"
  },
  {
    id: 4,
    name: "Yooboo Park", imageURL: "resources/Yooboo.jpeg", linkedInURL: "https://www.linkedin.com/in/yooboopark/", githubURL:
      "https://github.com/arihu1008"
  }
]
class AboutUs extends Component {
  constructor() {
    super()
    this.state = {
      info: creatorInfo,
    }
  }

  render() {
    const { info } = this.state
    return (
      <div className="container">
        {info.map((creator) => (
          <div className="card" key={creator.id}>
            <div className="card-header">
              <div className="card-content">
                <img src={creator.imageURL} />
                <h4>{creator.name}</h4>
                <a href={creator.linkedInURL}>
                  <img src="resources/linkedinLogo.png" className="linkedinIcon" />
                </a>
                <a href={creator.githubURL}>
                  <img src="resources/githubLogo.png" className="githubIcon" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default AboutUs;
