---
title: 微信浏览器input/textarea回收键盘后界面错位bug的解决办法
desc: 最近在处理一个H5页面的时候，有一个需要用户填写昵称信息的环节，模拟器一切正常，结果到了真机上发现输入信息完毕后，无法点击确认按钮emmm，黑人问号了半天，联系QA又深度测试了一下，发现只有iOS的微信浏览器才会。
keywords: 微信BUG,微信input,微信键盘,微信textarea,微信错位
date: 2018-10-24 00:58:00
cover: https://cdn.jsdelivr.net/gh/chengpeiquan/assets-storage/img/2018/10/1-6.jpg
categories:
  - tech
---

最近在处理一个 H5 页面的时候，有一个需要用户填写昵称信息的环节，模拟器一切正常，结果到了真机上发现输入信息完毕后，无法点击确认按钮 emmm，黑人问号了半天，联系 QA 又深度测试了一下，发现只有 iOS 的微信浏览器才会。

似乎问题范围一下子缩小了不少，可还是有点懵逼，因为 H5 在手机上看，视觉还是正常，然而就是无法点击下一步，后来不断的断点调试后，发现其实界面是“错位”的，那问题定位到就好说了，在查询了一堆 QA 问答之后，在 sf 发现这个问题几乎一毛一样的情况。

> iphonex 微信页面下，safari 不会,input 输入框拉起键盘后，键盘消失，但是原本键盘的区域还存在
> https://segmentfault.com/q/1010000015447012

看了大神的回答恍然大悟，解决办法比较多，主要原理还是在于输入焦点取消后，让页面有个滚动过程来还原原来的高度，代码可以看原来的问题，这里选取了一个最简单的贴一下，感恩！

```javascript
// jQuery
$('input').on('blur', this, (ev) => {
  window.scrollTo(0, 0)
})

// 原生js
// inputElm是定义需要监听的DOM
inputElm.addEventListener('blur', () => {
  window.scrollTo(0, 0)
})
```
