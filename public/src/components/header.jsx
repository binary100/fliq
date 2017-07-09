import React from 'react';
import { Link } from 'react-router-dom';

const Header = props => (
  <div className="header">
    <Link className="link home" to="/" >Home</Link>
    <Link className="link results" to="/results">Results</Link>
  </div>
);

export default Header;
