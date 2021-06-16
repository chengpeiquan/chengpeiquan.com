---
title: 原生JS实现带动画的返回顶部按钮
desc: 添加的第一个参数destination，终点位置，含义是指终点坐标与窗口顶部的Y轴距离，非必须，默认为0，也就是直接返回到窗口顶部。通过window.scrollY > destination的条件判断，如果当前窗口滚动距离比预设的终点距离大，就执行滚动，否则就结束，到达目的地。
keywords: 原生JS回到顶部,原生JS带动画回到顶部
date: 2019-01-09 00:45:00
cover: https://cdn.jsdelivr.net/gh/chengpeiquan/assets-storage/img/2019/01/1.jpg
categories:
  - tech
---

之前 jQuery 走天下的时候，返回顶部按钮倒是很简单，一个 animate 就可以解决，原生 JS 能否实现呢？答案是肯定的！

## 相关代码：

先贴代码，思路和代码来源 stackoverflow，做了一波小小的调整，添加 2 个参数，1 个是滚动到的指定位置，1 个是滚动速度，附个 issue 链接。

> https://stackoverflow.com/questions/21474678/scrolltop-animation-without-jquery

```javascript
function goToTop(destination = 0, duration = 500) {
  const scrollStep = -window.scrollY / (duration / 15)
  const scrollInterval = setInterval(function () {
    if (window.scrollY != 0 && window.scrollY > destination) {
      window.scrollBy(0, scrollStep)
    } else {
      clearInterval(scrollInterval)
    }
  }, 15)
}
```

## 主要思路：

既然改装了一下人家的函数，那就顺便说一下当时的思路吧。

### 原版的思路

1、先算好每次往上移动的距离（因为每次距离顶部的高度要减少，所以这个值需要是负值），scrollY 是当前窗口距离初始位置所滚动的所有距离，通过这个距离去把每次位置计算出来（分母应该是老外通过合理计算后得出的一个公式，具体原理未深入探索，应该也是经过多次尝试）。

2、通过 setInterval 循环执行页面的滚动距离回缩，直到 scrollY 为 0 的时候停止，清除循环。

### 新增返回位置

添加的第一个参数 destination，终点位置，含义是指终点坐标与窗口顶部的 Y 轴距离，非必须，默认为 0，也就是直接返回到窗口顶部。

通过 window.scrollY > destination 的条件判断，如果当前窗口滚动距离比预设的终点距离大，就执行滚动，否则就结束，到达目的地。

为什么要加这个呢，主要是结合自己的日常业务需求，比如一些 Ajax 翻页按钮，翻页后只是重置 data 里的数组数据，DOM 树不改变，页面也不会刷新，这个时候翻页是成功了，但页面还是在列表底部的按钮位置，体验不太好，这个时候就需要让翻页的同时让页面再滚回到列表最前面。

destination 可以直接写死数值，也可以根据实际情况先做一个计算，2 个参考方法如下。

```javascript
// 方式一：直接获取文章列表与页面顶部的高度距离
document.querySelector('#article-list').offsetTop

// 方式二：获取元素的top/right/bottom/left/x/y/width/height信息，再从里面拿需要的数值
document.querySelector('#article-list').getBoundingClientRect()
```

### 新增滚动速度

第二个参数 duration，滚动的持续时间，单位毫秒，也是非必须，默认是 500 毫秒。

添加的原因也是因为业务需求，不过用的不是很多，所以放第二个参数去了。

以上，就是一个带动画的滚动控制函数说明了。
