const CommentRouter = require('express').Router();
const CommentCtrl = require('./comment.controller');

CommentRouter.route('/')
  .get(CommentCtrl.getAll)
  .post(CommentCtrl.post);

CommentRouter.route('/:commentId')
  .put(CommentCtrl.put)
  .delete(CommentCtrl.deleteOne);

module.exports = CommentRouter;
