const User = require('../models/user_schema');
const Post = require('../models/post');

module.exports.home = function(req,res){
    Post.find({}).populate("user").exec(function(err,content){
        if(err){
            console.log("Error finding in post!")
            return res.redirect('back');
        }


        return res.render('home',{
                title:"Home Page",
                user : res.locals.user,
                posts : content
            });
        
    })
}