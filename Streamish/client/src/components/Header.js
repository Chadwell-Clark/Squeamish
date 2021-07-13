import React from "react";
import { Link } from "react-router-dom";
import { logout } from "../modules/authManager";

const Header = ({ isLoggedIn }) => {
  return (
    <nav className="navbar navbar-expand navbar-dark bg-info">
      <Link to="/" className="navbar-brand ms-4 fs-3">
        StreamISH
      </Link>
      {isLoggedIn && (
        <>
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
            <li className="nav-item">
              <Link onClick={logout} to="/login" className="nav-link fs-4">
                Logout
              </Link>
            </li>
          </ul>
        </>
      )}
      {!isLoggedIn && (
        <>
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link className="nav-link fs-4" to="/login">
                Login
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link fs-4" to="/register">
                Register
              </Link>
            </li>
          </ul>
        </>
      )}
    </nav>
  );
};

export default Header;
