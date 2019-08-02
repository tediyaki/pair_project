'use strict';
const bcrypt = require('bcryptjs')
module.exports = (sequelize, DataTypes) => {
  const Op = sequelize.Sequelize.Op
  class Repairman extends sequelize.Sequelize.Model {
    static associate(models) {
      Repairman.hasMany(models.Transaction, {foreignKey: 'repairman_id'}) 
    }

    static findBySpecialist(query) {
      if (query == undefined || query === "") {
        return this.findAll({
          order: [['rating', 'DESC']]
        })

      } else {
        return this.findAll({
          where: {
            [Op.or]: [
              // {
              //   username: {
              //     [Op.like]: `%${query}`
              //   }
              // }, {
              //   username: {
              //     [Op.like]: `${query}%`
              //   }
              // }, {
              //   username: {
              //     [Op.like]: `%${query}%`
              //   }
              // }, 
              {
                specialist: {
                  [Op.like]: `%${query}`
                }
              }, {
                specialist: {
                  [Op.like]: `${query}%`
                }
              }, {
                specialist: {
                  [Op.like]: `%${query}%`
                }
              }
            ]
          },
          order: [['rating', 'DESC']]
        })

      }
    }
  }
  Repairman.init({
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    specialist: DataTypes.STRING,
    cost: DataTypes.INTEGER,
    available: DataTypes.BOOLEAN,
    rating: DataTypes.FLOAT,
    photo: DataTypes.STRING
  }, {
    sequelize
  });

  Repairman.addHook('beforeCreate', 'saltPass', (rman, options) => {
    let salt = bcrypt.genSaltSync(10);
    rman.password = bcrypt.hashSync(rman.password, salt);
    rman.available = false
    rman.rating = 0
  })

  return Repairman;
};