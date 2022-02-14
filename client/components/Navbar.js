import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="dropdown">
        <button className="dropbtn">
          <img id="navbar-icon" src="/resources/navbar.png" />
        </button>
        <div className="dropdown-content">
          <Link to="/">Home</Link>
          <Link to="/artworks">Current Exhibition</Link>
          <Link to="/aboutUs">About Us</Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
