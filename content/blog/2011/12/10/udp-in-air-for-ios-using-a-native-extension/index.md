---
title: UDP in AIR for iOS using a native extension
author: 'wouter'
date: 2011-12-10T00:10:00.000Z
cover: ./preview.jpg
hasCover: true
description: false
layout: post
comments: true
permalink: /2011/12/10/udp-in-air-for-ios-using-a-native-extension/
categories:
  - Uncategorized
tags:
  - AIR
  - iOS
  - native extensions
---
**update: [added Android support to the extension][1].**

When you’re using a mobile device as a controller for an application or a game, you’ll want fast data transfers. Classic TCP/IP traffic over sockets is a bit slow, due to the nature of TCP/IP (packets are delivered in the correct order, the receiver sends a confirmation of reception to the sender for each received packet). The alternative is UDP: you’re not sure if the packet arrives, or in what order you packets will arrive at the destination, but because of that, there is less delay between the sender and the receiver of the packet.

AIR has a builtin class to handle UDP: flash.net.DatagramSocket. However, for some reason this is not available on AIR for mobile devices. I decided to write a native extension (<del datetime="2011-12-14T19:59:22+00:00">only for iOS for now</del>) to offer UDP functionality on AIR for mobile devices. I tried to use the same API as the DatagramSocket for AIR for Desktop, so the principles are the same.

To send packets over UDP, you’ll create an instance of the UDPSocket class (be.aboutme.nativeExtensions.udp.UDPSocket), and use the send method with a bytearray:

``` actionscript
var udpSocket:UDPSocket = new UDPSocket();
var bytes:ByteArray = new ByteArray();
bytes.writeUTFBytes("Hello World");
udpSocket.send(bytes, "192.168.9.1", 1234);
```

To receive packets, you’ll use the bind(portnr) and receive() methods of the same class, and listen to a DatagramSocketEvent.DATA event:

``` actionscript
var udpSocket:UDPSocket = new UDPSocket();
udpSocket.addEventListener(DatagramSocketDataEvent.DATA, udpDataHandler);
udpSocket.bind(1234);
udpSocket.receive();
 
protected function udpDataHandler(event:DatagramSocketDataEvent):void
{
    trace(event.data);
}
```

It will transfer whatever you put in the bytearray, so you can send native actionscript objects aswell if you want:

``` actionscript
var bytes:ByteArray = new ByteArray();
var o:Object = {};
o.command = "MESSAGE";
o.content = "Hello World!";
bytes.writeObject(o);
udpSocket.send(bytes, "192.168.9.1", 1234);
```

You can find the ane, together with the sources & demo on github: [https://github.com/wouterverweirder/AIR-Mobile-UDP-Extension][2]. The native extension id is “be.aboutme.nativeExtensions.udp.UDPSocket”. <del datetime="2011-12-14T19:59:22+00:00">Stay tuned for the Android version</del> The extension has been updated, and supports Android aswell now!

 [1]: /2011/12/14/udp-native-extension-for-air-mobile-now-with-android-support/
 [2]: https://github.com/wouterverweirder/AIR-Mobile-UDP-Extension 					"Source on Github"