const Model = require('../models');
const hashPass = require('../helper/passwordGenerate');
const countDate = require('../helper/momentDate').countDate;
const convertWarranty = require('../helper/momentDate').convertWarranty;
const displayDate = require('../helper/displayDate');

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
            .catch(err => res.render('error', {msg: err.message}))
    }

    static showLoginPage(req, res) {
        // res.send('helo-login')
        res.render('login');
    }
    
    static registerUser(req, res) {
        if(req.body.passwordRegister !== req.body.password_confirmation) {
            res.send("tidak sama")
        } else {
        Model.User.create({
            name: req.body.full_name,
            username: req.body.usernameRegister,
            password: req.body.passwordRegister,
            address: req.body.address,
            email: req.body.email,
        }) 
            .then(() => {
                req.session.currentUser = {                    
                    name: req.body.usernameRegister,
                    role: "user"
                }
                res.redirect(`/user/${req.session.currentUser.name}/dashboard`)
            })
            .catch(err => res.render('login', {err: true, msg: err.message}))
        }
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
                    // res.render('alert', {url: `/user/login`, status: "gagal-login"});
                    throw Error('wrong username / password')
                } else {

                    req.session.currentUser = {
                        id: user.id,
                        name: user.username,
                        role: "user"
                    }

                    res.redirect(`/user/${user.username}/dashboard`)
                    // res.render('alert', {url: `/user/${req.params.username}/home`, status: "success-login"});
                }
            })
            .catch(err => {
  
                res.render('error', {msg: err.message})
                // res.render('alert', {url: `/user/${req.params.username}/login`, status: "gagal-login"});
            })
    }

    static showEditForm(req, res) {
        Model.User.findOne({
            where: {
                username: req.params.username
            }
        })
            .then(user => {
                res.render('edit-user', {user})
            })
            .catch(err => {
                res.render('error', {msg: err.message})
            })       
    }

    static updateUser(req, res) {
        if(req.body.passwordEdit !== req.body.password_confirmation) {
            throw Error('Konfirmasi Password Harus Sesuai')
        } else {
            Model.User.findOne({
                where: {
                    username: req.params.username
                }
            })
            .then((one) => {
                return Model.User.update({
                    name: req.body.full_name,
                    password: hashPass(req.body.passwordEdit, one.secret),
                    address: req.body.address,
                    email: req.body.email,
                    username: req.body.usernameEdit
                }, {
                    where: {
                        username: req.params.username
                    }
                })
            })
            .then(() => {
                req.session.currentUser.name = req.body.usernameEdit
                res.redirect(`/user/${req.body.usernameEdit}/dashboard`)
            })
            .catch(err => res.render('error', {msg: err.message}))
        }
        
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
            console.log(tr.dataValues);
            res.render('dashboard-user', {master: tr, countDate, displayDate});
			// res.send(tr.Transactions.map(x => x.dataValues));
            // res.send(tr.dataValues.Transactions);
            
		})
		.catch(err => {
            console.log(err);
            res.render('error', {msg: err.message})
        })
    }

    static bookRepairman(req, res) {
        if (new Date(req.body.date) - new Date() > 0) {
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
            .then(() => {
                res.render('alert', {url: `/user/${req.params.username}/dashboard/`, status: "pesan-sukses"});
            })
            .catch(err => console.log(err));
        } else {
            res.render('alert', {url: `/user/${req.params.username}/home/`, status: "gagal-tgl"});
        };
    }

    static giveRating(req, res) {
        Model.Transaction.update({
            rating: req.body.rating,
            comment: req.body.comment,
            repairman_rating: +req.body.rating,
            warranty: convertWarranty(21),
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
            res.render('error', {msg: err.message});
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
            res.render('error', {msg: err.message});
        })
    }

    static logout (req, res) {

        req.session.destroy()
        // res.render('alert', {url: `/user/login`, status: "logout"});
        res.redirect('/user/login')
    }
}

module.exports = UserController