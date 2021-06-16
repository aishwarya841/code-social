const express = require('express');

const app = express();
const port = 8000;
const expressLayout = require('express-ejs-layouts');
const cookieParser = require('cookie-parser');
const db = require('./config/mongoose');


//for express-ejs-layouts
app.use(expressLayout);
app.set("layout extractScripts", true);
app.set("layout extractStyles", true);


app.use(express.urlencoded());

//for cookie parser
app.use(cookieParser());


//middleware to use router for all the home requests

app.use('/',require('./routes/index'));
app.set('view engine','ejs');
app.set('views','./views');


app.listen(port,function(err){
    if(err){
        console.log(`Error : ${err}`);
        return;
    }
    console.log(`Server running on port : ${port}`);

});