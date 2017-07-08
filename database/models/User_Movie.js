const Sequelize = require('sequelize');
const db = require('../dbsetup.js');
const User = require('./users.js');
const Movie = require('./movies.js');
// const Tag = require('./tags.js');

const User_Movie = db.define('User_Movie', {});

User.belongsToMany(Movie, {through: User_Movie, as: 'user_id', foreignKey: 'id'});
Movie.belongsToMany(User, {through: User_Movie, as: 'movie_id', foreignKey: 'id'});

module.exports = User_Movie;