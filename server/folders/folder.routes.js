const FolderRouter = require('express').Router();
const FolderCtrl = require('./folder.controller');

const ShareCtrl = require('../shares/share.controller');

FolderRouter.route('/')
  .get(FolderCtrl.getAll)
  .post(FolderCtrl.post);

FolderRouter.route('/:id')
  .get(FolderCtrl.getOne)
  .put(FolderCtrl.put)
  .delete(FolderCtrl.deleteOne);

FolderRouter.post('/:folderId/share', ShareCtrl.shareFolder);
FolderRouter.post('/:folderId/unshare', ShareCtrl.unshareFolder);

module.exports = FolderRouter;
