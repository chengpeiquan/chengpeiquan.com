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

这篇博客主要解决使用vscode在编辑vue文件时，遇到的两个困扰了一段时间的问题：

1、如果在vue文件里使用了stylus预处理器，在保存的时候会被压缩为一行

2、在template里按ctrl+/的时候，会用js注释语法来注释html，导致注释失败

## 解决stylus被压缩的问题

最近有好长一段时间都出现了一个诡异的情况，我保存vue文件的时候，stylus写的好好的，就像下面这样：

![](https://cdn.jsdelivr.net/gh/chengpeiquan/assets-storage/img/2020/09/4.jpg)

然后当我按下Ctrl+S，老是变成这样一行……还能不能玩了？？

![](https://cdn.jsdelivr.net/gh/chengpeiquan/assets-storage/img/2020/09/3-1.jpg)

然后less/sass都不会，唯独stylus出现了，我又比较喜欢stylus，无需花括号，无需冒号，无需分号的简洁…

于是各种重装stylus相关插件，然而并没有一丝丝改善，搜来搜去也没什么解决办法。

然后我一度很想换回sublime，换回了2天又觉得有点舍不得vscode，于是又把vscode的插件一个个全部关掉再开启尝试……

直到……我发现了这篇同病相怜的文章…

>解决vscode 中保存后html自动格式化的问题
>https://www.jianshu.com/p/01d916ab6811

emmm，发现原来居然是因为vue 3.0的 `Vue3snippets` 插件引起的 = =

然后我把设置里面的format关闭了，好了…

![](https://cdn.jsdelivr.net/gh/chengpeiquan/assets-storage/img/2020/09/2-1.jpg)

终于告别噩梦…你知道我这段时间是怎么过来的吗？

为了赶项目，然后不得不单独写一个styl文件，去import到Vue里，复杂项目这样玩起来好恶心 = = 总算解脱了！

因为一开始针对stylus去搜问题，实在搜不到解决办法，记录一下，方便后面遇到一样情况的同学！！！！

然后还没完，因为发现了这个 `Vue3snippets` 引起的问题，就顺便捣鼓一下，看看有没有别的替代拼，顺手解决了下面的这个问题。

## 解决template无法正常注释的问题

就是按 `ctrl+/` 会生成这样的注释：

![](https://cdn.jsdelivr.net/gh/chengpeiquan/assets-storage/img/2020/09/5.jpg)

网上很多方法说把vue的默认关联方式改成html（具体操作就不说了，搜出来几乎全是这个答案…

为什么不想用这个html文件关联的方法呢，因为不支持写stylus，所以还是特么要单独写一个styl文件再import进去…还是烦 - -

然后今天在解决第一个问题的时候，因为发现是snippets插件引起的，于是重新找了一下替代品，发现有个插件还蛮好用的：

>vue-vscode-snippets
>https://marketplace.visualstudio.com/items?itemName=sdras.vue-vscode-snippets

![](https://cdn.jsdelivr.net/gh/chengpeiquan/assets-storage/img/2020/09/7.jpg)

尝试安装了一下，顺手禁掉了之前的 `Vue3snippets`，注释的问题完美解决。

![](https://cdn.jsdelivr.net/gh/chengpeiquan/assets-storage/img/2020/09/6.jpg)

当然，上面stylus被压缩的问题也完美解决，暂时先用这个了！

希望不要有其他的坑哈哈哈哈哈。