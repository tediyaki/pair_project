const express = require('express')
const app = express()
const PORT = 2420

app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: false}))

app.listen(PORT)