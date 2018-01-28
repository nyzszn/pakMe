<?php
header('Content-type:application/json');

function createPost()
{
    $post = R::dispense('posts');
    //require all needed elements
    $post_title = requiredInPost('post_title');
    $post_content = requiredInPost('post_content');
    $dateCreated = date('Y-m-d H:i:s'); //date
    $status = 1;//status


   // use redbean to set properties
    $post->post_title = $post_title;
    $post->post_content = $post_content;
    $post->post_date = $dateCreated;
    $post->status = $status;



    
    //store in a database table and return in id variable
    $created = R::store($post);

    if ($created) {
        echo json_encode(array(
            'status' => 'success',
            'message' => 'Post created'
        ));
        exit();
    }
    else {
        echo json_encode(array(
            'status' => 'failed',
            'message' => 'Post cannot be created'
        ));
        exit();
    }
}

function getAllPosts(){
    getAll('posts');
}

function getPostById($id = "")
{
    getById('posts', $id);
}



function updatePost($id = "")
{
    findIfRecordExists('posts', $id);
    $post_title = requiredInPost('post_title');
    $post_content = requiredInPost('post_content');

    $customQuery = "UPDATE posts SET post_title = '$post_title', post_content = '$post_content' WHERE id = '$id'";

    $update = R::exec($customQuery);
    if ($update) {
        echo json_encode(array(
            'status' => 'success',
            'message' => 'Post Updated'
        ));
        exit();
    }
    else {
        echo json_encode(array(
            'status' => 'failed',
            'message' => 'Post has not been updated'
        ));
        exit();
    }
}

function deletePost($id=""){
    deleteRecord('posts', $id);
}


?>