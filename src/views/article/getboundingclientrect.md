---
title: 使用getBoundingClientRect 针对scrollTop一直为0且documentElement无效的解决方案
desc: 今天在上线一个移动端需求的时候，QA妹子跟我反馈在她们一部iPhone X上面出现了一个滚动加载会同时触发下拉刷新的bug…我就 ？？？……一个在顶部一个在底部这也能扯上关系？然后再进一步测试，发现这个坑是出现在自家app的内置webview上，在浏览器和微信等环境都正常。
keywords: scrollTop 0,scrollTop bug,getBoundingClientRect
date: 2020-09-15 01:41:00
cover: https://cdn.jsdelivr.net/gh/chengpeiquan/assets-storage/img/2020/09/3.jpg
categories: 
  - tech
---

今天在上线一个移动端需求的时候，QA妹子跟我反馈在她们一部iPhone X上面出现了一个滚动加载会同时触发下拉刷新的bug…

我就 ？？？……一个在顶部一个在底部这也能扯上关系？

然后再进一步测试，发现这个坑是出现在自家app的内置webview上，在浏览器和微信等环境都正常。

## debug过程

幸亏这2个功能都是自己手写的，没引入其他插件，所以定位原因还是比较容易，因为两个功能都涉及到一个关键的数据就是 `scrollTop`，于是引入vConsole，打印不断变化的scrollTop到控制台，结果，其他设备都能正常获取到scrollTop，唯独这部机子一直是0…

查阅自己对scrollTop的定义，也是比较主流的一个方案了，原来的代码：

```js
const SCROLL_TOP = document.documentElement.scrollTop || document.body.scrollTop;
```

是不是很诡异？然而搜索来搜索去就没遇到一样的情况，针对scrollTop一直为0的，全是千篇一律的这个解决方案…想打死这些只会复制粘贴的人……

所幸天无绝人之路，突然想起我去年写过一篇JS做返回顶部按钮的博文，里面用到了一个api `getBoundingClientRect`

> 原生JS实现带动画的返回顶部按钮
> https://chengpeiquan.com/article/js-go-to-top.html

这个api的作用是，获取元素的top/right/bottom/left/x/y/width/height信息，引用MDN的一张图可以直观了解：

![](https://cdn.jsdelivr.net/gh/chengpeiquan/assets-storage/img/2020/09/2.jpg)

> Element.getBoundingClientRect() - Web API 接口参考 | MDN
> https://developer.mozilla.org/zh-CN/docs/Web/API/Element/getBoundingClientRect

## 调试过程

虽然这个api平时用的少，但是像这样平时没事记记笔记，关键时刻还是很靠得住的，用法很简单，给你需要监听的dom绑定这个api，即可获取它的各项信息，比如：

```js
const INFO = document.querySelector('body').getBoundingClientRect();
console.log(INFO);
```

获取到的属性类似如下：

![](https://cdn.jsdelivr.net/gh/chengpeiquan/assets-storage/img/2020/09/1.jpg)

可以看到，这里面获取到的 `top` 和 `y` 的绝对值，就是我们需要的 `scrollTop` 数据。

在那部坑爹的测试机上跑了一下，很完美的获取到了数据！！！

毕竟是一个传说中从IE5时代就存在的api，兼容性果然棒！

于是，就是它了！！！

## 解决方案

由于caniuse和mdn上都说， `y` 的兼容性还不是特别好，所以最后采用了 `top` 属性来作为需要的数据，修改一下scrollTop的定义如下：

```js
const SCROLL_TOP = document.documentElement.scrollTop || document.body.scrollTop || -(document.querySelector('.container').getBoundingClientRect().top);
```

也就是在最后面增加了 `-(document.querySelector('.container').getBoundingClientRect().top)`，具体的元素根据实际的业务需求来，可以是body也可以是其他元素。

这个方案真的特别美好，其他的业务代码完全不需要修改，QA妹子测试通过，我俩都可以准时下班回家！！！（各回各家…