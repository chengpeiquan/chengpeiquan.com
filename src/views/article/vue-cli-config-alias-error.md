---
title: 记录vue.config设置alias无法生效的一次问题排查
desc: 昨晚把Node和Vue-CLI等工具都升级到了最新版，create了一个新项目，因为之前干活的时候为了方便都是拷贝之前的配置文件下来，很多东西都是基于旧版的解构，所以想针对新版本也处理一份配置，于是只拿了vue.config.js来到新项目这边。
keywords: vue cli alias,vue alias,webpack alias
date: 2020-05-22 16:58:00
cover: https://cdn.jsdelivr.net/gh/chengpeiquan/assets-storage/img/2020/05/4.jpg
categories:
  - tech
---

昨晚把 Node 和 Vue-CLI 等工具都升级到了最新版，create 了一个新项目，因为之前干活的时候为了方便都是拷贝之前的配置文件下来，很多东西都是基于旧版的解构，所以想针对新版本也处理一份配置，于是只拿了 vue.config.js 来到新项目这边。

基本都没什么问题，直到我在 main.js 准备引入一个常用的配置文件的时候，控制台报错了！

![](https://cdn.jsdelivr.net/gh/chengpeiquan/assets-storage/img/2020/05/1.jpg)

出现这个提示还是蛮明显的，因为`@js`是我设置的一个别名，对应的路径是`src/assets/js`，同理的还有一堆别名用于快捷使用。

因为这个提示的原因，陷入了持续很久的排查为什么 alias 不生效的过程，然而根据各种文档和博客，我的配置并没有问题。

![](https://cdn.jsdelivr.net/gh/chengpeiquan/assets-storage/img/2020/05/2.jpg)

后来昨晚一看时间已经凌晨 2 点了，决定睡觉。

今天早上起来，决定再次从配置文件入手，采用类似二分法的方式进行配置故障排查。

先注释掉一半的配置，发现可以成功运行！！！！

那么问题就出在这注释掉的前半部分了！！！！

于是类似的方法排查完，你猜怎么着？？？是因为我这个 config 配置了 css 插件，但这次忘记安装了！（日常多处理 H5 需求，所以默认都带上了这个配置，平时需求目的很明显所以记得装，这次因为在调试，当时没想起来）。

![](https://cdn.jsdelivr.net/gh/chengpeiquan/assets-storage/img/2020/05/3.jpg)

把 css 的插件安装完，就一切正常了。

至于为什么会出现这个原因，因为 vue.config.js 本质也是个 js 文件，js 的运行就是从上到下，所以写在 chainWebpack 前面的 css.loaderOptions 出现报错后，脚本就会卡在这里不会执行后面的代码了，从而导致 alias 不生效。

虽然原因弄明白了，但是还是很奇怪报错的问题，因为 css 这里 require 这个插件，但是找不到，它又不会直接报错这里，却报了因为无法生成 alias 导致无法使用别名的错误提示，导致我一直在排查 alias 的问题。

先记录下来，以后遇到类似的坑，要学会多从旁边可能引起的原因一起查，不要老盯着控制台提示去看。
