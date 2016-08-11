import React from 'react';
import Sidebar from '../components/Sidebar.jsx';

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    $('.button-collapse').sideNav({
      menuWidth: 300,
      edge: 'left',
      closeOnClick: true,
    });
  }

  render() {
    return (
      <div>
        <Sidebar />
        {this.props.children}
      </div>
    );
  }
}
