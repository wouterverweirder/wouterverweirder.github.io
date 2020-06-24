---
title: Using FCKEditor in Flex and AIR
author: 'wouter'
date: 2009-08-17T00:10:00.000Z
cover: ./preview.jpg
hasCover: true
description: false
layout: post
comments: true
permalink: /2009/08/17/using-fckeditor-in-flex-and-air/
tags:
  - Actionscript 3.0
  - AIR
  - fckeditor
  - Flex
---
**UPDATE: you should take a look at [my CKEditor implementation][1], as CKEditor is the successor to FCKEditor**.

One of the most wanted features in Adobe Flex / AIR is a better Rich Text Editor. There are some great ones available for javascript, so why can’t we have an editor with the same featureset? Well, it is actually possible to incorporate existing javascript editors in your Flex / AIR applications.

<del datetime="2013-02-10T10:50:52+00:00">You can download my library + demo’s at [/wp-content/uploads/flex_fckeditor/flex_fck_editor_0.1.zip][2]</del>

[Sources of my CKEditor bridge are available on Github.][3]

If you want to use FCKEditor in your own Flex or AIR projects, add the swc to your library path, and the assets folder to your src folder (just like the demo projects).

When you use the component in a Flex project, you need to ensure you **set the wmode property to ‘opaque’**. Also, if you run it on your **local filesystem with Internet Explorer**, you won’t see the component. It works fine if you run it on a webserver.

Currently it’s possible to get / set the htmlText, and change the toolbar set. I hope you enjoy this component, if you find any bugs or have feature request, feel free to post them in the comments.

 [1]: /2009/10/25/ckeditor-running-in-flex-and-air/
 [2]: /wp-content/uploads/flex_fckeditor/flex_fck_editor_0.1.zip
 [3]: https://github.com/wouterverweirder/AS3-CKEditor