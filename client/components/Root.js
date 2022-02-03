import React from "react";
import { Routes, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import Gallery from "./Gallery";
import LandingPage from "./LandingPage";

const Root = () => {
  return (
    <Routes>
      <Route index element={<LandingPage />} />
      <Route path="/gallery" element={<Gallery />} />
    </Routes>
  );
};

export default Root;
