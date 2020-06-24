---
title: 'as3osceleton: Using Kinect as a multitouch device in adobe AIR'
author: 'wouter'
date: 2011-03-07T00:10:00.000Z
cover: ./preview.jpg
hasCover: true
description: false
layout: post
comments: true
permalink: /2011/03/07/as3osceleton-using-kinect-as-a-multitouch-device-in-adobe-air/
categories:
  - Actionscript 3.0
  - AIR
tags:
  - actionscript
  - AIR
  - Flash
  - kinect
---
After buying an XBox with a kinect sensor, noticing that there is no way to attach it to your computer when you buy the bundle, and buying a standalone kinect sensor afterwards, I looked into getting the kinect data into my flash / AIR applications.



<!--more-->

There are a few methods around:

- AS3Kinect: [http://www.as3kinect.org/][1] – using libfreenect, and sockets to get the 2 webcam images (depth and color) into flash.  
- TUIOKinect ([https://code.google.com/p/tuiokinect][2]) + TUIO AS3 ([http://bubblebird.at/tuioflash/tuio-as3-library][3]) – track “blobs” and get them as multitouch cursors in your flash app. More info at [http://silviopaganini.posterous.com/openkinect-flash-tuio-udp-flash-bridge][4]  
- OSCeleton ([https://github.com/Sensebloom/OSCeleton][5]) sends out skeleton data in the OSC format to a UDP destination

Getting the images in flash is really slow, it needs to compress (at best) each frame and send that information over a socket / UDP / Localconnection to flash. It’s quite heavy, and all you’ve got to work with are images.

The blob tracking from TUIOKinect is more interesting: we only send blob tracking info to our flash app, which is a lot “lighter” to transfer. However, TUIOKinect needs to be configured (what z-depth do you want to detect) and generates quite a lot false positives (stuff you don’t want to track). You don’t know if a blob is a hand or not. The fun part of TUIOKinect is that it’s TUIO, which means that you can track a blob, and use it as a touch input.

Then we have OSCeleton. With OSCeleton, you can get real skeleton data into flash. After standing in a calibration pose, it spits out the coordinates of you skeleton joints (head, left arm, right knee, …) to a UDP connection.

I decided to combine AS3TUIO with OSCeleton, so we can translate skeleton joint information and use skeleton joins (say: left hand, right hand) as touch points. This way, you can use the standard multitouch events, only you aren’t really touching anything, but waving in front of a kinect camera.

**Setting it up**

First things first: getting OSCeleton running. There’s an excellent guide over at [https://github.com/Sensebloom/OSCeleton][5] – so follow those steps first.

After you’ve got OSCeleton up and running, you can get the data into your AIR application using my library.

[Download the source or swc file][6], and add it to your project.

[Download some example projects][7] (AIR, Flash Builder).

 [1]: http://www.as3kinect.org/
 [2]: https://code.google.com/p/tuiokinect
 [3]: http://bubblebird.at/tuioflash/tuio-as3-library
 [4]: http://silviopaganini.posterous.com/openkinect-flash-tuio-udp-flash-bridge
 [5]: https://github.com/Sensebloom/OSCeleton
 [6]: http://labs.aboutme.be/as3osceleton/as3osceleton.zip
 [7]: http://labs.aboutme.be/as3osceleton/AS3OSCeletonDemos.zip