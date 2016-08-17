import compilerAPI from '../../config';

const compile = (input, lang) => {
  // If no code typed, or no language selected, do not compile
  if (input.length < 1) {
    return Promise.reject('no code typed');
  }

  if (lang.length < 1) {
    return Promise.reject('no lang selected');
  }

  // Convert JS to node
  if (lang === 'javascript') {
    lang = 'node';
  }

  const jwtToken = localStorage.getItem('jwtToken');

  return fetch(compilerAPI.endPoint, {
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
