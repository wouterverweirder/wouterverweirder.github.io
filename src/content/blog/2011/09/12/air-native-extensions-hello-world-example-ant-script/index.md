---
title: 'AIR Native extensions Hello World Example & ANT Script'
author: 'wouter'
pubDate: "2011-09-12T00:10:00.000Z"
heroImage: ./preview.jpg
hasCover: true
description: ""

comments: true
permalink: /2011/09/12/air-native-extensions-hello-world-example-ant-script/
categories:
  - Uncategorized
tags:
  - AIR
  - C++
  - native extensions
---
I red about native extensions in the recent version of Adobe AIR 3.0, and decided to play with it. There aren’t that many examples online yet, the only resources I found were [the devnet article from Oliver Goldman][1] and [a blog post about invoking ICU from Adobe AIR][2].<!--more-->

I don’t know any C++ at all, so it was quite a challenge to build a working dll and getting Adobe AIR to talk to it. Right now, all my example does is simple return the message it gets from Adobe AIR back. But it might form a starting point to build more exciting stuff on top of it.

Building and testing the native extensions is quite some command-line work, so I decided to put it in an ant script, which builds the .ANE file, extracts it and starts a AIR debug session with the extension.

You can[ download the visual studio project][3] and [the flash builder project][4]. The flash builder project comes with an ant script (ant-debug.xml), which does the native extension packaging & debug launch. You may need to change the path to your Adobe AIR sdk in the ant-debug.xml file.

Enjoy!

 [1]: http://www.adobe.com/devnet/air/articles/extending-air.html
 [2]: http://blogs.adobe.com/globalization/eo/invoking-icu-from-adobe-air-applications-2/
 [3]: http://labs.aboutme.be/native_extensions/HelloWorldExtension_VisualStudio.rar
 [4]: http://labs.aboutme.be/native_extensions/HelloWorldExtensionWorkflow.fxp