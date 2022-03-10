const express = require('express');
const methodOverride = require('method-override');
const session = require('express-session');
require('dotenv').config()
const app = express();
require('./db-utils/connect')
const catController = require('./controllers/catController')
const userController = require('./controllers/userController')
app.use(express.static("public"))
app.use(methodOverride('_method'))
app.use(require('./middleware/logger'))
const isLoggedIn = require('./middleware/isLoggedIn')
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))


app.use('/cats', isLoggedIn, catController)
app.use('/users', userController)

const port = process.env.PORT || 3000
app.listen(port, ()=>{
    console.log('app running')
})