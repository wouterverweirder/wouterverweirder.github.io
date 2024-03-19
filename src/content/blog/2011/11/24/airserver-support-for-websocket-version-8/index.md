---
title: websocket version 8 support in AIR Server
author: 'wouter'
pubDate: "2011-11-24T00:10:00.000Z"
heroImage: ./preview.jpg
hasCover: true
description: ""

comments: true
permalink: /2011/11/24/airserver-support-for-websocket-version-8/
tags:
  - Actionscript 3.0
  - AIR
  - Flash
  - html5
---
It’s been a while since my last update on AIRServer – an actionscript library which enables you to set up a socket server in Adobe AIR, which listens to multiple socket inputs (native AMF sockets, websockets and P2P input).

Some of my students noticed the websockets didn’t work in the latest versions of Google Chrome. This is because Google chrome uses another version of the websocket protocol. If you enjoy reading specs, you can find it at [http://tools.ietf.org/html/draft-ietf-hybi-thewebsocketprotocol-10][1] :-)

Anyway, took me quite some work, but I finally got it working. I was able to port some of the code of the Bauglir Internet Library ([http://www.webnt.eu/index.php][2]) to actionscript. AIRServer now supports both hybi-00 and hybi-10 of the protocol.

<del datetime="2011-12-15T09:39:34+00:00">[You can download the updated library and demo’s here][3]. Enjoy!</del>

[You can find the latest version on github][4]

[1]: http://tools.ietf.org/html/draft-ietf-hybi-thewebsocketprotocol-10 	"Spec"
[2]: http://www.webnt.eu/index.php 											"Bauglir Internet Library"
[3]: http://labs.aboutme.be/airserver/airserver-0.3.zip 					"Updated library"
[4]: https://github.com/wouterverweirder/AIR-Server 						"Sources on Github"