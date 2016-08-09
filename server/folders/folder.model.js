const Sequelize = require('sequelize');
const sequelize = require('../config/sequelize');

const Folder = sequelize.define('folder', {
  name: Sequelize.STRING,
})

Folder.belongsTo(User);



module.exports = Folder;