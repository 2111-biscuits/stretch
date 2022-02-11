import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div class="navbar">
      <div class="dropdown">
        <button class="dropbtn">About</button>
        <div class="dropdown-content">
          <Link to="/artworks">Current Exhibition</Link>
          <Link to="/aboutUs">Our Team</Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
