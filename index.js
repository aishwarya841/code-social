const express = require('express');

const app = express();
const port = 8000;
const expressLayout = require('express-ejs-layouts');
const cookieParser = require('cookie-parser');
const db = require('./config/mongoose');
const session = require('express-session');
const passport  = require('passport');
const localStrategy = require('./config/passport-local-strategy');
const MongoStore = require('connect-mongo')(session);

app.use(express.urlencoded());

//for cookie parser
app.use(cookieParser());

//for express-ejs-layouts
app.use(expressLayout);
app.set("layout extractScripts", true);
app.set("layout extractStyles", true);

//for session cookie
app.use(session({
    name : 'code-social',
    secret : "blahsomething",
    saveUninitialized : false,
    resave : false,
    cookie : {
        maxAge : (1000 * 60 * 1000)
    },

    //store the session in the database using mongostore
    store : new MongoStore(
        {
            mongooseConnection : db,
            autoRemove : 'disabled'
        },function(err){
            console.log(err || 'Connected to Mongo Store');
        }
    )

}));

//initialize passport

app.use(passport.initialize());

//start session on passport
app.use(passport.session());

//set authenticated User

app.use(passport.setAuthenticatedUser);




//middleware to use router for all the home requests

app.use('/',require('./routes/index'));

//set up the views
app.set('view engine','ejs');
app.set('views','./views');


app.listen(port,function(err){
    if(err){
        console.log(`Error : ${err}`);
        return;
    }
    console.log(`Server running on port : ${port}`);
});