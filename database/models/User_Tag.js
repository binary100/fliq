const Sequelize = require('sequelize');
const db = require('../dbsetup.js');
const Tag = require('./tags.js');
const User = require('./users.js');

const UserTag = db.define('UserTag', {
  tagCount: Sequelize.INTEGER
});

User.belongsToMany(Tag, { through: UserTag, as: 'user_id', foreignKey: 'id' });
Tag.belongsToMany(User, { through: UserTag, as: 'tag_id', foreignKey: 'id' });

// UserTag.sync().then((err) => {
//   if (err) {
//     console.error('Error creating UserTag table', err);
//   } else {
//     console.log('UserTag table created successfully');
//   }
// });

module.exports = UserTag;
