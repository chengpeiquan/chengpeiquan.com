---
title: 用Vite更简单的解决Vue3项目的预渲染问题
desc: 之前 Webpack 项目经常会用到预渲染，现在团队都开始用 Vite 了，所以弄一个基于 Vite 的 Vue 3 预渲染 demo 可以参考。
keywords: Vite,预渲染,Vite预渲染,Vue3预渲染
date: 2022-06-02 14:59:00
cover: https://cdn.chengpeiquan.com/img/2022/06/20220605213042.jpg?x-oss-process=image/interlace,1
categories:
  - tech
repo: https://github.com/chengpeiquan/vite-vue3-prerender-demo
---

之前 Webpack 项目经常会用到预渲染，现在团队都开始用 Vite 了，所以弄一个基于 Vite 的 Vue 3 预渲染 demo 可以参考。

预渲染和静态生成器比较接近，也可以参考我的 [SSG 博客](https://github.com/chengpeiquan/chengpeiquan.com/blob/main/src/router/index.ts) 用 [vite-ssg](https://www.npmjs.com/package/vite-ssg) 和 [vite-plugin-pages](https://www.npmjs.com/package/vite-plugin-pages) 来处理。

不过 Vite 本身对预渲染也提供了原生的支持，简单的预渲染可以自己写写代码来改造实现。

## HTML 部分

项目根目录下 `index.html` 里需要追加至少两条资源注入位置的注释：

|        注释语句        |         作用         | 是否必须 |
| :--------------------: | :------------------: | :------: |
| `<!--preload-links-->` |      预加载资源      |    是    |
|   `<!--app-html-->`    |       页面内容       |    是    |
|     `<!--title-->`     |  SEO 优化：写入标题  |    否    |
|  `<!--description-->`  |  SEO 优化：写入描述  |    否    |
|   `<!--keywords-->`    | SEO 优化：写入关键词 |    否    |

并把入口文件改成 `entry-client.ts` ，原来的 `main.ts` 会作为客户端和服务端启动时的引用。

完整代码如下（源码：[index.html](https://github.com/chengpeiquan/vite-vue3-prerender-demo/blob/main/index.html) ）：

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" href="/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <!--title-->
    <!--description-->
    <!--keywords-->
    <!--preload-links-->
  </head>
  <body>
    <div id="app"><!--app-html--></div>
    <script type="module" src="/src/entry-client.ts"></script>
  </body>
</html>
```

其中除了两条必须的注释语句外，可选的部分见 [SEO 优化](#seo-优化) 。

## 入口文件

普通项目是使用 `src/main.ts` 作为入口文件，需要改造成两个入口：

|     注释语句      |    作用    |                                                源码                                                |
| :---------------: | :--------: | :------------------------------------------------------------------------------------------------: |
| `entry-client.ts` | 客户端入口 | [查看源码](https://github.com/chengpeiquan/vite-vue3-prerender-demo/blob/main/src/entry-client.ts) |
| `entry-server.ts` | 服务端入口 | [查看源码](https://github.com/chengpeiquan/vite-vue3-prerender-demo/blob/main/src/entry-server.ts) |

而原来的 `main.ts` 只作为入口函数导出，详见源码： [main.ts](https://github.com/chengpeiquan/vite-vue3-prerender-demo/blob/main/src/main.ts)

## 路由

不再需要手动配置路由结构了，改造后直接读取 `src/views` 的路由组件来生成页面路由。

详见源码： [router](https://github.com/chengpeiquan/vite-vue3-prerender-demo/blob/main/src/router/index.ts)

## SEO 优化

做预渲染为的就是做 SEO ，所以需要自己提前配置好 SEO 的 TKD 三大要素，这里我也是放在 `src/router` 目录下一起管理了。

实现逻辑见 [预渲染](#预渲染) 部分的说明，这里是以最终每个页面的相对路径来判断要写入的 TKD 信息的。

```ts
export default [
  {
    url: '/',
    title: '首页',
    description: '这是首页',
    keywords: ['关键词1', '关键词2'],
  },
  // ...
]
```

详见源码： [seo](https://github.com/chengpeiquan/vite-vue3-prerender-demo/blob/main/src/router/seo.ts)

## 预渲染

`scripts/prerender.ts` 这个文件是执行预渲染行为，可以按照路由目录的结构渲染为静态 HTML 文件。

运行 `npm run generate` ，可以把 `dist/static` 作为静态站点部署。

当然我也封装了 `npm run build` 一次性编译所有平台（ Client / Server / Static ）。

详见： [package.json](https://github.com/chengpeiquan/vite-vue3-prerender-demo/blob/main/package.json) 里的 `scripts` 部分。

## 常见问题

改造过程中遇到的几个问题：

### 水合节点不匹配

控制台报错：

```bash
Hydration node mismatch:
- Client vnode: div
- Server rendered DOM: <!--app-html-->
```

警告来自于 [hydration.ts](https://github.com/vuejs/core/blob/main/packages/runtime-core/src/hydration.ts) ，一般可以无视……

当然也可以了解更多的知识点： [understand-and-solve-hydration-errors-in-vue-js](https://www.sumcumo.com/en/understand-and-solve-hydration-errors-in-vue-js)

### 路由跳转

控制台报错：

```bash
Unhandled error during execution of scheduler flush
```

需要使用 `<Suspense />` 标签来包裹路由视图，详见 [Suspense](https://v3.cn.vuejs.org/guide/migration/suspense.html#suspense) 。

```diff
<template>
-  <!-- <router-view :key="key" /> -->
+  <router-view :key="key" v-slot="{ Component }">
+    <Suspense>
+      <div>
+        <component :is="Component" />
+      </div>
+    </Suspense>
+  </router-view>
</template>
```
