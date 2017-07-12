import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ handleLogout, user }) => (
  <nav className="navbar navbar-inverse ">
    <div className="container-fluid">
      <div className="navbar-header">
        <ul className="nav navbar-nav">
          <li>
            <span className="glyphicon glyphicon-menu-hamburger header-icon" />
          </li>
          <li>
            <Link to="/" >
              Home
            </Link>
          </li>
          <li>
            <Link to="/results">
              Results
            </Link>
          </li>
          <li>
            <Link to="/teach">
              Teach
            </Link>
          </li>
          <li>
            <Link to="/" onClick={handleLogout}>
              Logout
            </Link>
          </li>
        </ul>
      </div>
      <span className="user-info pull-right">
        <img
          className="img-circle user-photo"
          src={user ? user.picture : ''}
         alt={user ? user.name : '' }
        />
        <span className="pull-right">
          {user ? user.name : ''}
        </span>
      </span>
    </div>
  </nav>
);

export default Header;


/*
<img
  className="img-circle user-photo pull-right"
  src="https://lh4.googleusercontent.com/-QpbHKV1gzhM/AAAAAAAAAAI/AAAAAAAAIn4/ow5QMLq7VFI/photo.jpg?sz=50"
/>

<img
  className="img-circle user-photo"
  src={props.user ? props.user.picture : ''}
 alt={props.user ? props.user.name : '' }
/>

<div className="navbar-inner header">
    <span className="glyphicon glyphicon-menu-hamburger header-icon" />
    <span className="btn-group" role="group" >
      <Link className="link header-link home" to="/" >
        <button type="button" className="btn btn-default">Home</button>
      </Link>
      <Link className="link header-link results" to="/results">
        <button type="button" className="btn btn-default">Results</button>
      </Link>
      <Link className="link header-link results" to="/" onClick={props.handleLogout} >
        Logout
      </Link>
    </span>
    <span className="user-info">
      <img
        className="img-circle user-photo pull-right"
        src={props.user ? props.user.picture : ''}
        alt={props.user ? props.user.name : '' }
      />
      <span className="pull-right">
        {props.user ? props.user.name : ''}
      </span>
    </span>
  </div>

<img
  className="img-circle user-photo pull-right"
  src="https://lh4.googleusercontent.com/-QpbHKV1gzhM/AAAAAAAAAAI/AAAAAAAAIn4/ow5QMLq7VFI/photo.jpg?sz=50"
/>

<img
  className="img-circle user-photo"
  src={props.user ? props.user.picture : ''}
 alt={props.user ? props.user.name : '' }
/>

<button type="button" className="btn btn-default btn-lg">
  <span className="glyphicon glyphicon-star" aria-hidden="true"></span> Star
</button>

*/



