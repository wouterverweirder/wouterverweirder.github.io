---
title: Actionscript 3.0 Gradients and Curves code generator
author: 'wouter'
date: 2008-09-21T00:10:00.000Z
cover: ./preview.png
hasCover: false
description: false
layout: post
comments: true
permalink: /2008/09/21/actionscript-30-gradients-and-curves-code-generator/
tags:
  - Actionscript 3.0
  - Flash
---
Now and then, I have to use the drawing API to draw a gradient, or a bezier curve. Every time, I have to dig through the help, to check the meaning of the different parameters, and where they belong in the function call. To make this more easy, I created a little code generator for gradients, and for drawing bezier curves with Actionscript 3.0.

Gradients code generator:

<div id="gradients-code-generator-swf"></div>

Beziers code generator

<div id="beziers-code-generator-swf"></div>

<script src="//ajax.googleapis.com/ajax/libs/swfobject/2.2/swfobject.js"></script>
<script type="text/javascript">
(function(){
	swfobject.embedSWF("/wp-content/uploads/2008/09/gradients_01.swf", "gradients-code-generator-swf", "550", "400", "10.0.0");
	swfobject.embedSWF("/wp-content/uploads/2008/09/curveto_demo.swf", "beziers-code-generator-swf", "550", "400", "10.0.0");
})();
</script>