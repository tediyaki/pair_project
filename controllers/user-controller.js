const Model = require('../models');
const hashPass = require('../helper/passwordGenerate');
const nodemailer = require('nodemailer');
const countDate = require('../helper/countDate');
const displayDate = require('../helper/displayDate');
const session = require('express-session')

class UserController {

    static verificationEmail(req, res) {
        Model.User.findOne({
            where: {
                username: req.params.username
            }
        })
            .then((u) => {
                if(u.token === req.params.token) {
                    return Model.User.update({
                        active: true
                    }, {
                        where: {
                            username: req.params.username
                        }
                    })
                } else {
                    throw Error('Please verify through your email')
                }                
            })
            .then(() => res.send('Verifikasi Berhasil'))
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
        // let uname = "PGriff"
        // let pass = "peter123"

        Model.User.findOne({
            where: {
                username: req.body.username
            }
        })
            .then(user => {
                if(!user || (user.password !== hashPass(req.body.password, user.secret))) {
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
                    res.redirect(`/user/${user.username}/dashboard`)
                }
            })
            .catch(err => {
                console.log('wrong username/pass')
                res.send(err.message)
            })
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
                include: [Model.Repairman],
            }],
            order: [
                [Model.Transaction, 'completed', 'ASC'],
                [Model.Transaction, 'booked_at', 'DESC']
            ]
        })
		.then(tr => {
            console.log(tr.dataValues.Transactions);
            res.render('dashboard-user', {master: tr, countDate, displayDate});
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
            // console.log(`/user/${req.params.username}/dashboard/`);
            res.render('alert', {url: `/user/${req.params.username}/dashboard/`, status: "pesan-sukses"});
        })
        .catch(err => console.log(err));
    }

    static giveRating(req, res) {
        Model.Transaction.update({
            rating: req.body.rating,
            comment: req.body.comment,
            repairman_rating: +req.body.rating,
            warranty: new Date(),
            completed: true
        }, {
            where: {
                id: req.body.transaction_id,
                completed: false
            }
        })
        .then(() => {
            res.render('alert', {url: `/user/${req.params.username}/dashboard/`, status: "terimakasih"});
        })
        .catch(err => {
            console.log(err);
            res.send(err);
        })
    }

    static deleteHistory(req, res) {
        Model.Transaction.destroy({
            where: {
                id: req.params.transaction_id,
            }
        })
        .then(() => {
            res.render('alert', {url: `/user/${req.params.username}/dashboard/`, status: "hapus-berhasil"});
        })
        .catch((err) => {
            res.send(err);
        })
    }

    static logout (req, res) {
        req.session.destroy();
        console.log(req.session)
        res.redirect('/home')
    }
}

module.exports = UserController