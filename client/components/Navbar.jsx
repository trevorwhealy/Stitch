import React from 'react';
import Sidebar from './Sidebar.jsx';

const Navbar = () => (
  <div className="NavContainer">
    <div className="sidebar">
      <Sidebar />
    </div>
    <div className="logo">
      {'Stitch'}
    </div>
    <div className="alerts">
      <i className="material-icons">notifications</i>
    </div>
  </div>
);

export default Navbar;
