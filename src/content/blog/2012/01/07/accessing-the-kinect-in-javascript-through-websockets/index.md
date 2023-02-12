---
title: Accessing the kinect in javascript through websockets
author: 'wouter'
pubDate: "2012-01-07T00:10:00.000Z"
heroImage: ./preview.jpg
hasCover: true
description: ""

comments: true
permalink: /2012/01/07/accessing-the-kinect-in-javascript-through-websockets/
categories:
  - Uncategorized
tags:
  - AIR
  - airkinect
  - AIRServer
  - as3nui
  - canvas
  - html5
  - js
  - kinect
  - threejs
---
Good morning all! (or evening, night, … depending on when you read this post of course). As you might know, I’ve been working on AIRKinect ([as3nui.com][1]) and I’ve got a side project AIRServer aswell (which allows you to setup air as a socket server, including websocket support).

Wouldn’t it be fun, to combine these two projects in a demo, so you can access the kinect information through a websocket? That’s exactly what I did. You run a desktop application on your computer, which is responsible for accessing the kinect, and exposing the skeleton information over a websocket. Using a javascript client, which supports websockets, you can connect to that server, and use the skeleton information in the javascript client :-)

In this demo, I’m just rendering the skeleton points in a canvas element, using three.js.

I’ve [uploaded the sources and included binary installers][2] for the desktop application (windows 7, OSX Lion). What you’ll need to do is install & launch the desktop application, and click on the “start server” button to listen for websocket connections on the given port. Make sure you’ve got the kinect sdk installed on your computer (windows) or openni on OSX.

Using the [javascript client][3], you connect to your ip (if you’re testing on the same ip, 127.0.0.1 should be fine), and you can start dancing in the canvas element :-).

 [1]: http://www.as3nui.com   "AS3Nui"
 [2]: http://labs.aboutme.be/airserver/airkinect-socket-server-0.1.zip "Download the sources & binaries for the airkinect websocket server"
 [3]: http://labs.aboutme.be/airserver/kinect/  "Javascript client"