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

				heyasdfsa can you hear me now?

			</div>

		);
	}
}

render(<App />, document.getElementById('app'));