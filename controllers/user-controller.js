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

    // static updateUser(req, res) {
    //     Model.User.update()
    // }

    static showHistory(req, res) {
        Model.User.findOne({
            where: {
                username: 'teddylagi'
            },
            include: [Model.Transaction]
        })
            .then(tr => res.send(tr))
            .catch(err => res.send(err))
    }

    // static updateTransaction

    // static readTransaction(req, res) {
    //     Model.Transaction.findAll({
    //         where: {
    //             id: req.params.id,
    //             include: {
                    
    //             }
    //         }
    //     })
    // }
}

module.exports = UserController