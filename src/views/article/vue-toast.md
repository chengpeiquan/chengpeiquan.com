---
title: Vue插件：封装独立的通用组件 可复用的单文件式全局Toast弹窗
desc: 最近突然很想简化一些自己写的，项目常用的调用小功能，比如一些弹窗等等，之前都是H/J/C分离，每次复用都要分别写到对应的文件里，略显麻烦。最近看了Vue官网有关于插件打包的说明，尝试了一下还可以，目前成功打包了一个Toast组件。以后每次项目要用到Toast弹窗，只需要引入一个 showToast.vue 即可直接生效调用，而不必在多个文件里维护自己的那部分代码。
keywords: vue,toast,vue弹窗,vue toast,vue插件
date: 2018-10-11 00:09:00
cover: https://cdn.jsdelivr.net/gh/chengpeiquan/assets-storage/img/2018/10/1-9.jpg
categories:
  - tech
repo: https://github.com/chengpeiquan/vue-toast
---

[[toc]]

最近突然很想简化一些自己写的，项目常用的调用小功能，比如一些弹窗等等，之前都是 Html/JavaScript/Css 分离，每次复用都要分别写到对应的文件里，略显麻烦。

最近看了 Vue 官网有关于插件打包的说明，尝试了一下还可以，目前成功打包了一个 Toast 组件。以后每次项目要用到 Toast 弹窗，只需要引入一个 showToast.vue 即可直接生效调用，而不必在多个文件里维护自己的那部分代码。

## 功能说明

1、支持自定义弹窗文案，并自动计算弹窗的高度调整在屏幕的位置，以一直保持居中

2、支持自定义弹窗显示时长（默认 2 秒，单位毫秒）

3、支持回调函数，callback 将在设定的时间结束后才执行

## 使用方式

1、将 showToast.vue 文件放置于项目的模板文件夹（个人习惯为 src/components）

2、打开 App.vue，引入 vue 和 showToast 组件，并 use 该组件（其实是 use 组件里的方法，只不过打包为一个文件了）。

template 部分（举例，主要就是 showToast 那里）：

```js
<template>
  <div id="app">
    <router-view></router-view>
    <ShowToast></ShowToast>
  </div>
</template>
```

script 部分：

```js
//引入Vue
import Vue from 'vue'

//引入组件，@cp是我自定义的路径别名，相当于@/components/
import ShowToast from '@cp/showToast.vue'

//注册使用方法
Vue.use(ShowToast)

//添加模板
export default {
  name: 'App',
  components: { ShowToast },
}
```

3、之后在 App.vue 或者任意子组件里，就可以直接通过 this.$showToast(文案, 显示时间, 回调函数) 去唤起 Toast 弹窗了。

```js
//默认2秒的弹窗
this.$showToast('默认2秒的弹窗')

//持续显示10秒的弹窗
this.$showToast('持续显示10秒', 10000)

//执行回调函数
this.$showToast('发布成功，即将进入首页…', 2000, () => {
  this.$router.push({
    name: 'home',
  })
})
```

## 效果预览

![](https://cdn.jsdelivr.net/gh/chengpeiquan/assets-storage/img/2021/02/20210217012731.jpg)

## 组件源码

我使用的是 stylus，样式在这里就随便写一下，请根据实际项目需要做调整和本地备份。

```html
<template>
  <div class="common-toast">
    <div class="content">
      <p>
        <span></span>
      </p>
    </div>
  </div>
</template>

<script>
  const showToast = {
    install(Vue, options) {
      Vue.prototype.$showToast = function (text, duration = 2000, callback) {
        document.querySelector('.common-toast').style.display = 'block'
        const newToast = document.querySelector('.common-toast .content')
        newToast.querySelector('span').innerText = text
        setTimeout((w, h) => {
          w = newToast.offsetWidth
          h = newToast.offsetHeight
          newToast.style.marginTop = '-' + h / 2 + 'px'
          newToast.style.marginLeft = '-' + w / 2 + 'px'
        }, 10)
        setTimeout(() => {
          document.querySelector('.common-toast').style.display = 'none'
          if (typeof callback === 'function') {
            callback()
          }
        }, duration)
      }
    },
  }
  export default showToast
</script>

<style lang="stylus" scoped>
  .common-toast
  	display none
  	position fixed
  	top 0
  	left 0
  	width 100%
  	height 100%
  	background-color rgba(0,0,0,0.6)
  	z-index 999998
  	.content
  		position absolute
  		top 50%
  		left 50%
  		margin-top -1rem
  		margin-left -3rem
  		background-color rgba(0,0,0,0.4)
  		box-shadow 0 0 10px rgba(0,0,0,0.2)
  		color #fff
  		text-align center
  		border-radius 6px
  		z-index 999999
  		p
  			display table-cell
  			vertical-align middle
  			width 6rem
  			height 2rem
  			box-sizing border-box
  			padding 0.2rem
  			overflow hidden
  		span
  			font-size 0.3865rem
  			vertical-align middle
  			color #fff
</style>
```

保存为 showToast.vue 文件到项目模板文件夹下即可，以后如果要引用，就直接引入该文件就 ok。

最后附上项目的 github 地址

> https://github.com/chengpeiquan/vue-toast
