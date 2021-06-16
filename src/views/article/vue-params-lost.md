---
title: Vue路由params丢失、错误路由白屏的解决方案
desc: 使用带params的路由的时候，如果params不正确，路由就不会渲染，导致页面出现空白，本来想跟query一样，指定其中一个query为默认值，没想到并不能如己所愿，不过最终问题还是解决了，采用了一个路由的api来判断当前路由是否存在，顺带解决了其他非正常路由的指向问题。
keywords: vue路由空白处理,vue默认params
date: 2019-02-26 13:54:00
cover: https://cdn.jsdelivr.net/gh/chengpeiquan/assets-storage/img/2019/02/1-1.jpg
categories:
  - tech
---

使用带 params 的路由的时候，如果 params 不正确，路由就不会渲染，导致页面出现空白，本来想跟 query 一样，指定其中一个 query 为默认值，没想到并不能如己所愿，不过最终问题还是解决了，采用了一个路由的 api 来判断当前路由是否存在，顺带解决了其他非正常路由的指向问题。

## 定位问题：

带有 params 的路由，比如一些文章页、用户个人页等等，输入 ./article/123 这样是可以正常进入文章 ID 为 123 的详情页，但是如果只有 ./article ，这样页面就会变成空白。

![](https://cdn.jsdelivr.net/gh/chengpeiquan/assets-storage/img/2019/02/1.jpg)

## 解决思路：

1、使用了  $route.matched 来判断to的路由对象是否存在，$route.matched 返回的是一个数组，如果数组为空，则表示接下来要去的非我们配置好的路由页面。

2、使用 beforeEach，在进入路由之前，判断接下来是否异常，如果异常，先看原来的路径是否有路由，有的话返回上一页，没有的话，回到首页。

附上官方文档：

> https://router.vuejs.org/zh/api/#路由对象属性

## 相关代码：

放到 main.js 里即可。

```javascript
router.beforeEach((to, from, next) => {
  if (to.matched.length === 0) {
    from.name ? next({ name: from.name }) : next('/')
  } else {
    next()
  }
})
```
