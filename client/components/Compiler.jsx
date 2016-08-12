import React from 'react';

// Jquery for the material dropdown for language choices
$(document).ready(function () {
  $('select').material_select();
});

class Compiler extends React.Component {
  constructor() {
    super();

    this.state = {
      loader: false,
      run: false,
      answer: '',
    };
  }

  compile(e) {
    e.preventDefault();
    this.setState({
      loader: true,
      run: true,
    });

    const jwtToken = localStorage.getItem('jwtToken');

    const code = document.getElementById('codeToRun').value;
    const lang = document.getElementById('language').value;

    fetch('http://localhost:3030/run', {
      method: 'POST',
      body: JSON.stringify({
        language: lang,
        content: code,
      }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${jwtToken}`,
      },
    })
    .then(res => res.json())
    .then(data => {
      console.log(data.stdout.indexOf('/usr/src/app/'));
      if (data.stdout.indexOf('/usr/src/app/') !== -1) {
        //const SyntaxError = data.stdout.substring(data.stdout.indexOf(','));
        console.log(data.stdout);
        const ErrorLocation = data.stdout.substring(data.stdout.indexOf(',') + 2, data.stdout.indexOf('^') + 1);
        const SyntaxError = data.stdout.substring(data.stdout.indexOf('SyntaxError: '));

        const ErrorMessage = `${SyntaxError} \n ${ErrorLocation}`;
        console.log(ErrorMessage);
      } else {
        this.setState({
          loader: false,
        });

        this.setState({
          answer: data.stdout,
        });

        console.log('success', data.stdout);
      }
    });
  };

  render() {
    return (
      <div>
        {console.log(this.state.loader)}
        <select id="language">
          <option value="" disabled selected>Choose your language</option>
          <option value="node">Javascript</option>
          <option value="python">Python</option>
          <option value="ruby">Ruby</option>
        </select>
        <textarea rows={10} id="codeToRun" type="text" name="code" />
        {
          this.state.loader ? <div className="progress"><div className="indeterminate" /></div> : ''
        }
        {
          this.state.run ? <div className="output">{this.state.answer}</div> : ''
        }
        <button onClick={this.compile.bind(this)}>
          Compile
        </button>
      </div>
    );
  }
};

export default Compiler;
