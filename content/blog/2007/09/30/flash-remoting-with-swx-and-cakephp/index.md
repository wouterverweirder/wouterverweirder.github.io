---
title: flash remoting with SWX and CakePHP
author: 'wouter'
date: 2007-09-30T00:10:00.000Z
cover: ./preview.jpg
hasCover: true
description: false
layout: post
comments: true
permalink: /2007/09/30/flash-remoting-with-swx-and-cakephp/
tags:
  - Actionscript 2.0
  - cakephp
  - cakeswxphp
  - Flash
  - swx
---
So, you want to learn how to create a sexy blog in flash, creating posts, comments, database storage, …? Are you afraid of spending hours writing complex queries, parsing XML data or writing loads of php files? Don’t be, and see the power of [cakephp][1] and [SWX][2] combined. CakePHP being a rapid development framework for PHP and SWX, the native data format for the flash platform!<!--more-->

If you don’t have a running webserver with PHP + mysql + phpmyadmin yet, you’ll have to install these packages first.

*   Windows users can [install WAMP][3], which will install these packages at once on your development machine.
*   Mac users can [install MAMP][4], which does the same (there is a MAMP bundle on swxformat, but we won’t use this one, as we’ll need to copy SWX to another directory anyway to work with cakephp).

When you have your webserver set up, we’ll [download the latest version of cakephp][5]. Unzip it to you webroot (WAMP default: C:\wamp\www – MAMP default: /Applications/MAMP/htdocs) and rename the unzipped directory to “flashblog”. You now have the following file structure:

*   WWW
*   flashblog
*   app
*   cake
*   docs
*   index.php
*   vendors

If you are deploying on a webserver, make sure the app/tmp/ directory and it’s subdirectories are writeable (chmod 777).

After that, we’ll add [cakeswxphp][6] to our cake install. [Download cakeswxphp][6] and unzip it somewhere on your computer. Copy/Paste the content of the app and vendors dir of cakeswxphp to the same directories of your flashblog directory. If you did everything correctly, you can point your browser to: [http://localhost/flashblog/explorer/][7]. This opens the SWX Service Explorer. Set the amf path to `http://localhost/flashblog/amf.php` (default).

This should give you an overview of the remoting services, which we can call via flash. Right now, the only service is amfphp/discovery_service…

Now that we have cakephp & cakeswxphp installed, we will setup our database for our blog. Point your browser to the phpMyAdmin on your development machine (WAMP default: http://localhost/phpmyadmin – MAMP default: http://localhost/phpMyAdmin/).

Using phpmyadmin, create a new database called “flashblog”.

![Create Database](/wp-content/uploads/2007/09/afbeelding-1.png "Create Database")

Execute the following SQL to create the tables for our blog:

```
CREATE TABLE `comments` (
`id` INT(11) NOT NULL AUTO_INCREMENT,
`created` datetime NOT NULL,
`modified` datetime NOT NULL,
`post_id` INT(11) NOT NULL,
`nickname` VARCHAR(64) NOT NULL,
`title` VARCHAR(64) NOT NULL,
`content` text NOT NULL,
PRIMARY KEY  (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ; CREATE TABLE `posts` (
`id` INT(11) NOT NULL AUTO_INCREMENT,
`created` datetime NOT NULL,
`modified` datetime NOT NULL,
`nickname` VARCHAR(64) NOT NULL,
`title` VARCHAR(64) NOT NULL,
`content` text NOT NULL,
PRIMARY KEY  (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;
```

That’s it, our database is set up! Now it is time to write our cakephp classes to work with our database…

First of all, we need to tell cakephp how to access our database. Rename flashblog/app/config/database.php.default to database.php and open it in your favorite text/php editor. You can adjust the database configuration in the $default var in this file. In my case, it looks like this:

``` php
var $default = array('driver' => 'mysql',
    'connect' => 'mysql_connect',
    'host' => 'localhost',
    'login' => 'root',
    'password' => 'root',
    'database' => 'flashblog',
    'prefix' => '');
```

If you point your browser to http://localhost/flashblog/ you should get the message that cake is able to connect to the database. If not, check your database settings again in flashblog/app/config/database.php.

So, we can connect to our database. Now we’ll define our post and comment models in php so that cakephp knows how to read and write posts and comments to the database. We could use the cake bake script to do this, but right now we’ll just write the code ourselves.

First of all, we’ll adjust the default model. Create app_model.php in flashblog/app/ with the following contents:

``` php
<?php
class AppModel extends Model {
     function beforeSave(){
        if(!empty($this->data)){
            while(!empty($this->data[$this->name])
                     && !empty($this->data[$this->name][$this->name])
                     && is_object($this->data[$this->name][$this->name])){
                $this->data[$this->name] = get_object_vars($this->data[$this->name][$this->name]);
            }
        }
        if(!empty($this->data[$this->name][$this->primaryKey])){
            eval('$this->' . $this->primaryKey . ' =  $this->data[$this->name][$this->primaryKey];');
        }
        return true;
  }
}
?>
```

Now, we can define our post and comments models. Create a file called post.php in flashblog/app/models/:

``` php
<?php
class Post extends AppModel {
    var $name = 'Post';
    var $hasMany = array(
            'Comment' =>
                array('className' => 'Comment',
                        'foreignKey' => 'post_id',
                        'dependent' => true
                ),
    );
}
?>
```

Then, create comment.php in that same directory (flashblog/app/models/) :

``` php
<?php
class Comment extends AppModel {
    var $name = 'Comment';
    var $belongsTo = array(
            'Post' =>
                array('className' => 'Post',
                        'foreignKey' => 'post_id'
                ),
    );
}
?>
```

CakePHP now knows how to read and write posts and related comments to the database! Next, we will create our remoting methods (cake controllers) which we will call from flash.

Create posts_controller.php in flashblog/app/controllers:

``` php
<?php
class PostsController extends AppController {
    var $name = 'Posts';
    var $uses = array('Post');
    function getPosts() {
        return $this->Post->findAll();
    }
    function getPost($id) {
        return $this->Post->read(null, $id);
    }
    function savePost($post) {
        if($this->Post->save($post)) {
            return $this->Post->id;
        }else{
            return false;
        }
    }
    function deletePost($id) {
        if($this->Post->del($id)) {
            return true;
        }else{
            return false;
        }
    }
}
?>
```

Then, create the controller for our comments (flashblog/app/controller/comments_controller.php):

``` php
<?php
class CommentsController extends AppController {
    var $name = 'Comments';
    var $uses = array('Comment');
    function saveComment($comment) {
        if($this->Comment->save($comment)) {
            return $this->Comment->id;
        }else{
            return false;
        }
    }
    function deleteComment($id) {
        if($this->Comment->del($id)) {
            return true;
        }else{
            return false;
        }
    }
}
?>
```

And here ends the PHP side of our flash blog. Let’s have some fun with Flash & ActionScript, shall we?

Launch up flash and create a new fla (Actionscript 2). Save it somewhere as “flashblog.fla”. Now we’ll write the methods to read/write/delete blogposts and comments. SWX remoting doesn’t really need extra classes (you loadMovie your data), but using the classes makes you code a lot smaller and easier to write. So [download the SWX ActionScript library][8] and extract the “org” folder to the same directory as your flashblog.fla file.

When you’ve got the org folder in the same folder as your flashblog.fla file, go back to your flashblog.fla file, select frame one and open the actions panel. We’ll start with importing the SWX class and setting up our gateway:

```
import org.swxformat.*;
var swx:SWX = new SWX();
swx.gateway = "http://localhost/flashblog/swx.php";
swx.encoding = "POST";
```

Now we can write our actionscript functions to communicate with our swx php classes. The following function sends a new post to our php class, which inserts it in the database:

```
/**
* function to create a new post
*/
function createPost(nickname:String, title:String, content:String):Void{
    var callDetails:Object = {
        serviceClass: "PostsController",
        method: "savePost",
        args: [nickname, title, content],
        result: [this, savePostResultHandler]
    }
    swx.call(callDetails);
}
/**
* called when the post was saved
*/
function savePostResultHandler(resultObj:Object):Void{
    trace(resultObj.result); //nr of saved post or false when failed
}
```

That’s all it takes. No query writing. No XML parsing. No complex php files…  
Now, let’s complete our actionscript code with the other functions to communicate with php:

```
//we import the SWX classes
import org.swxformat.*;
//create a new SWX instance
var swx:SWX = new SWX();
//location of the SWX gateway
swx.gateway = "http://localhost/flashblog/swx.php";
//we'll transfer data using POST.
swx.encoding = "POST";
/**
*get all posts from the server
*/
function getPosts():Void{
    var callDetails:Object = {
        serviceClass: "PostsController",
        method: "getPosts",
        result: [this, getPostsResultHandler]
    }
    swx.call(callDetails);
}
/*
* called when we receive the posts from the server
*/
function getPostsResultHandler(resultObj:Object):Void{
    var posts_length:Number = resultObj.result.length;
    for(var i:Number = ; i < posts_length; i++){
        var post:Object = resultObj.result[i];
        trace(post.Post.title);
        trace(post.Post.content);
    }
}
/**
*get a post with given id
*/
function getPost(id:Number):Void{
    var callDetails:Object = {
        serviceClass: "PostsController",
        method: "getPost",
        args: [id],
        result: [this, getPostResultHandler]
    }
    swx.call(callDetails);
}
/*
* called when we receive the posts from the server
*/
function getPostResultHandler(resultObj:Object):Void{
    trace(resultObj.result.Post.title);
    trace(resultObj.result.Comment);
}
/**
* function to create a new post
*/
function createPost(nickname:String, title:String, content:String):Void{
    var callDetails:Object = {
        serviceClass: "PostsController",
        method: "savePost",
        args: [{Post: {nickname: nickname, title: title, content: content}}],
        result: [this, savePostResultHandler]
    }
    swx.call(callDetails);
}
/**
* function to edit a post
*/
function editPost(id:Number, nickname:String, title:String, content:String):Void{
    var callDetails:Object = {
        serviceClass: "PostsController",
        method: "savePost",
        args: [{Post: {id: id, nickname: nickname, title: title, content: content}}],
        result: [this, savePostResultHandler]
    }
    swx.call(callDetails);
}
/**
* called when the post was saved
*/
function savePostResultHandler(resultObj:Object):Void{
    trace(resultObj.result); //nr of saved post or false when failed
}
/*
* called when we receive the posts from the server
*/
function getPostResultHandler(resultObj:Object):Void{
    trace(resultObj.result.Post.title);
    var comments_length:Number = resultObj.result.Comment.length;
    for(var i:Number = ; i < comments_length; i++){
        var comment:Object = resultObj.result.Comment[i];
        trace(comment.title);
        trace(comment.content);
    }
}
/**
*delete a post with given id
*/
function deletePost(id:Number):Void{
    var callDetails:Object = {
        serviceClass: "PostsController",
        method: "deletePost",
        args: [id],
        result: [this, deletePostResultHandler]
    }
    swx.call(callDetails);
}
/*
* called when we receive the posts from the server
*/
function deletePostResultHandler(resultObj:Object):Void{
    trace(resultObj.result);
}
/**
* function to create a new comment
*/
function createComment(post_id:Number, nickname:String, title:String, content:String):Void{
    var callDetails:Object = {
        serviceClass: "CommentsController",
        method: "saveComment",
        args: [{Comment: {post_id: post_id, nickname: nickname, title: title, content: content}}],
        result: [this, saveCommentResultHandler]
    }
    swx.call(callDetails);
}
/**
* function to edit a comment
*/
function editComment(id:Number, post_id:Number, nickname:String, title:String, content:String):Void{
    var callDetails:Object = {
        serviceClass: "CommentsController",
        method: "saveComment",
        args: [{Comment: {id: id, post_id: post_id, nickname: nickname, title: title, content: content}}],
        result: [this, saveCommentResultHandler]
    }
    swx.call(callDetails);
}
/**
* called when the comment was saved
*/
function saveCommentResultHandler(resultObj:Object):Void{
    trace(resultObj.result); //nr of saved post or false when failed
}
/**
*delete a comment with given id
*/
function deleteComment(id:Number):Void{
    var callDetails:Object = {
        serviceClass: "CommentsController",
        method: "deleteComment",
        args: [id],
        result: [this, deleteCommentResultHandler]
    }
    swx.call(callDetails);
}
/*
* called when we receive the posts from the server
*/
function deleteCommentResultHandler(resultObj:Object):Void{
    trace(resultObj.result);
}
```

You can test the functions by calling them manually through AS code. The next thing todo is create a gui to show posts, edit posts, etc. But that’s beyond the scope of this tutorial…

Happy flashing!

[1]: http://www.cakephp.org
[2]: http://swxformat.org
[3]: http://www.wampserver.com/en/
[4]: http://sourceforge.net/projects/mamp
[5]: http://cakephp.org/downloads
[6]: /cakeswxphp
[7]: http://localhost/flashblog/explorer/
[8]: http://swxformat.org/download/