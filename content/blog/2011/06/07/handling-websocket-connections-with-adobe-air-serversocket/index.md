---
title: Handling websocket connections with Adobe AIR ServerSocket
author: 'wouter'
date: 2011-06-07T00:10:00.000Z
cover: ./preview.png
hasCover: false
description: false
layout: post
comments: true
permalink: /2011/06/07/handling-websocket-connections-with-adobe-air-serversocket/
tags:
  - Actionscript 3.0
  - AIR
  - html5
---
Since Adobe AIR 2.0, you can create your own socket-servers, using the flash.net.ServerSocket class. This makes it easy to hook external applications to your AIR applications, for example to create a game (server) with multiple devices as game controllers (socket clients).

<!--more-->

With an adobe air serversocket, most of the time, the clients will be other flash-based applications (swfs or native apps built with Adobe AIR). HTML5 introduced the concept of websockets: a way to create your own socket connections from an html page (using javascript) to a server. You’ll need to implement the right protocol to handle these connections, but with some work, you’re able to create an html/js mobile controller for an Adobe AIR application. Big advantage here is you don’t need to install a native application, you can just surf to a url, and start sending data between your client and your server.

**Server side**

First of all, I’ll go through the code on the server. I assume you’ve created an Adobe AIR 2.0 (or higher) project in your AS editor of choice. First of all, you’ll need to create an instance of the ServerSocket class and hook up some event listeners:

``` actionscript
serverSocket = new ServerSocket();
serverSocket.addEventListener(ServerSocketConnectEvent.CONNECT, clientConnectHandler, false, , true);
serverSocket.bind(1235);
serverSocket.listen();
```

Whenever a client connects, I create an instance of an own-written client handler class, which will manage the connected client. I manage all clienthandlers in a global clientHandlers array.

``` actionscript
private function clientConnectHandler(event:ServerSocketConnectEvent):void
{
   var clientHandler:ClientHandler = new ClientHandler(event.socket);
   clientHandler.addEventListener(Event.CLOSE, clientHandlerCloseHandler, false, , true);
   clientHandlers.push(clientHandler);
}
```

The clienthandler instances, manage all communication between the server and the client. This is where some of the websocket-specific stuff comes in: the first message the server receives, is a handshake. We’ll need to send back a specific message to the client, otherwise the client will drop the connection with the server. [Read more about websockets and this handshake mechanism on wikipedia.][1]

We listen for data in this clientHandler class:

``` actionscript
public function ClientHandler(socket:Socket)
{
   this.socket = socket;
   socket.addEventListener(ProgressEvent.SOCKET_DATA, socketDataHandler, false, , true);
}
```

And inside this socketDataHandler, we’ll find the handshake logic:

``` actionscript
private function socketDataHandler(event:ProgressEvent):void
{
   if(socket.bytesAvailable > )
   {
      if(!firstRequestProcessed)
      {
         firstRequestProcessed = true;
         var message:String = socketBytes.readUTFBytes(socketBytes.bytesAvailable);
         if(message.indexOf("GET ") == )
         {
            var messageLines:Array = message.split("\n");
            var fields:Object = {};
            var requestedURL:String = "";
            for(var i:uint = ; i < messageLines.length; i++)
            {
               var line:String = messageLines[i];
               if(i == )
               {
                  var getSplit:Array = line.split(" ");
                  if(getSplit.length > 1)
                  {
                     requestedURL = getSplit[1];
                  }
               }
               else
               {
                  var index:int = line.indexOf(":");
                  if(index > -1)
                  {
                     var key:String = line.substr(, index);
                     fields[key] = line.substr(index + 1).replace( /^([\s|\t|\n]+)?(.*)([\s|\t|\n]+)?$/gm, "$2" );
                  }
               }
            }
            //check the websocket version
            if(fields["Sec-WebSocket-Version"] != null)
            {
               //NOT SUPPORTED YET
            }
            else
            {
               if(fields["Sec-WebSocket-Key1"] != null && fields["Sec-WebSocket-Key2"] != null)
               {
                  //draft-ietf-hybi-thewebsocketprotocol-00
                  //send a response
                  var result:* = fields["Sec-WebSocket-Key1"].match(/[-9]/gi);
                  var key1Nr:uint = (result is Array) ? uint(result.join("")) : 1;
                  result = fields["Sec-WebSocket-Key1"].match(/ /gi);
                  var key1SpaceCount:uint = (result is Array) ? result.length : 1;
                  var key1Part:Number = key1Nr / key1SpaceCount;
 
                  result = fields["Sec-WebSocket-Key2"].match(/[-9]/gi);
                  var key2Nr:uint = (result is Array) ? uint(result.join("")) : 1;
                  result = fields["Sec-WebSocket-Key2"].match(/ /gi);
                  var key2SpaceCount:uint = (result is Array) ? result.length : 1;
                  var key2Part:Number = key2Nr / key2SpaceCount;
 
                  //calculate binary md5 hash
                  var bytesToHash:ByteArray = new ByteArray();
                  bytesToHash.writeUnsignedInt(key1Part);
                  bytesToHash.writeUnsignedInt(key2Part);
                  bytesToHash.writeBytes(socketBytes, socketBytes.length - 8);
 
                  //hash it
                  var hash:String = MD5.hashBytes(bytesToHash);
 
                  var response:String = "HTTP/1.1 101 WebSocket Protocol Handshake\r\n" +
                     "Upgrade: WebSocket\r\n" +
                     "Connection: Upgrade\r\n" +
                     "Sec-WebSocket-Origin: " + fields["Origin"] + "\r\n" +
                     "Sec-WebSocket-Location: ws://" + fields["Host"] + requestedURL + "\r\n" +
                     "\r\n";
                  var responseBytes:ByteArray = new ByteArray();
                  responseBytes.writeUTFBytes(response);
 
                  for(i = ; i < hash.length; i += 2)
                  {
                     responseBytes.writeByte(parseInt(hash.substr(i, 2), 16));
                  }
 
                  responseBytes.writeByte();
                  responseBytes.position = ;
                  socket.writeBytes(responseBytes);
                  socket.flush();
                  //stop right here
                  socketBytes.clear();
                  return;
               }
            }
         }
      }
      else
      {
         //do something else with the data
      }
   }
}
```

This will accept a websocket connection and send back the correct handshake. So, how do you connect from html / javascript to this AIR server?

**HTML5 Websocket client**

You’ll connect to the AIR server using javascript. This is pretty straightforward: you create a WebSocket object, link the correct event handlers and connect to the air server on the correct port:

``` js
function init()
{
   try
   {
      socket = new WebSocket("ws://localhost:1235");
      socket.onopen = socketOpenHandler;
      socket.onmessage = socketMessageHandler;
      socket.onclose = socketCloseHandler;
   }
   catch(exception)
   {
      alert("Error: " + exception);
   }
}
 
function socketOpenHandler()
{
   //connected to the server
}
 
function socketMessageHandler(message)
{
   //message received: message.data
}
 
function socketCloseHandler()
{
   //connection closed
}
```

That’s it. Fire up your Adobe AIR server, and you should be able to connect to the Adobe AIR application from javascript!

<del datetime="2011-11-24T19:35:43+00:00">I’ll post some examples & a utility library in a follow-up post, so stay tuned :-)</del>

Update: Check [/2011/11/24/airserver-support-for-websocket-version-8/][2] for a library and demos.

 [1]: http://en.wikipedia.org/wiki/WebSockets
 [2]: /2011/11/24/airserver-support-for-websocket-version-8/