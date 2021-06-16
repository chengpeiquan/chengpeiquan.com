---
title: 移动端真机debug调试神器 vConsole的引入说明（原生态与WebPack）
desc: 距离这个神器发布第一个版本的时间，已经过去3年了，不过还是有蛮多新同学不知道他的存在，在做项目的时候，移动端真机调试还是用alert来弹，不仅调试起来很烦，也蛮不好定位问题的。安利过的每个人，都对vConsole有着100%的好评哈哈哈，写个博文记录下吧，好东西应该持续推荐。
keywords: vconsole,手机控制台,手机debug,真机调试,移动端debug
date: 2018-11-25 01:16:00
cover: https://cdn.jsdelivr.net/gh/chengpeiquan/assets-storage/img/2018/11/1-1.jpg
categories:
  - tech
---

距离这个神器发布第一个版本的时间，已经过去 3 年了，不过还是有蛮多新同学不知道他的存在，在做项目的时候，移动端真机调试还是用 alert 来弹，不仅调试起来很烦，也蛮不好定位问题的。

安利过的每个人，都对 vConsole 有着 100%的好评哈哈哈，写个博文记录下吧，好东西应该持续推荐。

## 功能简介

在项目页面上引入 vConsole 之后，会在页面右下角生成一个控制台按钮，打开控制台后，会类似 Chrome 的 console 一样，打印我们输出的 log 信息，以及各种页面报错，还可以查看到浏览器 UA 信息、结构 DOM、本地存储信息等等。

![](https://cdn.jsdelivr.net/gh/chengpeiquan/assets-storage/img/2018/11/11.jpg)

## 下载地址

WebPack 可以通过 npm i vconsole 直接安装。

> https://www.npmjs.com/package/vconsole

也可以到官方仓库下载文件引入。

> https://github.com/Tencent/vConsole

## 引入方式

### 1、原生页面

就是常规的通过 src 引入即可。

```javascript
<script type="text/javascript" src="js/static/vconsole.min.js"></script>
<script type="text/javascript">
var vConsole = new Vconsole();
</script>
```

### 2、WebPack 打包

通过 npm 安装，然后封装成一个可复用的小组件，保存到项目下的静态目录，命名为 vconsole.js

```javascript
import Vconsole from 'vconsole'
const vConsole = new Vconsole()
export default vConsole
```

在需要调用的项目组件里，引入这个小组件即可。

```javascript
import '@js/static/vconsole'
```

使用非常简单。

最后，切记正式发布前，移除控制台再对外上线哦！
