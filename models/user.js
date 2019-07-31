'use strict';
module.exports = (sequelize, DataTypes) => {
  class User extends sequelize.Sequelize.Model {
    static associate(models) {
      User.hasMany(models.Transaction, {foreignKey: 'user_id'})
    }
  }
  User.init({
    name: DataTypes.STRING,
    password: DataTypes.STRING,
    address: DataTypes.STRING,
    email: DataTypes.STRING,
    avatar: DataTypes.BLOB,
    active: DataTypes.BOOLEAN
  }, {
    sequelize
  });

  return User;
};