import React from 'react';
import { Link } from 'react-router-dom';

const Header = props => (
  <div className="navbar-inner header">
    <Link className="link header-link home" to="/" >Home</Link>
    <Link className="link header-link results" to="/results">Results</Link>
    <Link className="link header-link results" to="/" onClick={props.handleLogout} >
      Logout
    </Link>
    <span className="user-info">
      <span>
        <img
          className="img-circle user-photo"
          src={props.user ? props.user.picture : ''}
          alt={props.user ? props.user.name : ''}
        />
      </span>
    </span>
  </div>
);

export default Header;
