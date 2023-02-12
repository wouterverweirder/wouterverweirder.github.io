---
title: Interactive Light Sculptures
author: 'wouter'
pubDate: "2014-11-07T00:10:00.000Z"
heroImage: ./preview.jpg
hasCover: true
description: ""

comments: true
permalink: /2014/11/07/interactive-light-sculptures/
tags:
  - arduino
  - sound
  - sculptures
  - interactive
---
A couple of weeks back, my Happy-Banana partner in crime Koen and I were approached by artist [Tom Dekyvere](http://tomandliendekyvere.com/) for an interactive sculpture project.

He wanted to put interactive artworks at the Catch festival in Utrecht and was looking for a partner to help build the electronics. The sculptures needed to respond with light and sound on the people around. Challenge accepted!

We started experimenting with different libraries and electronics, and quickly settled on the [Mozzi library](https://sensorium.github.io/Mozzi/) for Arduino Sound synthesis on the software side, together with a maxbotix ultrasonic distance sensor, mosfet and some 12V ledstrips. Our first experiments were promising:

<iframe src="https://player.vimeo.com/video/432268662" width="640" height="360" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>

The next step was replicating this 6 times, which proved to take more time than we thought. We finished soldering the final board just when Tom was here to pick up our hardware!

Here's a clip where you can see Tom's sculptures lighting up and reacting to the audience:

<iframe src="https://player.vimeo.com/video/432275416" width="640" height="272" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>