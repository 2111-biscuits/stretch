import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div class="navbar">
      <div class="dropdown">
        <button class="dropbtn">
          <img id="navbar-icon" src="/resources/navbar.png" />
        </button>
        <div class="dropdown-content">
          <Link to="/">Home</Link>
          <Link to="/artworks">Current Exhibition</Link>
          <Link to="/aboutUs">About Us</Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
