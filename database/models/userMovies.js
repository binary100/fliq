module.exports = (sequelize, DataTypes) => {
  const userMovie = sequelize.define('userMovie', {
    // id: {
    //   type: DataTypes.UUID,
    //   primaryKey: true,
    //   defaultValue: DataTypes.UUIDV4,
    //   allowNull: false
    // },
    seen: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    liked: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  });

  return userMovie;
};
