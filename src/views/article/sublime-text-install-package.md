---
title: 解决Sublime Text 3无法安装package的问题
desc: 今天无聊更新了一下Sublime Text 3的最新版，结果坑爹了，无法使用Ctrl+Shift+P选择install安装各种插件，会报错 Package Control There are no packages available for installation Please see https://packagecontrol.io/docs/troubleshooting for help
keywords: sublime text 3 packages
date: 2019-07-24 23:39:00
cover: https://cdn.jsdelivr.net/gh/chengpeiquan/assets-storage/img/2019/07/1-3.jpg
categories:
  - tech
---

今天无聊更新了一下 Sublime Text 3 的最新版，结果坑爹了，无法使用 Ctrl+Shift+P 选择 install 安装各种插件，会报错。

> Package Control There are no packages available for installation Please see https://packagecontrol.io/docs/troubleshooting for help

根据提示，那个网站被墙了，打不开，不过很快在 github 上找到了一个同步这个网站的项目，从 github 上下载最新的 zip 解压，根据 md 文档说明配置到 sublime 的设置里即可解决。

> github 地址  https://github.com/HBLong/channel_v3_daily

项目说明：每天定时更新 channel_v3.json，解决 Sublime Text 3 拓展包源无法访问问题

基本上跟着 md 文档处理就行，这一篇只是作为自己的备忘录笔记，嘿嘿。
