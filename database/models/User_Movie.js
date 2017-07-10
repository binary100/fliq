const Sequelize = require('sequelize');
const db = require('../dbsetup.js');
const User = require('./users.js');
const Movie = require('./movies.js');

const User_Movie = db.define('User_Movie', {
  // userId: {
  //   type: Sequelize.INTEGER
  // },
  // movieId: {
  //   type: Sequelize.INTEGER
  // }

});


// User_Movie.sync().then((err) => {
//   if (err) {
//     console.error('Error creating User_Tag table', err);
//   } else {
//     console.log('User_Tag table created successfully');
//   }
// });

User.belongsToMany(Movie, {through: User_Movie, as: 'userId', foreignKey: 'id'});
Movie.belongsToMany(User, {through: User_Movie, as: 'movieId', foreignKey: 'id'});


module.exports = User_Movie;