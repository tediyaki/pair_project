'use strict';
module.exports = (sequelize, DataTypes) => {
  class Repairman extends sequelize.Sequelize.Model {
    static associate(models) {
      Repairman.hasMany(models.Transaction, {foreignKey: 'repairman_id'}) 
    }

    static findBySpecialist(query) {
      if (query == undefined || query === "") {
        return repairmanModel.findAll()
        // .then((data) => {
        //   // res.send(req.params.username);
        //   res.render('home', {repairman: data, username: req.params.username});
        // })
        // .catch((err) => {
        //   res.send(err);
        // })
      } else {
        return repairmanModel.findAll({
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
        // .then((data) => {
        //   res.render('home', {repairman: data, username: req.params.username});
        // })
        // .catch((err) => {
        //   res.send(err);
        // })
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