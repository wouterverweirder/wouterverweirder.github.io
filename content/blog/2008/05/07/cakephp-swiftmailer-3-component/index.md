---
title: CakePHP SwiftMailer 3 Component
author: 'wouter'
date: 2008-05-07T00:10:00.000Z
cover: ./preview.jpg
hasCover: true
description: false
layout: post
comments: true
permalink: /2008/05/07/cakephp-swiftmailer-3-component/
tags:
  - cakephp
---
I had some issues today using the cakephp swiftmailer component. It still relied on the older version (pre version 3) of swiftmailer. There are quite some changes between SwiftMailer 2 and 3, and I decided to adjust the SwiftMailer component so it works with SwiftMailer 3.

Please note that this is the PHP5 version. To get it working in PHP4, you need to change the constants in the connect\_sendmail and connect\_smtp…

Download [CakePHP SwiftMailer 3 Component][1].

 [1]: /wp-content/uploads/2008/05/swift_mailer.rar "CakePHP SwiftMailer 3 Component"