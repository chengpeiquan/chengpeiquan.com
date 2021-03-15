---
title: 对文章又重新做了一次分类
desc: 时隔两年，改版的时候去掉了分类，想了想，还是加回来吧，又把所有内容重新分了个类。
keywords: 原生JS回到顶部,原生JS带动画回到顶部
date: 2021-03-16 01:17:00
cover: https://cdn.jsdelivr.net/gh/chengpeiquan/assets-storage/img/2021/03/20210316012416.jpg
categories: 
  - prose
---

上一次做文章分类还是在 2019 年（见：[对博客的文章重新做了一下归类和整理](https://chengpeiquan.com/article/blog-articles-sort-out.html)），那次的分类都是针对技术侧的内容梳理，春节对博客改版的时候觉得似乎没什么必要继续保留，连我自己都不怎么点进去筛选的分类，不见得其他人会想看，所以第一版上线并没有考虑做分类。

但最近发现其实有时候还是想写一写一些与技术无关的东西，比如产品设计、做饭？或者一些音乐相关的东西，或者养猫的一些心得？（啊哈哈哈最近好多朋友都找我问养猫的一些技巧，新手猫奴多了不少），大概就是这些七七八八的原因吧，老是在微信上一问一答也挺累的，都可以公开的东西，不如找时间整理整理。

所以这次干脆重新把分类加了回来，粒度就没有弄那么细了，只是简单分了 “技术” 和 “随笔” ，随笔这边应该是想写什么就写什么了。

下面这部分是写给有同类需求的同学参考。

## 如何分类

考虑了几种分类方案，由于是基于 Markdown 写文章，最终还是参考优秀的 Hexo 的分类方式，在写文章的时候，在 Markdown 文档按照 yaml 语法，做了一个配置支持，支持同时添加多个分类：

```md
---
categories: 
  - cate1
  - cate2
  - cate3
---

把分类信息像上面一样，写在两个 --- 里面，后面就正常写文章内容…
```

最终会在路由的 meta.frontmatter 字段里，生成一个 categories 数组（目前没考虑多级分类的支持）。

然后在 src/router 文件夹里，增加一个 [categories.ts](https://github.com/chengpeiquan/chengpeiquan.com/blob/main/src/router/categories.ts) 文件，配置好分类的信息：

```ts
// 分类配置
export const categories = [
  {
    path: 'tech',
    text: {
      'zh-CN': '技术',
      en: 'Technology'
    }
  },
  {
    path: 'prose',
    text: {
      'zh-CN': '随笔',
      en: 'Prose'
    }
  }
];
```

由于我做了多语言配置，所以 text 字段需要配置多语言，如果单语言就不必这么弄了。

以后如果想增加或修改分类，就维护这个数组就可以了。

处理好 categories.ts 之后，记得导入到 [src/router/index.ts](https://github.com/chengpeiquan/chengpeiquan.com/blob/main/src/router/index.ts) 去合并路由信息。

## 列表渲染

分类的列表和原来的列表布局是一样的，只是数据源不一样，所以只需要在提取文章列表的时候，针对当前的路由信息判断一下要筛选的文章就可以了，不需要重复添加额外的组件，详见 
[List.vue](https://github.com/chengpeiquan/chengpeiquan.com/blob/main/src/components/blog/List.vue) 。

以上。