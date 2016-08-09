const Sequelize = require('sequelize');
const sequelize = require('../config/sequelize');

const File = sequelize.define('file', {
  name: Sequelize.STRING,
  content: Sequelize.BLOB,  
})

File.belongsTo(Folder);
File.belongsTo(User);



module.exports = File;