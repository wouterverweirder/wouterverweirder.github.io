---
title: Playing videos from YouTube
author: 'wouter'
date: 2006-10-11T00:10:00.000Z
cover: ./preview.png
hasCover: false
description: false
layout: post
comments: true
permalink: /2006/10/11/playing-videos-from-youtube/
tags:
  - Actionscript 2.0
---
Just finished a little experiment to load flv’s from YouTube into your own swf files…

Every YouTube video has a unique id. You can find this id, using the public YouTube API. However, you’ll need more than this simple id to play the video’s in your own flash/flex/… application.  
<!--more-->

  
If you take a closer look to the source code on a YouTube page, playing a video, you will find something like this in the source code:

``` js
// <![CDATA[
var fo = new SWFObject("/player2.swf?video_id=lejN7Ulh10s&l=149&t=OEgsToPDskIn_fJRn5UCNu_UAHkEu6jJ", "movie_player", "450", "370", 7, "#FFFFFF");
fo.write("playerDiv");
// ]]>
```

You can see it adds some more variables after the video\_id parameter. These parameters are needed to retrieve the flv itself. What you could do in flash, is retrieve the html source of a video with the given video\_id, so a search in the retrieved source and retrieve the full video id. If you have a video object on the stage, you could then play the video using this object:

``` actionscript
import mx.utils.Delegate;
function loadYoutubeVideo(id:String):Void{
    this.youtube_flv._visible = false;
    var test_xml:XML = new XML();
    test_xml.onData = Delegate.create(this, youtubeHtmlData);
    test_xml.load("http://www.youtube.com/watch?v="+id);
}
function youtubeHtmlData(src:String):Void{
    var args:String = src.substr(src.indexOf('video_id=') + 9);
    args = args.substr(, args.indexOf("'"));
    this.ns.play("http://www.youtube.com/get_video?video_id="+args);
}
function statusChanged(infoObject:Object):Void{
    if(infoObject.code == "NetStream.Buffer.Empty"){
        scaleToVideoDimensions();
    }
}
function scaleToVideoDimensions():Void{
    this.youtube_flv._width = this.youtube_flv.width;
    this.youtube_flv._height = this.youtube_flv.height;
    this.youtube_flv._visible = true;
}
Stage.align = "TL";
Stage.scaleMode = "noScale";
this.nc = new NetConnection();
this.nc.connect(null);
this.ns = new NetStream(this.nc);
this.ns.onStatus = Delegate.create(this, statusChanged);
this.ns.onMetaData = Delegate.create(this, metaDataRecieved);
this.youtube_flv.attachVideo(this.ns);
loadYoutubeVideo("ogIqayRDr4w");
```

[You can download the working fla source here.][1]

I had to use the NetStream object on a video object on stage, for some reason I couldn’t get this to work with the default FLVPlayback component… Also, the width and height of the movie aren’t specified in the flv metadata from youtube, so I retrieved those values another way (onStatus event, when Buffer is empty) If you run it outside of the authoring environment, you will also get a security sandbox warning… Maybe somebody knows a workaround for this in this application?

 [1]: /wp-content/uploads/2008/01/youtubefla.zip ""