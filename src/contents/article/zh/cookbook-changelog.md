---
title: 小程序版本更新记录
desc: 这里记录菜谱小程序的版本迭代记录，如果你在体验的过程中有功能建议、体验优化建议，或者发现了什么 BUG ，欢迎在小程序的 “反馈” 功能里给我留言（打开小程序右上角的 “···” 就能看到），我会评估需求的优先级和可实现成本，在后续的版本迭代中优化。
keywords: 小程序,菜谱小程序
date: 2022-02-14 22:02:14
cover: https://cdn.chengpeiquan.com/img/2022/01/20220215133323.jpg?x-oss-process=image/interlace,1
categories:
  - prose
isDraft: true
simplify: true
---

[[toc]]

这里记录菜谱小程序的版本迭代记录，如果你在体验的过程中有功能建议、体验优化建议，或者发现了什么 BUG ，欢迎在小程序的 “反馈” 功能里给我留言（打开小程序右上角的 “···” 就能看到），我会评估需求的优先级和可实现成本，在后续的版本迭代中优化。

---

## v1.2.0

更新日期： 2022-02-20

### 功能更新

- 首页列表、分类页、分类列表页、工具页 “今天吃啥” 都支持直接分享给好友使用啦！可以和好朋友们一起探索美食的乐趣！
-  “菜谱详情” 页面文末增加了调味料的用量提醒
- 主页面左上角增加了抽屉菜单按钮，可以展开抽屉菜单，查看小程序的一些帮助文档
- 首页增加了 “添加小程序” 的提示，欢迎添加哈哈哈（缓存期间关闭后不再显示）

### 体验优化

- 更新了服务端的图片托管服务配置，现在打开应该速度快了很多（我自己测试速度，根据监测的延迟数据来看大约有 5 ~ 8 倍的优化提升）

### 问题修复

- 优化了 “菜谱分类” 页面的卡片宽度的小数点计算，用以修复 iPhone X 这类窄屏设备上的显示错位问题

---

## v1.1.0

更新日期： 2022-02-14

### 功能更新

- 增加了底部 Tabbar 操作栏， “菜谱分类” 纳入到底部菜单
- 增加了一个趣味查询工具 “今天吃啥” ，可以根据你的选择，从现有的菜谱中帮你搭配今天吃什么
- 优化了列表页、分类页的部分 UI 细节
- 优化了详情页的部分 UI，加入了作者信息和交互按钮
- 菜谱详情页在文末增加了 “相关菜谱” 的引用功能，便于快速查阅相似做法或者有关联的其他菜谱

---

## v1.0.0

更新日期： 2022-02-11

### 功能更新

小程序第一个版本上线，覆盖基础功能：菜谱列表、搜索菜谱、分类筛选、菜谱详情。