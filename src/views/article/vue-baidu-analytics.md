---
title: vue-baidu-analytics 基于Vue SPA项目的百度统计插件（支持Vue 3.0）
desc: 一个专为SPA项目开发的百度统计插件，支持Vue 3.0以及2.0版本同时使用，也可用于VuePress项目，支持在路由切换时，自动上报流量数据等功能。
keywords: vue-baidu-analytics,vue百度统计,vue流量上报,spa流量,spa百度统计,vue统计代码,spa统计代码,vuepress统计,vuepress百度统计
date: 2021-01-07 23:21:00
cover: https://cdn.jsdelivr.net/gh/chengpeiquan/assets-storage/img/2019/12/1.jpg
categories: 
  - tech
---
[[toc]]

基于Vue开发的百度统计插件，可以在 `Vue-CLI脚手架项目` 或者 `引入了Vue相关CDN的普通页面`，以及 `VuePress` 项目上使用，使用本插件的项目需要引入 `Vue Router`。

> @v2.0版本更新：<br>最新版支持 Vue 3.x，同时兼容 Vue 2.x 使用，具体使用方法请看下方说明及demo。<br>对Vue 3.0感兴趣，但还在观望的同学，欢迎阅读我踩坑总结的：[Vue 3.0 学习教程](https://vue3.chengpeiquan.com/) （持续更新ing）

## 功能

* 异步载入百度统计脚本，无需修改入口html

* 支持部署多个站点id，并对应进行数据上报

* 支持自动上报路由切换产生的pv数据（支持 `hash模式` 和 `history模式` 的地址）

* 支持手动提交pv上报

* 支持手动提交事件分析上报

* 自动识别Vue版本，自动适配Vue 2.0/3.0使用（插件2.0版本新增）

## 预览

demo已开启debug模式，可开启控制台查看上报情况。

Vue 2.0 版本：[vue-baidu-analytics demo for Vue 2.x](https://chengpeiquan.github.io/vue-baidu-analytics/demo/vue2.html "vue-baidu-analytics demo for Vue 2.x")

Vue 3.0 版本：[vue-baidu-analytics demo for Vue 3.x](https://chengpeiquan.github.io/vue-baidu-analytics/demo/vue3.html "vue-baidu-analytics demo for Vue 3.x")

## 安装

方式一：通过npm安装

```html
npm install vue-baidu-analytics --save-dev
```

方式二：通过cdn安装

```html
<script src="https://cdn.jsdelivr.net/npm/vue-baidu-analytics/dist/vue-baidu-analytics.min.js"></script>
```

## 参数

参数|是否必填|参数类型|参数说明
:-:|:-:|:-:|-
router|是|object|Vue Router，本插件基于路由使用
siteIdList|是|object Array|百度统计的站点id列表，item为站点id<br>只有一个站点需要上报就保留一个item即可
isDebug|否|boolean|是否开启debug模式，默认 `false`<br>开启后会在控制台打印上报信息，**上线前记得关闭**

## 使用

通过npm安装的项目，需要先在 `main.js` 里引入插件（通过cdn则无需该步骤）。

```js
import baiduAnalytics from 'vue-baidu-analytics'
```

安装插件后，在 `main.js` 引入以下代码（注意区分Vue2.0和Vue3.0的用法区别），即可开启自动上报功能，首次访问页面会部署统计代码并提交第一次访问数据上报。

后续在路由切换过程中，也会根据路由的切换提交相应的url信息到百度统计。

### 在 Vue 2.0 里使用

可参考demo：[main.js - Vue 2.0 demo](https://chengpeiquan.github.io/vue-baidu-analytics/demo/js/main-for-vue2.js)

```js
Vue.use(baiduAnalytics, {
  router: router,
  siteIdList: [
    'aaaaaaaaaaaaaaaaaaa',
    'bbbbbbbbbbbbbbbbbbb',
    'ccccccccccccccccccc'
  ],
  isDebug: false
});
```

### 在 Vue 3.0 里使用

可参考demo：[main.js - Vue 3.0 demo](https://chengpeiquan.github.io/vue-baidu-analytics/demo/js/main-for-vue3.js)

```js
/** 
 * 初始化Vue
 */
createApp(app)
  // 启动路由
  .use(router)

  // 启动插件
  .use(baiduAnalytics, {
    router: router,
    siteIdList: [
      'aaaaaaaaaaaaaaaaaaa',
      'bbbbbbbbbbbbbbbbbbb',
      'ccccccccccccccccccc'
    ],
    isDebug: true
  })
  
  // 挂载到节点上
  .mount('#app');
```

### 在 VuePress 里使用

插件也支持在Vue的静态文档 [VuePress](https://vuepress.vuejs.org/zh/) 项目里使用。

在项目下的 `/docs/.vuepress` 文件夹下，创建一个 `enhanceApp.js`，按照下面的方式引入即可启动数据上报功能。

官方文档传送门：[应用级别的配置 - VuePress](https://vuepress.vuejs.org/zh/guide/basic-config.html#%E5%BA%94%E7%94%A8%E7%BA%A7%E5%88%AB%E7%9A%84%E9%85%8D%E7%BD%AE)

```js
import baiduAnalytics from 'vue-baidu-analytics'

export default ({ Vue, router }) => {
  Vue.use(baiduAnalytics, {
    router: router,
    siteIdList: [
      'aaaaaaaaaaaaaaaaaaa',
      'bbbbbbbbbbbbbbbbbbb',
      'ccccccccccccccccccc'
    ],
    isDebug: false
  });
};
```

可在开发环境打开debug模式了解相关的上报情况（上线前记得关闭debug）。

## 方法

插件目前封装了两个常用的api，统一挂载到Vue实例上的 `$pushBAIDU` 去调用。

注：如果配置了多个站点id，会同时上报给所有站点。

### 手动上报页面PV

api名称|功能说明
:-:|-
pv|手动执行PV数据上报

**api参数**

参数|是否必填|参数类型|参数说明
:-:|:-:|:-:|-
pageUrl|否|String|提交上报的url，必须是以 `/` 开头的相对路径<br>如果不填，则会默认提交为域名根目录

**使用示范**

在 Vue 2.0 里使用

```js
this.$pushBAIDU.pv(this.pageUrl);
```

在 Vue 3.0 里使用

（使用3.0的生命周期，需要遵循Vue3的规范，引入一个Vue自带的代理组件，并写在 `setup` 里执行）

```js
const { proxy } = getCurrentInstance();

proxy.$pushBAIDU.pv(pageUrl.value);
```

### 手动上报事件分析

api名称|功能说明
:-:|-
event|手动执行事件分析数据上报

**api参数**

参数|是否必填|参数类型|参数说明
:-:|:-:|:-:|-
category|是|string|产生该事件的位置名称，比如 `首页banner`
action|是|string|产生该事件的行为描述，比如 `点击`
label|否|string|产生该事件的标签名称，可以用来记录事件子id，比如 `bannerId_123`，默认为空
value|否|number|该事件的分值，默认0

**使用示范**

在 Vue 2.0 里使用

```js
this.$pushBAIDU.event(
  this.category,
  this.action,
  this.label,
  this.value
);
```

在 Vue 3.0 里使用

（使用3.0的生命周期，需要遵循Vue3的规范，引入一个Vue自带的代理组件，并写在 `setup` 里执行）

```js
const { proxy } = getCurrentInstance();

proxy.$pushBAIDU.event(
  category.value,
  action.value,
  label.value,
  value.value
);
```