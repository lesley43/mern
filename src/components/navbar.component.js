import React from 'react';
import { Link, NavLink } from "react-router-dom";

const Navbar = ({ user }) => {
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <Link to="/" className="navbar-brand">The Pocket Plot</Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav mr-auto">
            <li className="navbar-item">
              <NavLink to="/crops" className="nav-link">Crops</NavLink>
            </li>
            <li className="navbar-item">
              <NavLink to="/create" className="nav-link">Create Crop</NavLink>
            </li>
            <li className="navbar-item">
              <Link to="/plot" className="nav-link">Plot</Link>
            </li>
            <li>
              <NavLink to="/event" className="nav-link">Calendar</NavLink>
            </li>
            <li>
              <Link to="/plotbutton" className="nav-link">Plot Button</Link>
            </li>
          </ul>
        </div>
      </nav>
    )
}

export default Navbar;
