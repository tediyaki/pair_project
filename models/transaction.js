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
    repairman_rating: DataTypes.INTEGER,
    completed: DataTypes.BOOLEAN,
    comment: DataTypes.STRING,
    warranty: DataTypes.DATE,
    booked_at: DataTypes.DATE
  }, {
    sequelize
  });

  Transaction.addHook('afterBulkUpdate', 'averageRating', function(transaksi, option) {
    let self  = this
    let rp_id

    return Transaction.findByPk(transaksi.where.id)
      .then(trans => {
        rp_id = trans.repairman_id
        return Transaction.findAll({
          attributes: [
            [sequelize.fn('SUM', sequelize.col('repairman_rating')), 'total_rating'], 
            [sequelize.fn('COUNT', sequelize.col('repairman_id')), 'total']
          ], 
          where: {
            repairman_id: rp_id
          }
        })
      })    
    .then(tr => {
      console.log(tr)
      let average = Number(tr[0].dataValues.total_rating) / Number(tr[0].dataValues.total)
      
        return self.associations.Repairman.target.update({
            rating: average.toFixed(1)
        }, {
            where: {
                id: rp_id
            }
        })
        
    })
    .then(() => console.log('updated rating avg'))
    .catch(err => console.log(err))
      
  })

  Transaction.addHook('beforeCreate', 'firstCreate', (transaksi, option) => {
    transaksi.completed = false;
    transaksi.repairman_rating = 0;
  })

  return Transaction;
};