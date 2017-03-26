const compile = (input, lang) => {
  // If no code typed, or no language selected, do not compile
  if (!input) {
    return Promise.reject('no code typed');
  }

  if (!lang || lang === 'none') {
    return Promise.reject('no lang selected');
  }

  // Convert JS to node
  if (lang === 'Javascript') {
    lang = 'Node';
  }

  const jwtToken = localStorage.getItem('jwtToken');

  return fetch('/api/compile', {
    method: 'POST',
    body: JSON.stringify({
      language: lang,
      content: input,
    }),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `JWT ${jwtToken}`,
    },
  });
};

module.exports = compile;
