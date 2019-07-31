'use strict';
module.exports = (sequelize, DataTypes) => {
  class Transaction extends sequelize.Sequelize.Model {
    static associate(models) {
      Transaction.belongsTo(models.User, {foreignKey: 'user_id'})
      Transaction.belongsTo(models.Repairman, {foreignKey: 'repairman_id'})
    }
  }
  Transaction.init({
    user_id: DataTypes.INTEGER,
    repairman_id: DataTypes.INTEGER,
    item: DataTypes.STRING,
    rating: DataTypes.INTEGER,
    completed: DataTypes.BOOLEAN,
    comment: DataTypes.STRING,
    warranty: DataTypes.DATE
  }, {
    sequelize
  });

  return Transaction;
};