module.exports = (sequelize, DataTypes) => {
  const Movie = sequelize.define('Movies', {
    // id: {
    //   type: DataTypes.UUID,
    //   primaryKey: true,
    //   defaultValue: DataTypes.UUIDV4,
    //   allowNull: false
    // },
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
