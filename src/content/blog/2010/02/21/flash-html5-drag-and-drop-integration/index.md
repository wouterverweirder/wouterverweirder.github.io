---
title: 'Flash – HTML5 Drag and drop integration'
author: 'wouter'
pubDate: "2010-02-21T00:10:00.000Z"
heroImage: ./preview.jpg
hasCover: true
description: ""

comments: true
permalink: /2010/02/21/flash-html5-drag-and-drop-integration/
tags:
  - Actionscript 3.0
  - Flash
  - html5
---
After seeing [Mario Klingemann’s HTML5 drag and drop demo][1], I wanted to write a library around it and make it a little more cross-browser.

Register the necessary event listeners to the class and react to events such as dragging a file / element over your swf, dropping data or dropping a file on the swf.

```actionscript-3
FlashDragDrop.addEventListener(FlashDragDropEvent.DROP_DATA, dropDataHandler);
```

You don’t need to add any extra javascript to your flash embed, the javascript necessary to add the drag and drop support is injected automatically.

You can detect the drag and drop events in the latest versions of Firefox, Safari and IE. Accessing the content of the dropped files only works in the latest version of Firefox (try dropping an image).

You can [check out a demo][2] or [download the source files][3].

 [1]: http://www.quasimondo.com/examples/draganddrop/dragAndDropFFF.php
 [2]: http://labs.aboutme.be/flash_drag_drop/demo/
 [3]: http://labs.aboutme.be/flash_drag_drop/flash_drag_drop_source.zip