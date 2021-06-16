---
title: vue-cnzz-analytics 基于Vue SPA项目的友盟CNZZ统计插件（支持Vue 3.0）
desc: 一个专为SPA项目开发的友盟统计插件，支持Vue 3.0以及2.0版本同时使用，也可用于VuePress项目，支持在路由切换时，自动上报流量数据等功能。
keywords: cnzz,vue cnzz,vue umeng,vue analytics,spa analytics,cnzz统计,umeng统计,友盟统计,vuepress统计,vuepress cnzz统计
date: 2021-01-08 22:37:00
cover: https://cdn.jsdelivr.net/gh/chengpeiquan/assets-storage/img/2020/08/1-3.jpg
categories:
  - tech
repo: https://github.com/analyticsjs/vue-cnzz-analytics
---

[[toc]]

一个只有 3 kB 大小的插件，可以帮你轻松解决 SPA 单页面项目浏览数据不准确的问题，基于 Vue 路由访问轨迹自动向友盟统计平台上报 PV / 事件数据。

>本插件自 v2.0.0 开始，最新版插件支持在 Vue 3.0 项目下使用，同时兼容 Vue 2.0 项目的使用，具体使用方法请看下方说明以及在线 demo 。<br>对 Vue 3.0 感兴趣，但还在观望的同学，欢迎阅读我踩坑总结的：[Vue3.0学习教程与实战案例](https://vue3.chengpeiquan.com/) （持续更新ing）

## 功能

* 异步载入友盟统计脚本，无需修改入口 HTML

* 支持部署多个站点 ID ，并对应进行数据上报（跨部门合作项目，双方均要收集数据时非常有用）

* 支持自动上报路由切换产生的 PV 数据（需引入 [Vue Router](https://router.vuejs.org/)，支持 hash 模式和 history 模式的地址）

* 支持手动提交 PV 上报

* 支持手动提交事件分析上报

* 自动识别 Vue 版本，自动适配 Vue 2.0 / Vue 3.0 使用（本插件 v2.0.0 版本新增）

* 提供了 Hooks API（本插件 v2.1.0 版本新增，因此 CDN 安装的用法略有调整，请留意使用说明）

## 项目

理论上只要引入了 Vue （必须） 和 Vue Router （自 v2.2.0 起是可选） 的项目均可以正常使用，包括但不限于以下类型：

* Vue-CLI 脚手架项目

* Vite 项目

* 引入 Vue 相关 CDN 的 HTML 页面

* VuePress 项目

也不仅限于 SPA 单页面项目，在 SSG / SSR 项目里也可以使用。

## 预览

两个在线 demo 均已开启 debug 模式，可开启控制台查看上报情况。

Vue 2.0 版本：[vue-cnzz-analytics demo for Vue 2.x](https://analyticsjs.github.io/vue-cnzz-analytics/demo/vue2.html "vue-cnzz-analytics demo for Vue 2.x")

Vue 3.0 版本：[vue-cnzz-analytics demo for Vue 3.x](https://analyticsjs.github.io/vue-cnzz-analytics/demo/vue3.html "vue-cnzz-analytics demo for Vue 3.x")

## 选项

选项|是否必填|选项类型|选项说明
:-:|:-:|:-:|-
router|否|object|Vue Router（自 v2.2.0 版本开始为可选，无路由的单页则不必传该选项）
siteIdList|是|number[]|友盟统计的站点 id 列表，只有一个站点需要上报就保留一个 id 即可
isDebug|否|boolean|是否开启 debug 模式，默认 `false`，开启后会在 F12 控制台打印上报信息

友情提示：上线前记得关闭 debug 模式。

## 安装

方式一：通过 NPM 安装

```bash
npm install vue-cnzz-analytics --save-dev
```

方式二：通过 CDN 安装

```html
<script src="https://cdn.jsdelivr.net/npm/vue-cnzz-analytics/dist/vue-cnzz-analytics.min.js"></script>
```

## 启用

通过 NPM 安装的项目，需要先在 main.js 里引入插件（通过 CDN 则无需该步骤）。

```js
import cnzzAnalytics from 'vue-cnzz-analytics'
```

安装插件后，在 main.js  引入以下代码（注意 Vue 2.0 和 Vue 3.0 的用法区别），即可开启自动上报功能，首次访问页面会部署统计代码并提交第一次访问数据上报。

后续在路由切换过程中，也会根据路由的切换提交相应的 URL 信息到友盟统计。

### 在 Vue 2.0 里使用

可参考demo：[main.js - Vue 2.0 demo](https://analyticsjs.github.io/vue-cnzz-analytics/demo/js/main-for-vue2.js)

>自 v2.1.0 版本开始，如果是通过 CDN 安装，需要使用 `cnzzAnalytics.default` 去激活插件，通过 NPM 安装的脚手架项目则使用 `cnzzAnalytics` 就可以

```js
// 启动插件
Vue.use(cnzzAnalytics, {
  router: router,
  siteIdList: [
    11111,
    22222
  ],
  isDebug: false
});
```

### 在 Vue 3.0 里使用

可参考demo：[main.js - Vue 3.0 demo](https://analyticsjs.github.io/vue-cnzz-analytics/demo/js/main-for-vue3.js)

>自 v2.1.0 版本开始，如果是通过 CDN 安装，需要使用 `cnzzAnalytics.default` 去激活插件，通过 NPM 安装的脚手架项目则使用 `cnzzAnalytics` 就可以

```js
/** 
 * 初始化Vue
 */
createApp(app)
  // 启动路由
  .use(router)

  // 启动插件
  .use(cnzzAnalytics, {
    router: router,
    siteIdList: [
      11111,
      22222
    ],
    isDebug: false
  })
  
  // 挂载到节点上
  .mount('#app');
```

### 在 VuePress 里使用

插件也支持在Vue的静态文档 [VuePress](https://vuepress.vuejs.org/zh/) 项目里使用。

在项目下的 `/docs/.vuepress` 文件夹下，创建一个 `enhanceApp.js`，按照下面的方式引入即可启动数据上报功能。

官方文档传送门：[应用级别的配置 - VuePress](https://vuepress.vuejs.org/zh/guide/basic-config.html#%E5%BA%94%E7%94%A8%E7%BA%A7%E5%88%AB%E7%9A%84%E9%85%8D%E7%BD%AE)

```js
import cnzzAnalytics from 'vue-cnzz-analytics'

export default ({ Vue, router }) => {
  Vue.use(cnzzAnalytics, {
    router: router,
    siteIdList: [
      11111,
      22222
    ],
    isDebug: false
  });
};
```

可在开发环境打开 debug 模式了解相关的上报情况（上线前记得关闭 debug ）。

## API

自 v2.1.0 版本开始，插件支持直接调用的全局 API `$pushCNZZ` 和按需导入的钩子 API `usePush` 两种方式。

这两种方式在 Vue 2.0 和 3.0 里均可以使用，只不过按照使用习惯和从 Vue 官方推荐的角度来说，全局 API 更适合 Vue 2.0 项目，钩子 API 更适合 Vue 3.0 项目。

> 插件的 API 不可以直接使用，需要配合 API 里面的 [方法](#方法) 才可以操作到具体功能。

### 全局 API

在 Vue 2.0 里，只需要通过我们熟悉的 `this` 去操作即可：

```js
// xxx.vue in Vue 2.0
export default {
  // ...
  mounted () {
    this.$pushCNZZ.pv('/example-url/');
  },
  // ...
}
```

在 Vue 3.0 里，可以按照官方文档的推荐，导入当前实例变量，通过当前实例变量去操作全局方法：

```js
// xxx.vue in Vue 3.0
import { getCurrentInstance } from 'vue'

export default {
  setup () {
    const app = getCurrentInstance();
    app.appContext.config.globalProperties.$pushCNZZ.pv('/example-url/');
  }
}
```

也可以导入当前实例里的代理组件去操作：

```js
// xxx.vue in Vue 3.0
import { getCurrentInstance } from 'vue'

export default {
  setup () {
    const { proxy } = getCurrentInstance();
    proxy.$pushCNZZ.pv('/example-url/');
  }
}
```

### 钩子 API

>钩子 API 需要在用到的组件里 import 导入才可以使用。

在 Vue 2.0 里，你可以绑定一个钩子变量去使用：

```js
// xxx.vue in Vue 2.0
import { usePush } from 'vue-cnzz-analytics'

export default {
  // ...
  data () {
    return {
      // 创建钩子变量
      cnzz: usePush()
    }
  },
  mounted () {
    // 通过钩子变量去触发方法
    this.cnzz.pv('/example-url/');
  },
  // ...
}
```

在 Vue 3.0 里，就像在使用路由 `const router = useRouter();` 一样去使用就可以。

```js
// xxx.vue in Vue 3.0
import { usePush } from 'vue-cnzz-analytics'

export default {
  setup () {
    // 创建钩子变量
    const cnzz = usePush();

    // 通过钩子变量去触发方法
    cnzz.pv('/example-url/');
  }
}
```

另外，如果 API 与其他插件冲突的话（比如你同时使用了 [vue-baidu-analytics](https://github.com/analyticsjs/vue-baidu-analytics)），你可以在导入的时候重命名：

```js
import { usePush as useCnzz } from 'vue-cnzz-analytics'
const cnzz = useCnzz();
```

## 方法

方法需要通过 API 去触发，全局 API 和 钩子 API 支持的方法都是完全一样的。

方法功能|使用说明
:--|:--
手动上报页面 PV|[点击查看](#手动上报页面PV)
手动上报事件分析|[点击查看](#手动上报事件分析)

> 由于目前 Vue 2.0 的使用者还比较多，下面的举例均只用 Vue 2.0 的操作方法进行演示，Vue 3.0 可根据钩子 API 的说明去调用具体的方法。

注：如果配置了多个站点 ID ，数据都会同时上报给所有站点。

### 手动上报页面 PV

如果你有些页面是通过 Tab 切页进行内容渲染切换，但又需要上报访问数据的话，就可以使用这个方法来进行手动上报。

方法名称|功能说明
:-:|-
pv|手动执行 PV 数据上报

**参数**

参数|是否必填|参数类型|参数说明
:-:|:-:|:-:|-
pageUrl|否|string|提交上报的 URL ，必须是以 `/` 开头的相对路径，如果不填，则会默认提交为域名根目录
fromUrl|否|string|来路页面的url，必须是以 `http` 或 `https` 开头的绝对地址，如果不填，则统计平台会认为访问来源为直接输入地址

**使用示范**

```js
this.$pushCNZZ.pv('/example-url/', 'https://example.com/example-from-url/');
```

### 手动上报事件分析

比如你的页面上有个 “换一换” 的功能按钮，想要统计这个按钮的点击情况，就可以通过给按钮绑定上报事件来进行点击情况分析。

方法名称|功能说明
:-:|-
event|手动执行事件分析数据上报

**参数**

参数|是否必填|参数类型|参数说明
:-:|:-:|:-:|-
category|是|string|产生该事件的位置名称，比如 `首页banner`
action|是|string|产生该事件的行为描述，比如 `点击`
label|否|string|产生该事件的标签名称，可以用来记录事件子 id，比如 `bannerId_123`，默认为空
value|否|number|该事件的分值，默认 0
nodeId|否|string|产生该事件的元素id，默认为空

**使用示范**

```js
this.$pushCNZZ.event(
  this.category,
  this.action,
  this.label,
  this.value,
  this.nodeId
);
```

## 更新记录

点击查看：[releases](https://github.com/analyticsjs/vue-cnzz-analytics/releases)

## License

[MIT License](https://github.com/analyticsjs/vue-cnzz-analytics/blob/master/LICENSE) © 2020 [chengpeiquan](https://github.com/chengpeiquan)

