const repairmanModel = require('../models').Repairman;
const Op = require('../models').sequelize.Sequelize.Op

class Repairman {
  static findAll(req, res) {
    if (req.query.q == undefined || req.query.q === "") {
      repairmanModel.findAll()
      .then((data) => {
        // res.send(req.params.username);
        res.render('home', {repairman: data, username: req.params.username});
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
        res.render('home', {repairman: data, username: req.params.username});
      })
      .catch((err) => {
        res.send(err);
      })
    }
  }

  // static registerRepairman(req, res) {
  //   repairmanModel.create(req.body)
  //     .then()
  //     .catch()
  // }

  // static loginRepairman(req, res) {
  //   repairmanModel.findOne({
  //       where: {
  //           username: req.body.username
  //       }
  //   })
  //       .then(user => {
  //           if(!user || (user.password !== hashPass(req.body.password, user.secret))) {
  //               throw Error('wrong username / password')
  //           } else {
  //               res.send('login berhasil')
  //           }
  //       })
  //       .catch(err => res.send(err.message))
  // }
  
}

module.exports = Repairman;