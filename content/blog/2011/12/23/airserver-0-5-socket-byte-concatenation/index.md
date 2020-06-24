---
title: 'AIRServer 0.5 – socket byte concatenation'
author: 'wouter'
date: 2011-12-23T00:10:00.000Z
cover: ./preview.jpg
hasCover: true
description: false
layout: post
comments: true
permalink: /2011/12/23/airserver-0-5-socket-byte-concatenation/
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
I’ve just finished work on a little update of my AIRServer library (version 0.5, hooray!). Apparently, when you send large chunks of data over the socket (like sending an image to the server, over the socket), it could happen the data is split over multiple packages. This caused errors on the server side.

I’ve fixed that issue, <del datetime="2013-02-10T10:15:53+00:00">and uploaded an [updated version, together with an image-sending-demo][1]</del>. [You can find the latest version on github][2]. Enjoy!

[1]: http://labs.aboutme.be/airserver/airserver-0.5.zip 	"updated version with image sending"
[2]: https://github.com/wouterverweirder/AIR-Server 		"Sources on Github"