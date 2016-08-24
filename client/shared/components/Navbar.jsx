import React from 'react';
import { Link } from 'react-router';
import Sidebar from './Sidebar.jsx';
import DropDown from './DropDown.jsx';
import OverlaySearch from './OverlaySearch.jsx';

const Navbar = () => (
  <div className="NavContainer">
    <div className="sidebar">
      <Sidebar />
    </div>
    <Link className="logo" to={{ pathname: '/' }}>
      {'Stitch'}
    </Link>
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
