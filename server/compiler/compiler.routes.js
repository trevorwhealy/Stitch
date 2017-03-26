const CompilerRouter = require('express').Router();
const CompilerCtrl = require('./compiler.controller');

CompilerRouter.post('/', CompilerCtrl.checkRequest, CompilerCtrl.run);

module.exports = CompilerRouter;
