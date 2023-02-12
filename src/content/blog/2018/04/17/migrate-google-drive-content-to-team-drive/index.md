---
title: Migrate Google Drive Content to Team Drive
author: 'wouter'
pubDate: "2018-04-17T00:10:00.000Z"
heroImage: ./preview.jpg
hasCover: true
description: ""

comments: true
permalink: /2018/04/17/migrate-google-drive-content-to-team-drive/
tags:
  - nodejs
  - google drive
  - team drive
---
Moving content from a Google Drive to a Team Drive can be a slow, manual process. Using the standard Google tools, it isn't possible to move Google Suite files with the file stream app. Uing the web interface, it isn't possible to move folders as a whole. This means you're stuck doing a lot of manual work when migrating content.

To automate this process, I created a little nodejs cli app. The process happens fully online, you don't need to have the files / folders offline. It offers a step-by-step wizard in the CLI. It still takes a long time if you've got loads of files, just give it some time (and run it at night?).

I've [uploaded the CLI app to Github](https://github.com/wouterverweirder/google-drive-to-team-drive); I've been able to migrate +100k files / folders with it, but still: use it at your own risk ;-)