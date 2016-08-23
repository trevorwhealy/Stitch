const logger = require('../config/logger');
const verify = require('../utils/verify');

const Share = require('./share.model');
const Folder = require('../folders/folder.model');
const Note = require('../notes/note.model');
const Notification = require('../notifications/notification.model');

module.exports = {
  shareFolder,
  shareNote,
  unshareFolder,
  unshareNote,
};

/***** PUBLIC *****/

function shareFolder(req, res) {
  const folderId = req.params.folderId;
  const userId = req.user.id;
  verifyOwnedFolder(folderId, userId)
    .then(() => {
      const shares = req.body.users.map(id => {
        return { userId: id, folderId };
      });
      return Share.bulkCreate(shares);
    })
    .then(shares => res.status(201).send(shares))
    .then(() => notifyUsers(userId, req.body.users, { folderId }))
    .catch(err => {
      logger.debug('Error sharing folder with users ', req.body, err);
      res.status(400).send({ message: err.message });
    });
}

function shareNote(req, res) {
  const noteId = req.params.noteId;
  const userId = req.user.id;
  verifyOwnedNote(noteId, userId)
    .then(() => {
      const shares = req.body.users.map(uid => {
        return { userId: uid, noteId };
      });
      return Share.bulkCreate(shares);
    })
    .then(shares => res.status(201).send(shares))
    .then(() => notifyUsers(userId, req.body.users, { noteId }))
    .catch(err => {
      logger.debug('Error sharing note with users ', req.body, err);
      res.status(400).send({ message: err.message });
    });
}

function unshareFolder(req, res) {
  const folderId = req.params.folderId;
  const userId = req.user.id;
  verifyOwnedFolder(folderId, userId)
    .then(() => Share.destroy({ where: { folderId, userId } }))
    .then(verify.transactionSuccess)
    .then(() => res.sendStatus(200))
    .catch(err => {
      logger.error('Error unsharing folder ', err);
      res.status(400).send({ message: err.message });
    });
}

function unshareNote(req, res) {
  const noteId = req.params.noteId;
  const userId = req.user.id;
  verifyOwnedNote(noteId, userId)
    .then(() => Share.destroy({ where: { noteId, userId } }))
    .then(verify.transactionSuccess)
    .then(() => res.sendStatus(200))
    .catch(err => {
      logger.error('Error unsharing folder ', err);
      res.status(400).send({ message: err.message });
    });
}

/***** PRIVATE *****/

function verifyOwnedFolder(folderId, userId) {
  return Folder.findOne({ where: { id: folderId } })
    .then(folder => {
      if (!folder) { throw new Error('Folder does not exist'); }
      if (folder.userId !== userId) {
        throw new Error('Only owner is allowed to share');
      }
    });
}

function verifyOwnedNote(noteId, userId) {
  return Note.findOne({ where: { id: noteId } })
    .then(note => {
      if (!note) { throw new Error('Note does not exist'); }
      if (note.userId !== userId) {
        throw new Error('Only owner is allowed to share');
      }
    });
}

function notifyUsers(sourceId, targetIds, { folderId, noteId }) {
  if (!targetIds || !targetIds.length) { return; }
  const type = 'SHARE';
  const data = targetIds.map(targetId => ({ sourceId, targetId, folderId, noteId, type }));
  Notification.bulkCreate(data);
}
