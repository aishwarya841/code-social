const passport = require('passport');
const User = require('../models/user_schema');

const passportStrategy = require('passport-local').Strategy;

//telling the passport to use new local strategy
passport.use(new passportStrategy(
    {
    usernameField : 'email',
    passReqToCallback : true

    },
    function(req, email,password,done){
        User.findOne({email : email},function(err,user){
            if(err){
                req.flash("error","Error in Sign IN, Please type correct Username and Password!");
                return done(err);
            }
            if(!user || user.password != password){
                req.flash("error","Error in Sign IN, Please type correct Username and Password!");
                return done(null,false);
            }
            return done(null,user);
        })
    }
))

//serializing the user
passport.serializeUser(function(user,done){
    done(null,user.id);
});

//deserializing the user

passport.deserializeUser(function(id,done){
    User.findById(id,function(err,user){
        if(err){
            console.log("Error in finding the user --> Passport");
            return done(err);
        }
        return done(null,user);
    })
});

//check if user is authenticated

passport.checkAuthentication = function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    //if user is not authenticated

    return res.redirect('/user/sign-in');
}

//set authenticated user to locals for view

passport.setAuthenticatedUser  = function(req, res, next){
    //setting the authenticated user to locals for app
    if(req.isAuthenticated()){
        res.locals.user = req.user;
    }
    next();
}
   



module.exports = passport;
