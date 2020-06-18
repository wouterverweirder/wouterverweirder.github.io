---
title: extending MovieClip
author: 'wouter'
date: 2006-09-20T00:10:00.000Z
cover: ./preview.png
hasCover: false
description: false
layout: post
comments: true
permalink: /2006/09/20/extending-movieclip/
tags:
  - Actionscript 2.0
---
Have you ever tried extending the MovieClip class? The standard way is to create your actionscript class extending from MovieClip, adding a MovieClip symbol to the library, setting a Linkage Identifier and specify the Actionscript 2 class. To create an instance of your class on the stage, you have to use attachMovie(). Problems of this method are: it requires a great deal of “work” to create class file, create library symbol & set it up and your code is more difficult to port between projects (recreate the library stuff in each projects). However, there are ways to extend MovieClip, without using the library directly.

<!--more-->

**classic way**

We start with a basic MyRectangle class

``` actionscript
class MyRectangle extends MovieClip {
    private var __width:Number;
    private var __height:Number;
    public function set width(value:Number) {
        __width = value;
        draw();
    }
    public function get width():Number {
        return __width;
    }
    public function set height(value:Number) {
        __height = value;
        draw();
    }
    public function get height():Number {
        return __height;
    }
    public function MyRectangle() {
        trace("created MyRectangle instance");
    }
    public function onLoad():Void {
        trace("loaded");
        __width = (width) ? width : 100;
        __height = (height) ? height : 100;
        draw();
    }
    public function draw():Void {
        clear();
        moveTo(, );
        beginFill(0x000000, 100);
        lineTo(width, );
        lineTo(width, height);
        lineTo(, height);
        lineTo(, );
        endFill();
    }
}
```

To start, we use the classic way:

1.  create a new movieclip symbol in your library
2.  right click, choose linkage and fill in the linkage identifier & Actionscript 2 class (MyRectangle)
3.  drag an instance of the MyRectangle MovieClip on your stage

By default, it will create a 100×100 rectangle on the stage. Notice the constructor and onLoad event and the order of (auto) execution when you run the swf…

**getting rid of the library symbol**

Now, we’re gonna get rid of the library symbol. We don’t want to create empty library symbols for each class extending MovieClip. We will use attachMovie to create an instance of our MyRectangle class. However, as we don’t have a linked library item, we can’t use attachMovie… or can we?

When a linked class is compiled into the swf, it gets a linkage name of “__Packages.” followed by the full package name and class name. We can do this trough code aswell! By linking that linkage name to the class constructor, using Object.registerClass, we can use attachMovie again…

``` actionscript
class MyRectangle extends MovieClip {
    static var symbolName:String = "__Packages.MyRectangle";
    static var symbolOwner:Function = MyRectangle;
    static var symbolLinked = Object.registerClass(symbolName, symbolOwner);
    private var __width:Number;
    private var __height:Number;
    //...
}
```

We now use attachMovie on our main timeline to create an instance of our rectangle class:

``` actionscript
this.attachMovie(MyRectangle.symbolName, "rectangle_mc", this.getNextHighestDepth());
```

Hooray! We don’t have a library item anymore! But I still don’t like the attachMovie outside of our class. Instead, you could write a static create method, that does the attachMovie and returns an instance of our MyRectangle. You could also [pass a parameter object][1] to the function…

``` actionscript
public static function create(container:MovieClip, initObj:Object):MyRectangle{
    container.attachMovie(symbolName, "rectangle_mc", container.getNextHighestDepth(), initObj);
    return MyRectangle(container["rectangle_mc"]);
}
```

To create a rectangle, you could use:

``` actionscript
var rect = MyRectangle.create(this, {_x:100, _y:100, height:200});
```

Using this method, you could create classes extending from eachother and MovieClip as the root class. I’m thinking about adding eventdispatching to all your MovieClips, basic animations (flyTo(x,y)),…

Enjoy!

 [1]: /2006/09/12/passing-arguments-through-parameter-objects/