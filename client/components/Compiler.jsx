import React from 'react';
import compilerAPI from '../config';

class Compiler extends React.Component {
  constructor() {
    super();

    this.state = {
      loader: false,
      run: false,
      answer: '',
      languages: ['python', 'ruby', 'javascript'],
    };
  }

  componentDidMount() {
    $('select').material_select();
  }

  compile(e) {
    e.preventDefault();
    const code = document.getElementById('codeToRun').value;
    let lang = document.getElementById('language').value;

    // If no code typed, or no language selected, do not compile
    if (code.length < 1 || lang.length < 1) {
      this.setState({
        answer: '',
      });
      return;
    }

    // Convert JS to node
    if (lang === 'javascript') {
      lang = 'node';
    }

    this.setState({
      loader: true,
      run: true,
    });

    const jwtToken = localStorage.getItem('jwtToken');

    fetch(compilerAPI.endPoint, {
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
      const ErrorLocation = data.stdout.substring(data.stdout.indexOf(',') + 2, data.stdout.indexOf('^') + 1);
      const SyntaxError = data.stdout.substring(data.stdout.indexOf('SyntaxError: '));
      const ErrorMessage = `${SyntaxError} \n ${ErrorLocation}`;
      console.log('error msg', ErrorMessage);

      this.setState({
        loader: false,
      });

      this.setState({
        answer: data.stdout,
      });

      console.log('success', data.stdout);
    });
  }

  render() {
    return (
      <div className="compilerContainer">
        {console.log(this.state.loader)}
        <select id="language">
          <option value="" disabled selected>Choose your language</option>
          {this.state.languages.map(language => {
            return (
              <option value={`${language}`}>{language}</option>
            );
          })}
        </select>
        <textarea className="materialize-textarea" id="codeToRun" type="text" name="code" />
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
}

export default Compiler;
