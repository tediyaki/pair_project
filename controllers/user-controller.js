const Model = require('../models')
const hashPass = require('../helper/passwordGenerate')

class UserController {

    static showLoginPage(req, res) {
        res.send('helo-login')
    }

    static showRegisterPage(req, res) {
        res.send('helo-register')
    }

    static registerUser(req, res) {
        Model.User.create({
            name: 'teddy',
            password: 'tedy123',
            address: 'Jalan S I M',
            email: 'teddy123@mail.com',
            username: 'teddylagi'
        }) 
            .then()
            .catch(err => res.send(err.message))
    }

    static loginUser(req, res) {
        Model.User.findOne({
            where: {
                username: req.body.username
            }
        })
            .then(user => {
                if(!user || (user.password !== hashPass(req.body.password, user.secret))) {
                    throw Error('wrong username / password')
                } else {
                    res.send('login berhasil')
                }
            })
            .catch(err => res.send(err.message))
    }

    static showEditForm(req, res) {
        res.send('ini edit form')
    }

    static updateUser(req, res) {
        Model.User.update(req.body)
    }

    static showHistory(req, res) {
        Model.User.findOne({
            where: {
                username: 'manbill12'
            },
            include: [{
                model: Model.Transaction,
                include: [Model.Repairman]
            }]
        })
            .then(tr => res.send(tr))
            .catch(err => res.send(err))
    }

    static bookRepairman(req, res) {
        Model.Transaction.create({
            user_id: 11,
            repairman_id: 3,
            item: 'lemari'
        })
    }

    static giveRating(req, res) {
        Model.Transaction.update({
            rating: 5,
            completed: true,
        }, {
            where: {
                user_id: 11,
                repairman_id: 3,
                completed: false || null
            }
        })
            .then(a => {
                console.log(a, "berhasil diupdate")
                res.send('diupdate')
            })
            .catch(err => res.send(err))
    }

    static findAVG(req, params) {
        Model.Transaction.findAll({
            attributes: ['repairman_id', [Model.sequelize.fn('SUM', Model.sequelize.col('rating'))/Model.sequelize.fn('COUNT', Model.sequelize.col('rating')), 'avg_rating']]        
          }, {
              where: {
                  id: 1
              }
          })
          .then(tr => res.send(tr))
    }
}

module.exports = UserController