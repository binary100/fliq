module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('Users', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING
    },
    picture: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING
    }
  });
  return User;
};
