import React from 'react';

class Compiler extends React.Component {
  constructor() {
    super();

    this.state = {
      languages: ['Python', 'Ruby', 'Javascript', 'C'],
    };
  }

  componentDidMount() {
    $('select').material_select();
  }

  render() {
    return (
      <div className="compilerContainer">
        <select id="language" defaultValue="none">
          <option value="none" disabled>Choose your language</option>
          {this.state.languages.map(language => {
            return (
              <option key={language} value={`${language}`}>{language}</option>
            );
          })}
        </select>
      </div>
    );
  }
}

export default Compiler;
