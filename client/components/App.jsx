import React from 'react';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      username: 'Sunny is my name',
      age: 23,
    };
  }

  render() {
    return (
      <div>
        {this.state.username}
      </div>
    );
  }
}
