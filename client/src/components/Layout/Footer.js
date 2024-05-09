import React from "react";
import Layout from "./Layout";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="footer">
      <h4 className="text-center">All right Reserverd &copy; Swapnanil</h4>
      <div className="text-center mt-3">
        <Link to="/about">About</Link> ||
        <Link to="/contact">Contact</Link> ||
        <Link to="/policy">Privacy Policy</Link>
      </div>
    </div>
  );
};

export default Footer;
