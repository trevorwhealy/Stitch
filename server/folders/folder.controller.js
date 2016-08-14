const Sequelize = require('sequelize');
const sequelize = require('../config/sequelize');
const logger = require('../config/logger');
const verify = require('../utils/verify');

const Folder = require('./folder.model');
const Share = require('../shares/share.model');
const User = require('../users/user.model');

module.exports = {
  getAll,
  getOne,
  post,
  put,
  deleteOne,
};

/***** PUBLIC *****/

function getAll(req, res) {
  const userId = req.user.id;
  sequelize.query(`
    SELECT folders.id FROM folders
    LEFT JOIN shares
    ON folders.id = shares."folderId"
    WHERE folders."userId" = ${userId} OR shares."userId" = ${userId}
    ORDER BY folders.name;
  `, { type: Sequelize.QueryTypes.SELECT })
  .then(folders => {
    return Folder.findAll({
      where: { id: { $in: folders.map(folder => folder.id) } },
      include: [
        { model: User, attributes: ['id', 'fullName'] },
        { model: Share, attributes: ['userId'] },
      ],
    });
  })
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
      { model: User, attributes: ['id', 'fullName'] },
      { model: Share, attributes: ['userId'] },
    ],
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

  console.log('123412343241234123423413412341234132412341234123412341234123413241', name, userId);

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

function deleteOne(req, res) {
  const id = req.params.id;
  const userId = req.user.id;
  Folder.destroy({ where: { id, userId } })
    .then(verify.transactionSuccess)
    .then(() => res.sendStatus(200))
    .catch(err => {
      logger.debug('Error deleting folder ', id, userId, err);
      res.status(400).send({ message: err.message });
    });
}
