---
title: 'AIRServer – handling both sockets & websockets in Adobe AIR'
author: 'wouter'
date: 2011-06-09T00:10:00.000Z
cover: ./preview.png
hasCover: false
description: false
layout: post
comments: true
permalink: /2011/06/09/airserver-handling-both-sockets-websockets-in-adobe-air/
tags:
  - Actionscript 3.0
  - AIR
  - html5
---
[In my previous post, I talked about how to handle websockets in Adobe AIR][1]. I’ve written a library around it, which makes it easier to implement in your projects. Another benefit of the library, is you can combine websockets with regular sockets, so you’re able to talk between Adobe AIR, websockets and flash sockets.

![AIRServer Messages Demo](/wp-content/uploads/2011/06/airserver-messages-demo.png "AIRServer Messages Demo")

<!--more-->

First of all, [download the sources containing the library and some demo projects][2]. Import the library project into Flash Builder. Next step could be checking out the demo’s: you’ll need the server demo (MessagesDemoServer), which is an Adobe AIR app.

This MessagesDemoServer example, listens for amf sockets on port 1234 and websockets on port 1235:

``` actionscript
server = new AIRServer();
//add the listening endpoints
server.addEndPoint(new SocketEndPoint(1234, new AMFSocketClientHanderFactory(new NativeObjectSerializer())));
server.addEndPoint(new SocketEndPoint(1235, new WebSocketClientHandlerFactory(new JSONSerializer())));
//add event listeners
server.addEventListener(AIRServerEvent.CLIENT_ADDED, clientAddedHandler, false, , true);
server.addEventListener(AIRServerEvent.CLIENT_REMOVED, clientRemovedHandler, false, , true);
server.addEventListener(MessageReceivedEvent.MESSAGE_RECEIVED, messageReceivedHandler, false, , true);
//start the server
server.start();
```

You’ll also notice the need to specify a “ClientHandler Factory”. This way, you can specify custom object serializers if needed and custom crossdomain xmls (optional). Right now, there’s support for JSON encoding (for text-socket communication like websockets) and native encoding (for communication with flash client sockets).

There are two clients in the examples aswell: an AMF Client (which is basically a flex app to connect & send messages to the server), and a HTML5/Javascript Client (same functionality as the flex application).

<del datetime="2011-06-10T12:00:54+00:00">So, [download & enjoy this library][3] You can report bugs, or send in suggestions in the comments… Stay tuned for some more updates the next couple of days…</del>

[You can find the latest version on github][4]

 [1]: /2011/06/07/handling-websocket-connections-with-adobe-air-serversocket/
 [2]: https://github.com/wouterverweirder/AIR-Server
 [3]: http://labs.aboutme.be/airserver/airserver-0.1.zip
 [4]: https://github.com/wouterverweirder/AIR-Server