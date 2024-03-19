---
title: Creating an endless repeating scroll with css & javascript
author: 'wouter'
pubDate: "2023-03-01T09:00:00.000Z"
heroImage: ./preview.jpg
hasCover: true
description: ""

comments: true
permalink: /2023/03/01/creating-an-endless-repeating-scroll-with-css-and-javascript/
tags:
  - javascript
  - css
---
For the new [bump-festival splash page](https://bump-festival.be/2023/), we are going with the airport theme. As a practical joke, we thought it would be cool to have the teaser page mimic a luggage tag, which would scroll endlessly. 

## First try: reset scroll position

For my first approach, I tried using duplicate elements, and resetting the scroll position when the user scrolled past the last element:

```html
<body>
  <main>
    <!-- here be content -->
  </main>
  <script>
{
  const init = () => {
    const $main = document.querySelector('main');
    const numClones = 10;
    const $clones = [];
    // create clones of main
    for (let i = 0; i < numClones; i++) {
      const $clone = $main.cloneNode(true);
      $clones.push($clone);
      $main.parentNode.appendChild($clone);
    }
    // intersectionObserver on main
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) {
          window.scrollBy(0, -$main.offsetHeight);
        }
      }
    );
    observer.observe($main);
  }

  init();
}
  </script>
</body>
```

This worked fine on desktop, but on a mobile device, the scroll was very laggy, and lost its velocity. It was also quite confusing to see the scroll bar go up and down as you scrolled.

<video src="ios-bug.mp4" controls loop muted playsline autoplay style="width: 100%; height: auto;"></video>

## Second try: margin-top

For my second approach, I tried using a margin-top on the main element, which would push the content down as you scrolled.

```js
const init = () => {
  const $main = document.querySelector('main');
  const numClones = 10;
  const $clones = [];
  // create clones of main
  for (let i = 0; i < numClones; i++) {
    const $clone = $main.cloneNode(true);
    $clones.push($clone);
    $main.parentNode.appendChild($clone);
  }
  let targetMarginTop = 0;
  window.addEventListener('scroll', () => {
    const numTimesMargin = Math.floor(window.scrollY / $main.offsetHeight);
    targetMarginTop = numTimesMargin * $main.offsetHeight;
  });
  const draw = () => {
    $main.style.marginTop = `${targetMarginTop}px`;
    requestAnimationFrame(draw);
  }
  draw();
}

init();
```

This fixed the issue on mobile, but introduced a new bug on Chrome Desktop: as soon as the margin-top property was set, it triggered a new scroll event, which would set the margin-top again, resulting in an endless loop.

<video src="chrome-bug.mp4" controls loop muted playsline autoplay style="width: 100%; height: auto;"></video>

## Third try: translate & padding

To prevent chrome triggering scrolls, while making the document longer, the solution is to add a padding to the bottom of the body, and use translate to move the content to the correct position. As these 2 values (padding and translate) are the same, I used a css variable for this.

### The CSS part

```css
:root {
  --splash-scroll-offset-y: 0;
}

body {
  padding-bottom: var(--splash-scroll-offset-y);
}

.splash-main {
  transform: translate3d(0, var(--splash-scroll-offset-y), 0);
}
```


### The javascript part
```js
const init = () => {
  const $main = document.querySelector('.splash-main');
  const numClones = 10;
  const $clones = [];
  // create clones of main
  for (let i = 0; i < numClones; i++) {
    const $clone = $main.cloneNode(true);
    $clones.push($clone);
    $main.parentNode.appendChild($clone);
  }
  let targetMarginTop = 0;
  window.addEventListener('scroll', () => {
    const numTimesMargin = Math.floor(window.scrollY / $main.offsetHeight);
    targetMarginTop = numTimesMargin * $main.offsetHeight;
  });
  const draw = () => {
    // $main.style.marginTop = `${targetMarginTop}px`;
    document.documentElement.style.setProperty('--splash-scroll-offset-y', targetMarginTop + "px");
    requestAnimationFrame(draw);
  }
  draw();
}

init();
```

This resulted in a smooth experience on all devices, and browsers.

<video src="finished.mp4" controls loop muted playsline autoplay style="width: 100%; height: auto;"></video>

*Update 2023-04-21: I noticed some performance issues on desktop Safari, read more about this in the follow-up post: [CSS variables can be slow in Safari](/2023/04/21/css-variables-can-be-slow-in-safari/)*