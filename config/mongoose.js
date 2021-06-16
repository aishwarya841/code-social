const mongoose = require('mongoose');
//connection to the db
mongoose.connect('mongodb://localhost/code-social-development');
// taking the connetion link with the database
const db = mongoose.connection;

db.on('error',console.error.bind(console,"Error while connecting to DB"));

db.once('open',function(){
    console.log("DB is running successfully");
});

module.exports = db;