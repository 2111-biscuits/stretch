import React from "react";
import { Routes, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import Gallery from "./Gallery";
import LandingPage from "./LandingPage";
import AllArt from "./AllArt"

const Root = () => {
  return (
    <Routes>
      <Route index element={<LandingPage />} />
      <Route path="/gallery" element={<Gallery />} />
      <Route path="/artworks" element={<AllArt />} />
      <Route path="/artworks/:artId" element={<SingleArt />} />
    </Routes>
  );
};

export default Root;
