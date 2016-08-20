const Sequelize = require('sequelize');
const sequelize = require('../config/sequelize');
const logger = require('../config/logger');
const verify = require('../utils/verify');

const Note = require('./note.model');
const Folder = require('../folders/folder.model');
const Share = require('../shares/share.model');
const User = require('../users/user.model');

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
    .then(verify.transactionSuccess)
    .then(() => res.sendStatus(200))
    .catch(err => {
      logger.debug('Error updating note ', err);
      res.status(400).send({ message: err.message });
    });
}

function getAll(req, res) {
  let promise;
  const { folderId, orderBy, limit, offset, q } = req.query;
  const userId = req.user.id;

  // Queries
  const where = q ? { name: { $ilike: `%${q}%` } } : {};
  const order = orderBy ? [orderBy.slice().split(' ')] : [['updatedAt', 'DESC']];
  const attributes = { exclude: ['content'] };
  const include = [
    { model: User, attributes: ['id', 'fullName'] },
    { model: Folder, attributes: ['id', 'name'] },
    {
      model: Share,
      attributes: ['userId'],
      include: [{ model: User, attributes: ['fullName'] }],
    },
  ];

  if (folderId) {
    where.folderId = folderId;
    promise = verify.hasAccessToFolder(folderId, userId);
  } else {
    promise = getAllAccessibleNoteIds(userId)
      .then(rows => {
        where.id = { $in: rows.map(row => row.id) };
      });
  }

  promise
    .then(() => Note.findAll({ where, order, attributes, include, limit, offset }))
    .then(notes => res.send(notes))
    .catch(err => {
      logger.debug('Error retrieving notes in folder ', folderId, err);
      if (err.message === 'FORBIDDEN') {
        res.status(403).send({ message: 'User does not have access to folder' });
      } else {
        res.status(400).send({ message: err.message });
      }
    });
}

function getOne(req, res) {
  const id = req.params.id;
  const userId = req.user.id;
  const include = [
    { model: User, attributes: ['id', 'fullName'] },
    { model: Folder, attributes: ['id', 'name'] },
    {
      model: Share,
      attributes: ['id', 'userId'],
      on: { $or: { noteId: { $col: 'note.id' }, folderId: { $col: 'note.folderId' } } },
      include: [{ model: User, attributes: ['fullName'] }],
    },
  ];

  verify.hasAccessToNote(id, userId)
    .then(() => Note.findOne({ where: { id }, include }))
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
  const userId = req.user.id;
  const { name, content, folderId } = req.body;
  const data = { userId, folderId, name, content };

  verify.hasAccessToFolder(folderId, userId)
    .then(() => Note.create(data))
    .then(newNote => res.send(newNote))
    .catch(err => {
      logger.debug('Error creating note ', err);
      res.status(400).send({ message: err.message });
    });
}

function put(req, res) {
  const id = req.params.id;
  const userId = req.user.id;
  const folderId = req.body.folderId;

  verify.hasAccessToFolder(folderId, userId)
    .then(() => verify.hasAccessToNote(id, userId))
    .then(() => Note.update(req.body, { where: { id, userId } }))
    .then(verify.transactionSuccess)
    .then(() => res.sendStatus(200))
    .catch(err => {
      logger.debug('Error updating note ', err);
      res.status(400).send({ message: err.message });
    });
}

/***** PRIVATE *****/

function getAllAccessibleNoteIds(userId) {
  return sequelize.query(`
    SELECT notes.id FROM notes
    LEFT JOIN shares ON notes.id = shares."noteId"
    WHERE
    	  notes."userId" = ${userId}
    OR  shares."userId" = ${userId}
    OR  notes."folderId" IN (
    		SELECT f.id FROM folders f
    		JOIN shares s ON f.id = s."folderId"
    		WHERE
    			  (s."userId" = ${userId} AND s."noteId" IS NULL)
    		OR  f."userId" = ${userId}
    	)
    GROUP BY notes.id;
  `, { type: Sequelize.QueryTypes.SELECT });
}
