const repairmanModel = require('../models').Repairman;
const Op = require('../models').sequelize.Sequelize.Op
const bcrypt = require('bcryptjs')

class Repairman {
  static findAll(req, res) {
    // res.send(req.body);
    repairmanModel.findBySpecialist(req.query.q, req.query.by)
      .then((data) => {
        res.render('home', {repairman: data, username: req.params.username});
      })
      .catch((err) => {
        res.send(err);
      })
  }

  static registerRepairman(req, res) {
    repairmanModel.create(req.body)
      .then(() => res.send('berhasil register'))
      .catch()
  }

  static loginRepairman(req, res) {
    repairmanModel.findOne({
        where: {
            username: req.body.username
        }
    })
        .then(rman => {
            if(!rman || bcrypt.compareSync(req.body.password, rman.password)) {
              throw Error('wrong username / password')
            } else {
                req.session.currentUser = {
                    id: rman.id,
                    name: rman.username,
                    role: "repairman"
                }
          
                res.redirect(`/repairman/${user.username}/dashboard`)
            }
        })
        .catch(err => res.send(err.message))
  }
  
  static showDashboard(req, res) {
    repairmanModel.findOne({
      where: {
        username: req.params.username
      }
    })
    .then((data) => {
      res.render('dashboard-repairman', {data});
      // res.send(data.photo)
    })
    .catch((err) => {
      console.log(err);
      res.send(err);
    })
  }
}

module.exports = Repairman;