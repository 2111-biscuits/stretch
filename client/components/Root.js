import React from "react";
import { Routes, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import Gallery from "./Gallery";
import LandingPage from "./LandingPage";

const Root = () => {
  return (
    <div>
      <nav>
        <Link to="/">Home</Link>
      </nav>
      <main>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/gallery" element={<Gallery />} />
        </Routes>
      </main>
    </div>
  );
};

export default Root;
