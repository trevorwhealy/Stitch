import React from 'react';
import { render } from 'react-dom';

class App extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        hello whats up dude
      </div>

    );
  }
}

render(<App />, document.getElementById('app'));
