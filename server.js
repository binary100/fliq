require('dotenv').config();
const express = require('express');
const db = require('./database/dbsetup.js');

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const path = require('path');
const router = require('./server/router.js');

const session = require('express-session');
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;

// EXPRESS
const app = express();

<<<<<<< HEAD

// MODELS
// const User = db.users;
// const Movie = db.movies;
// const Tag = db.tags;
// const MovieTag = db.movieTags;
// const UserTag = db.userTags;
// const UserMovie = db.userMovies;

||||||| merged common ancestors
=======
// MODELS
const User = db.users;
const Movie = db.movies;
const Tag = db.tags;
const MovieTag = db.movieTags;
const UserTag = db.userTags;
const UserMovie = db.userMovies;


>>>>>>> rebasing after merge, dbsetup
// MIDDLEWARE
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(morgan('dev'));

app.use(session({ secret: 'Binary Hundred', resave: true, saveUninitialized: false }));

app.use(passport.initialize());
app.use(passport.session());

// ROUTES
app.use(express.static(path.resolve(__dirname, './public')));
app.use('/', router);

// PASSPORT MIDDLEWARE
// Facebook
passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_APP_ID,
  clientSecret: process.env.FACEBOOK_APP_SECRET,
  callbackURL: 'http://localhost:3000/auth/facebook/callback',
  profileFields: ['id', 'displayName', 'photos', 'emails']
},
(accessToken, refreshToken, profile, done) => {
  console.log('this is the facebook returned profile', profile);
  db.users.findOne({ where: { authId: profile.id } })
  .then((user) => {
    if (!user) {
      console.log('Creating new user!!!!!');
      db.users.create({
        name: profile.displayName,
        picture: profile.photos[0].value,
        email: profile.emails[0].value,
        authId: profile.id
      })
      .then(newUser => done(null, newUser))
      .catch(err => console.error('Failed to create user:', err));
    } else {
      console.log('User found and already exists');
      return done(null, user);
    }
  })
  .catch((err) => {
    console.error('Error finding user:', err);
    return done(err);
  });
}));

// Google
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: 'http://localhost:3000/auth/google/callback',
  profileFields: ['id', 'displayName', 'photos', 'emails']
},
(accessToken, refreshToken, profile, done) => {
  console.log('this is the google returned profile', profile);
  db.users.findOne({ where: { authId: profile.id } })
  .then((user) => {
    if (!user) {
      console.log('Creating new user!!!!!');
      db.users.create({
        name: profile.displayName,
        picture: profile.photos[0].value,
        email: profile.emails[0].value,
        authId: profile.id
      })
      .then(newUser => done(null, newUser))
      .catch(err => console.error('Failed to create user:', err));
    } else {
      console.log('User found and already exists');
      return done(null, user);
    }
  })
  .catch((err) => {
    console.error('Error finding user:', err);
    return done(err);
  });
}));

// Serialize and Deserialize user
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  db.users.findById(id)
  .then(user => done(null, user))
  .catch(err => console.error(err));
});

// INITIALIZE
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log('listening ', port);
});

module.exports = app;
