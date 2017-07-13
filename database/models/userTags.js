module.exports = (sequelize, DataTypes) => {
  const userTag = sequelize.define('userTags', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false
    },
    viewsCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    picksCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  });

  // Tag.sync().then((err) => {
  //   if (err) {
  //     console.error('Error creating Tag table', err);
  //   } else {
  //     console.log('Tag table created successfully');
  //   }
  // });

  return userTag;
};
