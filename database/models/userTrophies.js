module.exports = (sequelize, DataTypes) => {
  const userTrophy = sequelize.define('userTrophies', {
    // id: {
    //   type: DataTypes.UUID,
    //   primaryKey: true,
    //   defaultValue: DataTypes.UUIDV4,
    //   allowNull: false
    // },
    hasTrophies: {
      type: DataTypes.STRING,
      get() {
        return this.getDataValue('hasTrophies').split(';').map(Number);
      },
      set(val) {
        this.setDataValue('hasTrophies', val.join(';'));
      }
    },
    trophyCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  });

  return userTrophy;
};
