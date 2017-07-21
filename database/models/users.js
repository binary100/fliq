module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('Users', {
    name: {
      type: DataTypes.STRING
    },
    picture: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING
    },
    authId: {
      type: DataTypes.STRING
    },
    loginNumber: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    reView: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    watchedMovieId: {
      type: DataTypes.INTEGER,
      defaultValue: null
    },
    watchedMovieTitle: {
      type: DataTypes.STRING,
      defaultValue: null
    }
  });
  return User;
};
