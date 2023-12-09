import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";
import logo from "../../assets/logo.png";

const Navbar = () => {
  return (
    <nav className="navbar">
      <NavLink to="/">
        <img src={logo} alt="Company Logo" className="logo" />
      </NavLink>
    </nav>
  );
};

export default Navbar;
