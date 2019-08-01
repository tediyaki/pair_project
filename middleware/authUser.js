const session = require('express-session')

function userAuthentication(req, res, next) {
    if(req.session.currentUser && req.params.username === req.session.currentUser.name && req.session.currentUser.role === 'user') {
        console.log('boleh masuk')
        next()
    } else {
        console.log("username di link ", req.params.username)
        console.log('lol salah', req.session.currentUser)
        res.redirect('/home')
    }
}

function userAlreadyLogin(req, res, next) {
    if(req.session.currentUser) {
        console.log('udah login')
        res.redirect(`/user/${req.session.currentUser.name}/dashboard`)
    } else {
        console.log('blom login', req.session)
        next()
    }
}

module.exports = {
    userAuthentication,
    userAlreadyLogin
}