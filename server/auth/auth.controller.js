const jwt = require('jwt-simple');
const config = require('../config/config');
const encryption = require('../utils/encryption');
const User = require('../users/user.model');

module.exports = {
  checkToken,
  login,
  oauthSuccess,
  signup,
};

/***** PUBLIC *****/

function checkToken(req, res) {
  const token = req.body.token;
  if (!token) { return res.status(401).send({ message: 'Invalid token' }); }
  const payload = jwt.decode(token, config.secret);
  const email = payload.email || null;
  return User.findOne({ where: { email } })
    .then(user => {
      if (!user) { throw new Error('Invalid token'); }
      res.sendStatus(200);
    })
    .catch(err => res.status(401).send({ message: err.message }));
}

function login(req, res) {
  let currentUser;
  User.findOne({ where: { email: req.body.email } })
    .then(user => {
      if (!user) { throw new Error('User does not exist'); }
      currentUser = user;
      return encryption.comparePassword(req.body.password, user.password);
    })
    .then(match => {
      if (!match) { throw new Error('Wrong password'); }
      return jwt.encode({ email: req.body.email }, config.secret);
    })
    .then(token => {
      res.send({ token, user: getUserInfo(currentUser) });
    })
    .catch(err => res.status(400).send({ message: err.message }));
}

function oauthSuccess(req, res) {
  if (!req.user) { return res.status(404).send({ message: 'Login failed' }); }
  const user = req.user;
  const token = jwt.encode({ email: user.email }, config.secret);
  return res.redirect(`/oauthsuccess?token=${token}&id=${user.id}&email=${user.email}&fullName=${user.fullName}&photo=${user.photo}`);
}

function signup(req, res) {
  User.create(req.body)
    .then(user => {
      const token = jwt.encode({ email: user.email }, config.secret);
      res.send({ token, user: getUserInfo(user) });
    })
    .catch(err => res.status(400).send({ message: err.message }));
}

/***** PRIVATE *****/

function getUserInfo(user) {
  return { id: user.id, fullName: user.fullName, photo: user.photo, email: user.email };
}
