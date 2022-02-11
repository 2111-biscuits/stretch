import React, { useEffect, useState } from "react";
import axios from "axios";
import { fetchArt } from "../store";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

const SingleArt = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchArt(id));
  }, [dispatch]);
  const art = useSelector((state) => state.singleArt);

  const artist = art.artist || [];

  return (
    <div className="singleArt">
    <h1>{art.title}</h1>
    <div className="soloArtPiece" key={art.id}>
      <img src={art.image} />
      <div className="artInfo">
      <h4>{artist.name}</h4>
      <h4>{art.yearMade}</h4>
      <h4>{art.medium}</h4>
      <h4>{art.dimensions}</h4>
      <h4>DESCRIPTION: {art.description}</h4>
      <h4>BIO: {artist.bio}</h4>
      <a href={artist.website}><h4>{artist.website}</h4></a>
      </div>
    </div>
    </div>
  );
};
export default SingleArt;


// <div className="container">
//   {allArt.map((art) => (
//     <div className="card" key={art.id}>
//       <div className="card-header">
//         <div className="card-content">
//           <Link to={`/artworks/${art.id}`}>
//             <img src={art.image} />
//           </Link>
//           <h4>{art.title}</h4>
//         </div>
