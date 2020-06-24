---
title: AIR Native extension for simple speech recognition on OSX
author: 'wouter'
date: 2012-04-19T00:10:00.000Z
cover: ./preview.jpg
hasCover: true
description: false
layout: post
comments: true
permalink: /2012/04/19/air-native-extension-for-simple-speech-recognition-on-osx/
categories:
  - Uncategorized
tags:
  - air native extension
  - nsspeechrecognizer
  - OSX
  - speech recognition
---
Today I played around a bit with speech recognition on OSX. One of the things I did, was create a simple bridge between Adobe AIR and the NSSpeechRecognizer API on OSX. This api allows you to set a predefined list of commands, and listen for those spoken commands.

The API is quite simple, and so is the native extension api. After including the ANE file, you’ll create an instance of the bridge:

``` actionscript
var nsSpeechRecognizerBridge:NSSpeechRecognizerBridge = new NSSpeechRecognizerBridge();
```

After that, you add a list of valid commands:

``` actionscript
nsSpeechRecognizerBridge.setCommands(Vector.<String>([
    "square", 
    "circle",
]));
```

You add an event handler, which is triggered when a command is recognized:

``` actionscript
nsSpeechRecognizerBridge.addEventListener(CommandRecognizedEvent.COMMAND_RECOGNIZED, commandRecognizedHandler);
```

And you start the recognizer:

``` actionscript
nsSpeechRecognizerBridge.startListening();
```

This will open the speech recognition widget of OSX, with your AIR application. The event handler is triggered when the bridge recognizes one of the commands. The CommandRecognizedEvent object, will contain the command that was recognized:

``` actionscript
protected function commandRecognizedHandler(event:CommandRecognizedEvent):void
{
    trace("command recognized: " + event.command);
}
```

Note that this built-in speech recognition engine is quite sensitive to background noise, and only recognizes US-English spoken words.

[Everything (as3 source, native source, demo & ane) is on github for your coding pleasure][1]. Enjoy!

Microphone Icon made by Eucalyp from www.flaticon.com

[1]: https://github.com/wouterverweirder/AIR-OSX-NSSpeechRecognizerBridge-Extension		"Code on Github"