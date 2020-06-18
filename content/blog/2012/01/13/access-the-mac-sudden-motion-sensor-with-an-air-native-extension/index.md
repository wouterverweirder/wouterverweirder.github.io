---
title: Access the mac sudden motion sensor with an AIR native extension
author: 'wouter'
date: 2012-01-13T00:10:00.000Z
cover: ./preview.png
hasCover: false
description: false
layout: post
comments: true
permalink: /2012/01/13/access-the-mac-sudden-motion-sensor-with-an-air-native-extension/
categories:
  - Uncategorized
tags:
  - accelerometer
  - AIR
  - native extension
  - OSX
  - sudden motion sensor
---
AIR on mobile enables you to access the accelerometer of the mobile device. But what about the motion sensor in your macbook / macbook pro computer on the desktop? All macbooks come with a “sudden motion sensor”, which shuts down the hard disk when the laptop moves too much.

I wrote an AIR native extension, to access this sensor information in AIR on OSX. I tried to mimic the Accelerometer API as much as possible, and make it easy to use in your AIR application.



You can check if the SuddenMotionSensor is supported on your mac, set the update interval and listen for accelerometer events:

``` actionscript
if(SuddenMotionSensor.isSupported)
{
    suddenMotionSensor = new SuddenMotionSensor();
    suddenMotionSensor.setRequestedUpdateInterval(50);
    suddenMotionSensor.addEventListener(AccelerometerEvent.UPDATE, accelerometerUpdateHandler, false, , true);
}
```

You can then access the accelerometer info in the event handler:

``` actionscript
private function accelerometerUpdateHandler(event:AccelerometerEvent):void
{
    trace(event.accelerationX, event.accelerationY, event.accelerationZ);
}
```

[You can download the sources & demos on github: https://github.com/wouterverweirder/AIR-Sudden-Motion-Sensor-Extension][1]. Happy coding!

[1]: https://github.com/wouterverweirder/AIR-Sudden-Motion-Sensor-Extension   "Sources on Github"