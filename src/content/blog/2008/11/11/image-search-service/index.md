---
title: Image search service
author: 'wouter'
pubDate: "2008-11-11T00:10:00.000Z"
heroImage: ./preview.jpg
hasCover: true
description: ""

comments: true
permalink: /2008/11/11/image-search-service/
tags:
  - amfphp
  - swx
---
I had to search for (stock) images today, to include in a presentation. I found myself tabbing through different search engines all the time, so I decided to write an amf/swx service which has methods to search SXC, MorgueFile, Google Image search and Flickr. This way, I can write a flash frontend, which makes my life a little easier.

You can see a simple image browser at: <http://labs.aboutme.be/image_search/>.

And of course, the [server side code is available for download][1] aswell.. You can find the service itself in swx/services/ImageService.php. For Flickr, you will need to have an API key, and enter your API key in the ImageService PHP file.

 [1]: /wp-content/uploads/2008/11/image_search.zip