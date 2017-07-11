const Sequelize = require('sequelize');
const db = require('../dbsetup.js');

const Movie = db.define('Movie', {
  title: {
    type: Sequelize.STRING
  },
  year: {
    type: Sequelize.STRING
  },
  rated: {
    type: Sequelize.STRING
  },
  genre: {
    type: Sequelize.STRING
  },
  plot: {
    type: Sequelize.STRING
  },
  ratings: {
    type: Sequelize.STRING
  },
  trailer: {
    type: Sequelize.STRING
  },
  poster: {
    type: Sequelize.STRING
  },
  director: {
    type: Sequelize.STRING
  },
  writer: {
    type: Sequelize.STRING
  },
  actors: {
    type: Sequelize.STRING
  }
});

// Movie.sync().then((err) => {
//   if (err) {
//     console.error('Error creating Movie table', err);
//   } else {
//     console.log('Movie table created successfully');
//   }
// });

module.exports = Movie;
