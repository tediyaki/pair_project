'use strict';
module.exports = (sequelize, DataTypes) => {
  const Op = sequelize.Sequelize.Op
  class Repairman extends sequelize.Sequelize.Model {
    static associate(models) {
      Repairman.hasMany(models.Transaction, {foreignKey: 'repairman_id'}) 
    }

    static findBySpecialist(query) {
      if (query == undefined || query === "") {
        return this.findAll()

      } else {
        return this.findAll({
          where: {
            [Op.or]: [
              {
                username: {
                  [Op.like]: `%${query}`
                }
              }, {
                username: {
                  [Op.like]: `${query}%`
                }
              }, {
                username: {
                  [Op.like]: `%${query}%`
                }
              }, {
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
          }
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
    avatar: DataTypes.BLOB
  }, {
    sequelize
  });

  return Repairman;
};