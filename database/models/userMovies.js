module.exports = (sequelize, DataTypes) => {
  const userMovie = sequelize.define('userMovie', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false
    },
    seen: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    liked: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  });

  // Tag.sync().then((err) => {
  //   if (err) {
  //     console.error('Error creating Tag table', err);
  //   } else {
  //     console.log('Tag table created successfully');
  //   }
  // });

  return userMovie;
};
