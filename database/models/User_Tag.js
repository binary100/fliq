const Sequelize = require('sequelize');
const db = require('../dbsetup.js');
const Tag = require('./tags.js');
const User = require('./users.js');

const User_Tag = db.define('User_Tag', {
  tagCount: Sequelize.INTEGER
});

User.belongsToMany(Tag, {through: User_Tag, as: 'user_id', foreignKey: 'id'});
Tag.belongsToMany(User, {through: User_Tag, as: 'tag_id', foreignKey: 'id'});

// User_Tag.sync().then((err) => {
//   if (err) {
//     console.error('Error creating User_Tag table', err);
//   } else {
//     console.log('User_Tag table created successfully');
//   }
// });

module.exports = User_Tag;