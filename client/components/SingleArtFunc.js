import React, { useEffect, useState } from "react"
import axios from "axios"
import { fetchArt } from "../store";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";



const SingleArt = () => {

  const dispatch = useDispatch();
  const { id } = useParams();


  useEffect(() => {
    dispatch(fetchArt(id))
  }, [dispatch])
  const art = useSelector((state) => state.singleArt);

  const artist = art.artist || []
console.log(art, "art")
 const image = art.image || []

  return (

    <div className="container">
      <img src={art.image}  />
        <h4>{art.title}</h4>
        <h4>{art.dimensions}</h4>
        <h4>{art.medium}</h4>
        <h4>{art.yearMade}</h4>
        <h4>{art.description}</h4>
        <h4>{artist.name}</h4>
        <h4>{artist.bio}</h4>
        <h4>{artist.website}</h4>

    </div>
  );
};
export default SingleArt;


