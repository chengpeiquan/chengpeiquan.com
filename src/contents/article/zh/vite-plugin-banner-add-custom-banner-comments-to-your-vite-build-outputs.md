---
title: vite-plugin-banner：为 Vite 的构建产物添加个性化标头注释
desc: Vite 的 banner 插件，它可以在生成的每个 chunk 的顶部添加标头注释。
keywords: vite-plugin-banner,vite plugin,vite banner,vite注释,vite版权
date: 2021-02-23 23:10:00
cover: https://cdn.chengpeiquan.com/img/2021/01/20210224102526.jpg?x-oss-process=image/interlace,1
categories:
  - open-source
repo: https://github.com/chengpeiquan/vite-plugin-banner
remote:
  type: github
  repo: vite-plugin-banner
  path: README.zh-CN.md
---

这是我的第一个 Vite 插件，在开始使用 Vite 之前，我用过一段时间的 Rollup ，用过 rollup-plugin-banner 和 rollup-plugin-banner2 ，因为 Vite 官方的文档上说明支持直接使用 Rollup 插件，所以我也尝试直接使用它们，但是我把它们导入到 `vite.config.ts` 中发现不起作用，于是，我尝试学习 vite 的插件开发，于是就有了这个作品，它的功能类似于 WebPack bannerPlugin 。

它遵循 [Vite 的插件开发规范](https://vitejs.dev/guide/api-plugin.html)，可以在 Vite 中正常工作，支持 Vite 2 或更高版本，并且可以继承 vite.config 的一些选项，例如 `build.outDir` 。
