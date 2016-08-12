const FolderRouter = require('express').Router();
const FolderCtrl = require('./folder.controller');

const NoteRouter = require('../notes/note.routes');

FolderRouter.route('/')
  .get(FolderCtrl.getAll)
  .post(FolderCtrl.post);

FolderRouter.route('/:id')
  .get(FolderCtrl.getOne)
  .put(FolderCtrl.put)
  .delete(FolderCtrl.deleteOne);

FolderRouter.use(NoteRouter);

module.exports = FolderRouter;
