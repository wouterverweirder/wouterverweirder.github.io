---
title: 'Deeplinking & browser back button in Flash'
author: 'wouter'
date: 2006-11-02T00:10:00.000Z
cover: ./preview.jpg
hasCover: true
description: false
layout: post
comments: true
permalink: /2006/11/02/deeplinking-browser-back-button-in-flash/
tags:
  - Actionscript 2.0
---
For a recent company site, I wanted to build in browser history support, to make the site more accessible. I used robert penner’s browser history before, but it never felt quite good: it requires an html hidden frame setup that communicates with flash & vice versa, using getURL to communicate with the javascript functions,…

So I searched for an alternative method, and [found one which doesn’t use frames, uses ExternalInterface to communicate with the javascript code AND it supports deeplinking][1]! Flash & accessibility, another milestone reached?

 [1]: http://reefscape.net/?p=10 "Deeplinking & browser back button in Flash"