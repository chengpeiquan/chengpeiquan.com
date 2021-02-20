---
title: 重构于Vite 基于2.0版本的开荒体验
desc: 从 2021 年元旦 Vite 发布 2.0 Beta 版就一直在关注 Vite 的动态，借着春节放假有时间，而且 Vue 3.0 和 Vite 2.0 都才大版本更新上线不久，预感后面会火，先开荒尝试一波，也当给以后工作上的业务先提前踩踩坑，对博客做了第三次重构，这一次把客户端和服务端都重新写了，由 PHP 的 LNMP 全家桶全部换成了前端侧的技术栈。
keywords: vite,vite ssr,vite ssg,vite blog
date: 2021-02-18 23:54:00
cover: https://cdn.jsdelivr.net/gh/chengpeiquan/assets-storage/img/2021/02/20210219234631.jpg
---
[[toc]]

从 2021 年元旦 Vite 发布 2.0 Beta 版就一直在关注 Vite 的动态，借着春节放假有时间，而且 Vue 3.0 和 Vite 2.0 都才大版本更新上线不久，预感后面会火，先开荒尝试一波，也当给以后工作上的业务先提前踩踩坑，对博客做了第三次重构，这一次把客户端和服务端都重新写了，由 PHP 的 LNMP 全家桶全部换成了前端侧的技术栈。

在经历了春节假期每天大概花 2 ~ 3 小时的投入，终于如期上线，第一个版本是发布于 2月14日情人节 ，算是给自己的情人节礼物，当时是先部署在我闲置的香港服务器做了一波测试服调试，期间做了一些体验上的优化，然后 2月18日 在休假的最后一天，部署到我正式服务器上了。

而且特别巧的是，这一天也是 Vite 2.0 正式版发布的日子：[Vite 2.0 发布了 - 尤雨溪](https://zhuanlan.zhihu.com/p/351147547)，同一天上线，就感觉特别美好，值得纪念。

## 重构前的目标

其实去年就有想法要对博客做一波改版，但有几个原因导致一拖再拖，一个是因为业务比较忙（这个没办法，工作为重），一个是懒（主要是懒得去思考怎么设计，当然期间有在考虑一些不同的落地方案），还有一个主要的原因是当时 Vue 3.0 刚发布，我当时主要的精力放在踩坑体验 3.0，那段时间，大部分的时间和精力都放在撰写 [Vue3.0学习教程与实战案例](https://vue3.chengpeiquan.com/) 上面去了，休息时间有限，能够闲下来的时间也只有下班回来和周末，除掉一些自己的事情外，留下来捣鼓新东西的时间并不算很多，只能先押后了。

相比 2018 年那次改版，当时只是单纯想重新弄一个干净的博客写东西，这一次的目标是比较明确了，就是从基于 PHP 的 WordPress，用前端的技术栈全部重构一遍，做一个纯前端的博客出来，当然还要保留 SEO ，就要求还要上 SSR（Server Side Render） 或者 SSG（Server Side Generation） 。

## 技术栈的选择

由于开工前已经是 2021 年了，因为有前面几个月玩 Vue 3.0 的基础打底，非常想用 3.0 来重构博客，加上元旦期间 Vite 2.0 Beta 版刚好发布（就很突然），注意力完全放在了 Vue3 和 Vite2 上面，非常想跑一下两者结合有多爽。

### 基于 SSR

虽然在此之前考虑过几个方案，最开始是优先考虑做 SSR ，考虑过 [Nuxt](https://github.com/nuxt/nuxt.js) 、[Vapper](https://github.com/shuidi-fed/vapper) 等一些比较流行的开箱即用的 SSR 框架，但这些框架目前都还在弄 Vue 2.0，甚至部分框架看起来有点 “弃坑” 的趋势（背靠字节大厂的 Vapper 居然一年多没更新了 emm…… ）。

加上搞 SSR 的话，服务器成本比较高，我的低配 ESC 可能 Hold 不住，好好玩一玩的话还要投点钱，想了想先算了，那么退而求次就是上 SSG 。

### 基于 SSG

玩转 SSG 也是有考虑过一些开箱即用的 SSG 框架，比如用的人最多的 [Hexo](https://github.com/hexojs/hexo)，但我本身一直对 Hexo 不太感兴趣，而且似乎满大街随便找一个独立博客都是基于 Hexo 的，模板也千篇一律，缺乏个人特色。

好友小毅 [@chawyehsu](https://github.com/chawyehsu) 安利的 [Saber](https://github.com/saberland/saber)，跑了个 demo 玩了一下，觉得真的蛮不错的，原本打算就直接用 Saber 的，不过目前 Saber 还是以 Vue 2.0 为主（听说下个版本会支持 3.0 ，不过也不知道什么时候会发布），由于内心实在是非常想用 Vue3 ，所以这个方案最终作为备选。

好吧，对 3.0 的执念，还让我想起两个 Vue 官方的作品：[VuePress](https://github.com/vuejs/vuepress) 和它的弟弟 [VitePress](https://github.com/vuejs/vitepress)，他们的新版本都是基于 Vue 3.0，而且已经可以用了，但一直以来我觉得它们都更适合用来写项目文档……

### 最终敲定

期间，有两个项目让我非常感兴趣，一个是 [vite-ssr](https://github.com/frandiox/vite-ssr)，一个是 [vite-ssg](https://github.com/antfu/vite-ssg)，我也分别对他们跑了 demo，加上 Vite 官网在 2.0 Beta 版发布后，也新增了一 Part [Server-Side Rendering | Vite](https://vitejs.dev/guide/ssr.html) 指导如何实现 Vite SSR，我觉得可行，So，最后决定基于这两个开源项目之一，选择自己搭脚手架……

最终用到的核心技术是：

><br>Vite 2.0 —— 超快的构建工具<br><br>
>Vue 3.0 —— 更强大更灵活的 Vue<br><br>
>SSG —— 服务端渲染方案，利于 SEO 进行内容收录<br><br>
>PWA —— 构建离线应用<br>

## 技术栈分析

下面来说说每一个技术模块，对技术栈选型的原因分析吧。

### 构建工具

其实 [Vue-CLI](https://github.com/vuejs/vue-cli) 对 Vue 3.0 的支持已经非常好了，我的 [Vue 3.0 教程](https://vue3.chengpeiquan.com/) 也是基于 Vue-CLI 写的，之所以选择 Vite，一方面是它的构建速度真的比 [Webpack](https://github.com/webpack/webpack) 要快好多，另一方面是


先mark，未完待续……