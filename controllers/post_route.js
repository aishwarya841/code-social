const Post = require('../models/post');
module.exports.createContent = function(req,res){
    Post.create({
        content :req.body.content,
        user : req.user._id
    },function(err,content){
        if(err){
            console.log("Error while creating the content!")
            return;
        }
        return res.redirect('/user/profile');

    });
}