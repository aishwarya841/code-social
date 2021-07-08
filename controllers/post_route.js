// const Post = require('../models/post');
// const Comment = require('../models/comments');


// module.exports.createContent = function(req,res){
//     Post.create({
//         content :req.body.content,
//         user : req.user._id
//     },function(err,content){
//         if(err){
//             req.flash("error",err);
//             return;
//         }
//         req.flash("success","Post Created!");
//         return res.redirect('/user/profile');

//     });
// }

// module.exports.delete = function(req, res){
//     Post.findById(req.params.id,function(err,post){
//         if(post){
//             if(post.user == req.user.id){
//                 post.remove();
//                 req.flash("success","Post Deleted!");
//                 Comment.deleteMany({post : req.params.id},function(err){
//                     return res.redirect('back');
//                 });
//             }else{
//                 return res.redirect('back');
//             }
            
           
//         }else{
//             req.flash("error","Post can't be Deleted!");
//             return res.redirect('/user/profile');
//         }
       
//     })

// }
const Post = require('../models/post');
const Comment = require('../models/comments');

module.exports.createContent = async function(req, res){
    try{
        let post = await Post.create({
            content: req.body.content,
            user: req.user._id
        });
        
        if (req.xhr){
            return res.status(200).json({
                data: {
                    post: post
                },
                message: "Post created!"
            });
        }

        req.flash('success', 'Post published!');
        return res.redirect('back');

    }catch(err){
        req.flash('error', err);
        return res.redirect('back');
    }
  
}


module.exports.delete = async function(req, res){

    try{
        let post = await Post.findById(req.params.id);

        if (post.user == req.user.id){
            post.remove();

            await Comment.deleteMany({post: req.params.id});


            if (req.xhr){
                return res.status(200).json({
                    data: {
                        post_id: req.params.id
                    },
                    message: "Post deleted"
                });
            }

            req.flash('success', 'Post and associated comments deleted!');

            return res.redirect('back');
        }else{
            req.flash('error', 'You cannot delete this post!');
            return res.redirect('back');
        }

    }catch(err){
        req.flash('error', err);
        return res.redirect('back');
    }
    
}