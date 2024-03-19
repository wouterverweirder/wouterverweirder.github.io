---
title: Kinect game for live television
author: 'wouter'
pubDate: "2015-09-04T00:10:00.000Z"
heroImage: ./preview.jpg
hasCover: true
description: ""

comments: true
permalink: /2015/09/04/kinect-game-for-live-television/
tags:
  - kinect
  - javascript
  - electron
  - nodejs
---
That's a first: my code being used on live tv! A couple of months ago, I was contacted by Joachim from [Ketnet](https://ketnet.be). They were building a new studio for their kid's shows, and were looking for an interactive Kinect experience.

I did some experiments with Kinect and Flash in the past. But as Flash is kind dying, and front-end C++/C# isn't really my thing, I wanted to see how far I could take javascript with Kinect.

I went ahead and [built a kinect 2 nodejs extension](https://github.com/wouterverweirder/kinect2) using C++ and Javascript. In combination with [Electron](https://www.electronjs.org/) and [PhaserJS](https://phaser.io/), Koen and I were able to build a fully working, stable Kinect game.

![kinect gameplay](gameplay.jpg)

I must say, it was a bit stressy when it first went live on Sunday morning (prime time for kids in the weekend!), but everything ran smoothly.