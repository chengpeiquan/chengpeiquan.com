---
title: 针对document.write渲染的优化方案（适用webpack按需加载）
desc: write方法去渲染html，更多情况是适合手写页面的年代，现在前端开发都是通过node+webpack工程化打包，那么遇到必须write又不想write的情况应该怎么办？最近刚好对手里的一个项目做了渲染优化，在这里顺便做个总结，讲一下对`document.write`渲染html的一个优化思路，可以结合到MVVM框架（如Vue.js）里去使用。
keywords: document.write渲染优化,vue document.write
date: 2018-12-15 16:34:00
cover: https://cdn.jsdelivr.net/gh/chengpeiquan/assets-storage/img/2018/12/1.jpg
categories:
  - tech
---

[[toc]]

参与过 discuz 相关业务开发的同学应该都知道，dz 论坛有一套自带的 api 系统叫数据调用（后台-门户-模块管理-数据调用），对于论坛运营同学来说，可以将模块的外部调用作为广告位数据源、或者引用到专题页面去展示论坛内容，很受运营的喜爱。

但这套系统有个问题就是，所有的渲染方式都是通过`document.write`去抓取模板语法生成的 html 数据，而`document.write`我们都知道，在现代化的前端开发里是越来越排斥这个方法，因为会引起性能问题，影响网页的渲染速度，write 的越多，渲染越慢。

而且 write 方法去渲染 html，更多情况是适合手写页面的年代，现在前端开发都是通过 node+webpack 工程化打包，那么遇到必须 write 又不想 write 的情况应该怎么办？最近刚好对手里的一个项目做了渲染优化，在这里顺便做个总结，讲一下对`document.write`渲染 html 的一个优化思路，可以结合到 MVVM 框架（如 Vue.js）里去使用。

## 痛点分析

一个多元化的专题里面，会有轮播图、帖子列表、帖子排行榜等不同的模块，而传统的数据调用渲染方式，注定了一个模块只能一个调用，于是一个页面下来会有 N 个数据调用，也就是有 N 个`document.write`。

### 回顾传统的方法

通过 html 模板配置数据调用，在 html 里引入数据调用，会通过 write 去渲染 html，如果页面有太多 write，渲染会卡顿严重。

相关模板如下，传统的模板就是 html 结构长什么样，模板结构就长什么样：

```javascript
<ul>
  [loop]
  <li>
    <a href="{url}">
      <img src="{pic}">
      <p>{title}</p>
      <p>{dateline}</p>
    </a>
  </li>
  [/loop]
</ul>
```

### 曾经尝试的方法

如果说直接去 wirte 出 html dom 会严重卡顿，那我是不是可以 write 出 object，先通过 js 处理完数据再一次性渲染？毕竟 wirte 出来的脚本是可以运行的！

答案当然是可以！！！并且自己亲测有效！！！

相关模板如下，把模板写成 js，把数据源定义成一个 json array：

```javascript
<script type="text/javascript">
var articleData = [
  [index=1]
  {
    "tid": "{id}",
    "subject": "{title}",
    "date": "{dateline}"
  }
  [/index]
  [loop]
  ,{
    "tid": "{id}",
    "subject": "{title}",
    "date": "{dateline}"
  }
  [/loop]
];
</script>
```

然而！！！但是！！！因为最终负责维护数据源（也就是负责推送或者抓取的人）是运营同学，他们并不清楚 js 或者 json 需要注意的问题，通过 object 格式配置数据调用模板，又会在运营过程中，因为反斜杆，引号等问题导致数据报错，整个页面渲染崩溃。

而且还有一个问题就是，现在用 node+webpack 来做开发的话，这种方式依然必须用传统的渲染方法，也就是在 entry 的 index.html 里，引入这个数据调用才行，无法通过构建打包然后按需加载！！！

## 优化思路

回顾了痛点，我们梳理一下我们想要的东西：

1、渲染的时候不要 write，更不要直接 write 出好多 DOM 去导致卡顿

2、开发阶段不要去修改 entry 的 index.html，想全部由 webpack 构建生成

3、最终渲染的时候可以按需加载，不要有多少数据源就在打开页面的时候全部加载完

目的理清楚了，解决方案是不是越来越清晰！！！不错，就是 ajax！

我以一个基于 Vue-CLI 的案例来直观的表达我的处理思路和方式吧！（这里有一个地方需要注意，就是通过这种方式来获取数据调用内容源的时候，不能跨域，除非你们服务端配置了允许跨域，否则专题最终都得传到论坛域名下）。

## discuz 数据调用模板

这是写在数据调用的模板里的模板代码，具体语法参照模板说明，但是 html 结构无需遵循业务需要，只需要最简单的 html 标签和 className 就可以了，目的是通过 className 去获取对应标签里的文本。

这里是以抓取论坛帖子为例子，抓取了帖子 id、帖子标题、发布时间和缩略图：

```javascript
<ul>
  [loop]
    <li>
      <span class="tid">{id}</span>
      <span class="subject">{title}</span>
      <span class="date">{dateline}</span>
      <img class="cover" src="{pic}">
    </li>
  [/loop]
</ul>
```

## Vue 组件模板

写在 Vue 组件的 template 里，这是一个包含了链接、封面、标题、发布时间的文章列表。

```javascript
<ul class="article-list">
  <li class="item" v-for="item in articleList">
    <router-link :to="`/article/${item.tid}`" >
      <div class="cover">
        <img :src="item.cover">
      </div>
      <div class="subject">{{ item.subject }}</div>
      <div class="date">{{ item.date }}</div>
    </router-link>
  </li>
</ul>
```

## Vue 数据格式

在 Vue 组件 data 里的一个数据，最终文章列表的数据源是一个 JSON 数组：

```javascript
articleList: [
  {
    tid: '123',
    subject: '文章的标题111',
    date: '2018-11-11',
    cover: 'https://chengpeiquan.com/img/cover1.jpg',
  },
  {
    tid: '456',
    subject: '文章的标题222',
    date: '2018-12-12',
    cover: 'https://chengpeiquan.com/img/cover2.jpg',
  },
]
```

## Vue 数据请求方法

请求数据如我们前面说的，通过 ajax 去获取，避开`document.write`带来的性能问题，以下是基于 axios 的请求演示，请根据业务场景调整。

```javascript
this.$ajax({
  method: 'get',
  url: '/api.php',
  params: {
    mod: 'js',
    bid: 123,
  },
})
  .then((response) => {
    // 把数据调用返回的数据进行格式化
    const DATA = response.data.slice(16, -3).replace(/\\n|\t/g, '')

    // 缓存格式化后的html代码，写入一个临时的DOM里
    const NEW_DIV = document.createElement('div')
    NEW_DIV.innerHTML = DATA

    // 提取需要的标签内容，转为JSON格式
    const RESULT = []
    const LIST = NEW_DIV.querySelectorAll('li')
    LIST.forEach((item, index) => {
      // 遍历期间都先统一缓存结果
      const RESULT_ITEM = {}
      RESULT_ITEM['tid'] = item.querySelector('.tid').innerText
      RESULT_ITEM['subject'] = item.querySelector('.subject').innerText
      RESULT_ITEM['date'] = item.querySelector('.date').innerText
      RESULT_ITEM['cover'] = item.querySelector('img').src
      RESULT.push(item)

      // 遍历结束再统一生成虚拟DOM
      if (index === LIST.length - 1) {
        this.articleList = RESULT
      }
    })
  })
  .catch((error) => {
    console.log(error)
  })
```
