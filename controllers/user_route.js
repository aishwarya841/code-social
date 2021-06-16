const User = require('../models/user_schema');

module.exports.user = function(req,res){
    return res.render('user',{
        title:"User Profile"
    });
};

module.exports.signup = function(req, res){
    return res.render('user_signup',{
        title : "Codial | Sign UP"
    });
};

module.exports.signin = function(req, res){
    return res.render('user_signin',{
        title : "Codial | Sign IN"
    });
};

//get the sign up data
module.exports.create = function(req, res){
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }

    User.findOne({email:req.body.email},function(err,user){
        if(err){console.log("Error in find the user email!"); return;}
        if(!user){
            User.create(req.body,function(err,user){
                if(err){
                    console.log("Error while creating the user!")
                    return;
                }
                return res.render('user_signin');

            });
        }else{
            return res.redirect('back');
        }


    });
    
};

//create the user session data
module.exports.createSession = function(req,res){

};

