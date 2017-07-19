const axios = require('axios');
const db = require('../database/dbsetup.js');
const omdbUrl = `http://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&t=`;
const omdbIMDBSearchUrl = `http://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&i=`;
const omdbSearchUrl = `http://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&s=`;
const theMovieDbUrl = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.TMDB_API_KEY}&query=`;
const theMovieDbPosterUrl = `http://image.tmdb.org/t/p/w185`;
const quoteUrl = `https://andruxnet-random-famous-quotes.p.mashape.com/?cat=movies&count=1"`;
const regex = /[^a-zA-Z0-9]+/g;
const QUOTE_API_KEY = process.env.QUOTE_API_KEY;


const getYouTubeUrl = (title) => {
  const titleForUrl = title.replace(regex, '+');
  console.log('Url is: ', titleForUrl);
  return `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${titleForUrl}+movie+trailer&key=${process.env.YOUTUBE_API_KEY}`;
};
// HARD CODED REQUESTS
module.exports.checkSession = (req, res, next) => {
  if (req.sessionID) {
    db.session.findOne({
      where: { sid: req.sessionID },
      include: [{ model: db.users, as: 'User' }]
    })
    .then((sessionSave) => {
      if (sessionSave) {
        if (sessionSave.userId) {
          return res.send({ success: true, message: 'authentication succeeded', profile: sessionSave.User });
        }
        return res.send({ success: false, message: 'session exists but userId is not assigned', profile: null });
      }
      return res.send({ success: false, message: 'no session found', profile: null });
    });
  } else {
    next();
  }
};


module.exports.getTwoMovies = (req, res) => {
  // At first, randomly select two movies from DB
  let firstMovieId = null;
  let secondMovieId = null;

  // Movie IDs from table MUST remain sequential
  // in the form this is currently coded
  db.movies.count()
    .then((maxMovieCount) => {
      firstMovieId = Math.ceil(Math.random() * maxMovieCount);
      do {
        secondMovieId = Math.ceil(Math.random() * maxMovieCount);
      } while (firstMovieId === secondMovieId);
      console.log(`Chose movie IDs ${firstMovieId} and ${secondMovieId}`);
      return [firstMovieId, secondMovieId];
    })
    .then(idArray =>
      idArray.map(id =>
        new Promise((resolve, reject) =>
          db.movies.find({ where: { id } })
            .then(foundMovie => resolve(foundMovie))
            .catch(error => reject(error))
        )
      )
    )
    .then(dbPromises => Promise.all(dbPromises))
    .then(resultsArray => res.status(200).send(resultsArray))
    .catch(error => res.status(500).send(error));
};

// Populates Tags Model and MovieTags Model
module.exports.populateTags = (req, res) => {
  db.movies.findAll({})
    .then(movieArray =>
      movieArray.map((movie) => {
        const acc = [];
        acc.push(...movie.dataValues.genre.split(', ').map(item => [item, 'genre']));
        acc.push(...movie.dataValues.director.split(', ').map(item => [item, 'director']));
        acc.push(...movie.dataValues.actors.split(', ').splice(3).map(item => [item, 'actor']));
        return acc;
      }).map((movieTagsArray, index) =>
        movieTagsArray.map(movieTagArray =>
          new Promise((resolve, reject) =>
            db.tags.findOrCreate({ where: {
              tagName: movieTagArray[0],
              tagType: movieTagArray[1]
            } })
            .then((foundTag) => {
              db.movieTags.findOrCreate({ where: {
                movie_Id: movieArray[index].id,
                tag_Id: foundTag[0].dataValues.id
              } })
              .then(movieTag => resolve(movieTag));
            })
            .catch(error => reject(error))
          )
        )
      )
    )
    .then(myPromises =>
      myPromises.map(promiseArray =>
        Promise.all(promiseArray)
      ))
    .then(resultsArray => res.status(200).send(resultsArray))
    .catch(error => res.status(500).send(error));
};

const buildOrIncrementMovieTags = (currentMovie, userId) => {
  return db.movieTags.findAll({ where: { movie_Id: currentMovie.id } })
    .then((movieTags) => {
      console.log('movieTags is: ', movieTags);
      return movieTags.map((movieTag) => {
        return new Promise((resolve, reject) => {
          if (movieTag.dataValues.movie_Id === currentMovie.id) {
            return db.userTags.find({ where: {
              tag_Id: movieTag.dataValues.tag_Id,
              user_Id: userId
            } })
            .then((userTag) => {
              if (userTag === null) {
                return db.userTags.create({
                  viewsCount: 1,
                  picksCount: 1,
                  tag_Id: movieTag.dataValues.tag_Id,
                  user_Id: userId
                });
              }
              return userTag.increment(['viewsCount', 'picksCount'], { by: 1 });
            })
            .then(() => resolve())
            .catch((err) => {
              console.log('Error in userTag if/else promise: ', err);
              reject();
            });
          }
        });
      });
    })
    .then(clickedMovieTagPromises => Promise.all(clickedMovieTagPromises))
    .catch(error => console.log('Error in buildOrIncrementMovieTags, ', error));
};

module.exports.handleLightningSelection = (req, res) => {
  const { clickedMovie, discardedMovie } = req.body;
  buildOrIncrementMovieTags(clickedMovie, req.user.id)
  .then(buildOrIncrementMovieTags(discardedMovie, req.user.id))
  .then(() => res.sendStatus(201))
  .catch(error => res.status(500).send(error));
};

module.exports.findDuplicateTagIDs = (req, res) => {
  db.userTags.findAll({ where: { user_Id: 2 } })
    .then((matchedTags) => {
      const seen = {};
      const tags = [];
      matchedTags.forEach((tag) => {
        if (seen[tag.tag_Id]) {
          tags.push(tag);
        }
        seen[tag.tag_Id] = true;
      });
      res.send(tags);
    });
};

// Placeholder logic
module.exports.getUserResults = (req, res) => {
  // We don't yet need the user info in the next line
  // const { user } = req.session.passport;
  // console.log('USER IS: ', user);

  // Placeholder logic, selects five random movies.
  db.movies.count()
    .then((maxMovieCount) => {
      const moviesToGrab = [];

      // Create objects for the Movie.findAll $or operator,
      // which takes objects like this { dbColumn: columnValue }
      for (let i = 0; i < 6; i += 1) {
        let randomMovieId = Math.floor(Math.random() * (maxMovieCount + 1));

        // Need to handle if 0 bc no id 0 in table.
        // Also the linter didn't like the simple way I wrote this at first
        randomMovieId = randomMovieId === 0 ? 1 : randomMovieId;
        moviesToGrab.push({
          id: randomMovieId
        });
      }
      console.log('Calling Movie.findAll with: ', ...moviesToGrab);
      db.movies.findAll({
        where: {
          $or: [...moviesToGrab]
        }
      })
      .then((movies) => {
        const moviePromises = movies.map(movie =>
          new Promise((resolve, reject) => {
            db.userMovies.findOne({ where: {
              movie_Id: movie.dataValues.id,
              user_Id: req.user.id
            } })
            .then((userMovie) => {
              const hydramovie = Object.assign({}, movie);
              if (userMovie) {
                hydramovie.dataValues.liked = userMovie.liked;
              } else {
                hydramovie.dataValues.liked = 0;
              }
              return hydramovie;
            })
            .then(hydratedMovie => resolve(hydratedMovie.dataValues))
            .catch(error => reject(error));
          })
        );
        return Promise.all(moviePromises);
      })
      .then(hydratedMovies => res.send(hydratedMovies))
      .catch(err => res.send(err));
    });
};

module.exports.getQuote = (req, res) => {
  axios(quoteUrl, {
    method: 'GET',
    headers: { 'X-Mashape-Key': QUOTE_API_KEY }
  })
    .then(results => res.send(results.data))
    .catch(err => res.status(500).send(err));
};

module.exports.getTrailer = (req, res) => {
  const url = getYouTubeUrl(req.body.movie.title + ' ' + req.body.movie.year);
  axios.get(url)
    .then(results => res.send(results.data.items[0]))
    .catch(err => res.sendStatus(404));
};

module.exports.getSearchAutoComplete = (req, res) => {
  const { query } = req.body;
  const url = theMovieDbUrl + query;
  axios.get(url)
    .then(results => res.send(results.data.results))
    .catch(err => {
      console.log('Error in autocomplete: ', err);
      res.status(500).send(err);
    });
};

module.exports.likeMovie = (req, res) => {
  console.log('likeMovie received: ', req.body.movie);
  if (req.body.fromSearch) {
    const movieUrl = omdbIMDBSearchUrl + req.body.movie.imdbID;
    axios.post(movieUrl)
    .then((results) => {
      const movie = Object.assign({}, results.data, {
        Ratings: JSON.stringify(results.data.Ratings)
      });
      if (movie.Title) {
        return db.movies.findOrCreate({ where: {
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
        } })
        .then((newMovie) => {
          db.userMovies.findOne({ where: {
            user_Id: req.user.id,
            movie_Id: newMovie[0].dataValues.id
          } })
          .then((userMovie) => {
            if (userMovie === null) {
              db.userMovies.create({
                user_Id: req.user.id,
                movie_Id: newMovie[0].dataValues.id,
                liked: 1,
                seen: true
              });
            } else {
              userMovie.update({
                liked: db.sequelize.literal('liked + 1'),
                seen: true
              });
            }
          })
          .then(() => {
            db.movieTags.findAll({ where: { movie_Id: newMovie[0].dataValues.id } })
            .then((movieTags) => {
              const tagPromises = movieTags.map(movieTag =>
                new Promise((resolve, reject) => {
                  db.userTags.find({ where: {
                    tag_Id: movieTag.dataValues.tag_Id,
                    user_Id: req.user.id
                  } })
                  .then((userTag) => {
                    if (userTag === null) {
                      return db.userTags.create({
                        likesCount: 1,
                        tag_Id: movieTag.dataValues.tag_Id,
                        user_Id: req.user.id
                      });
                    }
                    return userTag.increment(['likesCount'], { by: 1 });
                  })
                  .then(resultss => resolve(resultss))
                  .catch(error => reject(error));
                })
              );
              return Promise.all(tagPromises);
            })
            .then(() => res.status(201).send())
            .catch(error => res.status(500).send(error));
          })
          .catch(error => res.status(500).send(error));
        })
        .catch(error => res.status(500).send(error));
      }
    })
    .catch(err => console.log('Error getting and creating new movie: ', err));
  } else {
    return db.movies.findOne({ where: {
      title: req.body.movie.title,
      year: req.body.movie.year,
      plot: req.body.movie.plot
    } })
    .then((newMovie) => {
      db.userMovies.findOne({ where: {
        user_Id: req.user.id,
        movie_Id: newMovie.dataValues.id
      } })
      .then((userMovie) => {
        if (userMovie === null) {
          db.userMovies.create({
            user_Id: req.user.id,
            movie_Id: newMovie.dataValues.id,
            liked: 1,
            seen: true
          });
        } else {
          userMovie.update({
            liked: db.sequelize.literal('liked + 1'),
            seen: true
          });
        }
      })
      .then(() => {
        db.movieTags.findAll({ where: { movie_Id: newMovie.dataValues.id } })
        .then((movieTags) => {
          const tagPromises = movieTags.map(movieTag =>
            new Promise((resolve, reject) => {
              db.userTags.find({ where: {
                tag_Id: movieTag.dataValues.tag_Id,
                user_Id: req.user.id
              } })
              .then((userTag) => {
                if (userTag === null) {
                  return db.userTags.create({
                    likesCount: 1,
                    tag_Id: movieTag.dataValues.tag_Id,
                    user_Id: req.user.id
                  });
                }
                return userTag.increment(['likesCount'], { by: 1 });
              })
              .then(results => resolve(results))
              .catch(error => reject(error));
            })
          );
          return Promise.all(tagPromises);
        })
        .then(() => res.status(201).send())
        .catch(error => res.status(500).send(error));
      })
      .catch(error => res.status(500).send(error));
    })
    .catch(error => res.status(500).send(error));
  }
};

module.exports.dislikeMovie = (req, res) => {
  console.log('dislikeMovie received: ', req.body.movie);
  if (req.body.fromSearch) {
    const movieUrl = omdbIMDBSearchUrl + req.body.movie.imdbID;
    axios.post(movieUrl)
    .then((results) => {
      const movie = Object.assign({}, results.data, {
        Ratings: JSON.stringify(results.data.Ratings)
      });
      if (movie.Title) {
        return db.movies.findOrCreate({ where: {
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
        } })
        .then((newMovie) => {
          db.userMovies.findOne({ where: {
            user_Id: req.user.id,
            movie_Id: newMovie[0].dataValues.id
          } })
          .then((userMovie) => {
            if (userMovie === null) {
              db.userMovies.create({
                user_Id: req.user.id,
                movie_Id: newMovie[0].dataValues.id,
                liked: -1,
                seen: true
              });
            } else {
              userMovie.update({
                liked: db.sequelize.literal('liked - 1'),
                seen: true
              });
            }
          })
          .then(() => {
            db.movieTags.findAll({ where: { movie_Id: newMovie[0].dataValues.id } })
            .then((movieTags) => {
              const tagPromises = movieTags.map(movieTag =>
                new Promise((resolve, reject) => {
                  db.userTags.find({ where: {
                    tag_Id: movieTag.dataValues.tag_Id,
                    user_Id: req.user.id
                  } })
                  .then((userTag) => {
                    if (userTag === null) {
                      return db.userTags.create({
                        dislikesCount: 1,
                        tag_Id: movieTag.dataValues.tag_Id,
                        user_Id: req.user.id
                      });
                    }
                    return userTag.increment(['dislikesCount'], { by: 1 });
                  })
                  .then(resultss => resolve(resultss))
                  .catch(error => reject(error));
                })
              );
              return Promise.all(tagPromises);
            })
            .then(() => res.status(201).send())
            .catch(error => res.status(500).send(error));
          })
          .catch(error => res.status(500).send(error));
        })
        .catch(error => res.status(500).send(error));
      }
    })
    .catch(err => console.log('Error getting and creating new movie: ', err));
  } else {
    return db.movies.findOne({ where: {
      title: req.body.movie.title,
      year: req.body.movie.year,
      plot: req.body.movie.plot
    } })
    .then((newMovie) => {
      db.userMovies.findOne({ where: {
        user_Id: req.user.id,
        movie_Id: newMovie.dataValues.id
      } })
      .then((userMovie) => {
        if (userMovie === null) {
          db.userMovies.create({
            user_Id: req.user.id,
            movie_Id: newMovie.dataValues.id,
            liked: -1,
            seen: true
          });
        } else {
          userMovie.update({
            liked: db.sequelize.literal('liked - 1'),
            seen: true
          });
        }
      })
      .then(() => {
        db.movieTags.findAll({ where: { movie_Id: newMovie.dataValues.id } })
        .then((movieTags) => {
          const tagPromises = movieTags.map(movieTag =>
            new Promise((resolve, reject) => {
              db.userTags.find({ where: {
                tag_Id: movieTag.dataValues.tag_Id,
                user_Id: req.user.id
              } })
              .then((userTag) => {
                if (userTag === null) {
                  return db.userTags.create({
                    dislikesCount: 1,
                    tag_Id: movieTag.dataValues.tag_Id,
                    user_Id: req.user.id
                  });
                }
                return userTag.increment(['dislikesCount'], { by: 1 });
              })
              .then(results => resolve(results))
              .catch(error => reject(error));
            })
          );
          return Promise.all(tagPromises);
        })
        .then(() => res.status(201).send())
        .catch(error => res.status(500).send(error));
      })
      .catch(error => res.status(500).send(error));
    })
    .catch(error => res.status(500).send(error));
  }
};

// Testing. Not currently used.
module.exports.handleMovieSearchTMDB = (req, res) => {
  let { movieName } = req.body;
  movieName = movieName.replace(regex, '+');
  const searchUrl = theMovieDbUrl + movieName;
  console.log(searchUrl);
  axios.post(searchUrl)
    .then((results) => {
      // Shape the data from The Movie Database into
      // what OMDB API uses
      const movies = results.data.results.map((movie) => {
        const posterUrl =
          movie.poster_path ? theMovieDbPosterUrl + movie.poster_path : '';

        return {
          title: movie.title,
          plot: movie.overview,
          year: movie.release_date.slice(0, 4),
          poster: posterUrl
        };
      });
      res.send(movies);
    })
    .catch(err => res.status(500).send(err));
};

const hydrateLikesAndDislikes = (movies, userId) => {
  const proms = db.userMovies.findAll({
    where: { user_Id: userId },
    include: [{ model: db.movies, as: 'movie' }]
  })
    .then((userMovieRefs) => {
      return movies.map((movie) => {
        const match = userMovieRefs.find(ref => ref.movie.title === movie.title);
        if (match) {
          return Object.assign({}, movie, { liked: match.liked });
        }
        return movie;
      });
    });
  return proms;
};

module.exports.handleMovieSearchOMDB = (req, res) => {
  let { movieName } = req.body;
  movieName = movieName.replace(regex, '+');
  const searchUrl = omdbSearchUrl + movieName;
  console.log('Searching for movies: ', searchUrl);
  axios.post(searchUrl)
    .then((results) => {
      const movieObjects = results.data.Search.map((movie) => {
        return {
          title: movie.Title,
          year: movie.Year,
          poster: movie.Poster,
          imdbID: movie.imdbID,
          liked: 0
        };
      });
      return movieObjects;
    })
    .then(movies => {
      if (req.user) {
        return hydrateLikesAndDislikes(movies, req.user.id);
      }
      return movies;
    })
    .then(hydratedMovies => res.send(hydratedMovies))
    .catch(err => res.status(404).send(err));
};

const reshapeMovieData = movie =>
  Object.assign({}, {
    title: movie.Title,
    poster: movie.Poster,
    plot: movie.Plot,
    rated: movie.Rated,
    year: movie.Year,
    genre: movie.Genre,
    director: movie.Director,
    writer: movie.Writer,
    actors: movie.Actors,
    metascore: movie.Metascore
  });

module.exports.getLargeTileData = (req, res) => {
  console.log('getLargeTileData received: ', req.body.movie);
  const movieUrl = omdbIMDBSearchUrl + req.body.movie.imdbID;
  axios.post(movieUrl)
    .then((results) => {
      console.log('getLargeTileData received: ', results.data);
      const movie = reshapeMovieData(results.data);
      res.send(movie);
    })
    .catch(err => console.log('Error getting movie: ', err));
};

module.exports.verifyUserEmail = (req, res) => {
  const { email } = req.body;
  db.users.findOne({ where: { email } })
    .then((user) => {
      const responseObj = user ? { success: true, email: user.email } : { success: false };
      res.send(responseObj);
    })
    .catch((error) => {
      console.log(`Error finding user by email ${req.body.email}:`, error);
      res.sendStatus(500);
    });
};

module.exports.getMovieNightResults = (req, res) => {
  this.getUserResults(req, res);
};

module.exports.postLaunchPadTags = (req, res) => {
  console.log('postLaunchPadTags sent: ', req.body.selectedTagData);
  const selectedTagData = req.body.selectedTagData;

  axios.post(selectedTagData)
    .then((results) => {
      console.log('postLaunchPadTags received: ', results.data);
      res.sendStatus(200);
    })
    .catch(err => console.log('Error postLaunchPadTags: ', err));
};

module.exports.setSearchedMovieAsSeen = (req, res) => {
  console.log(req.body.movie);
  const movieUrl = omdbIMDBSearchUrl + req.body.movie.imdbID;
    axios.post(movieUrl)
    .then((results) => {
      const movie = Object.assign({}, results.data, {
        Ratings: JSON.stringify(results.data.Ratings)
      });
      return db.movies.findOrCreate({ where: {
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
      } });
    })
    .then((movieFromDb) => {
      return db.userMovies.findOrCreate({
        movie_Id: movieFromDb.id,
        user_Id: req.user.id
      });
    })
    .then((userMovie) => {
      return userMovie.update({ seen: true });
    })
    .then(() => res.sendStatus(200))
    .catch((err) => {
      console.log('Error marking movie seen: ', err);
      res.sendStatus(500);
    });
};

