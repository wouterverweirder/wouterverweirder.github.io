---
title: benchmarking cakeswx/amfphp
author: 'wouter'
date: 2008-01-20T00:10:00.000Z
cover: ./preview.jpg
hasCover: true
description: false
layout: post
comments: true
permalink: /2008/01/20/benchmarking-cakeswxamfphp/
tags:
  - Actionscript 3.0
  - amfphp
  - cakephp
  - cakeswxphp
  - swx
---
Cakeswxphp enables you to use the cakphp rapid application framework as your remoting backend. No longer writing complex sqls, escaping query strings,… As some of you have noticed, cake does slow your remoting down a bit, as more classes are loaded to give you this ease-of-use. I did some benchmarks, comparing amfphp and swx with cakeswxphp 1.1 and cakeswxphp 1.2. I ran the echoData service 10 times, and took the average speed of those calls. These are the results:

SWX: 346ms  
CakeSWXPHP 1.1: 350ms  
CakeSWXPHP 1.2: 369ms  
AMFPHP: 57ms  
CakeAMFPHP 1.1: 111ms  
CakeAMFPHP 1.2: 126ms

As we already know, AMFPHP is fast as hell. The CakePHP version is 2x slower because of the extra classes & functions cakephp executes. The difference between SWX and CakeSWX isn’t that big.

After that, I turned out eaccelerator (PHP caching / accelerator system) and ran the benchmark again:

SWX: 347ms  
CakeSWXPHP 1.1: 364ms  
CakeSWXPHP 1.2: 362ms  
AMFPHP: 50ms  
CakeAMFPHP 1.1: 64ms  
CakeAMFPHP 1.2: 67ms

Not much difference between the first results without the caching, except for the Cake AMF gateway: it seems like using a php accelerator makes the cakeamfphp almost as fast as the native amfphp!

I’ve included the benchmark scripts:

[cakeswxphp SWX benchmark][1]  
[cakeswxphp AMF benchmark (AS3)][2]

 [1]: /wp-content/uploads/2008/01/cakeswxphp.fla "cakeswxphp SWX benchmark"
 [2]: /wp-content/uploads/2008/01/cakeswxphpbenchmark.as "cakeswxphp AMF benchmark (AS3)"