---
title: Phaser and Arduino game for Ketnet
author: 'wouter'
date: 2016-10-01T00:10:00.000Z
cover: ./preview.jpg
hasCover: true
description: false
layout: post
comments: true
permalink: /2016/10/01/phaser-and-arduino-game-for-ketnet/
tags:
  - arduino
  - javascript
  - electron
  - nodejs
  - ketnet
---
I had the pleasure to work on another fun project for [Ketnet](https://ketnet.be). They're launching a tv show around gaming, with famous comedian [William Boeva](https://www.williamboeva.be/) as it's host. During the show, they wanted kids to play a simple game against Boeva. The kids would play using a giant controller, and have to collaborate, while Boeva is playing against them using a regular game controller.

The giant controller was built by the decor people at [Ketnet](https://ketnet.be).

![prototype giant controller](prototype.jpg)

To keep things as simple as possible, I went for an Arduino micro, which is a compact Arduino board, capable of emulating a keyboard. This way I don't have to deal with setting up complicated communication flows using sockets or native code: I can simply listen for keyboard events in the frontend code!

![arduino micro board](electronics.jpg)

I build the game itself using [PhaserJS](https://phaser.io), which has [proven itself worthy of running on live television in a previous project](/2015/09/04/kinect-game-for-live-television/).

The graphics were made in-house at Ketnet by Sam Pauwels.

![screenshot game](game.jpg)

It was fun seeing it all come together again on the big screen! Oh, and as it was built using web technologies, [you can also play it online](https://www.ketnet.be/spelen/2beat-boeva)!