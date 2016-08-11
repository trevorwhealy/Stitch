import React from 'react';

const Compiler = () => {

  let globalVariable;

  const compile = e => {
    e.preventDefault();

    var jwtToken = localStorage.getItem('jwtToken');

    const code = document.getElementById('codeToRun').value;
    fetch('http://localhost:3030/run', {
      method: 'POST',
      body: JSON.stringify({
        language: 'node',
        content: code,
      }),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `JWT ${jwtToken}`,
      },
    })
    .then(res => res.json())
    .then(data => console.log(data));
  };

  return (
    <div>
      <textarea id="codeToRun" type="text" name="code" />
      <button onClick={compile}>Compile</button>
    </div>
  );
};

export default Compiler;
