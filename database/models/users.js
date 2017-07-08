const Sequelize = require('sequelize');
const db = require('../dbsetup.js');

const User = db.define('User', {
  name: {
    type: Sequelize.STRING
  },
  picture: {
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING
  }
});

module.exports = User;
