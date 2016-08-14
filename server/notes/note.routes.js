const NoteRouter = require('express').Router();
const NoteCtrl = require('./note.controller');

const ShareCtrl = require('../shares/share.controller');

NoteRouter.route('/')
  .get(NoteCtrl.getAll)
  .post(NoteCtrl.post);

NoteRouter.route('/:id')
  .get(NoteCtrl.getOne)
  .put(NoteCtrl.put)
  .delete(NoteCtrl.deleteOne);

NoteRouter.post('/:noteId/share', ShareCtrl.shareNote);
NoteRouter.post('/:noteId/unshare', ShareCtrl.unshareNote);

module.exports = NoteRouter;
