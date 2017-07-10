import React from 'react';
import { Link } from 'react-router-dom';

const Header = props => (
  <div className="navbar-inner header">
    <Link className="link header-link home" to="/" >Home</Link>
    <Link className="link header-link results" to="/results">Results</Link>
    <span className="user-info">
      <span>
        <img
          className="img-circle user-photo"
          src="https://lh4.googleusercontent.com/-QpbHKV1gzhM/AAAAAAAAAAI/AAAAAAAAIn4/ow5QMLq7VFI/photo.jpg?sz=50"
        />
      </span>
    </span>
  </div>
);
//<img src={props.user ? props.user.picture : ''} />
export default Header;
