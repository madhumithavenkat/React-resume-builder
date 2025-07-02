const dotenv = require('dotenv')
const mongoose = require('mongoose')
const app = require('./app')

dotenv.config({ path : './config.env'})

mongoose.connect('mongodb+srv://maddyvenkat04:l7CFxg0Wjf0GeFXw@maddy-projects.ualindq.mongodb.net/resume?retryWrites=true&w=majority&appName=maddy-projects');

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  console.log("connection open");
});


app.listen(8010, function () {
  console.log('App listening on port 8010!');
});