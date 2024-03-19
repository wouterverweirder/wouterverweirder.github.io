---
title: Kinect native extension for Adobe AIR
author: 'wouter'
pubDate: "2011-10-02T00:10:00.000Z"
heroImage: ./preview.jpg
hasCover: true
description: ""

comments: true
permalink: /2011/10/02/kinect-native-extension-for-adobe-air/
tags:
  - Uncategorized
---
**UppubDate: "T"his sample only supports the beta1 SDK on windows. Please check out [http://www.as3nui.com][1], where further development is happening (newer SDK versions, support for OSX).**

I’ve been playing with native extensions for air for a couple of weeks now. One of the things I wanted to do, was to get the Kinect working through a native extension. I’ve posted some sample libraries before, where the kinect date was sent to Adobe AIR through UDP sockets. However, the bandwith is quite limited, and there are noticable delays.

Using a native extension, we don’t have those limitations anymore. Another pro is that we don’t need to run a seperate program to send the data to our flash application.

I’ve got multiple skeleton tracking working, together with the video and the depth video.

```actionscript-3
kinect = new Kinect();
kinect.addEventListener(KinectEvent.SKELETON_TRACKED, skeletonTrackedHandler, false, , true);
kinect.startTracking();
 
kinectVideo = new KinectVideo(kinect);
kinectVideo.play();
addChild(kinectVideo);
 
kinectDepth = new KinectDepth(kinect);
kinectDepth.x = 650;
kinectDepth.play();
addChild(kinectDepth);
```

displaying the skeleton is pretty straightforward:

```actionscript-3
private function drawSkeletons():void
{
    skeletonsContainer.graphics.clear();
    for each(var skeleton:Skeleton in kinect.skeletons)
    {
        for each(var joint:Joint in skeleton.joints)
        {
            drawJoint(joint);
        }
        //draw some bones
        drawBone(skeleton.joints[Joint.SHOULDER_CENTER], skeleton.joints[Joint.SHOULDER_LEFT]);
        drawBone(skeleton.joints[Joint.SHOULDER_LEFT], skeleton.joints[Joint.ELBOW_LEFT]);
        drawBone(skeleton.joints[Joint.ELBOW_LEFT], skeleton.joints[Joint.WRIST_LEFT]);
        drawBone(skeleton.joints[Joint.WRIST_LEFT], skeleton.joints[Joint.HAND_LEFT]);
        drawBone(skeleton.joints[Joint.SHOULDER_CENTER], skeleton.joints[Joint.SHOULDER_RIGHT]);
        drawBone(skeleton.joints[Joint.SHOULDER_RIGHT], skeleton.joints[Joint.ELBOW_RIGHT]);
        drawBone(skeleton.joints[Joint.ELBOW_RIGHT], skeleton.joints[Joint.WRIST_RIGHT]);
        drawBone(skeleton.joints[Joint.WRIST_RIGHT], skeleton.joints[Joint.HAND_RIGHT]);
        drawBone(skeleton.joints[Joint.SHOULDER_LEFT], skeleton.joints[Joint.SPINE]);
        drawBone(skeleton.joints[Joint.SHOULDER_RIGHT], skeleton.joints[Joint.SPINE]);
        drawBone(skeleton.joints[Joint.SPINE], skeleton.joints[Joint.HIP_CENTER]);
        drawBone(skeleton.joints[Joint.HIP_CENTER], skeleton.joints[Joint.HIP_LEFT]);
        drawBone(skeleton.joints[Joint.HIP_LEFT], skeleton.joints[Joint.KNEE_LEFT]);
        drawBone(skeleton.joints[Joint.KNEE_LEFT], skeleton.joints[Joint.ANKLE_LEFT]);
        drawBone(skeleton.joints[Joint.ANKLE_LEFT], skeleton.joints[Joint.FOOT_LEFT]);
        drawBone(skeleton.joints[Joint.HIP_CENTER], skeleton.joints[Joint.HIP_RIGHT]);
        drawBone(skeleton.joints[Joint.HIP_RIGHT], skeleton.joints[Joint.KNEE_RIGHT]);
        drawBone(skeleton.joints[Joint.KNEE_RIGHT], skeleton.joints[Joint.ANKLE_RIGHT]);
        drawBone(skeleton.joints[Joint.ANKLE_RIGHT], skeleton.joints[Joint.FOOT_RIGHT]);
    }
}
 
private function drawJoint(joint:Joint):void
{
    skeletonsContainer.graphics.beginFill(0x000000);
    skeletonsContainer.graphics.drawCircle(joint.x * 640, joint.y * 480, 10 / joint.z);
    skeletonsContainer.graphics.endFill();
}
 
private function drawBone(from:Joint, to:Joint):void
{
    skeletonsContainer.graphics.lineStyle(1);
    skeletonsContainer.graphics.moveTo(from.x * 640, from.y * 480);
    skeletonsContainer.graphics.lineTo(to.x * 640, to.y * 480);
}
```

You can [download the flash builder project][2] and the [visual studio project for the native extension][3]. I didn’t have any C programming experience before, so there’s probably room for improvement on the C side. Currently, the extension is only available for windows using the kinect sdk. Make sure you’ve installed the microsoft kinect sdk, aswell as visual studio. You’ll also need to launch the flash builder project using my ant build script which is included in the flash builder project. You’ll want to update the path to your air sdk in the ant-debug.xml.

If you want to see it live in action, come check out our session “interREACT with the flas platform” at the FITC unconference at MAX (tuesday).

[1]: http://www.as3nui.com
[2]: http://labs.aboutme.be/kinectextension/KinectExtensionTest.fxp
[3]: http://labs.aboutme.be/kinectextension/KinectExtension.zip