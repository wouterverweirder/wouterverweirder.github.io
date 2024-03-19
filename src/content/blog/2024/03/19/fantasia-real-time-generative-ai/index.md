---
title: Fantasia - Real-time Generative AI
author: 'wouter'
pubDate: "2024-03-19T09:00:00.000Z"
heroImage: ./preview.jpg
hasCover: true
description: ""

comments: true
permalink: /2024/03/19/fantasia-real-time-generative-ai/
tags:
  - ai
  - stable-diffusion
  - touchdesigner
---
Within the [Devine](https://devine.be) research group, we've got a [research project around Generative AI](https://www.howest.be/en/onderzoeksprojecten/aid). To help communication around this project, I developed an interactive installation featuring real-time generative AI.

Beginning of January, my colleague Giliam Ganzevles showed [me this video, which showcased super-fast generation of imagery](https://www.youtube.com/watch?v=X4rlC6y1ahw) within TouchDesigner using [StreamDiffusion](https://github.com/cumulo-autumn/StreamDiffusion).

Inspired by that technical showcase, he came up with the following concept brief:

> Fantasia: Conduct the Water Dance<br />
Dive into a magical world and conduct your own Disney-inspired adventure with interactive visuals that are developed live by Generative Artificial Intelligence. Be inspired by the timeless classic Fantasia from 1940 and use your movements to control the water to the rhythm of the music. Watch as your magical powers come to life in the world around you!

Before tinkering with the [StreamDiffusion TouchDesigner plugin](https://patreon.com/dotsimulate), I needed to get some more background of TouchDesigner, as this was my first time working with it. I followed the great [TouchDesigner Fundamentals](https://learn.derivative.ca/courses/100-fundamentals/) series, which gave me a good understanding of the software.

StreamDiffusion is able to either do text-to-image or image-to-image in a fast way. You lose some image quality (because of the usage of LCM), but get back around 30fps in return.

In a first tryout, I tried feeding it the webcam input directly. While this worked, it was pretty hard to get some consistent results that responded well to the user input. Luckely, TouchDesigner comes with a built-in **nvidia flex physics** solver, which I used to create a water simulation, controlled by a body tracking system. This resulted in a much more consistent and visually appealing result.

<video src="fantasia-screen-recording.mp4" width="1920" height="1080" controls loop muted playsline autoplay style="width: 100%; height: auto;"></video>
left: Webcam image, center: physics solver, right: StreamDiffusion output

<figure style="text-align: center;">
  <img src="screenshot-touchdesigner-flow.jpg" alt="touchdesigner flow" />
  <figcaption>Touchdesigner project flow</figcaption>
</figure>

Of course, we are not limited to generate images with "waves". As this is a diffusion model, we can change the text prompt to create other graphics:

<figure style="text-align: center;">
  <img src="different-prompts.jpg" alt="different prompts" />
  <figcaption>The impact of a different prompt on the output</figcaption>
</figure>

<video src="fantasia-other-prompts.mp4" width="1920" height="1080" controls loop muted playsline autoplay style="width: 100%; height: auto;"></video>

Learned a ton doing this project, and I'm looking forward to expanding it with some more presets and color options.

You can play with the installation in the **Budafabriek Kortrijk**, during [the Howest info days](https://www.howest.be/en/info-days) on Saturday 4 May 2024 (10:00 to 13:00), Saturday 29 June 2024 (10:00 to 16:00), Saturday 31 August 2024 (10:00 to 16:00) and Friday 13 September 2024 (17:00 to 19:30).