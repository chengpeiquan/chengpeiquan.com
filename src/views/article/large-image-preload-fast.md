---
title: 弹窗大背景优化方案 png大图片预加载处理方法
desc: 因为一直做游戏风格的需求，而日常维护的游戏也比较朴素，都是用纯css处理的渐变底色即可满足弹窗背景的配置，最近处理了一个比较花哨的需求，弹窗设计方面比较下功夫，带来的一个问题就是这个弹窗背景图只能切成png，哪怕经过tinypng优化之后还有50多kb。50kb的图片说实话也不算特别大，如果作为常规的img加载其实没什么问题，但作为背景图来加载，问题就会被放大 —— 用户访问页面后，第一次打开弹窗的体验非常差，会先显示弹窗内容，再慢慢加载弹窗背景（隐藏层的背景需要层变为可见才会加载）。
keywords: png优化,图片预加载,js预加载
date: 2018-10-12 11:49:00
cover: https://cdn.jsdelivr.net/gh/chengpeiquan/assets-storage/img/2018/10/1.jpg
categories:
  - tech
---

因为一直做游戏风格的需求，而日常维护的游戏也比较朴素，都是用纯 css 处理的渐变底色即可满足弹窗背景的配置，最近处理了一个比较花哨的需求，弹窗设计方面比较下功夫，弹窗的背景图片只能导出 png 素材，无法使用纯 css 来实现，哪怕经过 tinypng 优化之后还有 50 多 kb 之巨。

## 定位问题

50kb 的图片说实话也不算特别大，如果作为常规的 img 加载其实没什么问题，但作为背景图来加载，问题就会被放大 —— 用户访问页面后，第一次打开弹窗的体验非常差，会先显示弹窗内容，再慢慢加载弹窗背景（隐藏层的背景图需要经过交互后变为可见才会加载）。

## 解决方案

在页面加载完毕后，执行一次背景图素材的预加载，最终解决效果完美。

以下为实现时的 demo 代码片段

```javascript
// 定义需要预加载的图片数组（可以是本地文件也可以是绝对地址）
const imgList = [
  require('@img/a-large-image-01.png'),
  require('@img/a-large-image-02.png'),
  require('@img/a-large-image-03.png'),
  require('@img/a-large-image-04.png'),
  // ...
]

// 定义预加载函数
function imgPreload(imgArr) {
  for (let i = 0; i < imgArr.length; i++) {
    const newIMG = new Image()
    newIMG.src = imgArr[i]
  }
}

// 执行预加载
imgPreload(imgList)
```

只要不创建 dom，对页面的外观是没有影响的，图片只要请求成功了，后续再调用这个图片地址就无需重新请求了，本地已有缓存可快速显示。
