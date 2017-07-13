require('dotenv').config();
const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME,
  process.env.DB_PASSWORD, {
    host: process.env.DB_URL,
    dialect: 'mysql',
    port: process.env.DB_PORT,
    pool: {
      max: 5,
      min: 0,
      idle: 10000
    }
  }
);

// DATABASE ALL MODELS
// Connects all models to one object
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// MODELS
db.users = require('./models/users.js')(sequelize, Sequelize);
db.movies = require('./models/movies.js')(sequelize, Sequelize);
db.tags = require('./models/tags.js')(sequelize, Sequelize);
db.session = require('./models/session.js')(sequelize, Sequelize);

db.movieTags = sequelize.define('MovieTags', {});
db.userTags = sequelize.define('UserTags', {});
db.userMovies = sequelize.define('UserMovies', {});

// JOIN TABLES
// movie-tag model
db.movieTags.belongsTo(db.movies, { foreignKey: 'movie_Id', constraints: false });
db.movieTags.belongsTo(db.tags, { foreignKey: 'tag_Id', constraints: false });

db.movies.hasMany(db.movieTags, { foreignKey: 'movie_Id', constraints: false });
db.tags.hasMany(db.movieTags, { foreignKey: 'tag_Id', constraints: false });

// user-tag model
db.userTags.belongsTo(db.users, { as: 'user', foreignKey: 'user_Id', constraints: false });
db.userTags.belongsTo(db.tags, { as: 'tag', foreignKey: 'tag_Id', constraints: false });

db.users.hasMany(db.userTags, { foreignKey: 'user_Id', constraints: false });
db.tags.hasMany(db.userTags, { foreignKey: 'tag_Id', constraints: false });

// user-movie model
db.userMovies.belongsTo(db.movies, { as: 'movie', foreignKey: 'movie_Id', constraints: false });
db.userMovies.belongsTo(db.users, { as: 'user', foreignKey: 'user_Id', constraints: false });

db.movies.hasMany(db.userMovies, { foreignKey: 'movie_Id', constraints: false });
db.users.hasMany(db.userMovies, { foreignKey: 'user_Id', constraints: false });

// SYNC
  // sequelize.sync().then((err) => {
  //   if (err) {
  //     console.error('Error creating Tag table', err);
  //   } else {
  //     console.log('Tag table created successfully');
  //   }
  // });

sequelize.authenticate()
  .then(() => {
    console.log('db connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = db;