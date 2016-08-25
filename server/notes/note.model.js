const Sequelize = require('sequelize');
const sequelize = require('../config/sequelize');

const Note = sequelize.define('note', {
  name: { type: Sequelize.STRING, defaultValue: 'Untitled' },
  content: Sequelize.JSON,
  userId: { type: Sequelize.INTEGER, required: true },
  folderId: Sequelize.INTEGER,
}, {
  indexes: [{ method: 'BTREE', fields: ['name'] }],
});

module.exports = Note;

/* Setup Associations */
const User = require('../users/user.model');
const Folder = require('../folders/folder.model');
const Share = require('../shares/share.model');

Note.belongsTo(User);
Note.belongsTo(Folder);
Note.hasMany(Share, { onDelete: 'CASCADE' });
