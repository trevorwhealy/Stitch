import React from 'react';
import { Link } from 'react-router';
import Sidebar from './Sidebar.jsx';
import NotificationDropdown from '../../notifications/components/NotificationDropdown.jsx';
import OverlaySearch from './OverlaySearch.jsx';

const Navbar = () => (
  <div className="NavContainer">
    <Link className="logo" to={{ pathname: '/' }}>
      <img className="appLogo" width="24" alt="logo" src="/assets/images/stitch-logo-new.svg" />
    </Link>
    <div className="sidebar">
      <Sidebar />
    </div>
    <span style={{ flex: 1 }} />
    <div className="widgets">
      <div className="search">
        <OverlaySearch />
      </div>
      <div>
        <NotificationDropdown />
      </div>
    </div>
  </div>
);

export default Navbar;
