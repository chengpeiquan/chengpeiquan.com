---
title: 基于Vue-CLI 3.0 让WebPack在打包的时候添加版权注释
desc: 其实以前就知道说有这么个东西可以在打包后添加一个版权注释，但是一直没有去用。不过最近觉得最好还是配置一下，版权不版权倒是其次，毕竟打包后都是混淆的东西，要抄也不好抄啊不是，主要还是给一些有需要的人知道说这个东西是谁写的，有什么问题可以咨询谁，或者说以后有什么类似的需求，是不是可以再次找谁做。
keywords: WebPack 打包注释,WebPack banner,WebPack 版权
date: 2019-04-21 23:03:00
cover: https://cdn.jsdelivr.net/gh/chengpeiquan/assets-storage/img/2019/04/1-1.jpg
categories:
  - tech
---

这个不是 Vue 的东西，是 webpack 的功能~

其实以前就知道说有这么个东西可以在打包后添加一个版权注释，但是一直没有去用。

不过最近觉得最好还是配置一下，版权不版权倒是其次，毕竟打包后都是混淆的东西，要抄也不好抄啊不是，主要还是给一些有需要的人知道说这个东西是谁写的，有什么问题可以咨询谁，或者说以后有什么类似的需求，是不是可以再次找谁做。

配置方式也比较简单啦，都是基于 vue.config.js

```javascript
const webpack = require('webpack')
// ……

module.exports = {
  // ……
  configureWebpack: (config) => {
    if (process.env.NODE_ENV !== 'production') return
    return {
      plugins: [new webpack.BannerPlugin(' The roject developed by 2dang! ')],
    }
  },
}
```

效果预览如下，会在打包后的 css/js 文件开头，生成你配置的版权注释：

![](https://cdn.jsdelivr.net/gh/chengpeiquan/assets-storage/img/2019/04/1.jpg)

更多的配置选项可以看 webpack 的官方文档：

> https://www.webpackjs.com/plugins/banner-plugin/
