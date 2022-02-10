import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchArt } from '../store';
import { Link } from 'react-router-dom';

class SingleArt extends Component {
  componentDidMount() {
    const artId = this.props.match.params.artId;
    this.props.fetchArt(artId);
  }
  render() {
    const { art } = this.props || {};
    return (
      <div className="container">
        {allArt.map((art) => (
          <div className="card" key={art.id}>
            <div className="card-header">
              <div className="card-content">
                <img src={art.image} />
                <h4>{art.name}</h4>
                <h4>{art.dimensions}</h4>
                <h4>{art.medium}</h4>
                <h4>{art.year}</h4>
                <h4>{art.description}</h4>
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }
}

const mapState = (state) => ({
  art: state.art,
});

const mapDispatch = (dispatch, { history }) => ({
  fetchArt: (id) => dispatch(fetchArt(id)),
});

export default connect(mapState, mapDispatch)(SingleArt);

