import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchArt } from "../store";
import { Link, useParams } from "react-router-dom";


// function Child() {
//   //We can use the `useParams` hook here to access
//   // the dynamic pieces of the URL.
//   let { id } = useParams();

//   return (
//     <div>
//       <h2>Item ID: {id}</h2>
//     </div>
//   );
// }

class SingleArt extends React.Component {

  componentDidMount() {
    // this.props.fetchArt(this.props.match.params.id);
    const {id} = useParams()
    console.log(id)
    // console.log(this.props)
  }
  render() {

    return (
      <div className="container">
        {/* <img src={art.image} />
        <h4>{art.title}</h4>
        <h4>{art.dimensions}</h4>
        <h4>{art.medium}</h4>
        <h4>{art.yearMade}</h4>
        <h4>{art.description}</h4> */}
      </div>
    );
  }
}

const mapState = (state) => ({
  art: state
});

const mapDispatch = (dispatch) => ({
  fetchArt: (id) => dispatch(fetchArt(id))
});

export default connect(mapState, mapDispatch)(SingleArt);
