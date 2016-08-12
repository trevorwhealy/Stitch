const FolderRouter = require('express').Router();
const FolderCtrl = require('./folder.controller');

FolderRouter.route('/')
  .get(FolderCtrl.getAll)
  .post(FolderCtrl.post);

FolderRouter.route('/:id')
  .put(FolderCtrl.put)
  .delete(FolderCtrl.deleteOne);

module.exports = FolderRouter;
