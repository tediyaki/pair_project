const express = require('express')
const app = express()
const PORT = 2420

const userRouter = require('./routes/user-route')

app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: false}))

app.use('', userRouter)

app.listen(PORT)