const repairmanModel = require('../models').Repairman;
const Op = require('../models').sequelize.Sequelize.Op

class Repairman {
  static findAll(req, res) {
    if (req.query.q == undefined || req.query.q === "") {
      repairmanModel.findAll()
      .then((data) => {
        // res.send(req.params.username);
        res.render('repairman', {repairman: data, username: req.params.username});
      })
      .catch((err) => {
        res.send(err);
      })
    } else {
      repairmanModel.findAll({
        where: {
          [Op.or]: [
            {
              username: {
                [Op.like]: `%${req.query.q}`
              }
            }, {
              username: {
                [Op.like]: `${req.query.q}%`
              }
            }, {
              username: {
                [Op.like]: `%${req.query.q}%`
              }
            }, {
              specialist: {
                [Op.like]: `%${req.query.q}`
              }
            }, {
              specialist: {
                [Op.like]: `${req.query.q}%`
              }
            }, {
              specialist: {
                [Op.like]: `%${req.query.q}%`
              }
            }
          ]
        }
      })
      .then((data) => {
        res.render('repairman', {repairman: data, username: req.params.username});
      })
      .catch((err) => {
        res.send(err);
      })
    }
  }

  
}

module.exports = Repairman;