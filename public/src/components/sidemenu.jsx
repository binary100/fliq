import React from 'react';
import { Link } from 'react-router-dom';

const baseClass = 'sidemenu';
const showClass = 'sidemenu-active';

const SideMenu = ({ showMenu }) => {

  return (
    <div className={`${baseClass} ${(showMenu ? showClass : '')}`}>
      <ul>
        <li>
          <Link to="/dashboard">
            Dashboard
          </Link>
        </li>
        <li>
          <Link to="/">
            Logout
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default SideMenu;
