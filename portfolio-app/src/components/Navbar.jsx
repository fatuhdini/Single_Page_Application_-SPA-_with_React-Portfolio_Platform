import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

/**
 * Navbar — top-level navigation bar.
 * Highlights the active route using react-router's useLocation hook.
 */
function Navbar() {
  const { pathname } = useLocation();

  return (
    <nav className="navbar" role="navigation" aria-label="Main navigation">
      <Link to="/" className="navbar__brand">
        <span className="navbar__brand-dot" aria-hidden="true" />
        Créatif Studio
      </Link>

      <ul className="navbar__links">
        <li>
          <Link
            to="/"
            className={`navbar__link ${pathname === "/" ? "navbar__link--active" : ""}`}
          >
            Portfolio
          </Link>
        </li>
        <li>
          <Link
            to="/add"
            className={`navbar__link ${pathname === "/add" ? "navbar__link--active" : ""}`}
          >
            Add Project
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
