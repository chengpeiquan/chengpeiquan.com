---
title: 使用getBoundingClientRect 针对scrollTop一直为0且documentElement无效的解决方案
desc: 今天在上线一个移动端需求的时候，QA妹子跟我反馈在她们一部iPhone X上面出现了一个滚动加载会同时触发下拉刷新的bug…我就 ？？？……一个在顶部一个在底部这也能扯上关系？然后再进一步测试，发现这个坑是出现在自家app的内置webview上，在浏览器和微信等环境都正常。
keywords: scrollTop 0,scrollTop bug,getBoundingClientRect
date: 2020-09-15 01:41:00
cover: https://cdn.jsdelivr.net/gh/chengpeiquan/assets-storage/img/2020/09/3.jpg
categories:
  - tech
---

今天在上线一个移动端需求的时候，QA 妹子跟我反馈在她们一部 iPhone X 上面出现了一个滚动加载会同时触发下拉刷新的 bug…

我就 ？？？……一个在顶部一个在底部这也能扯上关系？

然后再进一步测试，发现这个坑是出现在自家 app 的内置 webview 上，在浏览器和微信等环境都正常。

## debug 过程

幸亏这 2 个功能都是自己手写的，没引入其他插件，所以定位原因还是比较容易，因为两个功能都涉及到一个关键的数据就是 `scrollTop`，于是引入 vConsole，打印不断变化的 scrollTop 到控制台，结果，其他设备都能正常获取到 scrollTop，唯独这部机子一直是 0…

查阅自己对 scrollTop 的定义，也是比较主流的一个方案了，原来的代码：

```js
const SCROLL_TOP = document.documentElement.scrollTop || document.body.scrollTop
```

是不是很诡异？然而搜索来搜索去就没遇到一样的情况，针对 scrollTop 一直为 0 的，全是千篇一律的这个解决方案…想打死这些只会复制粘贴的人……

所幸天无绝人之路，突然想起我去年写过一篇 JS 做返回顶部按钮的博文，里面用到了一个 api `getBoundingClientRect`

> 原生 JS 实现带动画的返回顶部按钮
> https://chengpeiquan.com/article/js-go-to-top.html

这个 api 的作用是，获取元素的 top/right/bottom/left/x/y/width/height 信息，引用 MDN 的一张图可以直观了解：

![](https://cdn.jsdelivr.net/gh/chengpeiquan/assets-storage/img/2020/09/2.jpg)

> Element.getBoundingClientRect() - Web API 接口参考 | MDN
> https://developer.mozilla.org/zh-CN/docs/Web/API/Element/getBoundingClientRect

## 调试过程

虽然这个 api 平时用的少，但是像这样平时没事记记笔记，关键时刻还是很靠得住的，用法很简单，给你需要监听的 dom 绑定这个 api，即可获取它的各项信息，比如：

```js
const INFO = document.querySelector('body').getBoundingClientRect()
console.log(INFO)
```

获取到的属性类似如下：

![](https://cdn.jsdelivr.net/gh/chengpeiquan/assets-storage/img/2020/09/1.jpg)

可以看到，这里面获取到的 `top` 和 `y` 的绝对值，就是我们需要的 `scrollTop` 数据。

在那部坑爹的测试机上跑了一下，很完美的获取到了数据！！！

毕竟是一个传说中从 IE5 时代就存在的 api，兼容性果然棒！

于是，就是它了！！！

## 解决方案

由于 caniuse 和 mdn 上都说， `y` 的兼容性还不是特别好，所以最后采用了 `top` 属性来作为需要的数据，修改一下 scrollTop 的定义如下：

```js
const SCROLL_TOP =
  document.documentElement.scrollTop ||
  document.body.scrollTop ||
  -document.querySelector('.container').getBoundingClientRect().top
```

也就是在最后面增加了 `-(document.querySelector('.container').getBoundingClientRect().top)`，具体的元素根据实际的业务需求来，可以是 body 也可以是其他元素。

这个方案真的特别美好，其他的业务代码完全不需要修改，QA 妹子测试通过，我俩都可以准时下班回家！！！（各回各家…
