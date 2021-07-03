const Comment = require('../models/comments');
const Post = require('../models/post');

module.exports.createComment = function(req,res){
    Post.findById(req.body.post,function(err, post){
        if(err){
            console.log("Error in finding the post");
            return;
        }

        if(post){
            Comment.create(
                {
                    content: req.body.content,
                    post : req.body.post,
                    user : req.user._id

                },function(err,comment){
                    if(err){
                        console.log("Not able to create comment");
                        return;
                    }

                    if(comment){
                        post.comments.push(comment);
                        post.save();
                        return res.redirect('/user/profile');
                    }
                }
            )
        }
    });
   
}

module.exports.deleteComment = function(req,res){
    Comment.findById(req.params.id,function(err,comment){
        if(comment){
            if(comment.user == req.user.id){
                let postId = comment.post;
                comment.remove();
                Post.findByIdAndUpdate(postId,{$pull : {comments : req.params.id}},function(err,post){
                    return res.redirect('back');
                });
            }
        }

    });

}