import React, { useEffect, useState } from "react";
import axios from "axios";
import { fetchArt } from "../store";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Navbar from "./Navbar";

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
      <div id="top">
        <Navbar />
        <h1>{art.title}</h1>
      </div>
      <div className="soloArtPiece" key={art.id}>
        <img src={art.image} />
        <div className="artInfo">
          <p>{artist.name}</p>
          <p>{art.yearMade}</p>
          <p>{art.medium}</p>
          <p>{art.dimensions}</p>
          <p>DESCRIPTION: {art.description}</p>
          <p>BIO: {artist.bio}</p>
          <a href={artist.website}>{artist.website}</a>
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
