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

// User.sync().then((err) => {
//   if (err) {
//     console.error('Error creating User table', err);
//   } else {
//     console.log('User table created successfully')
//   }
// });

module.exports = User;