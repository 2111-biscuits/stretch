import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchAllArt } from "../store/allArt";

class AllArt extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.fetchAllArt();
  }

  render() {
    const allArt = this.props.allArt || [];
    return (
      <div id="allArt">
        <h1>CURRENT EXHIBITION</h1>
        <div className="container">
          {allArt.map((art) => (
            <div className="card" key={art.id}>
              <div className="card-header">
                <div className="card-content">
                  <Link to={`/artworks/${art.id}`}>
                    <img src={art.image} />
                  </Link>
                  <h4>{art.title}</h4>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

const mapState = (state) => ({
  allArt: state.allArt
});
const mapDispatch = (dispatch) => ({
  fetchAllArt: () => dispatch(fetchAllArt())
});

export default connect(mapState, mapDispatch)(AllArt);
