const express = require('express');
const env = require('dotenv').load();
const db = require('./database/dbsetup.js');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const path = require('path');
const router = require('./server/router.js');

// MODELS
const Movie = require('./database/models/movies.js');
const User = require('./database/models/users.js');
const Tag = require('./database/models/tags.js');
const User_Movie = require('./database/models/User_Movie.js');
const Movie_Tag = require('./database/models/Movie_Tag.js');
const User_Tag = require('./database/models/User_Tag.js');

// EXPRESS
const app = express();

// MIDDLEWARE
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(morgan('dev'));


// ROUTES
app.use(express.static(path.resolve(__dirname, './public')));
app.use('/', router);


// INITIALIZE
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log('listening ', port)
});

module.exports = app;
