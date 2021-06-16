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

    //steps to authenticate
    // find the user 

    User.findOne({email:req.body.email}, function(err,user){
        if(err){console.log("Error finding the user entered"); return;}

        //handle user found
        if(user){
            //handle password which doesn't match
            if(user.password != req.body.password){
                return res.redirect('back');

            }else{
                //handle session creation
                res.cookie('user_id',user.id);
                return res.redirect('/user/profile');

            }

            

        }else{
            //handle user not found
            return res.redirect('back');

        }

    });
    
};

