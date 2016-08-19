const Sequelize = require('sequelize');
const sequelize = require('../config/sequelize');

module.exports = {
  hasAccessToFolder,
  hasAccessToNote,
  transactionSuccess,
};

/***** PUBLIC *****/

function hasAccessToFolder(folderId, userId) {
  if (!folderId) { return Promise.resolve(); }
  return sequelize.query(`
    SELECT exists(SELECT f.id FROM folders f
    FULL OUTER JOIN shares s
    ON f.id = s."folderId"
    WHERE (f.id = ${folderId} and f."userId" = ${userId})
    OR	  (s."folderId" = ${folderId} and s."userId" = ${userId})) as "hasAccess";
  `, { type: Sequelize.QueryTypes.SELECT })
  .then(([{ hasAccess }]) => {
    if (!hasAccess) {
      throw new Error('FORBIDDEN');
    }
  });
}

function hasAccessToNote(noteId, userId) {
  if (!noteId) { return Promise.resolve(); }
  return sequelize.query(`
    SELECT exists(SELECT n.id FROM notes n
    FULL OUTER JOIN shares s
    ON n.id = s."noteId"
    WHERE (n.id = ${noteId} and n."userId" = ${userId})
    OR	  (s."noteId" = ${noteId} and s."userId" = ${userId})) as "hasAccess";
  `, { type: Sequelize.QueryTypes.SELECT })
  .then(([{ hasAccess }]) => {
    if (!hasAccess) {
      throw new Error('FORBIDDEN');
    }
  });
}

function transactionSuccess(numAffected) {
  if (numAffected === 0) {
    throw new Error('Not found');
  }
}
