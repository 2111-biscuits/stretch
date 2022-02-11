import React from "react";
import { Routes, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import Gallery from "./Gallery";
import LandingPage from "./LandingPage";
import AllArt from "./AllArt"
import SingleArt from "./SingleArt"
import AboutUs from "./AboutUs";

const Root = () => {
  return (
    <Routes>
      <Route index element={<LandingPage />} />
      <Route path="/gallery" element={<Gallery />} />
      <Route path="/artworks" element={<AllArt />} />
      <Route path="/artworks/:artId" element={<SingleArt />} />
      <Route path="/aboutUs" element={<AboutUs />} />
    </Routes>
  );
};

export default Root;
