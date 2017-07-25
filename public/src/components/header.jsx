import React from 'react';
import { Link } from 'react-router-dom';
import Hamburger from './hamburger.jsx';

const Header = ({ handleLogout, user, toggleSideMenu }) => (
  <nav className="navbar navbar-inverse header">
    <div className="container-fluid">
      <div className="navbar-header">
        <ul className="nav navbar-nav">
          <li>
            <Hamburger toggleSideMenu={toggleSideMenu} />
          </li>
          <li>
            <Link to="/" >
              Home
            </Link>
          </li>
          <li>
            <Link to="/dashboard">
              Dashboard
            </Link>
          </li>
          <li>
            <Link to="/results">
              Results
            </Link>
          </li>
          <li>
            <Link to="/search">
              Search
            </Link>
          </li>
          <li>
            <Link to="/launchpad">
              LaunchPad
            </Link>
          </li>
          <li>
            <Link to="/movienight">
              Movie Night
            </Link>
          </li>
          <li>
            <Link to="/" onClick={handleLogout}>
              Logout
            </Link>
          </li>
        </ul>
      </div>
      { user &&
        (<span className="user-info pull-right">
          <img
            className="img-circle user-photo"
            src={user ? user.picture : ''}
            alt={user ? user.name : ''}
          />
          <span className="user-name pull-right">
            {user ? user.name : ''}
          </span>
        </span>)
      }
    </div>
  </nav>
);

export default Header;
