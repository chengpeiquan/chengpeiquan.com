---
title: 解决vscode保存vue文件时 压缩stylus代码为一行以及无法注释template的问题
desc: 目前除了美团之外，其他的外卖app（像饿了么啊、瑞幸啊、麦当劳肯德基啊）都没提供自动计算账单的功能，自己每次拉excel算的蛋疼，所以写了这个，无需纠结红包、抵扣券等乱七八糟的减免，会自动计算折扣比例来得到最终账单。
keywords: stylus保存压缩,stylus错乱,stylus格式化
date: 2020-09-20 17:02:00
cover: https://cdn.jsdelivr.net/gh/chengpeiquan/assets-storage/img/2020/09/vue-vscode-snippets.jpg
categories:
  - tech
---

[[toc]]

这篇博客主要解决使用 vscode 在编辑 vue 文件时，遇到的两个困扰了一段时间的问题：

1、如果在 vue 文件里使用了 stylus 预处理器，在保存的时候会被压缩为一行

2、在 template 里按 ctrl+/的时候，会用 js 注释语法来注释 html，导致注释失败

## 解决 stylus 被压缩的问题

最近有好长一段时间都出现了一个诡异的情况，我保存 vue 文件的时候，stylus 写的好好的，就像下面这样：

![](https://cdn.jsdelivr.net/gh/chengpeiquan/assets-storage/img/2020/09/4.jpg)

然后当我按下 Ctrl+S，老是变成这样一行……还能不能玩了？？

![](https://cdn.jsdelivr.net/gh/chengpeiquan/assets-storage/img/2020/09/3-1.jpg)

然后 less/sass 都不会，唯独 stylus 出现了，我又比较喜欢 stylus，无需花括号，无需冒号，无需分号的简洁…

于是各种重装 stylus 相关插件，然而并没有一丝丝改善，搜来搜去也没什么解决办法。

然后我一度很想换回 sublime，换回了 2 天又觉得有点舍不得 vscode，于是又把 vscode 的插件一个个全部关掉再开启尝试……

直到……我发现了这篇同病相怜的文章…

> 解决 vscode 中保存后 html 自动格式化的问题
> https://www.jianshu.com/p/01d916ab6811

emmm，发现原来居然是因为 vue 3.0 的 `Vue3snippets` 插件引起的 = =

然后我把设置里面的 format 关闭了，好了…

![](https://cdn.jsdelivr.net/gh/chengpeiquan/assets-storage/img/2020/09/2-1.jpg)

终于告别噩梦…你知道我这段时间是怎么过来的吗？

为了赶项目，然后不得不单独写一个 styl 文件，去 import 到 Vue 里，复杂项目这样玩起来好恶心 = = 总算解脱了！

因为一开始针对 stylus 去搜问题，实在搜不到解决办法，记录一下，方便后面遇到一样情况的同学！！！！

然后还没完，因为发现了这个 `Vue3snippets` 引起的问题，就顺便捣鼓一下，看看有没有别的替代拼，顺手解决了下面的这个问题。

## 解决 template 无法正常注释的问题

就是按 `ctrl+/` 会生成这样的注释：

![](https://cdn.jsdelivr.net/gh/chengpeiquan/assets-storage/img/2020/09/5.jpg)

网上很多方法说把 vue 的默认关联方式改成 html（具体操作就不说了，搜出来几乎全是这个答案…

为什么不想用这个 html 文件关联的方法呢，因为不支持写 stylus，所以还是特么要单独写一个 styl 文件再 import 进去…还是烦 - -

然后今天在解决第一个问题的时候，因为发现是 snippets 插件引起的，于是重新找了一下替代品，发现有个插件还蛮好用的：

> vue-vscode-snippets
> https://marketplace.visualstudio.com/items?itemName=sdras.vue-vscode-snippets

![](https://cdn.jsdelivr.net/gh/chengpeiquan/assets-storage/img/2020/09/7.jpg)

尝试安装了一下，顺手禁掉了之前的 `Vue3snippets`，注释的问题完美解决。

![](https://cdn.jsdelivr.net/gh/chengpeiquan/assets-storage/img/2020/09/6.jpg)

当然，上面 stylus 被压缩的问题也完美解决，暂时先用这个了！

希望不要有其他的坑哈哈哈哈哈。
