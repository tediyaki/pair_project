const Model = require('../models');
const hashPass = require('../helper/passwordGenerate');
const nodemailer = require('nodemailer');
const countDate = require('../helper/countDate');
const session = require('express-session')

class UserController {

    static verificationEmail(req, res) {
        User.update({
            active: true
        }, {
            where: {
                username: req.params.username
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
            email: 'iskandar.teddy93@gmail.com',
            username: 'akuuserbaru'
        }) 
            .then(() => res.send('berhasil register'))
            .catch(err => res.send(err.message))
    }

    static loginUser(req, res) {
        let uname = "PGriff"
        let pass = "peter123"
        console.log('mulai login')
        Model.User.findOne({
            where: {
                username: uname
            }
        })
            .then(user => {
                if(!user || (user.password !== hashPass(pass, user.secret))) {
                    throw Error('wrong username / password')
                } else {
                    console.log(req.session)
                    req.session.currentUser = {
                        id: user.id,
                        name: user.username,
                        role: "user"
                    }
                    console.log(req.session)
                    console.log('berhasil login')
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
            res.render('dashboard-user', {master: tr, countDate});
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
                warranty: 30,
                booked_at: new Date(req.body.date)
            });
        })
        .then(x => {
            res.render('alert', {username: req.params.username, status: 'success'});
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

    static logout (req, res) {
        req.session.destroy();
        res.redirect('/home')
    }
}

module.exports = UserController