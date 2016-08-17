const UserRouter = require('express').Router();
const UserCtrl = require('./user.controller');

UserRouter.get('/search', UserCtrl.search);

module.exports = UserRouter;
