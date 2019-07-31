const Model = require('../models')
const hashPass = require('../helper/passwordGenerate')
const nodemailer = require('nodemailer')

class UserController {

    static verificationEmail(req, res) {
        User.update({
            active: true
        }, {
            where: {
                id: req.query.id
            }
        })
            .then(() => res.send('email berhasil diaktivasi'))
            .catch(err => res.send(err))
    }

    static showLoginPage(req, res) {
        // res.send('helo-login')
        res.render('login');
    }
    
    static showRegisterPage(req, res) {
        res.send('helo-register')
        // res.render('login');
    }

    static registerUser(req, res) {
        Model.User.create({
            name: 'Jake',
            password: 'jake123',
            address: 'Jalan S I M',
            email: 'jake12@mail.com',
            username: 'jak3beam'
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

    static showDashboard(req, res) {
        // console.log(req.params.username)
        Model.User.findOne({
            where: {
                username: req.params.username
            },
            include: [{
                model: Model.Transaction,
                include: [Model.Repairman]
            }]
        })
		.then(tr => {
            console.log(tr.dataValues.Transactions);
            res.render('dashboard-user', {master: tr});
			// res.send(tr.Transactions.map(x => x.dataValues));
            // res.send(tr.dataValues.Transactions);
            
		})
		.catch(err => {
            console.log(err);
            res.send(err)
        })
    }

    static bookRepairman(req, res) {
        Model.User.findOne({
            where: {
                username: req.body.username
            }
        })
        .then((one) => {
            return Model.Transaction.create({
                user_id: one.id,
                repairman_id: req.body.repairman_id,
                item: req.body.specialist,
                booked_at: new Date(req.body.date)
            });
        })
        .then(x => {
            res.render('alert', {status: 'success'});
        })
        .catch(err => console.log(err));
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
}

module.exports = UserController