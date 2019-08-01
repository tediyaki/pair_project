const express = require('express');
const app = express();
const PORT = 2420;
const session = require('express-session')
const moment = require('moment');

app.set('view engine', 'ejs');

const userRouter = require('./routes/user-route');
const repairmanRouter = require('./routes/repairman-route');

app.use(session({
  secret: 'FuRniTur3S3v1Ce',
  resave: false,
  saveUninitialized: true
}))

app.use(['/error', '/user/:username/repairman', '/user/:username/dashboard', '/user/login'], express.static('public'));
app.use(express.urlencoded({extended: false}));

app.get('/', (req, res) => {
  res.send(req.sessionID)
  // res.redirect('/');
});

app.use('/user', userRouter);
app.use('/repairman', repairmanRouter);

app.get('/error', (req, res) => {
  res.render('error');
});

app.listen(PORT);