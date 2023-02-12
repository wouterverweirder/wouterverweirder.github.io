---
title: Detecting and Killing Processes in Node or Electron
author: 'wouter'
pubDate: "2017-01-18T00:10:00.000Z"
heroImage: ./preview.jpg
hasCover: true
description: ""

comments: true
permalink: /2017/01/18/detecting-and-killing-processes-in-node-or-electron/
tags:
  - nodejs
  - electron
---
When building a Kiosk application, you might want to check which processes are running on the system. This way you can try killing unauthorized processes or show a warning when an unauthorized process is launched.

[The nodejs xps package](https://www.npmjs.com/package/xps) library offers a cross-platform to do most of the work. To make things a little easier, I wrote [a little helper class](https://gist.github.com/wouterverweirder/a2f2253279bc2db61d2b5fe8c59b2183) which polls the process list, allows you to specify names of unauthorized processes and dispatch events when a process launches / stops.

To use this class in your own nodejs or electron apps, make sure to add [the nodejs xps package](https://www.npmjs.com/package/xps) to your app. Put [my helper class](https://gist.github.com/wouterverweirder/a2f2253279bc2db61d2b5fe8c59b2183) somewhere in your application, and use it's api:

```javascript
const processListener = require('./process-listener');
const xps = require('xps');

const blacklistedProcessNames = [
  'System Preferences'
];

// do an initial check for blacklisted apps
processListener.getRunningProcesses().then(processes => {
  // processes are the initial processes
  processes.forEach(process => {
    if (isProcessBlacklisted(process)) {
      console.warn(`Blacklisted process running: ${process.name} (${process.pid})`);
    }
  });
  // listen for start & stop of processes
  processListener.on('start', process => {
    if (isProcessBlacklisted(process)) {
      console.warn(`Blacklisted process started: ${process.name} (${process.pid})`);
      xps.kill(process.pid).fork(
        function(error){ console.log(`Unable to kill process ${process.pid}`) },
        function(){ console.log(`Killed process ${process.pid}`) }
      );
    }
  });
  processListener.on('stop', process => {
    if (isProcessBlacklisted(process)) {
      console.info(`Blacklisted process stopped: ${process.name} (${process.pid})`);
    }
  });
  processListener.start(1000); // run every x-milliseconds
});
```