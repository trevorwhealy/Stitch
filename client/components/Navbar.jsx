import React from 'react';
import { Link } from 'react-router';
import Sidebar from './Sidebar.jsx';
import DropDown from './DropDown.jsx';

const Navbar = () => (
  <div className="NavContainer">
    <div className="sidebar">
      <Sidebar />
    </div>
    <Link className="logo" to={{ pathname: '/' }}>
      {'Stitch'}
    </Link>
    <div className="alerts">
      <DropDown />
    </div>
  </div>
);

export default Navbar;
