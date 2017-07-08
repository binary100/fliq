// const movieTestData = {
//   title: "Star Wars: Episode IV - A New Hope",
//   year: "1989",
//   rated: "PG"
// //   genre: "Action, Adventure, Fantasy",
// //   plot:"Luke Skywalker joins forces with a Jedi Knight, a cocky pilot, a wookiee and two droids to save the galaxy from the Empire's world-destroying battle-station, while also attempting to rescue Princess Leia from the evil Darth Vader.",
// //   poster: "https://images-na.ssl-images-amazon.com/images/M/MV5BYzQ2OTk4N2QtOGQwNy00MmI3LWEwNmEtOTk0OTY3NDk2MGJkL2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyNjc1NTYyMjg@._V1_SX300.jpg",
// //   director: "George Lucas",
// //   writer: "George Lucas",
// //   actors:"Actors":"Mark Hamill, Harrison Ford, Carrie Fisher, Peter Cushing"
// };

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
