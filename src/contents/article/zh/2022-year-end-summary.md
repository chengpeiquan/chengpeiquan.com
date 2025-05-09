---
title: 年终总结：2022 年的一些回顾和 2023 年的一些小规划
desc: 2022 对我算是比较特殊的一年，虽然因为疫情原因彻底宅了一年，但也没有闲着，换了工作换了城市，回到了阔别两年的第二故乡广州，工作之外的学习和生活对个人的成长也有一些值得复盘的地方。
keywords: 2022 year end summary
date: 2022-12-31 21:24:00
cover: https://cdn.chengpeiquan.com/img/2023/01/20230101235604.jpg?x-oss-process=image/interlace,1
categories:
  - prose
cite:
  - 2024-year-end-summary
  - 2023-year-end-summary
  - 2022-year-end-summary
  - 2021-year-end-summary
---

2022 对我算是比较特殊的一年，虽然因为疫情原因彻底宅了一年，但也没有闲着，换了工作换了城市，回到了阔别两年的第二故乡广州，工作之外的学习和生活对个人的成长也有一些值得复盘的地方。

## 工作与生活

2020 年疫情爆发那年发生了很多事情，最终也决定从服务了五年的网易公司离职（见 [记录一下在网易五年来的工作与生活](https://chengpeiquan.com/topic/netease)），随即和几个朋友跟着大佬去了深圳，因为大家都是扎根广州，所以都把深圳当成一个临时过渡的城市，所以今年时机成熟的时候就又一起回到了广州。

回广州后也终于不用再苟在城中村里了，在依山傍水的山景房里，三只猫也迎来了久违的阳光，每天睡到自然醒，醒了有东西吃有玩具玩，还不用出门工作，过的比我还幸福。

:::video
https://cdn.chengpeiquan.com/video/my-cats-in-mountain-view-room.mp4
https://cdn.chengpeiquan.com/img/2022/12/20221231235941.jpg?x-oss-process=image/interlace,1
山景房里的三只猫
:::

我从五月底回来后就一直很忙，因为广州这边也是刚成立的新公司，太多事情要忙，加上业余时间也有其他事情， [菜谱](https://chengpeiquan.com/cookbook) 也慢慢停更了，不过偶尔还是有在做饭，新的一年看看调整下生活节奏重新运营起来。

虽然工作很忙碌，但在初创公司的日子里倒也是很有趣，因为人少（目前加上老板还不到十五个人），所以自己也有机会开始承担起一些前端工程师之外的开发工作，例如写 App ，写客户端，写服务端，写爬虫，写区块链，当然都是围绕着 Node.js 进行的全栈开发。

写着写着就没有什么时间写页面了，所以今年也是把 Tailwind CSS 这一类原子框架大幅度的往工作项目里用，这样在需要写页面的时候可以不怎么写样式了，对 Flex 布局熟悉的前端工程师来说， Tailwind 风格的开发模式做东西真的非常快，很适合初创公司老板说 “啊啊啊这个东西很着急” 然后第二天就可以给到他。

这一年是真的忙碌（见下文的 [开源社区](#开源社区) 部分），以至于几乎没有什么运动量，可能也因为运动太少，所以从九月份开始，从痛风发作到新冠病毒，陆陆续续当了一个季度的病号，不过有一点算是不幸中的万幸，就是因为一直宅着，所以年底新冠阳性的时候仅仅只是个弱阳，低烧了一个晚上就开始在恢复健康了，相对于在朋友圈看到一些朋友病得五颜六色，我还是挺幸运的。

另外关于生活的话，就是头发达到了历史上的最新长度，往后甩的时候已经过了腰了，虽然发质一如既往的差，但我并不关心发质哈哈哈哈，长度才是王道。

![头发达到了新的长度](https://cdn.chengpeiquan.com/img/2023/01/20230101231241.jpg?x-oss-process=image/interlace,1)

## 开源社区

今年在 GitHub 的活跃度比去年高了不少，而且很神奇的达到了全勤，因为疫情的原因，还有换城市和新工作等事情，今年也没有出远门或者回家待几天，每天都在有电脑的屋子里待着，所以每天都有在 GitHub 上操作（截图生成自 [GitHub Contributions](https://github-contributions.vercel.app/) ），也归功于今年把很多有的没的代码都托管到 GitHub 上了，包括一些 to-do list 也会有个 Markdown 仓库作为临时笔记，很方便哈哈哈。

![这两年在 GitHub 的活跃情况](https://cdn.chengpeiquan.com/img/2022/12/20221231235848.jpg?x-oss-process=image/interlace,1)

虽然这么活跃，但开源项目其实没有参与多少，基本上都在维护去年的一些旧项目，其中投入最多的是之前写的那本关于 Vue 3 的书 [Learning Vue3](https://github.com/chengpeiquan/learning-vue3) 。

今年一月份的时候在知乎收到一条私信，是出版社的编辑发现了我写的东西，邀请我参与到书籍的出版工作中。当时由于临近过年比较忙，没有立即答复是否参加，后面四月份编辑老师又联系了我，在考虑了自己的时间和目前手里头比较有积累有篇幅的内容后，咨询了是否可以用现有的开源内容整理出版（还举了阮一峰老师的 [ES6 入门教程](https://es6.ruanyifeng.com) 的例子），得到了肯定的答复之后，就开始安排时间调整 Learning Vue3 的内容。

由于当时 Vue 3 已经成为 npm 安装时的默认版本，并且中文官网也建设起来了，考虑到继续单独讲述 Vue 3 的内容显得有点 “过时” （毕竟当时写这本书的背景是国内没有什么 Vue 3 的资料，并且还处于公测但未完全替代 Vue 2 的阶段），在出版社编辑老师的建议下，续写了关于前端工程化的内容，以降低本书的学习门槛，所以可以看到我从 [四月底的更新记录](https://vue3.chengpeiquan.com/changelog.html#_2022-04-30) 就慢慢不再局限于 Vue 了，而是一直在更新前端工程化的内容。

再之后的几个月就一直在补充新内容，并且按照出版社的供稿规范调整了叙述风格，最终整个文档的风格就变得比较有 “专业性” ，不再是嘻嘻哈哈的逗逼语气，自己感觉有点像阮一峰老师，确实在阮老师的博客里受到了很大影响。

很高兴续写的内容得到了线上读者的认可，不仅仓库从 100 Star 慢慢涨到了现在接近 500 Star ，还有很多读者给我留言，给了我很大的鼓励！

![仓库接近 500 Star 了](https://cdn.chengpeiquan.com/img/2023/01/20230101232239.jpg?x-oss-process=image/interlace,1)

![在 GitHub 仓库里的评论](https://cdn.chengpeiquan.com/img/2023/01/20230101223359.jpg?x-oss-process=image/interlace,1)

![在 GitHub 仓库里的评论](https://cdn.chengpeiquan.com/img/2023/01/20230101223358.jpg?x-oss-process=image/interlace,1)

![在 GitHub 仓库里的评论](https://cdn.chengpeiquan.com/img/2023/01/20230101223357.jpg?x-oss-process=image/interlace,1)

![在 GitHub 仓库里的评论](https://cdn.chengpeiquan.com/img/2023/01/20230101223356.jpg?x-oss-process=image/interlace,1)

![在 GitHub 仓库里的评论](https://cdn.chengpeiquan.com/img/2023/01/20230101223355.jpg?x-oss-process=image/interlace,1)

调整后的叙述风格也被读者认可，在 2022 年底突然有一群台湾开发者关注了我的 GitHub 账号，搜索了一下才发现原来 [被台湾一位技术大 V 推荐了](https://www.facebook.com/mukispace/posts/pfbid02QNhZR5DkCAZvtkyJWJuHSSBtW2qPtoUJajQo59sRQbAG2zyRUqcskwGNPxcCEHB3l) ，她很喜欢我的风格，我很开心哈哈哈，付出得到了回报，得到了认可！

![台湾网友的分享](https://cdn.chengpeiquan.com/img/2023/01/20230101224000.jpg?x-oss-process=image/interlace,1)

其他的开源项目大部分是一些 npm 包，总下载量也突破 35 万次了（数据来源 [npm-stat](https://npm-stat.com/charts.html?author=chengpeiquan&from=2019-12-31&to=2022-12-31) ）。

![来自 npm-stat 网站的统计数据](https://cdn.chengpeiquan.com/img/2023/01/20230101224519.jpg?x-oss-process=image/interlace,1)

有个 Vite 插件被大佬的项目引入后带火了，现在每周大约保持在 7k 左右的下载量，也收到了其他开发者的 PR 贡献（ [#16](https://github.com/chengpeiquan/vite-plugin-banner/pull/16) ），期间认真的评审了代码和给予了意见点评，直到那天才感觉在认真参与开源项目协作，在此之前都是自己单打独斗，或者发起一些没有什么修改意见的翻译 PR ，很少这样在 PR 过程中讨论功能的取舍。

![在 PR 过程中讨论功能的取舍](https://cdn.chengpeiquan.com/img/2023/01/20230101225852.jpg?x-oss-process=image/interlace,1)

还有一个使用量比较多的插件是一年多前做的一个自用的小工具，很久没维护，结果一直有人用，前段时间还提了一些反馈，所以年底有空于是重新维护了起来，还用 Photoshop 鼠绘了个 Logo ，偶尔设计点东西还挺有意思的，虽然渣渣，但我觉得很贴合用途哈哈哈。

![新官网上挂着自己画的 Logo](https://cdn.chengpeiquan.com/img/2023/01/20230101230308.jpg?x-oss-process=image/interlace,1)

另外还有一点比较值得高兴的是，新开坑的开源仓库都已经全部使用英语了，包括代码里的注释，还有 issue 的交流，虽然语法和用词什么的不一定对，但在 Google 翻译校验了一下还是可以识别的，多读多写多练习，总有一天可以不太依赖翻译工具的。

## 新年展望

刚好很多事情都在 2022 年底弄完了，新的一年业余时间应该不会那么忙了，我要多运动，多爬山，明明现在住的地方对面就是一座山，我居然一次都没有爬过，真是浪费啊浪费可耻哈哈哈。

![底迪很喜欢在阳台看山景](https://cdn.chengpeiquan.com/img/2023/01/20230101231242.jpg?x-oss-process=image/interlace,1)

然后把三年没弹的贝斯重新弹起来，太久没有弹琴了，自从去了深圳，总感觉人在漂泊，以至于从 2020 年之后就没有再弹过琴，希望今年可以重新积累一些可以演奏的曲子。

技术方面，长远的规划不好说，梳理了一下最近几个月的计划吧：

1. 重构博客（上一次是 2020 年 1 月，也有两年了），技术选型还是偏向于比较新的前端技术栈，找个时间调研一下
2. 认真学一下 React ，其实很久前就有想法，但因为缺乏可落地的个人项目，所以一直没动手，只是简单的写了几个 demo ，去年写 App 的时候因为主要技术栈还是 Vue ，所以选了 uni-app ，但感觉体验并不是太好，把 React 玩熟悉之后以后也可以切入 React Native 开发
3. 重构之前写的命令行工具 [create-preset](https://github.com/awesome-starter/create-preset) ，一个模板拉取工具，现在在用的 GitHub 镜像挂掉了一直没去修，打算把一些自己维护的模板处理成本地一起发包，不走 GitHub 下载了，其他人的社区模板就继续拉仓库，不过要考虑现有的 API 兼容，只能是无感知的重构，感觉要做的事情也不少

其他的可能就是 Web 3 方面的开发继续深入吧，智能合约和 dApp ，也是未来的趋势，并且基本上都是以前端的技术栈为主，作为前端工程师，天生有前端优势的情况下，不玩下区块链多可惜！
