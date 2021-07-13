import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <nav className="navbar navbar-expand navbar-dark bg-info">
      <Link to="/" className="navbar-brand ms-4 fs-3">
        StreamISH
      </Link>
      <ul className="navbar-nav mr-auto">
        <li className="nav-item">
          <Link to="/" className="nav-link fs-4">
            Feed
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/videos/add" className="nav-link fs-4">
            New Video
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Header;
