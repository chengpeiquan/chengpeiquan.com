---
title: 只写一次执行函数 同时兼容桌面noConflict后的jQuery与移动端的Zepto
desc: 今天遇到一个比较特殊的情况是这样子，维护一个年代比较久远的项目，说年代久远也就三年前开发上线的，实际生产线还是用的很稳，只不过中间经历了一次改版，后端倒没啥，同一个部门维护的，前端当时因为排期问题，为了及时上线，所以做桌面端模板和移动端模板是两个不同的部门的开发，于是，现在需要做一些中间层的需求就遇到了这么一个稍微有点坑爹的情况。
keywords: jquery zepto 兼容
date: 2018-10-19 23:53:00
cover: https://cdn.jsdelivr.net/gh/chengpeiquan/assets-storage/img/2018/10/1-2.jpg
categories:
  - tech
---

[[toc]]

今天遇到一个比较特殊的情况是这样子，维护一个年代比较久远的项目，说年代久远也就三年前开发上线的，实际生产线还是用的很稳，只不过中间经历了一次改版，后端倒没啥，同一个部门维护的，前端当时因为排期问题，为了及时上线，所以做桌面端模板和移动端模板是两个不同的部门的开发，于是，现在需要做一些中间层的需求就遇到了这么一个稍微有点坑爹的情况。

## 需求回顾

功能本身不复杂，就是后台系统有一个模块是存放提前配置好的函数功能，里面包含一些模板参数，到时候用户在前台的发布界面上填好参数，提交后，就会渲染到浏览器去执行相应的功能，有点类似于我们常用的插入视频 url 生成视频等功能。

![](https://cdn.jsdelivr.net/gh/chengpeiquan/assets-storage/img/2018/10/1-1.jpg)

如上图，其中桌面版是引入了 jQuery 库，并由于$符号与其他库冲突，当时的开发对jQ做了noConflict，所以在桌面版除非自己使用形参函数，否则都得用jq或者jQuery来代替$，移动端是使用了 Zepto，默认是$，并且双端引入库的位置也不一样，编辑器渲染的代码是在页面中间，这就需要等页面加载完毕才能执行编辑器代码，才不会导致出现异常。

## 定位问题

理清楚需求，再来看有什么问题：

1、双端本来可以用同一套代码，但因为 noConflict，无法直接使用$

2、代码需要等页面加载完毕再执行，但页面上已有 onload 事件，无法重复使用 onload，也因为$的问题，无法使用 ready

3、涉及 ajax 并且是非简单请求（虽然这个可以用原生 js 实现，但为了简化代码还是想解决一下然后用 jQ/Zp）

## 解决思路

1、第一个问题：无法使用$

这个倒比较好解决，因为形参的存在，通过稍微变形就可以解决

```javascript
//平时常用的形参立即执行函数简写
;(function ($) {
  //...
})(jQuery)

//其实等同于
var fn = function ($) {
  //...
}
fn(jQuery)

//所以只需要写一次代码，封装到一个函数里，再根据不同平台去判断调用jQuery还是Zepto
var mobileUA = /iPhone|phone|android|iPod|pad|iPad/i.test(
  navigator.userAgent.toLowerCase()
)
if (mobileUA) {
  fn(Zepto)
} else {
  fn(jQuery)
}
function fn($) {
  //...
}
```

2、第二个问题，无法使用 onload 和 ready

再细化一下问题，既然解决了$的问题，也就相当于只要jQuery和Zepto有定义，即可成功使用$去操作。

桌面版 jQuery 库是引入在页头，所以在编辑器代码渲染出来的时候，jQuery 这个关键词是已经定义过的，桌面版可以直接 ready 执行。

```javascript
//因为页头已经给jQuery重新绑定了别名jq
var jq = jQuery.noConflict()

//所以用jq简写就可以了
jq(function () {
  fn(jQuery)
})
```

移动版由于 Zepto 在页尾，编辑器代码渲染的时候，浏览器还不知道 Zepto 是什么，由于 onload 无法用，那么就得尝试别的方式，这个时候最理想的方法应该就是采用监听，采用了 addEventListener 监听页面加载情况来解决。因为 addEventListener 目前对主流浏览器已经兼容的非常好，并且移动端需求，没有 IE8 这种坑爹浏览器需要考虑，当然更主要的是，允许有多个 load 的监听，类似 jQ 允许一个页面上有多个 ready 一样。

```javascript
//因为addEventListener直接执行fn(Zepto)会报错Zepto未定义
//所以把fn(Zepto)放到另外一个函数里去执行，就没问题
window.addEventListener('load', loadDone)
function loadDone() {
  fn(Zepto)
}
```

解决了 1 和 2，第 3 个问题关于 ajax 非简单请求就不是什么问题了。

## 最终方案

汇总一下解决方案的代码如下：

```javascript
var mobileUA = /iPhone|phone|android|iPod|pad|iPad/i.test(
  navigator.userAgent.toLowerCase()
)
if (mobileUA) {
  window.addEventListener('load', loadDone)
} else {
  jq(function () {
    fn(jQuery)
  })
}
function loadDone() {
  fn(Zepto)
}
function fn($) {
  //这里是项目需要的代码内容...
}
```
