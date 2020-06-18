---
title: 'Linking Microsoft Kinect SDK to Adobe AIR & TUIO Multitouch'
author: 'wouter'
date: 2011-07-07T00:10:00.000Z
cover: ./preview.png
hasCover: false
description: false
layout: post
comments: true
permalink: /2011/07/07/linking-microsoft-kinect-sdk-to-adobe-air-tuio-multitouch/
tags:
  - Actionscript 3.0
  - AIR
  - kinect
---
Finally had a chance to play around with the official Kinect SDK. First thing I wanted to try, was to link the Kinect SDK to Adobe AIR (with UDP), and adjust my previous kinect demos (with OSCeleton and the open source drivers) so I could do multitouch with the kinect (a bit like minority report). The official SDK is a lot more stable then the open source drivers, and another plus is you don’t need to stand in a calibration position for the skeleton to get tracked. Downside of the official SDK is that it’s windows only…

![Kinect UDP Screen](/wp-content/uploads/2011/07/kinect_udp_screen.png "Kinect UDP Screen")

So, I booted up my Windows pc, and threw together a UDP bridge in C#, which sends the skeleton information as a JSON encoded string to a target IP + port. I’ve coded a little adapter in Actionscript 3, which translates the JSON object into TUIO cursors. After that, it was a piece of cake to get multitouch working in Adobe AIR, using the skeleton information from the kinect.

![Using your hands as multitouch cursors](/wp-content/uploads/2011/07/kinect-multitouch.gif "Using your hands as multitouch cursors")

I’m happy to share the [C# project for the Kinect UDP bridge][1], and an [AIR sample project, which allows you to transform a square, using the touch events from the kinect][2]. Have fun!

Update: I’ve also [uploaded a binary][3], run setup.exe in the zip file to install. Make sure the kinect is connected when you start up the application.

 [1]: http://labs.aboutme.be/as3osceleton/KinectUDPBridge.zip
 [2]: http://labs.aboutme.be/as3osceleton/KinectUDPListener.zip
 [3]: http://labs.aboutme.be/as3osceleton/KinectUDPBridge-setup.zip