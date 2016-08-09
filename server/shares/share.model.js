const Sequelize = require('sequelize');
const sequelize = require('../config/sequelize');

const Share = sequelize.define('share', {
    
})

Share.belongsTo(User);
Share.belongsTo(File);


module.exports = Comment;