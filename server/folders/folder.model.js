const Sequelize = require('sequelize');
const sequelize = require('../config/sequelize');

const Folder = sequelize.define('folder', {
  name: { type: Sequelize.STRING, required: true },
  userId: { type: Sequelize.INTEGER, required: true },
}, {
  indexes: [{ method: 'BTREE', fields: ['name'] }],
});

module.exports = Folder;

/* Setup Associations */
const User = require('../users/user.model');
const Share = require('../shares/share.model');
const Note = require('../notes/note.model');

Folder.belongsTo(User);
Folder.hasMany(Share, { onDelete: 'CASCADE' });
Folder.hasMany(Note, { onDelete: 'CASCADE' });
