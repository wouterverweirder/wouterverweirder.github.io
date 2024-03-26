---
title: AI animated projection mapping for FTI's club of the future
author: 'wouter'
pubDate: "2024-03-26T09:00:00.000Z"
heroImage: ./preview.jpg
hasCover: true
description: ""

comments: true
permalink: /2024/03/26/ai-animated-projection-mapping-club-of-the-future/
tags:
  - ai
  - projection-mapping
  - stable-diffusion
---
A part of the FTI event in Kortrijk, was FTI's club of the future. After doing the [static AI generated projections on the Belfort](/2023/10/18/projection-mapping-with-generative-ai/) a couple of months ago, my [Howest](https://howest.be) [Devine](https://devine.be) colleague [Frédéric Baert](https://www.linkedin.com/in/fredericbaert/) and I were asked if we wanted to do a projection mapping on the building of the club of the future. Naturally, we said yes, but we also wanted to take the opportunity to explore animated AI content.

We were already familiar with [Deforum](https://deforum.github.io), a tool that allows you to create animations using AI. A big problem with Deforum is that the generated animations have a lot of flicker, it's an aesthetic on it's own, but not what we were looking for.

These last couple of months, we saw a lot of good work being created with [AnimateDiff](https://animatediff.github.io), so we wanted to explore the possibilities of using it for this project.

## Initial tests

As a first, we explored combining AnimateDiff with (Controlnet QR Code Monster)[https://huggingface.co/monster-labs/control_v1p_sd15_qrcode_monster], a canny edge controlnet and inpainting.

<figure style="text-align: center;">
  <img src="screenshot-comfy-canny-qr-waves.png" alt="comfyui workflow canny and qr controlnet" style="width: 100%; height: auto" />
  <figcaption>ComfyUI workflow combing QRCode Monster and Canny Controlnet</figcaption>
</figure>

This resulted in an animation which was constrained within the building. However: we noticed the **canny edge** controlnet, even at low weights, had too much of an impact: the resulting animation **lacked movement and detail**.

In the comparison below, you can see:

1. the input controlnet at the top
2. the output with both Canny and QRCode Monster in the middle
3. the output with only QRCode Monster at the bottom.

<video src="wave-ctrl-vs-no-ctrl.mp4" width="768" height="930" controls loop muted playsline autoplay style="width: 100%; height: auto;"></video>

While omitting the Canny Controlnet results in a more dynamic animation, it also introduced more artifacts around the edges of the building, as you can see in the video above: we're getting these brown smudges on the building, most apparent on top of the gates.

First I thought this was "beach" leaking into our waves prompt. But after some more testing, I figured out that VAE decoding an empty latent image, results in this brown color:

<figure style="text-align: center;">
  <img src="empty-latent-brown.png" alt="comfyui nodes decoding an empty latent" width="1852" height="836" style="width: 100%; height: auto" />
  <figcaption>ComfyUI workflow decoding an empty latent</figcaption>
</figure>

In order to fix this, we tried starting with the black-and-white mask image as the latent image instead. Now, in order to create a longer animation, we needed a large batch size of that black-and-white image. Unfortunately, the "Repeat Latent Batch" node is limited to max 64 images. Luckely, we were able to work around that limitation by combining the "Empty Latent Image (Big Batch)" node from [ComfyUI-AnimateDiff-Evolved](https://github.com/Kosinkadink/ComfyUI-AnimateDiff-Evolved) with a "Latent Composite" node:

<figure style="text-align: center;">
  <img src="latent-composite.png" alt="comfyui nodes creating a bigger latent repeat" width="2344" height="1520" style="width: 100%; height: auto" />
  <figcaption>ComfyUI workflow creating a bigger latent repeat</figcaption>
</figure>

Unfortunately, this didn't solve the brownish borders issue. It also had a negative impact on the amount of animation happening in the generated content:

<video src="waves-black-white-latent.mp4" width="768" height="310" controls loop muted playsline autoplay style="width: 100%; height: auto;"></video>

Even playing with different AnimateDiff noise types (default, FreeNoise, constant, ...) didn't solve the issue. It looked like we had to find another solution to generate interesting animations within the contours of a building, without those ugly brown smudges around the edges.

We opted for a 2-step rendering process:
1. Do a quick LCM-based render within an expanded masked area to get some initial moving content, still constrained to the (expanded) building.
2. Do a second pass with a regular model, with a mask closer to the original mask. This way, the content that would have been brownish, will now be the LCM-based content instead, making it less apparent.

<video src="lcm-output-stacked.mp4" width="768" height="620" controls loop muted playsline autoplay style="width: 100%; height: auto;"></video>

Finally, to get a better idea of how it would look on the building, we added a black + transparent overlay on top of the video using ffmpeg:

```bash
ffmpeg -i input.mp4 -i overlay.png -filter_complex "[0:v][1:v]overlay=0:0" output.mp4
```

<video src="waves-overlay.mp4" width="768" height="310" controls loop muted playsline autoplay style="width: 100%; height: auto;"></video>

This way, we were able to create dynamic animations, which follow the shape of the building.

## Style Consistency using IPAdapter

After getting our workflow layed out, we exchanged ideas with Ludovic Beun (Art Director) to nail down the look and feel of the animations. We had to make sure we hit the "Club of the Future" aesthetic.

To have some better control over the generated content + look and feel, we added [IPAdapter](https://github.com/cubiq/ComfyUI_IPAdapter_plus) to the workflow, to steer the model in a certain direction.

## Upscaling

We used AnimateDiff v3 with SD 1.5 models, as this gave us the most creative and interesting animations. This limited us to using a resolution of no more than 768x512 pixels. The resolution we needed to reach for the projection was 3224 pixels wide, which is over 4 times the resolution of the generated content.

Going straight from 768x512 to 3224x2136 pixels with Topaz resulted in the following output:

<figure style="text-align: center;">
  <img src="topaz-only-upscale.png" alt="topaz only upscale" width="3224" height="1200" style="width: 100%; height: auto" />
  <figcaption>Topaz only upscale</figcaption>
</figure>

While this works, and is quite fast (it upscales at about real-time speeds), the resulting image is bland and lacks detail. So, we decided to do a latent upscale first, to go from 768 pixels wide to 1.75x that resolution, and then do a Topaz upscale to reach the target resolution.

The result was a lot better:

<figure style="text-align: center;">
  <img src="latent-upscale.png" alt="latent + Topaz upscale" width="3224" height="1200" style="width: 100%; height: auto" />
  <figcaption>Combining Latent upscale with Topaz</figcaption>
</figure>

It's quite a bit slower (we went from a render time of 20 minutes to 1 hour for a 20 second clip), but we have a lot more details and contrast in the image.

## Final renders

Our final workflow consisted of the following steps:

- An area to generate an IPAdapter Image. This allows us to work on a good text prompt before starting a longer animation render.
- A LCM-based render to get some initial moving content.
- A regular render to get the final animation.
- A latent upscale to get a higher resolution.

<figure style="text-align: center;">
  <img src="screenshot-final-workflow.png" alt="final workflow" width="2880" height="1800" style="width: 100%; height: auto" />
  <figcaption>Overview of the final workflow</figcaption>
</figure>

You can [download our workflow here](workflow-fti-cleaned-up.json). Note: since last week there has been an update to the IPAdapter nodes, so you might need to change the IPAdapter nodes in the workflow.

We ended up with 15 different animations, each about a minute long. Some of the animations were slowed down with Topaz (as the building is huge and some of the animations were too fast), others were repeated (AnimateDiff can create seamlessly looping animations).

It was great collaborating with [Frédéric]((https://www.linkedin.com/in/fredericbaert/)) again on this project: where I have a technical approach, he's got the animation and design skills to make it look great.

You can check the final renders in the Youtube video below (make sure to select the highest quality, as the video is in almost-4K resolution):

<iframe width="560" height="315" src="https://www.youtube.com/embed/TSBXe8-qogI?si=c_f1LHseSExQGVRQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen style="max-width: 100%"></iframe>

I've also recorded some footage of the projection mapping, to give an impression of how it looked in real life:

<iframe width="560" height="315" src="https://www.youtube.com/embed/ofWpsVXT-UU?si=y4zR6Eeb0vqoreDI" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen style="max-width: 100%"></iframe>