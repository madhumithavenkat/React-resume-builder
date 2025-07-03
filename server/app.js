require('dotenv').config({ path: "./conf.env" });
const express = require('express');
const app = express();
const bodyparser = require('body-parser')


const resume = require('./routes/resume')
const user = require('./routes/user')
const refresh = require('./routes/refresh')
const globalErrorHandler = require('./controller/errorController')
const corsOptions = require('./config/corsOptions')
const credentials= require('./middleware/credentials')
var cookieParser = require('cookie-parser')

var cors = require('cors');

app.use(credentials);

app.use(cors({
    origin: 'https://resume-builder-client-seven.vercel.app',
    methods: ['GET','POST','PUT','DELETE','OPTIONS'],
    allowedHeaders: ['Content-Type','Authorization']
}));


app.use(bodyparser.json());

app.use(cookieParser())



app.use(function (req, res, next) {
    console.log("Request: ", req);

    // Website you wish to allow to connect
    

    // // Request methods you wish to allow
    // res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE,OPTIONS');

    // // Request headers you wish to allow
    // res.setHeader('Access-Control-Allow-Headers', "Origin, X-Requested-With, Content-Type, Accept");

    // // Set to true if you need the website to include cookies in the requests sent
    // // to the API (e.g. in case you use sessions)
    //res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});



app.use('/resume',resume)
app.use('/user',user)
app.use('/refresh',refresh)

app.use(globalErrorHandler)


module.exports = app;

