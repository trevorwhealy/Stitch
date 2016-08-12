const CommentRouter = require('express').Router();
const CommentCtrl = require('./comment.controller');

CommentRouter.route('/')
  .get(CommentCtrl.getAll)
  .post(CommentCtrl.post);

module.exports = CommentRouter;
