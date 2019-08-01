const express = require('express');
const app = express();
const PORT = 2420;
const session = require('express-session')
const moment = require('moment');

const userRouter = require('./routes/user-route');
// const repairmanRouter = require('./routes/repairman-route');

app.set('view engine', 'ejs');
app.use(session({
  secret: 'FuRniTur3S3v1Ce',
  resave: false,
  saveUninitialized: true
}))

app.use(['/error', '/user/:username/repairman', '/user/:username/dashboard', '/user/login'], express.static('public'));
app.use(express.urlencoded({extended: false}));

app.get('/', (req, res) => {
  if(req.session.currentUser) {
    res.redirect(`/user/${req.session.currentUser.name}/dashboard`)
  } else {
    res.redirect('user/login')
  }
});

app.use('/user', userRouter);
// app.use('/', repairmanRouter);

app.get('/error', (req, res) => {
  res.render('error');
});

app.listen(PORT);