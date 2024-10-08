---
title: iOS设备显示时间为NaN的原因及处理方法
desc: 其实是个存在很久的问题啦，之前在IE的年代应该也是有遇到过的，只不过后来日常涉及到时间的需求都是用时间戳比较多，加上现在各种屏蔽IE访问（我们公司的项目都是引导使用chrome/firefox），所以给忘记了！
keywords: iOS时间NaN,iOS时间显示异常
date: 2019-09-15 02:04:00
cover: https://cdn.chengpeiquan.com/img/2019/09/1-2.jpg?x-oss-process=image/interlace,1
categories:
  - tech
maybeLegacy: true
---

其实是个存在很久的问题啦，之前在 IE 的年代应该也是有遇到过的，只不过后来日常涉及到时间的需求都是用时间戳比较多，加上现在各种屏蔽 IE 访问（我们公司的项目都是引导使用 chrome/firefox），所以给忘记了！

## 需求的背景：

这次是在做中秋节需求的时候，有个需求是在接口返回的一大堆动态的列表里，提取某个作者在某个指定时间范围内的动态出来，所以涉及到一个时间范围的控制。

## 踩坑的地方：

需求真的特别简单，但是就没想到还是栽了个小 bug。

在指定时间范围这里，一开始我也是用的时间戳，但是为了避免 QA 测试的时候改时间老是要去转时间戳，所以 config 里面的时间范围配置，我改成了`年-月-日 时:分:秒` ，再通过`new Date('timeString').getTime()`的方式去转为时间戳，方便随时修改测试时间。

一开始只在 chrome 模拟器和安卓模拟器查看效果，没什么问题，结果拿到 iOS 设备上一看，emmm，返回的时间报错了，出现了 NaN。

## 解决的办法：

其实这个说是 bug 也是 bug，说不是 bug 也不是 bug，因为系统的时间格式本身是`年/月/日`，而不是`年-月-日`，在 chrome 之所以支持，是因为人家用户体验比较好，不支持的浏览器，也不能说是人家的错！

**所以解决方式也就出来了：**

1、要么在 config 的时候，要求必须使用`年/月/日 时:分:秒`来配置；

2、要么就是在`new Date('timeString').getTime()`之前，先对`timeString`做一次`replace(/-/g, '/');`

以上。
