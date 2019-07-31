const repairmanModel = require('../models').Repairman;

class Repairman {
  static findAll(req, res) {
    repairmanModel.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.send(err);
    })
  }
}

module.exports = Repairman;