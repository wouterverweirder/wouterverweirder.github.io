---
title: 'AIRServer 0.4 – UDP Handling, Chrome 16 websockets & bugfixes'
author: 'wouter'
pubDate: "2011-12-15T00:10:00.000Z"
heroImage: ./preview.jpg
hasCover: true
description: ""

comments: true
permalink: /2011/12/15/airserver-0-4-udp-handling-chrome-16-websockets-bugfixes/
categories:
  - Uncategorized
tags:
  - AIR
  - AIRServer
  - html5
  - P2P
  - sockets
  - websockets
---
I’ve just finished some updates on my AIRServer library, which enables you to create an AIR app that listens for different inputs such as sockets, websockets and P2P traffic. This gives you the option to create a multi-user game, with different input controllers.

I’ve added a UDP Endpoint, so you can handle UDP traffic aswell now ([check out the UDP native extension for AIR mobile, to use UDP on mobile devices][1]). UDP is connectionless, so you can specify a timeout, when we mark a “udp client” as disconnected.

```actionscript-3
server.addEndPoint(new UDPEndPoint(1236, new NativeObjectSerializer(), 60000));
```

When you want to send data back over UDP, you’ll need to know the UDP listening port of the client: therefore, the client can send a “PORT” command, with the listening port as data argument:

```actionscript-3
protected function connect():void
{
    listeningSocket = new DatagramSocket();
    listeningSocket.addEventListener(DatagramSocketDataEvent.DATA, socketDataHandler);
    listeningSocket.bind(9876);
    listeningSocket.receive();
 
    sendingSocket = new DatagramSocket();
    sendingSocket.connect("127.0.0.1", int(port.text));
    currentState = "connected";
}
 
protected function sendInput():void
{
    sendObject({command: "PORT", data: listeningSocket.localPort});
    sendObject(inputField.text);
    inputField.text = "";
}
 
protected function sendObject(o:Object):void
{
    var bytes:ByteArray = new ByteArray();
    bytes.writeObject(o);
    sendingSocket.send(bytes);
}
```

I’ve also made some arguments optional (such as the message serializers). By default, an AMF endpoint will use a NativeObjectSerializer, websockets will use the JSONSerializer.

```actionscript-3
server.addEndPoint(new SocketEndPoint(1234, new AMFSocketClientHandlerFactory()));
server.addEndPoint(new SocketEndPoint(1235, new WebSocketClientHandlerFactory()));
server.addEndPoint(new UDPEndPoint(1236, new NativeObjectSerializer(), 60000));
server.addEndPoint(new CocoonP2PEndPoint("be.aboutme.airserver.demos.Messages"));
```

I’ve fixed some issues with multiple-messages in one packet. This was especially a problem with the websocket listener. The object serializer is now responsible for splitting the input into multiple messages (when necessary). By default, the JSONSerializer used for the websockets, will split messages on the newline (\n) character. Make sure you terminate each message you send from the client with this character, and you should be good to go.

<del datetime="2011-12-23T16:56:07+00:00">[As always, you can download the sources & updated demos to play with][2]. Happy coding!</del>

[You can find the latest version on github][3]

 [1]: /2011/12/14/udp-native-extension-for-air-mobile-now-with-android-support/   "UDP native extension for air mobile"
 [2]: http://labs.aboutme.be/airserver/airserver-0.4.zip                          "Download sources"
 [3]: https://github.com/wouterverweirder/AIR-Server                              "Sources on Github"