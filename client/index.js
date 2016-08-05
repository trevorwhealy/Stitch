import React from 'react';
import { render } from 'react-dom';

class App extends React.Component {
  constructor() {
    super();
    console.log('hi');
  }

  render() {
    return (
      <div>
        hello
      </div>

    );
  }
}

render(<App />, document.getElementById('app'));
