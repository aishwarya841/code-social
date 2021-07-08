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
const sassMiddleWare = require('node-sass-middleware');
const  flash = require('connect-flash');
const customMiddleWare = require('./config/middleware');

app.use(sassMiddleWare({
    src : './assets/scss',
    dest : './assets/css',
    outputStyle : 'expanded',
    prefix : '/css',
    debug : true

}));

app.use(express.urlencoded());

//for cookie parser
app.use(cookieParser());
app.use(express.static('./assets'))
//for express-ejs-layouts
app.use(expressLayout);

app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

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

//setting up connect flash msg to show the flash notifications with the help of noty and connect -flash
app.use(flash());

app.use(customMiddleWare.setFlash);



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