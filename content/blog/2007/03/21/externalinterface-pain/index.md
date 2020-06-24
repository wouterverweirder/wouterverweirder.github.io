---
title: ExternalInterface pain
author: 'wouter'
date: 2007-03-21T00:10:00.000Z
cover: ./preview.jpg
hasCover: true
description: false
layout: post
comments: true
permalink: /2007/03/21/externalinterface-pain/
tags:
  - Actionscript 2.0
---
Had a difficult time with ExternalInterface today. Ok, swfs work nicely together with javascript on a webserver, but when you access them locally, there are some security issues you have to deal with. The app I needed to created needed communication in both ways, so from swf to javascript and vice versa.

When you run the app locally through your browser, you get the security warning. In the security settings, you can add locations of local trusted files. Thing is: if you need communication in both ways, you need to specify the **directory** of the swf file, not just the file itself. Otherwise, only swf to javascript communication would work!