const Sequelize = require('sequelize');
const sequelize = require('../config/sequelize');

const Comment = sequelize.define('comment', {
  text: Sequelize.BLOB,
  line_number: Sequelize.INTEGER,  
})

Comment.belongsTo(User);
Comment.belongsTo(File);


module.exports = Comment;