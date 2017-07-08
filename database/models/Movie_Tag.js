const Sequelize = require('sequelize');
const db = require('../dbsetup.js');
const Movie = require('./movies.js');
const Tag = require('./tags.js');
// const User = require('./users.js');

const Movie_Tag = db.define('Movie_Tag', {});

Movie.belongsToMany(Tag, {through: Movie_Tag, as: 'movie_id', foreignKey: 'id'});
Tag.belongsToMany(Movie, {through: Movie_Tag, as: 'tag_id', foreignKey: 'id'});

module.exports = Movie_Tag;