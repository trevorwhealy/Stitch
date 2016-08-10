import React from 'react';
import { Link } from 'react-router'

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <h1>Homepages</h1>
        <ul>
          <li><Link to="/login">Login</Link></li>
        </ul>
        {this.props.children}
      </div>
    );
  }
}
