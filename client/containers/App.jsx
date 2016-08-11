import React from 'react';
import { Link } from 'react-router';

import Sidebar from '../components/Sidebar.jsx';

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    $('.button-collapse').sideNav({
      menuWidth: 300,
      edge: 'left',
      closeOnClick: true
    });
  }

  render() {
    return (
      <div>
        <Sidebar />
        <a href="#" data-activates="slide-out" className="button-collapse">
          <i className="material-icons">menu</i>
        </a>
        <h1>Homepages</h1>
        <ul>
          <li><Link to="/login">Login</Link></li>
        </ul>
        {this.props.children}
      </div>
    );
  }
}
