const db = require('../database/dbsetup.js');
const axios = require('axios');
const apiController = require('./apiController.js');

const omdbSearchUrl = `http://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&s=`;
const omdbIMDBSearchUrl = `http://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&i=`;
const regex = /[^a-zA-Z0-9]+/g;
const Movie = db.movies;


const addMoviesToDb = (allMovies, user) => {
  let index = 0;
  const numberToInsert = 20;
  const intervalId = setInterval(() => {
    const movies = allMovies
                    .slice(index, index + numberToInsert)
                    .map((obj) => {
                      const newObj = Object.assign({}, obj, {
                        Ratings: JSON.stringify(obj.Ratings)
                      });
                      return newObj;
                    });

    /*
      We stopped using findOrCreate
      when we found that omdbAPI can change genre definitions
      seemingly at random, which leads to duplicate movie
      instances with slightly altered genres
    */
    movies.forEach((movie) => {
      if (movie.Title) {
        Movie.find({ where: {
          $and: [{ title: movie.Title }, { year: movie.Year }]
        } })
          .then((matchedMovie) => {
            if (!matchedMovie) {
              return Movie.create({
                title: movie.Title,
                year: movie.Year,
                rated: movie.Rated,
                genre: movie.Genre,
                plot: movie.Plot,
                ratings: movie.Ratings,
                poster: movie.Poster,
                director: movie.Director,
                writer: movie.Writer,
                actors: movie.Actors
              })
                .then(savedMovie => ({ movie: savedMovie, isNewScrape: true }));
            }
            return { movie: matchedMovie, isNewScrape: false };
          })
          .then((movieObj) => {
            apiController.handleLikeFromScraper(movieObj.movie, user.id);
          });
      }
    });

    index += numberToInsert;
    if (index > allMovies.length) {
      clearInterval(intervalId);
    }
  }, 2000);
};

module.exports = profile => {

  console.log('Entering scraper');
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
    .then(hydratedMovies => addMoviesToDb(hydratedMovies, user))
    .catch(err => console.log('Error getting fullDataResults: ', err));
};
