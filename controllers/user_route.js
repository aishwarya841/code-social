const User = require('../models/user_schema');
const Post = require('../models/post');
const Comment = require('../models/comments');


module.exports.user = async function(req,res){

    try{

    }catch(err){
        console.log(err);
    }
  
    let posts  =  await Post.find({})
    .populate('user')
    .populate({
      path: 'comments',
      // Get friends of friends - populate the 'friends' array for every friend
      populate: { path: 'user' }
    });

    let users = await User.find({});

    return res.render('user',{
        title:"User Profile",
        user : res.locals.user,
        posts : posts,
        all_users : users
    });
            
        
        
   
};

module.exports.profile = async function(req,res){
    try{

        let user = await User.findById(req.params.id);
        return res.render('profile',{
            profileUser:user,
        });
    }catch(err){
        console.log(err);
    }
    
}




module.exports.signup = function(req, res){
    if(req.isAuthenticated()){
        return res.redirect('/user/profile');
    }
    return res.render('user_signup',{
        title : "Codial | Sign UP"
    });
};

module.exports.signin = function(req, res){
    if(req.isAuthenticated()){
        return res.redirect('/user/profile');
    }
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
    return res.redirect('/user/profile');

};

// to destroy the session

module.exports.destroySession = function(req, res){
    req.logout();
    return res.redirect('/');

}





