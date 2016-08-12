const NoteRouter = require('express').Router();
const NoteCtrl = require('./note.controller');

NoteRouter.route('/:folderId/notes')
  .get(NoteCtrl.getAll)
  .post(NoteCtrl.post);

NoteRouter.route('/:folderId/notes/:id')
  .get(NoteCtrl.getOne)
  .put(NoteCtrl.put)
  .delete(NoteCtrl.deleteOne);

module.exports = NoteRouter;
