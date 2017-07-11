const db = require('../dbsetup.js');
const Movie = require('./movies.js');
const Tag = require('./tags.js');
// const User = require('./users.js');

const MovieTag = db.define('Movie_Tag', {});

Movie.belongsToMany(Tag, { through: MovieTag, as: 'movie_id', foreignKey: 'id' });
Tag.belongsToMany(Movie, { through: MovieTag, as: 'tagId', foreignKey: 'id' });

// MovieTag.sync().then((err) => {
//   if (err) {
//     console.error('Error creating MovieTag table', err);
//   } else {
//     console.log('MovieTag table created successfully');
//   }
// });

module.exports = MovieTag;
