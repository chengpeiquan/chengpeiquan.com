---
title: 基于Vue-CLI 3.0的骨架屏实现方案
desc: 大型Project的首次载入速度一般会比较慢，虽然Vue可以配置路由懒加载，但有时候打包出来的chunk还是会比较大，这个时候可以结合骨架屏来提高用户等待加载时的体验。
keywords: Vue骨架屏,Vue3.0骨架屏,Vue Skeleton
date: 2019-03-01 16:14:00
cover: https://cdn.jsdelivr.net/gh/chengpeiquan/assets-storage/img/2019/03/1.jpg
categories:
  - tech
repo: https://github.com/chengpeiquan/vue-skeleton
---

大型 Project 的首次载入速度一般会比较慢，虽然 Vue 可以配置路由懒加载，但有时候打包出来的 chunk 还是会比较大，这个时候可以结合骨架屏来提高用户等待加载时的体验。

![](https://cdn.jsdelivr.net/gh/chengpeiquan/assets-storage/img/2019/03/2.jpg)

## 安装依赖

3.0 的骨架屏和 2.0 不太一样，简化了不少操作，可直接依赖一个插件 vue-skeleton-webpack-plugin 来处理，我们需要先安装它。

> 官方文档 https://github.com/lavas-project/vue-skeleton-webpack-plugin

## 配置 config

脚手架 3.0 的好处就是所有配置都集中到 vue.config.js 处理，非常方便，核心的 config 代码贴一下，完整代码最后会附上。

```javascript
//引入插件
const SkeletonWebpackPlugin = require('vue-skeleton-webpack-plugin')

module.exports = {
  //其他的基础配置
  //下面开始配置插件相关的东西，可参考官方文档
  configureWebpack: (config) => {
    config.plugins.push(
      new SkeletonWebpackPlugin({
        webpackConfig: {
          entry: {
            app: path.join(__dirname, './src/Skeleton.js'),
          },
        },
        minimize: true,
        quiet: true,
      })
    )
  },
  //这个是让骨架屏的css分离，直接作为内联style处理到html里，提高载入速度
  css: {
    extract: true,
    sourceMap: false,
    modules: false,
  },
}
```

## 创建骨架屏文件

需要 2 个核心文件，1 个是骨架屏模板 Skeleton.vue，一个是动态引入到项目的 Skeleton.js

Skeleton.vue：模板在这里就不贴代码了，常规的 template 和 style 根据首屏的布局，写一个简化版的纯色模板即可，可在最后下载 demo 参考。

Skeleton.js：参考 main.js，但是需要通过 export default 单独暴露给 Vue。

```javascript
// - Skeleton.js
import Vue from 'vue'
import Skeleton from './Skeleton.vue'

export default new Vue({
  components: { Skeleton },
  render: (h) => h(Skeleton),
})
```

以上文件保存到 src 目录下，和 App.vue 同级。

## 预览效果

以上，就完成了骨架屏的配置，预览效果可以通过 chrome 模拟器，调节到 low-end mobile 模式，降速查看骨架屏的渲染是否 ok ～

## Demo 下载

相关的 demo 我发布到 github 了，可以下载看一下～ node_modules 没有一起放上来，下载后自己先 npm install。

> https://github.com/chengpeiquan/vue-skeleton
