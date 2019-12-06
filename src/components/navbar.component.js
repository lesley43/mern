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
            <li>
              <NavLink to="/event" className="nav-link">Calendar</NavLink>
            </li>
            <li>
              {!user && (
                <React.Fragment>
                  <NavLink className="nav-item nav-link" to="/login">
                    Login
                  </NavLink>
                  <NavLink className="nav-item nav-link" to="/register">
                    Register
                  </NavLink>
                </React.Fragment>
              )}
            </li>
            <li>
              {user && (
                <React.Fragment>
                  <NavLink className="nav-item nav-link" to="/profile">
                    {user.name}
                  </NavLink>
                  <NavLink className="nav-item nav-link" to="/logout">
                    Logout
                  </NavLink>
                </React.Fragment>
              )}   
            </li> 
          </ul>
        </div>
      </nav>
    )
}

export default Navbar;
