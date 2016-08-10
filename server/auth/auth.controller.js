'use strict';

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
  const username = payload.username || null;
  const googleId = payload.googleId || null;
  return User.findOne({ where: { username, googleId } })
    .then(user => {
      if (!user) { throw new Error('Invalid token'); }
      res.sendStatus(200);
    })
    .catch(err => res.status(401).send({ message: err.message }));
}

function login(req, res) {
  let currentUser;
  User.findOne({ where: { username: req.body.username } })
    .then(user => {
      if (!user) { throw new Error('User does not exist'); }
      currentUser = user;
      return encryption.comparePassword(req.body.password, user.password);
    })
    .then(match => {
      if (!match) { throw new Error('Wrong password'); }
      return jwt.encode({ username: req.body.username }, config.secret);
    })
    .then(token => {
      res.send({ token, user: getUserInfo(currentUser) });
    })
    .catch(err => res.status(400).send({ message: err.message }));
}

function oauthSuccess(req, res) {
  if (!req.user) { return res.status(404).send({ message: 'Login failed' }); }
  const user = req.user;
  const token = jwt.encode({ googleId: user.googleId }, config.secret);
  return res.send({ token, user: getUserInfo(user) });
}

function signup(req, res) {
  User.create(req.body)
    .then(user => {
      const token = jwt.encode({ username: user.username }, config.secret);
      res.send({ token, user: getUserInfo(user) });
    })
    .catch(err => res.status(400).send({ message: err.message }));
}

/***** PRIVATE *****/

function getUserInfo(user) {
  return { fullName: user.fullName, photo: user.photo };
}
