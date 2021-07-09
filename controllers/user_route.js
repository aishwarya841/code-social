const User = require('../models/user_schema');
const Post = require('../models/post');
const Comment = require('../models/comments');


module.exports.user = async function(req,res){

    try{

    }catch(err){
        console.log(err);
    }
  
    let posts  =  await Post.find({})
    .sort('-createdAt')
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
            userId : req.params.id
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
    req.flash("success","Logged in successfully");


    return res.redirect('/user/profile');

};

// to destroy the session

module.exports.destroySession = function(req, res){
    req.logout();
    req.flash("success","Logged out successfully");
    return res.redirect('/');

}

module.exports.update = async function(req,res){
    if(req.user.id == req.params.id){
        try{
            let user = await User.findByIdAndUpdate(req.params.id);
            User.uploadedAvatar(req,res,function(err){
                if(err){console.log(err);return res.redirect('back');}

                user.email = req.body.email;
                console.log(req.body)
                if(req.file){
                    //Saving the path of the uploaded file in the user document
                    console.log(req.file);
                    user.avatar = User.avatarPath+"/"+req.file.filename;

                }
                user.save();
                return res.redirect('back');


            });

        }catch(err){
            req.flash('error',err);
            return res.redirect('back');

        }
        
    }else{
        req.flash('error','Unauthorized');
        return res.redirect('back');
    }
}





