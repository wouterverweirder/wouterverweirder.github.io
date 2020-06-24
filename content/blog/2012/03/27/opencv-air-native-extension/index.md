---
title: OpenCV AIR Native Extension
author: 'wouter'
date: 2012-03-27T00:10:00.000Z
cover: ./preview.jpg
hasCover: true
description: false
layout: post
comments: true
permalink: /2012/03/27/opencv-air-native-extension/
categories:
  - Uncategorized
tags:
  - air native extension
  - opencv
---
In preparation of my FITC session last month, I wrote a native extension to integrate OpenCV in your AIR applications. What it does is use OpenCV in a multithreaded extension, to execute HAAR cascades against a bitmap you provide from ActionScript. This bitmap could be a snapshot of your webcam image, but could also be data from other sources (e.g. kinect camera snapshot?).

I had quite a hard time to get OpenCV compiling & integrating it on my device, and I don’t know if it’ll work on other people’s computers. It only works on OSX, my system was OSX 10.7 (Lion). After a lot of trying, I managed to compile opencv as static libraries, and could integrate them in a native extension package.



The extension ID is be.aboutme.nativeExtensions.opencv.OpenCV. It’s event based, and will execute the heavy haar detection code in a seperate thread, so your actionscript project doesn’t lock up. First of all, you’ll create an instance of the extension, add a detection listener and load a haar cascade xml file:

``` actionscript
openCV = new OpenCV();
openCV.addEventListener(DetectionEvent.DETECTION_UPDATE, detectionUpdateHandler);
openCV.loadCascade("/Users/wouter/haarcascades/haarcascade_frontalface_alt2.xml");
```

You will also need to send bitmap data to the extension. In this example, I’m sending a bitmap snapshot of the webcam image to the extension, using the updateImage method. You can also set minimum & maximum sizes for the detection area’s, so area’s smaller then the mnimum size of larger then the maximum size are ignored. I recommend supplying a minimum size for the detection (for example: face must be at least 40×40 pixels), as this will improve performance of the application:

``` actionscript
bmpData.draw(video);
openCV.updateImage(bmpData, minSize, maxSize);
```

In the event handler, you’ll get the detected area’s with the event object that is provided:

``` actionscript
protected function detectionUpdateHandler(event:DetectionEvent):void
{
    for each(var r:Rectangle in event.rectangles)
    {
        //draw rectangles here
    }
}
```

I’ve commited everything (native, as3 code & demo) to a github repo ([https://github.com/wouterverweirder/AIR-OpenCV-Extension][1])

Again, it’s a mac-only extension, and will need more testing if my opencv compile will run on other mac’s :-)

[1]: https://github.com/wouterverweirder/AIR-OpenCV-Extension	"Code on Github"