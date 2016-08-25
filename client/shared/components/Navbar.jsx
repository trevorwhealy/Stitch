import React from 'react';
import { Link } from 'react-router';
import Sidebar from './Sidebar.jsx';
import DropDown from './DropDown.jsx';
import OverlaySearch from './OverlaySearch.jsx';

const Navbar = () => (
  <div className="NavContainer">
    <Link className="logo" to={{ pathname: '/' }}>
      <img className="appLogo" alt="logo" src="/assets/images/stitch-logo.svg" />
    </Link>
    <div className="sidebar">
      <Sidebar />
    </div>
    <span style={{ flex: 1 }} />
    <div className="widgets">
      <div className="search">
        <OverlaySearch />
      </div>
      <div className="alerts">
        <DropDown />
      </div>
    </div>
  </div>
);

export default Navbar;
