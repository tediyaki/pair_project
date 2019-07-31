const express = require('express');
const app = express();
const PORT = 2420;

const userRouter = require('./routes/user-route');
const repairmanRouter = require('./routes/repairman-route');

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({extended: false}));

app.get('/', (req, res) => {
  res.redirect('/repairman');
});
app.use('/user', userRouter);
app.use('/repairman', repairmanRouter);

app.listen(PORT);