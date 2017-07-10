module.exports = (sequelize, DataTypes) => {
  const Tag = sequelize.define('Tags', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false
    },
    tagName: {
      type: DataTypes.STRING
    }
  });

  // Tag.sync().then((err) => {
  //   if (err) {
  //     console.error('Error creating Tag table', err);
  //   } else {
  //     console.log('Tag table created successfully');
  //   }
  // });

  return Tag;
};
// module.exports = Tag;
