const Post = require('../models/post');
const Comment = require('../models/comments');


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

module.exports.delete = function(req, res){
    Post.findById(req.params.id,function(err,post){
        if(post){
            if(post.user == req.user.id){
                post.remove();
                Comment.deleteMany({post : req.params.id},function(err){
                    return res.redirect('back');
                });
            }else{
                return res.redirect('back');
            }
            
           
        }else{
            return res.redirect('/user/profile');
        }
       
    })

}