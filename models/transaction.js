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

  Transaction.addHook('afterBulkUpdate', 'averageRating', (transaksi, option) => {

      Transaction.findAll({
        attributes: ['repairman_id', [sequelize.fn('SUM', sequelize.col('rating'))/sequelize.fn('COUNT', sequelize.col('rating')), 'avg_rating']]        
      })
  })

  Transaction.addHook('afterCreate', 'firstCreate', (transaksi, option) => {
    transaksi.completed = false;
  })

  return Transaction;
};