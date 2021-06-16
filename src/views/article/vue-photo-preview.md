---
title: Vue插件安利：看大图插件vue-photo-preview
desc: 最近一段时间，涉及到看大图功能的需求，用的比较多的一款看大图插件，PC和移动端适配良好，之前也用过一些别的插件，但还是这个方便，也比较轻量级。
keywords: vue看大图,vue photo preview,vue图片放大
date: 2019-09-15 11:10:00
cover: https://cdn.jsdelivr.net/gh/chengpeiquan/assets-storage/img/2019/09/1-1.jpg
categories:
  - tech
---

最近一段时间，涉及到看大图功能的需求，用的比较多的一款看大图插件，PC 和移动端适配良好，之前也用过一些别的插件，但还是这个方便，也比较轻量级。

先上个 demo 感受一下功能，官方 demo：

> https://826327700.github.io/vue-photo-preview/demo/

<h2>使用方式</h2>

```javascript
// 在node，CD进项目目录，安装插件
npm install vue-photo-preview --save

// 在main.js引入插件
import preview from 'vue-photo-preview';
import 'vue-photo-preview/dist/skin.css';
Vue.use(preview);

// 在vue组件里，调用看大图功能，就可以直接生效
<img src="xxx.jpg" preview="0" />

// 另外，如果图片是从接口请求回来的，记得在处理好数据后，刷新一下
this.$previewRefresh();
```

在 img 标签里面，有几个参数做下简单的说明：

preview 是用来唤起看大图功能的，带有这个参数的 img 才能关联到插件，否则点击无效，preview 的值是用来分组，比如某个模块是一组相册，那么这一组相册的 img，使用同一个值比如 preview="0"，那么看大图的时候就可以左右切换这一组图片的其他图了（没有关联的图之间，记得设置不同的 preview 值！）

src 是图片地址，如果你的图片具备缩略图，则这里放缩略图，原图地址用 large 参数引入。

如果预览图片的时候需要一些文字说明，可以给 img 再加上 preview-text 参数，对应的值，就是这张图片的说明文本。

用法还是蛮简单的，我日常也主要用一下上面的功能，不过插件还是能支持很多个性化配置的，具体可以看官方文档！

<h2>官方文档</h2>

最后附上官方文档，更多使用方式看官方说明：

> https://github.com/826327700/vue-photo-preview#readme
