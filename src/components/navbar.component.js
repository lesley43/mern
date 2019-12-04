import React from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends React.Component {
  render() {
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <Link to="/" className="navbar-brand">The Pocket Plot</Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav mr-auto">
            <li className="navbar-item">
              <Link to="/" className="nav-link">Crops</Link>
            </li>
            <li className="navbar-item">
              <Link to="/create" className="nav-link">Create Crop</Link>
            </li>
            <li>
              <Link to="/event" className="nav-link">Create Event</Link>
            </li>
          </ul>
        </div>
      </nav>
    )
  }
}