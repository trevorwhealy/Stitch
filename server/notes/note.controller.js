const logger = require('../config/logger');
const checkTransactionSuccess = require('../utils/middleware').checkTransactionSuccess;

const Note = require('./note.model');

module.exports = {
  deleteOne,
  getAll,
  getOne,
  post,
  put,
};

/***** PUBLIC *****/

function deleteOne(req, res) {
  const id = req.params.id;
  const userId = req.user.id;
  Note.destroy({ where: { id, userId } })
    .then(checkTransactionSuccess)
    .then(() => res.sendStatus(200))
    .catch(err => {
      logger.debug('Error updating note ', err);
      res.status(400).send({ message: err.message });
    });
}

function getAll(req, res) {
  const folderId = req.params.folderId;
  Note.findAll({ where: { folderId } })
    .then(notes => res.send(notes))
    .catch(err => {
      logger.debug('Error retrieving notes in folder ', folderId, err);
      res.status(400).send({ message: err.message });
    });
}

function getOne(req, res) {
  const id = req.params.id;
  Note.findOne({ where: { id } })
    .then(note => {
      if (!note) { throw new Error('Note does not exist'); }
      res.send(note);
    })
    .catch(err => {
      logger.debug('Error retrieving note ', id, err);
      res.status(400).send({ message: err.message });
    });
}

function post(req, res) {
  const data = {
    userId: req.user.id,
    folderId: req.params.folderId,
    name: req.body.name,
    content: req.body.content,
  };
  Note.create(data)
    .then(newNote => res.send(newNote))
    .catch(err => {
      logger.debug('Error creating note ', err);
      res.status(400).send({ message: err.message });
    });
}

function put(req, res) {
  const id = req.params.id;
  const userId = req.user.id;
  Note.update(req.body, { where: { id, userId } })
    .then(checkTransactionSuccess)
    .then(() => res.sendStatus(200))
    .catch(err => {
      logger.debug('Error updating note ', err);
      res.status(400).send({ message: err.message });
    });
}
