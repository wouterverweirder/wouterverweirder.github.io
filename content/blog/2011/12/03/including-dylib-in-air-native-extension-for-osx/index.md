---
title: including dylib in air native extension for OSX
author: 'wouter'
date: 2011-12-03T00:10:00.000Z
cover: ./preview.jpg
hasCover: true
description: false
layout: post
comments: true
permalink: /2011/12/03/including-dylib-in-air-native-extension-for-osx/
categories:
  - Uncategorized
tags:
  - AIR
  - native extensions
  - OSX
---
I’ve been struggling a bit to create a framework file to use in an air native extension on OSX. The issue was that I was using 3rd party dylib libraries (intel building blocks), which aren’t normally installed on somebody’s computer. The framework compiled and everything, but for some reason the application crashed when using the native extension.

When air loaded the native extension, it could no longer find the necessary dylib files. Solution was:

- add a copy files phase to your build phases, which should copy your dylib file to the Resources directory of your framework  
- after compilation, open up a terminal window and navigate to your build folder. Use the otool -L command to get a listing of the linked libraries:

```
otool -L HelloThreadsAndUSB.framework/HelloThreadsAndUSB
```

Output is something like this:

```
HelloThreadsAndUSB:
    /Library/Frameworks/HelloThreadsAndUSB.framework/Versions/A/HelloThreadsAndUSB (compatibility version 1.0.0, current version 1.0.0)
    @rpath/Adobe AIR.framework/Versions/1.0/Adobe AIR (compatibility version 1.0.0, current version 1.0.0)
    /System/Library/Frameworks/Cocoa.framework/Versions/A/Cocoa (compatibility version 1.0.0, current version 15.0.0)
    libtbb.dylib (compatibility version 0.0.0, current version 0.0.0)
    /usr/lib/libstdc++.6.dylib (compatibility version 7.0.0, current version 7.9.0)
    /usr/lib/libSystem.B.dylib (compatibility version 1.0.0, current version 125.2.11)
```

In my case, the libtbb.dylib file could not be found when the application launched. You need to change the lookup path with the install\_name\_tool command:

```
install_name_tool -change libtbb.dylib @loader_path/Resources/libtbb.dylib HelloThreadsAndUSB.framework/HelloThreadsAndUSB
```

When you type in the otool command again, you should see the adjusted path:

```
HelloThreadsAndUSB:
    /Library/Frameworks/HelloThreadsAndUSB.framework/Versions/A/HelloThreadsAndUSB (compatibility version 1.0.0, current version 1.0.0)
    @rpath/Adobe AIR.framework/Versions/1.0/Adobe AIR (compatibility version 1.0.0, current version 1.0.0)
    /System/Library/Frameworks/Cocoa.framework/Versions/A/Cocoa (compatibility version 1.0.0, current version 15.0.0)
    @loader_path/Resources/libtbb.dylib (compatibility version 0.0.0, current version 0.0.0)
    /usr/lib/libstdc++.6.dylib (compatibility version 7.0.0, current version 7.9.0)
    /usr/lib/libSystem.B.dylib (compatibility version 1.0.0, current version 125.2.11)
```

Now you should be able to use this framework in your air native extension :-)

(Note: I tried the other options @executable_path and @rpath, but those didn’t do the trick)