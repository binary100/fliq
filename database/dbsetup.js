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
    },
    logging: false
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
db.trophies = require('./models/trophies.js')(sequelize, Sequelize);

db.userMovies = require('./models/userMovies.js')(sequelize, Sequelize);
db.userTags = require('./models/userTags.js')(sequelize, Sequelize);
db.userTrophies = require('./models/userTrophies.js')(sequelize, Sequelize);

db.movieTags = sequelize.define('MovieTags', {});

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

// user-trophy model
db.userTrophies.belongsTo(db.trophies, { as: 'trophy', foreignKey: 'trophy_Id', constraints: false });
db.userTrophies.belongsTo(db.users, { as: 'user', foreignKey: 'user_Id', constraints: false });

db.trophies.hasMany(db.userTrophies, { foreignKey: 'trophy_Id', constraints: false });
db.users.hasMany(db.userTrophies, { foreignKey: 'user_Id', constraints: false });

db.movies.afterCreate((movie) => { // add Tags and connects tags to movie
  const acc = [];
  acc.push(...movie.dataValues.genre.split(', ').map(item => [item, 'genre']));
  acc.push(...movie.dataValues.director.split(', ').map(item => [item, 'director']));
  acc.push(...movie.dataValues.actors.split(', ').splice(0, 3).map(item => [item, 'actor']));
  Promise.all(acc.map(movieTagArray =>
    new Promise((resolve, reject) =>
      db.tags.findOrCreate({ where: {
        tagName: movieTagArray[0],
        tagType: movieTagArray[1]
      } })
      .then((foundTag) => {
        db.movieTags.findOrCreate({ where: {
          movie_Id: movie.id,
          tag_Id: foundTag[0].dataValues.id
        } })
        .then(movieTag => resolve(movieTag));
      })
      .catch(error => reject(error))
    )
  ));
});

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
