const db = require('../dbsetup.js');
const User = require('./users.js');
const Movie = require('./movies.js');

const UserMovie = db.define('UserMovie', {});


// UserMovie.sync().then((err) => {
//   if (err) {
//     console.error('Error creating UserTag table', err);
//   } else {
//     console.log('UserTag table created successfully');
//   }
// });

User.belongsToMany(Movie, { through: UserMovie, as: 'userId', foreignKey: 'id' });
Movie.belongsToMany(User, { through: UserMovie, as: 'movieId', foreignKey: 'id' });


module.exports = UserMovie;
