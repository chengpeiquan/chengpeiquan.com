---
title: 百度地图API实例销毁方案 可用于Vue单页面项目
desc: 最近项目用到了百度地图的API，用倒是没啥毛病，就是发现用完之后留下来的垃圾太多 = = 项目是基于Vue做的，当时发现在需要百度地图的那个路由用完之后，切去其他页面，积累了很多DOM，并且再次进入会再次创建，在项目里体验越久，DOM树越累赘，并且由百度地图创建的定时器越攒越多。
keywords: 百度地图销毁,百度地图API销毁
date: 2020-12-24 16:00:00
cover: https://cdn.jsdelivr.net/gh/chengpeiquan/assets-storage/img/2020/12/baidu-map.jpg
categories:
  - tech
---

最近项目用到了百度地图的 API ，用倒是没啥毛病，就是发现用完之后留下来的垃圾太多 = =

项目是基于 Vue 做的，当时发现在需要百度地图的那个路由用完之后，切去其他页面，积累了很多 DOM，并且再次进入会再次创建，在项目里体验越久，DOM 树越累赘，并且由百度地图创建的定时器越攒越多。

这当然不是什么好事……

![](https://cdn.jsdelivr.net/gh/chengpeiquan/assets-storage/img/2020/12/2.jpg)

在接入的时候就发现了这个问题，查了好久都没有找到销毁的 API ，包括官方贴吧和各种博客都没有找到，打了个 TODO 直到今天才有空优化这个问题。

![](https://cdn.jsdelivr.net/gh/chengpeiquan/assets-storage/img/2020/12/1.png)

一开始尝试直接移除创建的 DOM ，但发现会带来另外的问题，控制台一片血海……（很明显是定时器在执行时找不到 DOM 而产生的报错…

![](https://cdn.jsdelivr.net/gh/chengpeiquan/assets-storage/img/2020/12/3.jpg)

根据打印出来的报错日志，可以看到这个报错是百度地图 API 的 JS 文件产生出来的。

通常会产生这种情况的无非就是 `setTimeout` 和 `setInterval` 了，在百度地图 API 的源码里找到了相关的代码 `setInterval(e._watchSize, 16)` ，确实是一直在监听 DOM 的尺寸变化。

那么解决思路就有了，在移除 DOM 的同时，顺带清除这些定时器。

平时我们清除定时器都是通过 `const XXX = setInterval( .... )` 的形式定义定时器，然后再 `clearInterval(XXX)`去清除。

但百度地图的定时器因为封装并且混淆的太深，暂时得不到具体的变量，所以采用了一个全局清除的 Hack 方案来解决该问题。

最终相关的销毁代码如下:

```js
/**
 * 销毁百度地图
 */
try {
  // 注销地图（换成你初始化时定义的地图变量）
  map = null

  // 获取interval的最高ID然后遍历清除
  const HIGHEST_INTERVAL_ID = setInterval(';')
  for (let i = 0; i < HIGHEST_INTERVAL_ID; i++) {
    clearInterval(i)
  }

  // 获取百度地图创建的DOM并销毁
  const BAIDU_MAPS = document.querySelectorAll('.tangram-suggestion-main')
  BAIDU_MAPS.forEach((item) => {
    document.body.removeChild(item)
  })
} catch (e) {
  // console.log(e);
}
```

Vue 项目我是放到了组件卸载后的生命周期里执行（Vue 2.x 是 `destroyed`，3.x 是 `onUnmounted`）。

在上线这个方案之前有考虑到会不会误伤到其他定时器，但和组里的同学讨论过后，基本上都是有良好的使用习惯，就是创建 `setInterval` 之后都有习惯在达成目的后执行销毁，所以按照这个习惯来说，理论上不会带来很大的影响。

如果有更好的解决方案欢迎分享，销毁这一块实在是搜不到什么解决方案，自己也是排查了半天，不知道为什么官方就不能出一个销毁的 API 直接调。
