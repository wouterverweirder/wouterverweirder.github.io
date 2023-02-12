---
title: CKEditor running in Flex and AIR
author: 'wouter'
pubDate: "2009-10-25T00:10:00.000Z"
heroImage: ./preview.jpg
hasCover: true
description: ""

comments: true
permalink: /2009/10/25/ckeditor-running-in-flex-and-air/
tags:
  - Actionscript 3.0
  - AIR
  - CKEditor
  - fckeditor
  - Flex
---
CKEditor is the new version of FCKEditor. Following up on my FCKEditor post, I’ve got CKEditor up and running in both flex and air now.

[Download the library + demo’s on github.][1]

Again, some release notes (same as FCKEditor actually :-)):

If you want to use CKEditor in your own Flex or AIR projects, add the swc to your library path, and the assets folder to your src folder (just like the demo projects).

When you use the component in a Flex project, you need to ensure you set the wmode property to ‘opaque’. Also, if you run it on your local filesystem with Internet Explorer, you won’t see the component. It works fine if you run it on a webserver.

 [1]: https://github.com/wouterverweirder/AS3-CKEditor