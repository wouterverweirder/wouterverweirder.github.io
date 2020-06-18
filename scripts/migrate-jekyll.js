const fs = require('fs'),
  path = require('path'),
  util = require('util'),
  mkdirp = require('mkdirp'),
  he = require('he');

const glob = util.promisify(require('glob').glob);
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);
const copyFile = util.promisify(fs.copyFile);

const gatsbyBlogFolder = path.resolve(__dirname, '..');
const jekyllBlogFolder = path.resolve(__dirname, '..', '..', 'wouterverweirder.github.io');

const gatsbyContentFolder = path.resolve(gatsbyBlogFolder, 'content');

const init = async () => {
  const postFiles = await glob(`${jekyllBlogFolder}/source/_posts/*.md`);
  for (const postFile of postFiles) {
    await processPostFile(postFile);
  }

};

const processPostFile = async (postFile) => {
  const postName = path.basename(postFile, '.md');
  const splitted = postName.split('-');
  const year = `${parseInt(splitted[0])}`.padStart(4, '0');
  const month = `${parseInt(splitted[1])}`.padStart(2, '0');
  const day = `${parseInt(splitted[2])}`.padStart(2, '0');
  const postDate = new Date(`${year}-${month}-${day}T00:10:00.000Z`);

  const postSlug = splitted.slice(3).join('-');
  let postContent = await readFile(postFile, 'utf8');

  // replace full urls
  postContent = postContent.replace(/http:\/\/blog\.aboutme\.be\//gi, '/');

  // replace as3 syntax highlighting with actionscript
  postContent = postContent.replace(/``` as3/gi, '``` actionscript');
  postContent = postContent.replace(/``` mxml/gi, '``` xml');

  // other replaces
  if (postContent.indexOf('tags:') === -1) {
    postContent = postContent.replace('categories:', 'tags:');
  }


  // decode html entities
  postContent = he.decode(postContent);

  // iframe embed
  // {% slideshare 11801097 %}
  postContent = postContent.replace('{% slideshare 11801097 %}', '<iframe src="https://www.slideshare.net/slideshow/embed_code/11801097" width="595" height="446"></iframe>');

  // return;

  // add extra metadata
  const metaStrToReplace = 'author: wouter';
  const metaStrToInject = `author: 'wouter'
date: ${postDate.toISOString()}
cover: ./preview.png
hasCover: false
description: false`;
  postContent = postContent.replace(metaStrToReplace, metaStrToInject);

  const gatsbyPostFolder = path.resolve(gatsbyContentFolder, 'blog', year, month, day, postSlug);
  await mkdirp(gatsbyPostFolder);

  await copyFile(path.resolve(gatsbyContentFolder, 'assets', 'preview.png'), path.resolve(gatsbyPostFolder, 'preview.png'));

  const gatsbyPostFile = path.resolve(gatsbyPostFolder, 'index.md');
  await writeFile(gatsbyPostFile, postContent);

  
};

init();