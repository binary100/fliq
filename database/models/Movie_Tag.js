const Sequelize = require('sequelize');
const db = require('../dbsetup.js');
const Movie = require('./movies.js');
const Tag = require('./tags.js');
// const User = require('./users.js');

const Movie_Tag = db.define('Movie_Tag', {});

Movie.belongsToMany(Tag, {through: Movie_Tag, as: 'movie_id', foreignKey: 'id'});
Tag.belongsToMany(Movie, {through: Movie_Tag, as: 'tagId', foreignKey: 'id'});

// Movie_Tag.sync().then((err) => {
//   if (err) {
//     console.error('Error creating Movie_Tag table', err);
//   } else {
//     console.log('Movie_Tag table created successfully');
//   }
// });

module.exports = Movie_Tag;