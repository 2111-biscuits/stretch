import React, { useEffect } from "react"
import { fetchArt } from "../store";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";



const SingleArt = () => {
  const art = useSelector((state) => state.singleArt);
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchArt(id))
  }, [dispatch])
  // console.log(art)
  console.log(art, "artist")
  // const artist = art.artist
  return (
    <div className="container">
      <img src={art.image} />
        <h4>{art.title}</h4>
        <h4>{art.dimensions}</h4>
        <h4>{art.medium}</h4>
        <h4>{art.yearMade}</h4>
        <h4>{art.description}</h4>
        {/* <h4>{art.artist}</h4> */}

    </div>
  );
};
export default SingleArt;

// const mapState = (state) => ({
//   art: state
// });

// const mapDispatch = (dispatch) => ({
//   fetchArt: (id) => dispatch(fetchArt(id))
// });

// export default connect(mapState, mapDispatch)(SingleArt);
