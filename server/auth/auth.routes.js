const passport = require('passport');
const AuthRouter = require('express').Router();
const AuthCtrl = require('./auth.controller');

AuthRouter.post('/login', AuthCtrl.login);
AuthRouter.post('/signup', AuthCtrl.signup);
AuthRouter.get('/google', passport.authenticate('google', { scope: ['profile'] }));
AuthRouter.get('/google/callback',
  passport.authenticate('google', { session: false }), AuthCtrl.oauthSuccess);

module.exports = AuthRouter;
