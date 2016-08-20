const Sequelize = require('sequelize');
const sequelize = require('../config/sequelize');
const logger = require('../config/logger');
const verify = require('../utils/verify');

const Folder = require('./folder.model');
const Share = require('../shares/share.model');
const User = require('../users/user.model');
const Note = require('../notes/note.model');

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

  sequelize.transaction(transaction => {
    return Note.destroy({ where: { folderId: id } }, { transaction })
      .then(() => Folder.destroy({ where: { id, userId } }, { transaction }));
  })
    .then(verify.transactionSuccess)
    .then(() => res.sendStatus(200))
    .catch(err => {
      logger.debug('Error deleting folder ', id, userId, err);
      res.status(400).send({ message: err.message });
    });
}

function getAll(req, res) {
  const { orderBy, limit, offset, q } = req.query;
  const userId = req.user.id;

  // Queries
  const where = q ? { name: { $ilike: `%${q}%` } } : {};
  const order = orderBy ? [orderBy.slice().split(' ')] : [['updatedAt', 'DESC']];
  const include = [
    { model: User, attributes: ['id', 'fullName', 'photo'] },
    { model: Note, attributes: ['id'] },
    {
      model: Share,
      attributes: ['userId'],
      include: [{ model: User, attributes: ['fullName'] }],
    },
  ];

  getAllAccessibleFolderIds(userId)
    .then(folders => {
      where.id = { $in: folders.map(folder => folder.id) };
      return Folder.findAll({ where, include, order, limit, offset });
    })
    .then(folders => folders.map(f => Object.assign({ type: 'folder' }, f.dataValues)))
    .then(folders => res.send(folders))
    .catch(err => {
      logger.debug('Error retrieving folders ', err);
      res.status(400).send({ message: err.message });
    });
}

function getOne(req, res) {
  const id = req.params.id;
  Folder.findOne({
    where: { id },
    include: [
      {
        model: User,
        attributes: ['id', 'fullName', 'email', 'photo'],
      },
      {
        model: Share,
        attributes: ['id'],
        include: [{ model: User, attributes: ['id', 'fullName', 'email', 'photo'] }],
      },
    ],
    order: [[Share, User, 'fullName', 'ASC']],
  })
    .then(folder => {
      if (!folder) { throw new Error('Folder does not exist'); }
      res.send(folder);
    })
    .catch(err => {
      logger.debug('Error retrieving folder ', err);
      res.status(400).send({ message: err.message });
    });
}

function post(req, res) {
  const name = req.body.name;
  const userId = req.user.id;

  Folder.findAll({
    where: {
      $and: { name, userId },
    },
  })
    .then(folders => {
      if (folders.length > 0) { throw new Error('Duplicate folder name'); }
      return Folder.create({ name, userId });
    })
    .then(newFolder => res.status(201).send(newFolder))
    .catch(err => {
      logger.debug('Error creating folder ', err);
      res.status(400).send({ message: err.message });
    });
}

function put(req, res) {
  const id = req.params.id;
  const userId = req.user.id;
  Folder.update(req.body, { where: { id, userId } })
    .then(verify.transactionSuccess)
    .then(() => res.sendStatus(200))
    .catch(err => {
      logger.debug('Error updating folder ', id, userId, err);
      res.status(400).send({ message: err.message });
    });
}

/***** PRIVATE *****/

function getAllAccessibleFolderIds(userId) {
  return sequelize.query(`
    SELECT folders.id FROM folders
    LEFT JOIN shares
    ON folders.id = shares."folderId"
    WHERE folders."userId" = ${userId} OR shares."userId" = ${userId}
    ORDER BY folders.name;
  `, { type: Sequelize.QueryTypes.SELECT });
}
