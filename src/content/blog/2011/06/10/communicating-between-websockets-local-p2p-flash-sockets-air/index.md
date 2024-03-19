---
title: 'Communicating between websockets, local P2P, flash sockets & AIR'
author: 'wouter'
pubDate: "2011-06-10T00:10:00.000Z"
heroImage: ./preview.jpg
hasCover: true
description: ""

comments: true
permalink: /2011/06/10/communicating-between-websockets-local-p2p-flash-sockets-air/
tags:
  - Actionscript 3.0
  - AIR
  - html5
---
I’ve shown you [how to handle websockets in adobe air][1], and how to [set up communication between flash sockets, websockets and adobe air][2] using a library I wrote. I’ve extended the library with support for local P2P, using [Cocoon P2P][3].

<!--more-->

It’s another option to create a multiuser game with different inputs. Right now you can use flash sockets, websockets and rtmfp (P2P) connectivity in a mixed environment to communicate with eachother.

```actionscript-3
server = new AIRServer();
//adding endpoints
server.addEndPoint(new SocketEndPoint(1234, new AMFSocketClientHanderFactory(new NativeObjectSerializer())));
server.addEndPoint(new SocketEndPoint(1235, new WebSocketClientHandlerFactory(new JSONSerializer())));
server.addEndPoint(new CocoonP2PEndPoint("be.aboutme.airserver.demos.Messages"));
//add event listeners
server.addEventListener(AIRServerEvent.CLIENT_ADDED, clientAddedHandler, false, , true);
server.addEventListener(AIRServerEvent.CLIENT_REMOVED, clientRemovedHandler, false, , true);
server.addEventListener(MessageReceivedEvent.MESSAGE_RECEIVED, messageReceivedHandler, false, , true);
//start the server
server.start();
```

Adding a cocoon endpoint, is even simpler than adding socket endpoints, all you have to do is pass an instance of the CocoonP2PEndpoint class to the addEndpoint function of the server, and specify a groupname for the P2P netgroup. You can handle the messages just like any other message on the server, it doesn’t matter if the message comes from a socket, websocket or via rtmfp.

<del datetime="2011-11-24T19:33:18+00:00">You can [download an updated version of the library project][4] and an updated version of the demo’s with a cocoon P2P client. </del>Big thanks to [Peter Elst][5] for CocoonP2P, it makes P2P on the local network a lot easier to implement!

[You can find the latest version on github][6]

 [1]: /2011/06/07/handling-websocket-connections-with-adobe-air-serversocket/
 [2]: /2011/06/09/airserver-handling-both-sockets-websockets-in-adobe-air/
 [3]: http://code.google.com/p/cocoon-p2p/
 [4]: http://labs.aboutme.be/airserver/airserver-0.2.zip
 [5]: http://www.peterelst.com
 [6]: https://github.com/wouterverweirder/AIR-Server