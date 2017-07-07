import React from 'react';
import { Link } from 'react-router-dom';

const Header = props => (
  <div className="header">
    This is the header
    <Link to="/" >Home</Link>
    <Link to="/results" >User Options</Link>
  </div>
);

export default Header;