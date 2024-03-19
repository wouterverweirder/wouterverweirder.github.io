---
title: Building Bridges at FITC Amsterdam 2016
author: 'wouter'
pubDate: "2016-02-28T00:10:00.000Z"
heroImage: ./preview.jpg
hasCover: true
description: ""

comments: true
permalink: /2016/02/28/building-bridges-fitc-ams-2016/
tags:
  - kinect
  - javascript
  - electron
  - nodejs
  - fitc
---
After my work on the Kinect2 library for nodejs and electron, I started working on a new conference presentation, which I gave at FITC Amsterdam earlier this month. This time, I focussed on building bridges between platforms, covering early experiments with Flash, up to C++ and Nodejs native code:

- Flash & ExternalInterface
- OSC kinect data
- Native extensions in Adobe AIR
- Linking Apple Watch to NodeJS
- Writing native extensions for NodeJS with NAN

As an extra challenge, I wanted to present using my own slide engine, controlling it with my Apple Watch. The audience was able to follow along on their mobile devices and participate in little interactive experiments on their device (such as measure reaction speed, device shakes, ...)

I've [uploaded my slide engine and source code on Github](https://github.com/wouterverweirder/building-bridges), for your entertainment :-)