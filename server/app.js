const express = require('express');
const app = express();
const bodyparser = require('body-parser')


const resume = require('./routes/resume')
//const user = require('./routes/user')
const globalErrorHandler = require('./controller/errorController')

var cors = require('cors');
app.use(cors());

app.use(bodyparser.json());

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE,OPTIONS');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', "Origin, X-Requested-With, Content-Type, Accept");

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});



app.use('/resume',resume)
//app.use('/users',user)

app.use(globalErrorHandler)


module.exports = app;

