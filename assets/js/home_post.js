
{
    //method to get the form data to the ajax
    let createPost = function(){
        let newPostForm = $("#new-post-form");
        newPostForm.submit(function(e){
            e.preventDefault();
            
            $.ajax({
                type : 'post',
                url : '/posts/createPost',
                data : newPostForm.serialize(),
                success : function(data){
                    let newPost = newPostDom(data.data.post);
                    $('#post-content-container>ul').prepend(newPost);
                    deletePost($(' .deletePostButton',newPost))
                   
                },error : function(err){
                    console.log(err.responseText);

                }

            })

        });
    }

    //method to create a post in the dom

    let newPostDom = function(post){
        return $(`<li id="post- ${post._id}"><p>
        ${post.content}
        <small>${post.user.name}</small>
        <a class="deletePostButton" href="/posts/delete/${post._id}">Delete</a>
        
    </p>
    </li>`)
    }


    //Method to delete the post from the DOM
    let deletePost  = function(deleteLink){
        $(deleteLink).click(function(e){

            alert("hello")
            e.preventDefault();

            $.ajax({
                type : 'get',
                url : $(deleteLink).prop('href'),
                success : function(data){
                    $(`#post-${data.data.post_id}`).remove();


                },error : function(error){

                }

            });

        });
    }

    createPost();

    

}