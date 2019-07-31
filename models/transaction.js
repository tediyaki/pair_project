'use strict';
const Model = require('./')
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
    repairman_rating: DataTypes.INTEGER,
    completed: DataTypes.BOOLEAN,
    comment: DataTypes.STRING,
    warranty: DataTypes.DATE
  }, {
    sequelize
  });

  Transaction.addHook('afterBulkUpdate', 'averageRating', (transaksi, option) => {
    console.log(transaksi)
    return Transaction.findAll({
      attributes: [[sequelize.fn('SUM', sequelize.col('repairman_rating')), 'total_rating'], [sequelize.fn('COUNT', sequelize.col('repairman_id')), 'total']]

    }, {
        where: {
            repairman_id: transaksi.repairman_id
        }
    })
    .then(tr => {
        let average = Number(tr[0].dataValues.total_rating) / Number(tr[0].dataValues.total)

        return Model.Repairman.update({
            rating: average
        }, {
            where: {
                id: transaksi.repairman_id
            }
        })
        
    })
    .then(() => console.log(updated))
    .catch(err => console.log(err))
      
  })

  Transaction.addHook('beforeCreate', 'firstCreate', (transaksi, option) => {
    transaksi.completed = false;
  })

  return Transaction;
};