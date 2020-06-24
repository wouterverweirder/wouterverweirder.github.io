---
title: Apollo Custom Chromes
author: 'wouter'
date: 2007-03-20T00:10:00.000Z
cover: ./preview.jpg
hasCover: true
description: false
layout: post
comments: true
permalink: /2007/03/20/apollo-custom-chromes/
tags:
  - Adobe
  - Apollo
---
I’ve been playing around with the Apollo public alpha for a few hours now. One thing I was looking for, was creating those cool custom chromed applications, so you aren’t stuck to those rectangular windows.

Tout court, this is how I did it:

1.  Create your Apollo application :-)
2.  Adjust your application xml, so it has systemChrome=”none” and transparent=”true”
3.  Add some style to your application mxml:

``` css
ApolloApplication  
{  
	background-color:"";  
	background-image:"";  
	padding: 0px;  
	show-flex-chrome:"";  
}
```

And magic: The application borders are gone!