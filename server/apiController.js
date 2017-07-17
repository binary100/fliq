const axios = require('axios');
const db = require('../database/dbSetup.js');

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

module.exports.handleLightningSelection = (req, res) => {
  console.log('Lightning selection: ', req.body.movie, 'STUFFS: ', req.body.movies);
  res.sendStatus(201);
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
        .then(movies => res.send(movies))
        .catch(err => res.status(500).send('Error finding movies: ', err));
    });
};

module.exports.getTags = (req, res) => {
  // let tagType;
  // let tagName;
  // let tagData = {tagType: tagName};

  db.tags.findAll()
    .then(results => {
      const tags = results.reduce((acc, val) => {
        if (!acc[val.tagType]) {
          acc[val.tagType] = [];
        }

        acc[val.tagType].push(val.tagName);
        return acc;
      }, {});

      res.send(tags);
    })
    .catch(err => res.status(500).send('Error finding tags: ', err));
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
  const movieUrl = omdbIMDBSearchUrl + req.body.movie.imdbID;
  axios.post(movieUrl)
    .then((results) => {
      console.log('likeMovie received: ', results.data);
      res.sendStatus(200);
    })
    .catch(err => console.log('Error getting movie: ', err));
}

module.exports.dislikeMovie = (req, res) => {
  console.log('dislikeMovie received: ', req.body.movie);
  res.sendStatus(200);
}

// Testing. Not currently used.
module.exports.handleMovieSearchTMDB = (req, res) => {
  let { movieName } = req.body;
  movieName = movieName.replace(regex, '+');
  const searchUrl = theMovieDbUrl + movieName;
  console.log(searchUrl);
  axios.post(searchUrl)
    .then(results => {

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

module.exports.handleMovieSearchOMDB = (req, res) => {
  let { movieName } = req.body;
  movieName = movieName.replace(regex, '+');
  const searchUrl = omdbSearchUrl + movieName;
  console.log('Searching for movies: ', searchUrl);
  axios.post(searchUrl)
    .then(results => {
      console.log('Received: ', results.data.Search);
      const movies = results.data.Search.map((movie) => {
        console.log('Creating movie: ', movie);
        return {
          title: movie.Title,
          year: movie.Year,
          poster: movie.Poster,
          imdbID: movie.imdbID
        };
      });

      res.send(movies);
    })
    .catch(err => res.status(404).send([]));
};


const reshapeMovieData = movie => {
  return Object.assign({}, {
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
};

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






/*

{
    "vote_count": 5351,
    "id": 1891,
    "video": false,
    "vote_average": 8.2,
    "title": "The Empire Strikes Back",
    "popularity": 3.812604,
    "poster_path": "/6u1fYtxG5eqjhtCPDx04pJphQRW.jpg",
    "original_language": "en",
    "original_title": "The Empire Strikes Back",
    "genre_ids": [
        12,
        28,
        878
    ],
    "backdrop_path": "/amYkOxCwHiVTFKendcIW0rSrRlU.jpg",
    "adult": false,
    "overview": "The epic saga continues as Luke Skywalker, in hopes of defeating the evil Galactic Empire, learns the ways of the Jedi from aging master Yoda. But Darth Vader is more determined than ever to capture Luke. Meanwhile, rebel leader Princess Leia, cocky Han Solo, Chewbacca, and droids C-3PO and R2-D2 are thrown into various stages of capture, betrayal and despair.",
    "release_date": "1980-05-17"
}
*/

/*

{
    "vote_count": 5351,
    "id": 1891,
    "video": false,
    "vote_average": 8.2,
    "title": "The Empire Strikes Back",
    "popularity": 3.812604,
    "poster_path": "/6u1fYtxG5eqjhtCPDx04pJphQRW.jpg",
    "original_language": "en",
    "original_title": "The Empire Strikes Back",
    "genre_ids": [
        12,
        28,
        878
    ],
    "backdrop_path": "/amYkOxCwHiVTFKendcIW0rSrRlU.jpg",
    "adult": false,
    "overview": "The epic saga continues as Luke Skywalker, in hopes of defeating the evil Galactic Empire, learns the ways of the Jedi from aging master Yoda. But Darth Vader is more determined than ever to capture Luke. Meanwhile, rebel leader Princess Leia, cocky Han Solo, Chewbacca, and droids C-3PO and R2-D2 are thrown into various stages of capture, betrayal and despair.",
    "release_date": "1980-05-17"
}
*/

