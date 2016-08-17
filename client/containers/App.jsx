import React from 'react';
import Navbar from '../components/Navbar.jsx';

export default class App extends React.Component {

  componentDidMount() {
    $('.button-collapse').sideNav({
      menuWidth: 300,
      edge: 'left',
      closeOnClick: true,
    });

    $('.modal-trigger').leanModal();
  }

  render() {
    return (
      <div className="EntirePage">
        <Navbar />
        {this.props.children}
      </div>
    );
  }
}
