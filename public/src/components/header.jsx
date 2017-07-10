import React from 'react';
import { Link } from 'react-router-dom';

const Header = props => (
  <div className="header">
    <Link className="link header-link home" to="/" >Home</Link>
    <Link className="link header-link results" to="/results">Results</Link>
    <span className="user-info">
    <span className="user-photo">
      <img src={props.user ? props.user.picture : ''} />
    </span>
    </span>
  </div>
);

export default Header;
