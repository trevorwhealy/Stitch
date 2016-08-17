import React from 'react';
import { Link } from 'react-router';
import Sidebar from './Sidebar.jsx';

const Navbar = () => (
  <div className="NavContainer">
    <div className="sidebar">
      <Sidebar />
    </div>
    <Link className="logo" to={{ pathname: '/' }}>
      {'Stitch'}
    </Link>
    <div className="alerts">
      <i className="material-icons">notifications</i>
    </div>
  </div>
);

export default Navbar;
