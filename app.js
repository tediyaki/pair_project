const express = require('express');
const app = express();
const PORT = 2420;
const moment = require('moment');

const userRouter = require('./routes/user-route');
// const repairmanRouter = require('./routes/repairman-route');

app.set('view engine', 'ejs');
app.use(['/error', '/user/:username/repairman', '/user/:username/dashboard', '/user/login'], express.static('public'));
app.use(express.urlencoded({extended: false}));

app.get('/', (req, res) => {
  res.redirect('/');
});

app.use('/user', userRouter);
// app.use('/', repairmanRouter);

app.get('/error', (req, res) => {
  res.render('error');
});

app.listen(PORT);