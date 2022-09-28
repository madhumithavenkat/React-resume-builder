const dotenv = require('dotenv')
const mongoose = require('mongoose')
const app = require('./app')

dotenv.config({ path : './config.env'})

mongoose.connect('mongodb://localhost:27018/resume');

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  console.log("connectio open");
});


app.listen(8010, function () {
  console.log('Example app listening on port 3000!');
});