const repairmanModel = require('../models').Repairman;
const {or, and, gt, lt} = require('../models').sequelize.Sequelize.Op

class Repairman {
  static findAll(req, res) {
    repairmanModel.findAll()
    .then((data) => {
      // res.send(data);
      res.render('repairman', {repairman: data});
    })
    .catch((err) => {
      res.send(err);
    })
  }

  static findSome(req, res) {
    // repairmanModel.findAll({
    //   where: {
    //     [or]: [
    //       {username: {
    //         [Op.like]: req.query
    //       }}
    //     ]
    //   }
    // })
    res.send(req.query);
  }
}

module.exports = Repairman;