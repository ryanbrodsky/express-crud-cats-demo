const express = require('express');
const methodOverride = require('method-override')
require('dotenv').config()
const app = express();
require('./db-utils/connect')
const catController = require('./controllers/catController')
app.use(express.static("public"))
app.use(methodOverride('_method'))
app.use(require('./middleware/logger'))
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use('/cats', catController)
const port = process.env.PORT || 3000
app.listen(port, ()=>{
    console.log('app running')
})