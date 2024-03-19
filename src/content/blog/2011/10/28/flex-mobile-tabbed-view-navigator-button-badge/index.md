---
title: Flex Mobile Tabbed View Navigator Button Badge
author: 'wouter'
pubDate: "2011-10-28T00:10:00.000Z"
heroImage: ./preview.jpg
hasCover: true
description: ""

comments: true
permalink: /2011/10/28/flex-mobile-tabbed-view-navigator-button-badge/
categories:
  - Uncategorized
tags:
  - AIR
  - Flex
  - mobile
  - skinning
---
I wanted to display a “badge text” in a Flex Mobile project. Badge texts are the red circles on iOS, where you can see a number of updates, unread messages, …

This isn’t included in the default flex mobile components / skins, so I decided to extend & skin the tabbed view navigator, so you’re able to add this functionality in your applications.

You simple use my BadgeViewNavigator instead of ViewNavigators, and set a badgeText value to display in the badge:

``` xml
<views:BadgeViewNavigator label="One" width="100%" height="100%"
      firstView="be.aboutme.flex.mobile.badgeViewNavigator.views.OneView"
      badgeText="23"/>
<views:BadgeViewNavigator label="Two" width="100%" height="100%"
      firstView="be.aboutme.flex.mobile.badgeViewNavigator.views.TwoView"
      badgeText="2"/>
<views:BadgeViewNavigator label="Three" width="100%" height="100%"
      firstView="be.aboutme.flex.mobile.badgeViewNavigator.views.ThreeView"/>
```

[You can download the sources & demo in this fxp file. Enjoy!][1]

 [1]: http://labs.aboutme.be/flex_mobile/badge_view_navigator/BadgeViewNavigatorDemo.fxp