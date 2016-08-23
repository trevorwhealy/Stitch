const passport = require('passport');
const AuthRouter = require('express').Router();
const AuthCtrl = require('./auth.controller');

AuthRouter.post('/check-token', AuthCtrl.checkToken);
AuthRouter.post('/login', AuthCtrl.login);
AuthRouter.post('/signup', AuthCtrl.signup);
AuthRouter.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
AuthRouter.get('/google/callback',
  passport.authenticate('google', {
    session: false,
    failureRedirect: '/login',
  }), AuthCtrl.oauthSuccess);

module.exports = AuthRouter;
