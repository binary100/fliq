import React from 'react';
import { Link } from 'react-router-dom';

const baseClass = 'sidemenu';
const showClass = 'sidemenu-active';

const SideMenu = ({ closeSideMenu, handleLogout, showMenu }) => (
  <div className={`${baseClass} ${(showMenu ? showClass : '')}`}>
    <ul>
      <li>
        <span onClick={closeSideMenu}>
          <Link to="/dashboard">
            Dashboard
          </Link>
        </span>
      </li>
      <li>
        <span onClick={() => { handleLogout(); closeSideMenu(); }}>
          <Link to="/">
            Logout
          </Link>
        </span>
      </li>
    </ul>
  </div>
);

export default SideMenu;
