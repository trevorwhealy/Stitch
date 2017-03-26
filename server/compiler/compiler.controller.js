const fetch = require('node-fetch');
const docker = require('./compiler.service');

module.exports = {
  checkRequest,
  run,
};

/***** PUBLIC *****/
function checkRequest(req, res, next) {
  if (!req.body.language) {
    return res.status(400).json({ message: 'missing "language" property' });
  }
  if (!req.body.content) {
    return res.status(400).json({ message: 'missing "content" property'});
  }
  next();
}

function run(req, res) {
  var fakeReq = {
    language: 'python',
    content: 'print(3*3)',
  }

  console.log('req.body', req.body);

  docker(req.body.language, req.body.content)
    .then(res.json.bind(res))
    .catch(res.json.bind(res));
}
