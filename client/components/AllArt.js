import React, { Component } from "react";
import { Link } from "react-router-dom"
import { connect } from "react-redux"
import { fetchAllArt } from "../store/allArt"

class AllArt extends Component {

  componentDidMount() {
    this.props.fetchAllArt();
    console.log(this.props)
  }

  render() {
    const allArt = this.props.allArt || [];
    return (
      <div className="container">
        {allArt.map((art) => (
          <div className="card" key={art.id}>
            <div className="card-header">
              <div className="card-content">
                <Link to={`/allArt/${art.id}`}>
                  <img src={art.image} />
                </Link>
                <h4>{art.name}</h4>
                <h4>{art.artistId}</h4>
                <h4>{art.year}</h4>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}


const mapState = (state) => ({
  allArt: state.allArt,
});
const mapDispatch = (dispatch) => ({
  fetchAllArt: () => dispatch(fetchAllArt())
});


export default connect(mapState, mapDispatch)(AllArt);
