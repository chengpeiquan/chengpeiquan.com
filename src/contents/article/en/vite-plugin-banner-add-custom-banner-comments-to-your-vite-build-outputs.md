---
title: 'vite-plugin-banner: add custom banner comments to your vite build outputs'
desc: A banner plugin for Vite, It can adds a banner to the top of each generated chunk.
keywords: vite-plugin-banner,vite plugin,vite banner,vite comment,vite copyright
date: 2021-02-23 23:10:00
cover: https://cdn.chengpeiquan.com/img/2021/01/20210224102526.jpg?x-oss-process=image/interlace,1
categories:
  - open-source
repo: https://github.com/chengpeiquan/vite-plugin-banner
remote:
  type: github
  repo: vite-plugin-banner
  path: README.md
---

This is my first Vite plugin. Before I start using Vite, I used rollup for a while, I have used rollup-plugin-banner and rollup-plugin-banner2 . Since Vite's official documentation states that it supports the direct use of Rollup plugins, I also tried to use them directly. But I import them into `vite.config.ts` and found that them doesn't work. So, I try to learn the plugin development of vite, so there is this work, Its features is similar to WebPack bannerPlugin.

It follows Vite's plugin [development specifications](https://vitejs.dev/guide/api-plugin.html), It works normally in Vite, support Vite 2 or higher versions, and it can inherit some options of vite.config, e.g. `build.outDir` .
