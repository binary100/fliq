const db = require('../database/dbsetup.js');
const omdbSearchUrl = `http://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&s=`;
const omdbIMDBSearchUrl = `http://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&i=`;
const regex = /[^a-zA-Z0-9]+/g;
const axios = require('axios');

// UPDATE THE USER LOGIN NUMBER
module.exports = (profile) => {
  const likedMovies = profile._json.movies.data;

  const omdbRequests = likedMovies.map((movie) => {
    const movieName = movie.name.replace(regex, '+');
    const searchUrl = omdbSearchUrl + movieName;
    return new Promise((resolve, reject) => {
      axios.post(searchUrl)
        .then((results) => {
          // Assume first movie is correct because
          // Facebook movie titles are strict
          const currentMovie = results.data.Search[0];
          resolve({
            title: currentMovie.Title,
            year: currentMovie.Year,
            poster: currentMovie.Poster,
            imdbID: currentMovie.imdbID
          });
        })
        .catch(err => reject(err));
    });
  });

  Promise.all(omdbRequests)
    .then(searchObjects => searchObjects.map(({ imdbID }) => {
      console.log('Scraped info for: ', imdbID);
      const searchUrl = omdbIMDBSearchUrl + imdbID;
      return new Promise((resolve, reject) => {
        axios.post(searchUrl)
          .then(results => resolve(results.data))
          .catch(err => reject(err));
      });
    }))
    .then(omdbPromises => Promise.all(omdbPromises))
    .then((fullDataResults) => {
      console.log('Received fullDataResults: ', fullDataResults);
    })
    .catch(err => console.log('Error getting fullDataResults: ', err));
};
