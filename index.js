const express = require('express')
const authRoute = require('./Routes/auth')
const mongoose = require('./Model/database')
const collections = require('./Model/User')
const collection = require('./Model/Product')
const ejs = require('ejs')
const path = require('path')
const app = express()
const session = require('express-session')
const bodyparser = require('body-parser')
const fileUpload = require('express-fileupload')
app.use(fileUpload())

app.use(session({
  secret: "secret",
  resave: false,
  saveUninitialized: false,
}));
app.use(bodyparser.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static('views'))
app.set("view engine", "ejs")

app.set('views', path.join(__dirname, ('./views')));
app.use(express.urlencoded({ extended: true }))
app.use('/', authRoute)
app.use('/', authRoute)

app.listen(5000, () => {
  console.log('server started')
})