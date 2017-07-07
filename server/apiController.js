const axios = require('axios');
const Movie = require('../database/models/movies.js');

const omdbUrl = `http://www.omdbapi.com/?apikey=${process.env.omdbApiKey}&t=;`;

// HARD CODED REQUESTS
module.exports.getTwoMovies = (req, res) => {
  // At first, randomly select two movies from DB
  let firstMovieId = null;
  let secondMovieId = null;

  // This should be returned by the DB instead of hardcoded
  // Should be the length of the movies table, basically
  // This means the movie IDs MUST remain sequential

  Movie.findAndCountAll({})
    .then((maxMovieCount) => {
      firstMovieId = Math.floor(Math.random() * (maxMovieCount + 1));
      do {
        secondMovieId = Math.floor(Math.random() * (maxMovieCount + 1));
      } while (firstMovieId === secondMovieId);
      console.log(`Chose movie IDs ${firstMovieId} and ${secondMovieId}`);

      return [firstMovieId, secondMovieId];
    })
    .then(idArray =>
      idArray.map(id =>
        new Promise((resolve, reject) =>
          Movie.find({ where: { id } })
            .then(foundMovie => resolve(foundMovie))
            .catch(error => reject(error))
        )
      )
    )
    .then(dbPromises => Promise.all(dbPromises))
    .then(resultsArray => res.status(200).send(resultsArray))
    .catch(error => res.status(500).send(error));
};

module.exports.chooseMovie = (req, res) => {
  console.log('Entering chooseMovie in apiController.js');
  res.sendStatus(200);
};
