---
title: 'FITC Amsterdam – slides & demo videos of opencv & finger tracking air native extensions'
author: 'wouter'
pubDate: "2012-02-29T00:10:00.000Z"
heroImage: ./preview.jpg
hasCover: true
description: ""

comments: true
permalink: /2012/02/29/fitc-amsterdam-slides-demo-videos-of-opencv-finger-tracking-air-native-extensions/
categories:
  - Uncategorized
tags:
  - AIR
  - air native extension
  - airkinect
  - finger tracking
  - fitc
  - fitc amsterdam 2012
  - opencv
---
Just got back of the FITC Amsterdam conference, and it’s been awesome! I gave a kinect workshop on sunday, together with my [Happy Banana][1] & [HOWEST][2] colleague [Koen De Weggheleire][3]. Apart from a longer-than-expected installation process of the kinect drivers on mac, we had a great time showing the attendees how they can use the [AIRKinect][4] native extension to use the kinect inside their AIR applications.

You can read some of the attendees their impressions on their blogs:  
[http://www.aloft.nl/2012/02/hack-slash-play-with-kinect-at-fitc-amsterdam-2012/][5] 
[http://thomasantonbinder.com/fitc-2012-day-1-workshop-kinect][6]

On tuesday, I gave a presention on AIR native extensions. I had a 90-minute timeslot, and was a bit afraid how I would balance the talk. So, the first half of the talk, I talked about programming & packaging native extensions, and showed some extensions I created.

<iframe src="https://www.slideshare.net/slideshow/embed_code/11801097" width="595" height="446"></iframe>

I was happy, I could get opencv working as an air native extension, and showed a quick demo of executing HAAR cascades through OpenCV in an AIR native extension:



The second half of the talk, was about the new version of AIRKinect we’ll be releasing shortly. I did some quick live-code-demos, showing how we created the api, especially for Actionscript 3.0. Next to the features we’re bringing in AIRKinect 2, I could show how you can combine the kinect drivers & opencv in an AIR native extension, to do finger tracking for your AIR application :-)



I had a great time at FITC, and would like to thank Shawn & the FITC crew to give me the opportunity to present at the conference! We were asked to create a “thank you” video, which was shown at the end of the conference. [Check out the making-of-blooper-version Koen and I made][7] :-)

[1]: http://www.happy-banana.be   "Happy Banana"
[2]: http://www.howest.be         "Howest"
[3]: http://www.newmovieclip.com  "Koen De Weggheleire"
[4]: http://www.as3nui.com        "AS3NUI"
[5]: http://www.aloft.nl/2012/02/hack-slash-play-with-kinect-at-fitc-amsterdam-2012/
[6]: http://thomasantonbinder.com/fitc-2012-day-1-workshop-kinect
[7]: http://vimeo.com/36647793    "FITC After Movie Bloopers"