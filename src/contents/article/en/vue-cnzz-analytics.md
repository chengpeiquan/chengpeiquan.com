---
title: vue-cnzz-analytics
desc: A data collection tool that supports reporting of single-page application data built by Vue 3.0 & 2.0 & VuePress, based on cnzz statistics.
keywords: cnzz,vue cnzz,vue umeng,vue analytics,spa analytics,cnzz统计,umeng统计,友盟统计,vuepress统计,vuepress cnzz统计
date: 2021-01-08 22:37:00
cover: https://cdn.chengpeiquan.com/img/2020/08/1-3.jpg?x-oss-process=image/interlace,1
categories:
  - tech
repo: https://github.com/analyticsjs/vue-cnzz-analytics
maybeLegacy: true
---

Only 3 kB, this plugin base on the CNZZ analytics, it can help you quickly to collect the page views on your website, including single page web application.

> Since the version v2.0.0, it supports the Vue 3.0, and is compatible with the Vue 2.0, you can see the live demo to learn more.<br>If you haven’t started using Vue 3.0, welcome to read the tutorial [learning Vue3](https://vue3.chengpeiquan.com/) .

## Features

- Asynchronously load the CNZZ analytics scripts, no need to modify the entry HTML.

- Support the deployment of multiple site IDs and corresponding data reporting.

- Supports automatic reporting of PV data generated by route switching (This feature need [Vue Router](https://router.vuejs.org/), It can support hash mode and history mode).

- Support manual submission of page views reports.

- Support manual submission of event reports.

- Since the version v2.0.0, the plugin can automatically recognize the Vue version at Vue 2.0 or Vue 3.0 .

- Since the version v2.1.0, Hooks API is provided (So the usage of CDN installation is slightly adjusted)

## Project

As long as Vue and Vue Router are introduced, the projects can be used normally, no matter what method is used to develop your project, e.g. :

- Vue-CLI scaffolding project

- Vite project

- Introduce the HTML page of Vue related CDN

- VuePress project

It is not limited to SPA single page projects, it can also be used in SSG / SSR projects.

## Preview

Both live demos have enabled debug mode, and you can open the console to view the report.

Vue 2.0 ：[vue-cnzz-analytics demo for Vue 2.x](https://analyticsjs.github.io/vue-cnzz-analytics/demo/vue2.html 'vue-cnzz-analytics demo for Vue 2.x')

Vue 3.0 ：[vue-cnzz-analytics demo for Vue 3.x](https://analyticsjs.github.io/vue-cnzz-analytics/demo/vue3.html 'vue-cnzz-analytics demo for Vue 3.x')

## Options

|   Option   | Required |   Type   | Description                                                                                              |
| :--------: | :------: | :------: | -------------------------------------------------------------------------------------------------------- |
|   router   |  false   |  object  | Vue Router(It is optional since v2.2.0.)                                                                 |
| siteIdList |   true   | number[] | The site ids for CNZZ analytics, if only one site needs to be reported, just keep one item in the array. |
|  isDebug   |  false   | boolean  | if `true`, it will open the debug mode，you can see the log in the console.                              |

Tips: Please remember to turn off the debug mode before publish.

## Install

You can install the plugin from NPM.

```bash
npm install vue-cnzz-analytics --save-dev
```

Can also use the CDN URL in your HTML.

```html
<script src="https://cdn.jsdelivr.net/npm/vue-cnzz-analytics/dist/vue-cnzz-analytics.min.js"></script>
```

## Usage

If use NPM, you must import the plugin in `main.js` .

```js
import cnzzAnalytics from 'vue-cnzz-analytics'
```

Then, refer to the sample code in Vue 2.0 and Vue 3.0 below to use it.

When the route is switched, the new URL address will be reported to CNZZ analytics after the visit.

### Use in the Vue 2.0

See：[main.js - Vue 2.0 demo](https://analyticsjs.github.io/vue-cnzz-analytics/demo/js/main-for-vue2.js)

> Since the version v2.1.0, if you use CDN in your HTML, must be use `cnzzAnalytics.default` to use the plugin.

```js
Vue.use(cnzzAnalytics, {
  router: router,
  siteIdList: [11111, 22222],
  isDebug: false,
})
```

### Use in the Vue 3.0

See：[main.js - Vue 3.0 demo](https://analyticsjs.github.io/vue-cnzz-analytics/demo/js/main-for-vue3.js)

> Since the version v2.1.0, if you use CDN in your HTML, must be use `cnzzAnalytics.default` to use the plugin.

```js
createApp(app)
  .use(router)
  .use(cnzzAnalytics, {
    router: router,
    siteIdList: [11111, 22222],
    isDebug: false,
  })
  .mount('#app')
```

### Use in the VuePress

The plugin can also be used in [VuePress](https://vuepress.vuejs.org/zh/) project.

In the `/docs/.vuepress` folder under the project, create a file named `enhanceApp.js`, and write the following code in this file.

You can see [App Level Enhancements - VuePress](https://vuepress.vuejs.org/guide/basic-config.html#app-level-enhancements) to learn more.

```js
import cnzzAnalytics from 'vue-cnzz-analytics'

export default ({ Vue, router }) => {
  Vue.use(cnzzAnalytics, {
    router: router,
    siteIdList: [11111, 22222],
    isDebug: false,
  })
}
```

You can turn on the debug mode in the development environment to learn about related reports (remember to turn off debug before going online).

## API

Since the version v2.1.0, you can use the Global API `$pushCNZZ` and the Hooks API `usePush` in your project, they both support the Vue 2.0 and 3.0.

> The APIs can't be used directly, it needs to cooperate with the [Methods](#Methods) to operate the specific functions.

### The Global API

In the Vue 2.0:

```js
// xxx.vue in Vue 2.0
export default {
  // ...
  mounted() {
    this.$pushCNZZ.pv('/example-url/')
  },
  // ...
}
```

In the Vue 3.0, you can use the Global Properties:

```js
// xxx.vue in Vue 3.0
import { getCurrentInstance } from 'vue'

export default {
  setup() {
    const app = getCurrentInstance()
    app.appContext.config.globalProperties.$pushCNZZ.pv('/example-url/')
  },
}
```

You can also import the proxy component in the current instance to operate:

```js
// xxx.vue in Vue 3.0
import { getCurrentInstance } from 'vue'

export default {
  setup() {
    const { proxy } = getCurrentInstance()
    proxy.$pushCNZZ.pv('/example-url/')
  },
}
```

### The Hooks API

In the Vue 2.0:

```js
// xxx.vue in Vue 2.0
import { usePush } from 'vue-cnzz-analytics'

export default {
  // ...
  data() {
    return {
      cnzz: usePush(),
    }
  },
  mounted() {
    this.cnzz.pv('/example-url/')
  },
  // ...
}
```

In the Vue 3.0, just use it as if you were using the route `const router = useRouter();`.

```js
// xxx.vue in Vue 3.0
import { usePush } from 'vue-cnzz-analytics'

export default {
  setup() {
    const cnzz = usePush()
    cnzz.pv('/example-url/')
  },
}
```

If the name of the hook API has already been declared, you can rename it when import.

```js
import { usePush as useCnzz } from 'vue-cnzz-analytics'
const cnzz = useCnzz()
```

## Methods

All methods are needs to be triggered through the API, and the methods supported by the Global API and the Hooks API are exactly the same.

| Method                             | Description                                               |
| :--------------------------------- | :-------------------------------------------------------- |
| Manually report the page views     | [Click here to see.](#manually-report-the-page-views)     |
| Manually report the event analysis | [Click here to see.](#manually-report-the-event-analysis) |

> Since there are still many users of Vue 2.0, the following examples only use the operation method of Vue 2.0 to demonstrate. Vue 3.0 can call specific methods according to the description of the Hooks API.

Tips: If multiple site IDs are configured, the data will be reported to all sites at the same time.

### Manually report the page views

If you switch content rendering on some pages through Tab, but you need to report access data, you can use this method to manually report.

| Method | Description                         |
| :----: | ----------------------------------- |
|   pv   | Manually perform PV data reporting. |

**Params**

|  Param  | Required |  Type  | Description                                                                                                                                                                                                    |
| :-----: | :------: | :----: | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| pageUrl |  false   | string | The URL submitted for the report must be a relative path starting with `/`, if not filled, it will be submitted as the domain name root directory by default.                                                  |
| fromUrl |  false   | string | The URL of the incoming page must be an absolute address beginning with `http` or `https`, if it is not filled in, the statistics platform will consider the source of the visit to be a direct input address. |

**Example**

```js
this.$pushCNZZ.pv('/example-url/', 'https://example.com/example-from-url/')
```

### Manually report the event analysis

For example, there is a "exchange" function button on your page. If you want to count the clicks of this button, you can perform click analysis by binding the button to report events.

| Method | Description                                     |
| :----: | ----------------------------------------------- |
| event  | Manually perform event analysis data reporting. |

**Params**

|  Param   | Required |  Type  | Description                                                                                                                |
| :------: | :------: | :----: | -------------------------------------------------------------------------------------------------------------------------- |
| category |   true   | string | The name of the location where the event occurred, e.g. `banner`                                                           |
|  action  |   true   | string | The description of the behavior that generated the event, e.g. `click`                                                     |
|  label   |  false   | string | The name of the label that generated the event can be used to record the event sub-id, e.g. `bannerId_123`. (@default: '') |
|  value   |  false   | number | The score of the event. (@default: 0)                                                                                      |
|  nodeId  |  false   | string | The id of the element that generated the event. (@default: '')                                                             |

**Example**

```js
this.$pushCNZZ.event(
  this.category,
  this.action,
  this.label,
  this.value,
  this.nodeId,
)
```

## CHANGELOG

See：[releases](https://github.com/analyticsjs/vue-cnzz-analytics/releases)

## License

[MIT License](https://github.com/analyticsjs/vue-cnzz-analytics/blob/master/LICENSE) © 2019 [chengpeiquan](https://github.com/chengpeiquan)
