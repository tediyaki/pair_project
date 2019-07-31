'use strict';
module.exports = (sequelize, DataTypes) => {
  class Repairman extends sequelize.Sequelize.Model {
    static associate(models) {
      Repairman.hasMany(models.Transaction, {foreignKey: 'repairman_id'}) 
    }
  }
  Repairman.init({
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    specialist: DataTypes.STRING,
    cost: DataTypes.INTEGER,
    available: DataTypes.BOOLEAN,
    rating: DataTypes.FLOAT,
    avatar: DataTypes.BLOB
  }, {
    sequelize
  });

  return Repairman;
};