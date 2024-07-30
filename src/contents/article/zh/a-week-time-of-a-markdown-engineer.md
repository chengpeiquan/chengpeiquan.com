---
title: Markdown工程师的一周
desc: 马上就快过年了，最近才比较有时间把之前很多想搞一直没时间搞的东西弄一下，比如说最近一周在干的事情就是，补各种文档。我是没想到我一周能敲差不多 25 个小时的 Markdown … 几乎一天有 5 个小时在码字，天了噜…
keywords: markdown,markdown engineer,markdown ppt,engineer ppt
date: 2022-01-21 23:23:00
cover: https://cdn.chengpeiquan.com/img/2022/01/20220121232301.jpg?x-oss-process=image/interlace,1
categories:
  - tech
  - prose
---

[[toc]]

马上就快过年了，最近才比较有时间把之前很多想搞一直没时间搞的东西弄一下，比如说最近一周在干的事情就是，补各种文档。

![最近一周的常用语言](https://cdn.chengpeiquan.com/img/2022/01/20220121232856.png)

我是没想到我一周能敲差不多 25 个小时的 Markdown … 几乎一天有 5 个小时在码字，天了噜…

## 都干了些啥

1. 完善了公司的内部 Wiki ，之前很多东西想沉淀，结果一直忙，码字也挺费时间的说

2. 完善了一些内部项目的主 README 和 子 README ，这部分占比很小，因为一般在开坑之前就会把它们都写好，最近只是根据项目的近况做了一些修改

3. 写了一个 73 页的项目复盘 PPT ，哈哈哈说是 PPT ，其实也是在敲 Markdown ，这部分占比比较大 （可以戳下面的 [关于复盘](#关于复盘) 部分）

4. 元旦开了个开源的坑，申请了个 js.org 的免费域名，把官网文档给做了，用的是 VitePress ，所以码字时间也挺多

5. 在年底的时候，博客终于把 2021 年立的 Flag 给摘了，[菜谱专栏](https://chengpeiquan.com/cookbook) 上线了，在陆陆续续抽时间填我之前写的菜谱，所以写菜谱的时间也占了不少

大概就这些吧，我每天还有写日记的习惯，不过日记用的是手机 APP ，所以就不包含在 Markdown 里了，下面挑几个聊一聊吧！

## 关于菜谱

2021 年在重构自己博客的时候更新了一下 About ，里面提到了我打算把自己做的菜都整理一下做法，保守应该有 600 多道不一样的菜式吧！

![自己做的菜](https://cdn.chengpeiquan.com/img/2021/02/20210218210634.jpg?x-oss-process=image/interlace,1)

不过因为工作忙，一直拖着，终于拖到了年底搞出来了，目前还在填内容，有兴趣的话可以先收藏起来，菜品方面大多是广东甚至于潮汕地区为主，毕竟我是广东潮汕人。

点击直达：[菜谱专栏](https://chengpeiquan.com/cookbook)

![目前已发出来的菜谱](https://cdn.chengpeiquan.com/img/2022/01/20220122012527.jpg?x-oss-process=image/interlace,1)

博客的专栏填充会比较慢，不过我从 8 月份开始就在小红书上更新菜谱笔记了，一般也会先发在上面，你也可以关注我的小红书号来获取最新的做菜信息，有啥不清楚的也可以直接私信问我。

![欢迎关注](https://cdn.chengpeiquan.com/img/2022/01/20220122013207.jpg?x-oss-process=image/interlace,1)

## 关于开源官网

基于自己很长时间以来的一个需求点吧，就是常用的一些项目模板或者配置，缺少一个比较好用的管理工具。

虽然有 Git 仓库，但多了也不好找，所以元旦有空就开了个坑，虽然还在搞，不过基本的一些功能还是可以用的，特别是本地的配置管理。

```bash
# 都是国内我就用 CNPM 吧，先全局安装
cnpm i -g create-preset

# 然后初始化就可以创建一套 Starter
preset init
```

点击访问：[项目文档](https://preset.js.org/zh/) 了解更多用法。

![create-preset](https://cdn.chengpeiquan.com/img/2021/11/20220110155037.gif)

目前还处于初期自己摸索阶段，很多功能还在想怎么完善，如果有这方面的需要可以先用本地管理去体验。

点击查看：[管理本地配置](https://preset.js.org/zh/docs.html#%E7%AE%A1%E7%90%86%E6%9C%AC%E5%9C%B0%E9%85%8D%E7%BD%AE)

有 BUG 就先提 issue 吧，因为今天才用 TypeScript 重写了一版，还没怎么测试。

原本是用 JavaScript 直接写的，不过还是决定用 Vite 重新构建为 Library 的形式，至于重写的原因可以看 [使用感受](https://chengpeiquan.com/article/javascript-with-typescript-type-checking.html#%E4%BD%BF%E7%94%A8%E6%84%9F%E5%8F%97) 。

## 关于项目复盘

这部分是我觉得这周写的最有意义的一个东西了，虽然从 2021 年出就一直在团队里逐步升级用 `Vue` 3.0 和 `TypeScript` ，不过很长时间只有我亲自开坑的项目才会有这种待遇，团队其他人开的坑都还是比较保守，一方面是不熟悉，一方面可能是懒的学？

最近带着几个小兄弟把一个以前的老项目重写了，从 `Vue` 2.0 + `JavaScript` + `Webpack` 更换到了 `Vue` 3.0 + `TypeScript` + `Vite` ，整个开发过程大家都很愉快！

虽然说就是一个后台而已，但我觉得它的意义并不止于一个后台，而是作为一个小跳板或者噱头，让团队的人都比较有亲身体验的去感受这些新技术栈的优点，并且对于一些规范的东西也有更多的感受，所以我花了几天时间写了个复盘 PPT ，在复盘的过程中，大家也都能了解到我的一些想法，不仅仅是因为我说用什么就用什么。

发现复盘之后大家很多东西都有了更多的理解和认可，我感觉很棒！分享不涉及业务的一部分吧，如果你的团队也在纠结要不要用新技术栈，可以参考一下看怎么推进。

Btw: PPT 我用的是 [slidev](https://cn.sli.dev/) ，一个基于 Vite 和 Vue 3.0 的幻灯片工具，上手很方便，功能很强大！

1. 这个是复盘的大纲，主要围绕这些维度去对这次项目进行回顾。

![这个是复盘的大纲](https://cdn.chengpeiquan.com/img/2022/01/20220122004937.jpg?x-oss-process=image/interlace,1)

2. 这是重构和重写之间的思考，避免有人觉得我只是单纯不喜欢老项目太多外包团队写的代码，所以决定重写，其实不是的哈哈哈哈，中间分析了很多东西，细节部分这里就不贴出来了

![思考过程](https://cdn.chengpeiquan.com/img/2022/01/20220122004938.jpg?x-oss-process=image/interlace,1)

3. 决定重写没问题，但是最重要的一点就是，保证如期上线！

话说这里安利一下我的开源书 [Vue3.0学习教程与实战案例](https://vue3.chengpeiquan.com/) ，虽然 Vue 3.0 的新官网快出来了，变化很大，不过在出来之前还是可以看看，这次我们组的同学都是一边干活一边看我这本书，很容易就上手 Vue 3 了。

![如何保证也要提前想好](https://cdn.chengpeiquan.com/img/2022/01/20220122004939.jpg?x-oss-process=image/interlace,1)

4. 这是这次更换的几个核心技术栈

![变化了这些](https://cdn.chengpeiquan.com/img/2022/01/20220122004940.jpg?x-oss-process=image/interlace,1)

5. 一些技术选型的理由分析

![Vue 2 和 3 的对比](https://cdn.chengpeiquan.com/img/2022/01/20220122004941.jpg?x-oss-process=image/interlace,1)

![Options API 和 Composition API 的对比](https://cdn.chengpeiquan.com/img/2022/01/20220122004942.jpg?x-oss-process=image/interlace,1)

![JS 和 TS 的对比](https://cdn.chengpeiquan.com/img/2022/01/20220122004943.jpg?x-oss-process=image/interlace,1)

![TS 的一个流行程度也是作为理由](https://cdn.chengpeiquan.com/img/2022/01/20220122004944.jpg?x-oss-process=image/interlace,1)

![这是分析 Webpack 和 Vite 的区别](https://cdn.chengpeiquan.com/img/2022/01/20220122004945.jpg?x-oss-process=image/interlace,1)

![这次是选择了 Vite](https://cdn.chengpeiquan.com/img/2022/01/20220122004946.jpg?x-oss-process=image/interlace,1)

![UI 框架也做了一次更换](https://cdn.chengpeiquan.com/img/2022/01/20220122004947.jpg?x-oss-process=image/interlace,1)

6. 然后回顾了一些亮点，主要是和旧项目做对比，不复盘的话只会觉得不就是做了个后台吗，复盘了发现其实团队的很多东西变化很大，积累的东西也比之前好了很多（小团队轻喷）

![一些亮点](https://cdn.chengpeiquan.com/img/2022/01/20220122004948.jpg?x-oss-process=image/interlace,1)

7. 这次也引入了很多开源社区比较好的规范机制，有 ESLint 啊，Commit 规范啊等等（小团队轻喷，之前确实没有太严格这方面的东西）

![大佬们做榜样](https://cdn.chengpeiquan.com/img/2022/01/20220122004949.jpg?x-oss-process=image/interlace,1)

大概就这几个吧！其他的都是内部的东西就不多说了哈。

回到本文的主题，做 Markdown 工程师的感觉怎么样？其实还挺不错的哈哈哈哈。
