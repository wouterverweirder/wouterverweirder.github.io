---
title: CSS variables can be slow in Safari
author: 'wouter'
pubDate: "2023-04-21T16:00:00.000Z"
heroImage: ./preview.png
hasCover: true
description: ""

comments: true
permalink: /2023/04/21/css-variables-can-be-slow-in-safari/
tags:
  - javascript
  - css
---
This is a follow up to my previous post about [creating an endless repeating scroll with css & javascript](/2023/03/01/creating-an-endless-repeating-scroll-with-css-and-javascript/). In that post, I used a combination of css variables and javascript to create an endless repeating scroll.

When implementing the repeating scroll for longer pages, I noticed some laggy behaviour on desktop Safari. The planes on the background take some of the velocity from the scroll. However, on Safari, the plane movement was very jittery:

<video src="scroll-slow-css-variables-safari-hq.mp4" controls loop muted playsline autoplay style="width: 100%; height: auto;"></video>

I traced the problem back to the css variables. For some reason, updating these variables was causing a lot of layout thrashing. I tried to fix this by using `will-change: transform` on the elements that were using the css variables, but this didn't help.

In the end, I fixed the problem by modifying the style properties directly instead of going through the css variables.

```js
body.style.paddingBottom = targetMarginTop + "px";
repeatMain.forEach( el => el.style.transform = `translate3d(0, ${targetMarginTop}px, 0)`);
```

This fixed the problem, and the scroll is now a lot smoother:

<video src="scroll-regular-style-properties-safari-hq.mp4" controls loop muted playsline autoplay style="width: 100%; height: auto;"></video>