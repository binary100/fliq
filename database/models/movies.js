// SEED DATA
  //   const movieTestData = {
  //     title: "Star Wars: Episode IV - A New Hope",
  //     year: "1989",
  //     rated: "PG"
  //     genre: "Action, Adventure, Fantasy",
  //     plot:"Luke Skywalker joins forces with a Jedi Knight, a cocky pilot, a wookiee and two droids to save the galaxy from the Empire's world-destroying battle-station, while also attempting to rescue Princess Leia from the evil Darth Vader.",
  //     poster: "https://images-na.ssl-images-amazon.com/images/M/MV5BYzQ2OTk4N2QtOGQwNy00MmI3LWEwNmEtOTk0OTY3NDk2MGJkL2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyNjc1NTYyMjg@._V1_SX300.jpg",
  //     director: "George Lucas",
  //     writer: "George Lucas",
  //     actors:"Actors":"Mark Hamill, Harrison Ford, Carrie Fisher, Peter Cushing"
  //   };

  //   const Sequelize = require('sequelize');
  //   const db = require('../dbsetup.js');
  //   const Tag = require('./tags.js');
  //   const User = require('./users.js');
module.exports = (sequelize, DataTypes) => {
  const Movie = sequelize.define('Movies', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false
    },
    title: {
      type: DataTypes.STRING
    },
    year: {
      type: DataTypes.STRING
    },
    rated: {
      type: DataTypes.STRING
    },
    genre: {
      type: DataTypes.STRING
    },
    plot: {
      type: DataTypes.STRING
    },
    ratings: {
      type: DataTypes.STRING
    },
    trailer: {
      type: DataTypes.STRING
    },
    poster: {
      type: DataTypes.STRING
    },
    director: {
      type: DataTypes.STRING
    },
    writer: {
      type: DataTypes.STRING
    },
    actors: {
      type: DataTypes.STRING
    }
  });
  return Movie;
};
