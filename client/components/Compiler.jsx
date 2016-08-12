import React from 'react';

$(document).ready(function() {
   $('select').material_select();
});

const Compiler = () => {

  let globalVariable;

  const compile = e => {
    e.preventDefault();

    var jwtToken = localStorage.getItem('jwtToken');

    const code = document.getElementById('codeToRun').value;
    const lang = document.getElementById('language').value;

    console.log(lang);

    fetch('http://localhost:3030/run', {
      method: 'POST',
      body: JSON.stringify({
        language: lang,
        content: code,
      }),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `JWT ${jwtToken}`,
      },
    })
    .then(res => res.json())
    .then(data => {
      if (data.stdout.indexOf('/usr/src/app/')) {
        const SyntaxError = data.stdout.substring(data.stdout.indexOf(','));
        console.log(data.stdout);
        console.log(SyntaxError);
      } else {
        console.log(data.stdout);
      }
      //var errorIndicator = data.stdout.substring(0,19);
      //if (data.stdout.substring(0, 12));
      //console.log(data.stdout)
    });
  };

  return (
    <div>
      <select id="language">
        <option value="" disabled selected>Choose your language</option>
        <option value="node">Javascript</option>
        <option value="python">Python</option>
        <option value="ruby">Ruby</option>
      </select>

      <textarea id="codeToRun" type="text" name="code" />
      <button onClick={compile}>Compile</button>
    </div>
  );
};

export default Compiler;
