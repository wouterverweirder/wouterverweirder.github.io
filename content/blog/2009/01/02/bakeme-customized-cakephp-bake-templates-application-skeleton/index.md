---
title: 'BakeMe –  Customized cakephp bake templates & application skeleton'
author: 'wouter'
date: 2009-01-02T00:10:00.000Z
cover: ./preview.jpg
hasCover: true
description: false
layout: post
comments: true
permalink: /2009/01/02/bakeme-customized-cakephp-bake-templates-application-skeleton/
tags:
  - cakephp
  - cakeswxphp
---
I just uploaded a first version of my cakephp scripts.

Bakeme is a cakephp application skeleton with customized bake scripts, which enables you to create advanced, data-driven websites.

Some of the features are:

- Pasword protected backend, based on users in the database  
- Customized form helpers to add fckeditor input fields, server side file browser fields, datepickers for date(time) fields, autocompletion functionality instead of comboboxes (if you set autocomplete to true using the extendedForm helper).  
- SoftDeletable behavior, so database records aren’t deleted instantly, but flagged as deleted  
- More advanced code generation, to generate nicer looking backends, based on your models  
- Option to bake all controllers instantly (using cake bake controller all (admin))  
- Option to bake all views instantly (using cake bake view all)  
- View code generation, to ajax sort records of models which have a field “order”.  
- Integration of cakeswxphp, which enables remoting on your website through swx, amf or json  
- …

[You can find an updated version of BakeMe in my Admin Plugin on Github][1]

 [1]: https://github.com/wouterverweirder/CakePHP-Admin-Plugin