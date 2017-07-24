module.exports = (sequelize, DataTypes) => {
  const Trophy = sequelize.define('Trophies', {
    // id: {
    //   type: DataTypes.UUID,
    //   primaryKey: true,
    //   defaultValue: DataTypes.UUIDV4,
    //   allowNull: false
    // },
    trophyNames: {
      type: DataTypes.STRING,
      get() {
        return this.getDataValue('trophyNames').split(';');
      },
      set(val) {
        this.setDataValue('trophyNames', val.join(';'));
      }
    },
    targetNums: {
      type: DataTypes.STRING,
      get() {
        return this.getDataValue('targetNums').split(';').map(Number);
      },
      set(val) {
        this.setDataValue('targetNums', val.join(';'));
      }
    }
  });

  return Trophy;
};
