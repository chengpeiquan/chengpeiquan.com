---
title: 重构于Vite
desc: 从 2021 年元旦 Vite 发布 2.0 Beta 版就一直在关注 Vite 的动态，借着春节放假有时间，而且 Vue 3.0 和 Vite 2.0 都才大版本更新上线不久，预感后面会火，先开荒尝试一波，也当给以后工作上的业务先提前踩踩坑，对博客做了第三次重构，这一次把客户端和服务端都重新写了，由 PHP 的 LNMP 全家桶全部换成了前端侧的技术栈。
keywords: vite,vite ssr,vite ssg,vite blog
date: 2021-02-18 23:54:00
cover: https://cdn.jsdelivr.net/gh/chengpeiquan/assets-storage/img/2021/02/20210219234631.jpg
categories:
  - tech
isHot: true
repo: https://github.com/chengpeiquan/chengpeiquan.com
---

[[toc]]

从 2021 年元旦 Vite 发布 2.0 Beta 版就一直在关注 Vite 的动态，借着春节放假有时间，而且 Vue 3.0 和 Vite 2.0 都才大版本更新上线不久，预感后面会火，先开荒尝试一波，也当给以后工作上的业务先提前踩踩坑，对博客做了第三次重构，这一次把客户端和服务端都重新写了，由 PHP 的 LNMP 全家桶全部换成了前端侧的技术栈。

在经历了春节假期每天大概花 2 ~ 3 小时的投入，终于如期上线，第一个版本是发布于 2 月 14 日情人节 ，算是给自己的情人节礼物，当时是先部署在我闲置的香港服务器做了一波测试服调试，期间做了一些体验上的优化，然后 2 月 18 日 在休假的最后一天，部署到我正式服务器上了。

而且特别巧的是，这一天也是 Vite 2.0 正式版发布的日子：[Vite 2.0 发布了 - 尤雨溪](https://zhuanlan.zhihu.com/p/351147547)，同一天上线，就感觉特别美好，值得纪念。

![LightHouse的打分](https://cdn.jsdelivr.net/gh/chengpeiquan/assets-storage/img/2021/01/20210222114853.jpg)

## 运作流程

本次重构后，从开发到部署更新的运作流程图如下，日常只需要维护 GitHub 仓库的代码，其他的都是自动化完成。

![博客运作流程](https://cdn.jsdelivr.net/gh/chengpeiquan/assets-storage/img/2021/01/20210222154414.jpg)

## 重构的价值

这次重构，并非是因为放假有空就找点事情做，而是带着几个目的来的：

1. 提前开荒 [Vite 2.0](https://github.com/vitejs/vite) ，为公司后续的业务提前踩坑，可以为团队进行技术选型提供帮助，因为之前我在做 JSSDK、Vue Plugin 的时候，已经开始脱离 Webpack，用 [Rollup](https://github.com/rollup/rollup) 作为构建工具，而 Vite 正是基于 Rollup ，不仅构建速度非常快，而且也像 Webpack 一样提供了热更新，对于一线开发来说，体验上是非常好的，而且它还是 Vue 团队大力推广的新工具，这让我很有兴趣去研究它。

2. 了解一下当前的一些新生的前端工具，比如 UI 框架方面之前一直停留在适合 B 端产品的 Ant-Design、 Vuetify 、 饿了么等等，说实话我做 B 端产品的时候才会用，面向 C 端因为有设计稿，我基本上都是手写样式，听闻新一代的 UI 框架 [Tailwind CSS](https://github.com/tailwindlabs/tailwindcss) 已经有一段时间了，虽然很奇怪为什么还会回到十年前一样用原子类的 class，“开倒车” 竟然还有 3 万多的 Star，让我非常的好奇到底为什么，结果一用，真香！没错，这次博客的样式，就是用的 Tailwind 。 还有像 CSS 预处理器之前也一直停留在 Sass / Less / Stylus 三驾马车，这一次我抛弃了他们，用上了 [PostCSS Language](https://github.com/postcss/postcss) + [CSS Variable](https://developer.mozilla.org/zh-CN/docs/Web/CSS/--*)，也是真香！

3. 借此机会多了解一下生产环境的服务端开发，公司业务几乎没有机会让自己实操服务端，所以大部分情况下都是在跑本机的 Server，很多场景是开发环境下遇不到的，要想进步，还是要多在生产环境磨练。

4. 接触更多优秀的开源作品，比如代码语法高亮之前一直只知道 [highlight.js](https://github.com/highlightjs/highlight.js) （因为 WordPress 的高亮插件就是用这个……），这一次我是用了 [prism](https://github.com/PrismJS/prism) ，更小巧，颗粒度更细，虽然目前还没有太多时间去定制代码高亮的配色，不过后面有时间想要处理，prism 会更加方便。

5. 享受从 0 到 1 搭建脚手架的一个过程，目前这个版本算是实现一个简易版的 VuePress ，但是如果一直使用开箱即用的 VuePress ，很多时候并没有想去了解那些功能是怎么实现的，或者用哪些工具可以实现想要的功能（Btw: 我自从用了 Vue-CLI 之后就很久没自己配置 Webpack 了，直到 Rollup 的时候才算重新玩转了一次，这一次的 Vite 又是新的体验）

更多的更多，尽在未来，这肯定不是最后的一个版本，还有非常大的优化空间。

## 重构前的目标

其实去年就有想法要对博客做一波改版，但有几个原因导致一拖再拖，一个是因为业务比较忙（这个没办法，工作为重），一个是懒（主要是懒得去思考怎么设计，当然期间有在考虑一些不同的落地方案），还有一个主要的原因是当时 Vue 3.0 刚发布，我当时主要的精力放在踩坑体验 3.0，那段时间，大部分的时间和精力都放在撰写 [Vue3.0 学习教程与实战案例](https://vue3.chengpeiquan.com/) 上面去了，休息时间有限，能够闲下来的时间也只有下班回来和周末，除掉一些自己的事情外，留下来捣鼓新东西的时间并不算很多，只能先押后了。

相比 2018 年那次改版，当时只是单纯想重新弄一个干净的博客写东西，这一次的目标是比较明确了，就是从基于 PHP 的 WordPress，用前端的技术栈全部重构一遍，做一个纯前端的博客出来，当然还要保留 SEO ，就要求还要上 SSR（Server Side Render） 或者 SSG（Server Side Generation） 。

## 技术栈的选择

由于开工前已经是 2021 年了，因为有前面几个月玩 Vue 3.0 的基础打底，非常想用 3.0 来重构博客，加上元旦期间 Vite 2.0 Beta 版刚好发布（就很突然），注意力完全放在了 Vue3 和 Vite2 上面，非常想跑一下两者结合有多爽。

由于重构的最终目标还是要保持网站的 SEO 能力，所以肯定不能使用默认的 SPA 应用模式，要走服务端渲染，所以技术栈方面只需要考虑两条线：

### 基于 SSR

虽然在此之前考虑过几个方案，最开始是优先考虑做 SSR ，考虑过 [Nuxt](https://github.com/nuxt/nuxt.js) 、[Vapper](https://github.com/shuidi-fed/vapper) 等一些比较流行的开箱即用的 SSR 框架，但这些框架目前都还在弄 Vue 2.0，甚至部分框架看起来有点 “弃坑” 的趋势（背靠字节大厂的 Vapper 居然一年多没更新了 emm…… ）。

加上搞 SSR 的话，服务器成本比较高，我的低配 ECS 可能 Hold 不住，好好玩一玩的话还要投点钱，想了想先算了，那么退而求次就是上 SSG 。

### 基于 SSG

玩转 SSG 也是有考虑过一些开箱即用的 SSG 框架，比如用的人最多的 [Hexo](https://github.com/hexojs/hexo)，但我本身一直对 Hexo 不太感兴趣，而且似乎满大街随便找一个独立博客都是基于 Hexo 的，模板也千篇一律，缺乏个人特色。

好友小毅 [@chawyehsu](https://github.com/chawyehsu) 安利的 [Saber](https://github.com/saberland/saber)，跑了个 demo 玩了一下，觉得真的蛮不错的，原本打算就直接用 Saber 的，不过目前 Saber 还是以 Vue 2.0 为主（听说下个版本会支持 3.0 ，不过也不知道什么时候会发布），由于内心实在是非常想用 Vue3 ，所以这个方案最终作为备选。

好吧，对 3.0 的执念，还让我想起两个 Vue 官方的作品：[VuePress](https://github.com/vuejs/vuepress) 和它的弟弟 [VitePress](https://github.com/vuejs/vitepress)，他们的新版本都是基于 Vue 3.0，而且已经可以用了，但一直以来我觉得它们都更适合用来写项目文档……

### 最终敲定

期间，Vite 官网在 2.0 Beta 版发布后，也新增了一 Part [Server-Side Rendering | Vite](https://vitejs.dev/guide/ssr.html) 指导如何实现 Vite SSR，我觉得可行。

加上有两个开源项目让我非常感兴趣，一个是 [vite-ssr](https://github.com/frandiox/vite-ssr)，一个是 [vite-ssg](https://github.com/antfu/vite-ssg)，我也分别对他们跑了 demo ，很给力，So，最后决定基于这两个开源项目之一，选择自己搭脚手架……

最终用到的核心技术是：

> <br>Vite 2.0 —— 超快的构建工具<br><br>
> Vue 3.0 —— 更强大更灵活的 Vue<br><br>
> SSG —— 服务端渲染方案，利于 SEO 进行内容收录<br><br>
> PWA —— 构建离线应用<br>

当然还要考虑的事情很多，每个环节还要用到不同的技术栈，具体我在下面逐个环节说明。

## 重构过程分析

下面来说说决定重构之后，整个思考的过程顺序，以及对每一个技术模块的技术栈选型原因分析吧，希望对有计划重构项目的朋友带来一些帮助。

### 构建工具

其实 [Vue-CLI](https://github.com/vuejs/vue-cli) 对 Vue 3.0 的支持已经非常好了，我的 [Vue 3.0 教程](https://vue3.chengpeiquan.com/) 也是基于 Vue-CLI 写的。

之所以选择 Vite，一方面是它的构建速度真的比 [Webpack](https://github.com/webpack/webpack) 要快好多，另一方面是，自从 Vue 3.0 推出以来， Vue 官方团队就一直在投入精力优化和宣传 Vite，尽管 1.0 版本的功能和生态不如人意，但超快的构建速度已经体现了出来。

加上在我准备动手重构的时候官方刚好发布了 2.0 大更新，对比了 1.0 简直是质的飞跃，让我非常感兴趣，而且按照目前官方团队的态度，我觉得后面 Vite 会逐步代替 Vue-CLI ，提前了解，提前踩坑，对以后的工作也有帮助。

而且在生态方面，Vite 2.0 的各种支持都算很完善了，不得不说整个春节期间，Vue 团队的人都在忙着给 Vite 2.0 干活，我在春节提的 Issue，基本上 2 ~ 3 小时就能给我回应，解决问题速度非常快（大过年的耶！），重构过程感觉自己拥有一个强大的技术支持团队一样!

开荒虽然辛苦，但也有另一番乐趣！

### 服务端渲染

这是在选择合适的构建工具之后，应该考虑的第二件事。

个人博客之前一直选择用 WordPress ，一方面除了有 [LNMP](https://github.com/licess/lnmp) 一键部署等快速搭建方案，和各种各样的模板之外，主要也是归功于 WP 对 SEO 的支持也是非常好，我这个博客的日常访问都是来自于搜索引擎。

单纯选择用 Vue 3.0 重新开发 SPA 应用肯定会丢失 SEO，所以才有了前面的 [技术栈的选择](#技术栈的选择)，本次是通过 SSG 方案来落地服务端渲染。

### 项目架构规划

在开始动手之前，还要对网站架构做一波规划，盲目动手只能给自己挖坑，自己的博客虽然说内容不多，但也有一些东西要考虑：

1. 对外展示的网站结构要保持不变，也就是原来的页面地址要尽量一样，避免用户访问不到原来的内容

2. 对实在不能保持原样的 URL ，或者要废弃的页面，需要做 301 重定向

3. 降低后续更新的构建和部署成本，尽量自动化，减少人工操作

4. 数据需要无缝迁移，不能有丢失

5. 减少服务器压力，把大部分资源消耗放在开源平台上（诸如 Github、jsdelivr CDN 等等）

当然其他的如移动端适配啥的也要看情况顾及，之前博客还有一个小程序版本，不过因为没人看（害，真的整整一年过去了，完全没人看小程序版本…），所以小程序的依赖保留没有在这次的重构兼容考虑范围里，重构完毕后我就直接把原来的服务停了，回头有空了再重新写一版接口给小程序用。

### 模板开发

基于 Vue 3.0 的项目，主要的模板肯定还是 Vue 文件，站点的主要结构、页面的布局、美化等等都是基于 `.vue` 文件，只需要按照原来的习惯，路由页面放在你的 `src/views` 文件夹下，组件模板放置于 `src/components` 下，就可以自动生成路由访问。

同时也加入了 `.md` 文件的支持，用于书写 Markdown 格式的内容，日常记录博客会更方便，并且像 VuePress 那样，同时支持在 Markdown 里嵌套 Vue，让博客的定制更加灵活。

整个项目的路由页面、组件结构，跟你平时开发 Vue 项目是完全一样的，无缝切换。

```html
src ├─components │ ├─Footer.vue │ └─Header.vue └─views ├─article │ ├─[page].vue
│ └─rewrite-in-vite.md ├─about.md └─index.vue
```

在这里推荐几个非常方便的 Vite 插件：

> <br>[vite-plugin-pages](https://github.com/hannoeru/vite-plugin-pages) ： 能够自动读取指定目录下的 Vue / Md 文件生成 Vue 路由，只需要管理好 views 文件夹的层级关系，无需再单独维护路由配置<br> ><br>[vite-plugin-md](https://github.com/antfu/vite-plugin-md) ： 一个能让 Markdown 文件像 Vue 组件一样导入使用的插件，它也基于 markdown-it，支持进行一系列 md 生态扩展<br> ><br>[vite-plugin-components](https://github.com/antfu/vite-plugin-components)：可以像 VuePress 一样，无需 import，会自动根据组件的标签名去 components 目录下寻找组件<br>

基本上你只需要按照开发 Vue 项目的习惯去开发就可以了，如果有一些思路被卡住不知道怎么下手，可以参考我仓库源码。

### 样式处理器

有设计稿的时候我更喜欢借助 CSS 预处理器（目前常用 [Stylus](https://github.com/stylus/stylus)），借助他们的变量 、 嵌套书写，以及 Mixin 、 Extend 等功能，避免写原生 CSS 带来的烦恼。

没有设计稿的时候，会用上 [Ant Design](https://github.com/vueComponent/ant-design-vue) 等 UI 框架来帮我减少页面设计上的一些时间浪费，但这些框架通常更适合用在 B 端产品。

去年底在知乎刷到过一篇 [如何评价 CSS 框架 TailwindCSS？](https://www.zhihu.com/question/337939566) ，了解到一款全新的 CSS 框架 Tailwind CSS，乍一看很像是在开历史的倒车，回归原子类 className ，评价也是褒贬不一，自己光看文档的时候也是想着这啥玩意…

但是考虑到如果真的是开倒车，凭什么可以拿到 3 万的 Star，抱着试一下的心态在这次重构里面引入尝试，确实真香！

目前感受到的好处就是：

> 延续 CSS 的属性命名，你需要什么属性自己放，也就是自己必须有一定的 CSS 基础，特别是在多端适配方面，不用担心框架用久了自己不会写 CSS 的问题

比如，你要实现一个容器内完全居中，手写 CSS 是：

```css
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 100px;
}
```

用 Tailwind CSS 的写法是：

```html
<div class="flex justify-center items-center w-40 h-40"></div>
```

写法跟你在 VSCode 里自动补全代码时，敲入的命令非常接近，不像传统的 UI 框架一样，你写个标签就自动生成按钮，都不知道它是怎么写出来的（这也是我比较少想用 UI 框架的原因，我怕久了自己都不会写了），实际上，使用 Tailwind 之后，你还是在自己写 CSS， 只不过更方便了！

> 支持 CSS tree-shaking ，构建后的文件非常迷你

传统的 Atom CSS ，引入了就得整包引入，而 Tailwind 可以借助 PostCSS ，可以在最终项目构建的时候，抽离出我们用到的样式，用不到的会被直接扔掉。

我自己体验了一下，核心样式文件在配置 Purge 之前构建出来大概有 6M 多，Purge 之后只有 24K ！

> 可以组合使用，类似于 CSS 预处理器的 Extend

比如，我要写一个通用的图片样式，让图片具备自适配不变型的效果，我只需要借助 @apply 像这样子：

```css
.img {
  @apply w-full h-full object-cover;
}
```

编译出来就是我想要的效果：

```css
.img {
  width: 100%;
  height: 100%;
  -o-object-fit: cover;
  object-fit: cover;
}
```

> 支持目前主流的暗黑模式，通过 `dark:xxxxx` 的前缀就可以轻松定制两款皮肤

点一下切换皮肤：<toggle-theme />

> 用了 Tailwind 之后，你几乎可以不用写 Sass / Stylus 了，那么问题来了：如何弥补 CSS 预处理器提供的一些功能？

借助 [PostCSS Language](https://github.com/postcss/postcss) 和 [CSS Variable](https://developer.mozilla.org/zh-CN/docs/Web/CSS/--*)，可以轻松的书写像 CSS 预处理一样的嵌套和变量。

```css
a {
  color: var(--fg-deeper);
  text-decoration: none;

  &:hover {
    border-bottom: 1px solid var(--fg-light);
  }
}
```

独立的文件使用 `.postcss` 或者 `.pcss` 作为文件后缀，在 Vue 组件里则使用 `<style lang="postcss"></style>` 来指定 PostCSS Language 。

当然，说的再多也不如亲手写一写，我之前在知乎也是看了好久始终不能决定用不用，之前赶业务也没时间，这一次也终于动手体验了一把，后悔，特别后悔，后悔怎么没有早点用！！！

### SEO 优化

虽然前面的 [服务端渲染](#服务端渲染) 帮我们解决了空 HTML 文档的问题，但要更好的进行 SEO 优化，还需要落实到具体的页面上去。

比如页面的 `title` 、 `description` 、 `keyword` 等等，这里我是用到了以下两个工具来帮我实现每个页面的 TKD 定制。

[gray-matter](https://github.com/jonschlinkert/gray-matter)：支持对 `.md` 文件的 TKD 优化，你可以在 Markdown 文件的最前面加入这样的代码，即可实现对页面展示对应的 TKD 信息。

```html
---
title: 这是页面的标题
desc: 这是页面的描述
keywords: 关键词1,关键词2,关键词3
---

下面是要书写的 Markdown 内容…
```

[@vueuse/head](https://github.com/vueuse/head)：可以让你在 `.vue` 文件里实现优化，在 Vue 组件里的 `script` 部分，写入以下的代码，就可以实现 TKD 信息的配置。

```ts
import { useHead } from '@vueuse/head'

useHead({
  meta: [
    {
      name: 'title',
      content: '这是页面的标题',
    },
    {
      name: 'description',
      content: '这是页面的描述',
    },
    {
      name: 'keywords',
      content: '关键词1,关键词2,关键词3',
    },
  ],
})
```

你还可以扩展更多的信息上去，具体都在各自对应的 Github 仓库的 README 里有详细的说明。

当然，SEO 优化远远不止这一点，包括 robots 、 链接语义化 、减少死链 、 旧地址重定向等等，后面也会有说明。

### 静态资源处理

静态资源指 js 、 css 、 img 这些资源，放自己服务器也不是不好，我之前就是放自己服务器上，没有去改，虽然 WordPress 虽然有配置 CDN 的插件，但是 CDN 平台诸如七牛、又拍云，免费额度只针对 http , 都是需要付费才可以使用 https，总的来说还是要多出一笔钱来处理这块服务，反正自己的博客访问量不大，而且技术博客很少多媒体资源，日常使用的带宽消耗很少，我三年前在阿里云充的 50 块钱，三年过去了到现在还有 45.91 …

不过这次改版就不一样了，后续我可能还会开辟一些图片模块，加上改版后是把项目托管到了 Github ，先天优势存在，那么就要多考虑一下利用 Github 提供的免费服务了！

开发过 NPM 包的同学，或者日常使用 NPM 插件比较细心的同学，应该能够发现发布在 NPM 上的包都自动部署到了 CDN 平台，诸如 jsdelivr 、 unpkg 、cdnjs 等等，那么 Github 和这些 CDN 能关联吗？在此之前其实我也没去关注能不能，但这一次我查了一下，确实可以，而且其中对国内访问速度最友好的 jsdelivr ，支持度最高！超棒的！

关于 jsdelivr 的速度可以参考：[国内有哪些靠谱的 Javascript 库 CDN 可用？](https://www.zhihu.com/question/20227463/answer/370662453)，也可以测试下我的博客，我自己对测试结果还是挺满意的。

![测试我自己网站的速度](https://cdn.jsdelivr.net/gh/chengpeiquan/assets-storage/img/2021/02/20210221185258.jpg)

所以最后我是把所有静态资源都指向了 jsdelivr CDN ，它无需你自己再做任何部署工作，只需要把代码文件更新到你的 GitHub 仓库里，就会自动同步到 jsdelivr 。

访问格式为在 [jsdelivr CDN 官网](https://www.jsdelivr.com/?docs=gh) 有案例说明，更多用法可以查看官网的文档 [Features - jsdelivr](https://www.jsdelivr.com/features#gh)，为了避免项目源码过大，你可以像我一样单独创建一个类似 [assets-storage](https://github.com/chengpeiquan/assets-storage) 这样的仓库用来存储这些静态资源，在仓库的 README 也有简单介绍下如何引用 CDN 地址和清除 CDN 缓存。

回到项目里，只需要在 [vite.config.ts](https://github.com/chengpeiquan/chengpeiquan.com/blob/main/vite.config.ts) 里修改 `base` 的路径即可。

```ts
export default defineConfig({
  base: isDev
    ? '/'
    : 'https://cdn.jsdelivr.net/gh/chengpeiquan/chengpeiquan.com@gh-pages/',
})
```

详细可以看官网的文档 [Configuring Vite | Vite](https://vitejs.dev/config/#base)。

当然这种方式如果你用平时的命令行或者老乌龟界面工具来提交文件，始终还是比较麻烦，这里推荐一个现成的图床工具 [PicGo](https://github.com/Molunerfinn/PicGo) ，支持多个平台的 CDN 服务，其中就有 Github 。

![PicGo 图床界面](https://cdn.jsdelivr.net/gh/chengpeiquan/assets-storage/img/2021/02/20210221185205.jpg)

你可以在 Github 仓库上的 [Releases](https://github.com/Molunerfinn/PicGo/releases) 下载最新的客户端版本，只是使用的话，可以单独下载对应系统的安装文件，不需要克隆整个仓库下来自己构建。

### 资源导出

本次的资源导出主要是指原来的那些图片，前面有提到，我之前没有启动 CDN 服务，所以图片资源都还在自己的服务器上。

WordPress 的上传资源都存放在 `/wp-content/uploads/` 目录下，阿里云非常方便的就是，你可以连 SFTP 上去把这些文件直接拖下来就可以了。

重新传到 Github 上又非常简单，克隆你的仓库下来后，放到指定的文件夹里，重新提交就可以了。

等未来某一次你不想继续用 Github 托管了，只需要把仓库拉下来，所有文件又都在了，都是非常方便和灵活。

### 爬虫编写

这一部分主要针对原来的文章，虽然我之前的 WordPress 就开启了 Markdown 编辑器支持，但如 [SEO 优化](#seo-优化) 里提到的，缺少很多 TKD 信息配置，而且里面的图片地址也都要更换为 CDN 的路径，所以就算用现成工具去处理 HTML / XML 转 Markdown，都还要去补充这些信息，也比较繁琐。

所以是借助了 Node 编写了个静态爬虫，在爬取过程中对一些内容进行追加、转换。

具体的实现可以参考我之前写的 [网站改版迁移经验记录：基于 node 的爬虫编写](https://chengpeiquan.com/article/node-web-crawler) ，这里就不重复赘述了。

### 数据统计

既然是 Vue 项目，那么当然支持 Vue 系的统计插件，之前写的两个统计平台插件，都是可以开箱即用的，均已支持 Vue 3.0 的使用。你可以在 [main.ts](https://github.com/chengpeiquan/chengpeiquan.com/blob/main/src/main.ts) 里了解如何开启流量的统计上报功能，如果你需要记录埋点，也都有 API 可以轻松触发数据的上报。

百度统计：[vue-baidu-analytics](https://github.com/chengpeiquan/vue-baidu-analytics)

友盟统计：[vue-cnzz-analytics](https://github.com/chengpeiquan/vue-cnzz-analytics)

### 服务端开发

服务端之前是 WordPress 所依赖的 Nginx + PHP + MySQL ，这一次重构也把服务端直接换了，更换为 Node.JS + Express ，通过 PM2 守护进程来运行在阿里云。

对，这一次没有数据库，第一版暂时不打算做数据库，暂时用不到，目前大部分数据都已经迁移到 Github 仓库了，下个版本功能迭代用到了再考虑弄一下。

我的服务器系统是 CentOS 7，也就是 Linux 系统，关于 Linux 下如何安装 Node ，搜素引擎很多方法，这里也不赘述了，放几个自己用到的关键命令参考吧。

1. 清除缓存然后升级系统和软件

```html
sudo yum clean all sudo yum makecache sudo yum update sudo yum upgrade -y
```

2. 安装 NPM 并通过 stable 安装最新版本的 Node

```html
sudo yum install npm sudo npm install -g n sudo n stable
```

3. 全局安装 [yarn](https://github.com/yarnpkg/yarn) ，没错，我现在更喜欢用 yarn 来进行包管理，这一步你可以跳过

```html
npm i -g yarn
```

4. 然后是全局安装 [pm2](https://github.com/Unitech/pm2)，这个是必须要装的，否则我们的终端一关，服务就停了，需要通过 PM2 来守护进程，当然，你也可以用 [forever](https://github.com/foreversd/forever) 。

```html
yarn global add pm2
```

其他的步骤就不用说了，创建服务器的文件夹，初始化，安装 [express](https://github.com/expressjs/express) 或者其他你更熟悉的服务程序，搞起吧！

> <br>有几件事要特别叮嘱一下：<br> ><br>1. 因为服务端变了，如果原来有开启 HTTPS，记得重新配置你的 SSL 证书（我用的是阿里云的免费证书，只需要 1 年更换 1 次）<br> ><br>2. 域名也要重新做 301 重定向（HTTP 强切 HTTPS ， WWW 强切无 3W 等）<br> ><br>3. 检查之前是否有在推广的的链接挂掉了，也要重新 301 到新地址 （比如 RSS 源之前是 /feed/ ，现在是 /feed.xml）<br> ><br>4. 最重要的，配置上对路由 history 模式的支持<br>

第一版其实不复杂，后面有需要会继续迭代。

### 自动化部署

代码托管在 GitHub 的好处就是 GitHub Actions 可以帮我们实现 CI / CD，通过配置分支的 push 或者 pull_request 等行为来实现自动触发项目的构建打包，并实现一键部署到阿里云服务器。

具体的脚本可以参考我写的 [workflow](https://github.com/chengpeiquan/chengpeiquan.com/blob/main/.github/workflows/github-ci.yml) ，里面都提供了注释。

workflow 里所有以 `secrets.XXXXXX` 的格式均为仓库独立配置的密钥变量，在仓库的 `settings` > `Actions secrets` 里添加。

其中一些关键环节说明如下：

1. `on` 是指分支行为，我配置了合并分支才会触发，因为平时都是托管在 `develop` 分支，包括未开发完毕的功能，写一半的文章草稿，只有确认可以发布的代码，才会合并到 `main` 进行更新

2. `jobs` 是触发自动打包 / 发布一系列行为的各种操作，从上到下按顺序处理，其中的 ACCESS_TOKEN 是 GitHub 的 Token，请来 [Personal access tokens](https://github.com/settings/tokens) 创建，创建后只会显示一次，请保存好，后面涉及到 Token 的地方可以重复使用同一个 Token，请勿泄露！

3. `gh-pages` 分支是打包完毕后的文件，推送到阿里云服务器的也是这个分支下的所有文件，之所以托管一份在 GitHub，是因为我们前面部署了 CDN 支持，JS / CSS 文件是需要读取这个分支的 CDN 文件

4. 部署到阿里云的环节，配置的 `SERVER_SSH_KEY` 是自己服务器的密钥对，如果你也是跟我一样使用阿里云的 ECS ，可以参考 [创建 SSH 密钥对](https://www.alibabacloud.com/help/zh/doc-detail/51793.htm)， 创建后还需要绑定给实例才能激活生效，绑定操作请参考 [绑定 SSH 密钥对](https://www.alibabacloud.com/help/zh/doc-detail/51796.htm)

5. `SERVER_IP` 是自己服务器的公网 IP，这个其实可以不用配置为密钥变量，因为 `ping` 一下你的域名也知道是什么 IP ，只是因为我有两台服务器，所以配置为变量可以方便的通过 `SERVER_IP` 和 `SERVER_IP_TEST` 去切换，其他变量其实也有一个 TEST 版本

6. 最后的 `TARGET` 是你在服务器上，node 服务器所安装的目录。

如果其中有什么环节不清楚的，善用搜索引擎，或者到我博客仓库给我提 issue 也可以。

如果你不是托管在 GitHub ，而是别的 Git 平台诸如自建的 Gitlab ，你也可以通过 [Jenkins](https://github.com/jenkinsci/jenkins) 去配置 CI / CD 的支持。

### 离线应用构建

使用 Vue-CLI 创建新项目的时候，可以了解到有一个选项是关于 PWA 的，关于 PWA 的定义建议直接阅读 [渐进式 Web 应用（PWA） | MDN](https://developer.mozilla.org/zh-CN/docs/Web/Progressive_web_apps) 。

Vite 官方团队也对 PWA 做了支持，通过 [vite-plugin-pwa](https://github.com/antfu/vite-plugin-pwa) 可以方便的实现一个离线应用的配置。

> <br>~~不过目前发现了一个问题就是，当 `vite.config.ts` 的 `base` 选项设置为 CDN 地址时，构建出来的 PWA manifest 资源路径会读取错误，原因是 manifest 不能走 CDN，要单独从网站内读取，虽然跟作者提了优化建议（详见 [#25](https://github.com/antfu/vite-plugin-pwa/pull/25)），不过还需要点时间去优化。~~<br> ><br>~~所以在原版进行版本更新之前，自己先发布了个私有调试包 fix 了这个问题，有遇到一样情况的朋友可以先安装 [@chengpeiquan/vite-plugin-pwa](https://www.npmjs.com/package/@chengpeiquan/vite-plugin-pwa) 这个去用，不过最好还是留意原版的更新，这个私有包不会长期维护。~~<br> ><br>2021-02-22 更新： 目前原版已更新，Fix 了我反馈的问题，请使用 v0.5.3 以后的版本可以避免该问题的产生，给作者点赞！<br>

关于 PWA 的配置可以参考我的项目，这里单独说一下需要特别注意的点：

1. 因为使用了 CDN，所以 `scope` 和 `manifest.start_url` 选项需要显式指定，否则资源会读取出错

2. 基于我上面提到的路径问题，从 v0.5.3 开始，配置 CDN 的同时，也需要显式指定 `base` 选项，避免出现 404

其他的选项根据实际需要去处理就可以了。

## 结语

因为网站的设计一向不是我的专长，加上不喜欢花里胡哨的东西，所以这一次重构后的 UI 设计还是基本继承了原来的风格。

但也有一些新的迭代，比如加上了跟随系统的暗黑风格（也可以通过导航右上角进行手动切换），还有首页的变化，对于内容不多的博客来说，挺好的一个 idea，这是来自好友小毅 [The Art of Chawye Hsu](https://chawyehsu.com/) 和 Vite 开发者 Antfu [Anthony Fu](https://antfu.me/) 的博客参考。

当然，整个项目的重构，更多的技术支持来自于 Anthony，他也是 Vue 和 Vite 官方团队的开发者，他比我早几天上线的 [Rewrite in Vite](https://antfu.me/posts/rewrite-in-vite) 给了我很多思路，很多基于 Vite 的插件也是他写的，都是在这几天发布和迭代，有那种瞌睡来了枕头的感觉，美妙！

完整的项目依赖和配置请查看仓库的  [package.json](https://github.com/chengpeiquan/chengpeiquan.com/blob/main/package.json)  和 [vite.config.ts](https://github.com/chengpeiquan/chengpeiquan.com/blob/main/vite.config.ts) ，整个项目也完全开源了，具体的实现可以查看 [Github 仓库](https://github.com/chengpeiquan/chengpeiquan.com) ，在这里就不赘述了，如果觉得对你有用，欢迎 Star 。
