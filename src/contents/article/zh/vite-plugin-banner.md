---
title: vite-plugin-banner：让Vite在打包的时候添加版权注释
desc: 基于Vite，实现一个和webpack banner plugin一样功能的版权注释插件，可以为每个 chunk 文件头部添加 banner 注释。
keywords: vite-plugin-banner,vite plugin,vite banner,vite注释,vite版权
date: 2021-02-23 23:10:00
cover: https://cdn.chengpeiquan.com/img/2021/01/20210224102526.jpg?x-oss-process=image/interlace,1
categories:
  - tech
repo: https://github.com/chengpeiquan/vite-plugin-banner
maybeLegacy: true
---

我很久前有一篇博客是介绍了一个 WebPack 插件，可以在打包后给 JS / CSS 文件添加一个版权注释，可以表明项目归属，用于声明版权信息或者如果出了什么问题知道可以联系谁。

传送门：[基于 Vue-CLI 3.0 让 WebPack 在打包的时候添加版权注释](https://chengpeiquan.com/article/vue-cli-webpack-banner-plugin.html)

最近开始玩 Vite 的一些东西，虽然文档说可以继承 Rollup 的配置选项，以及一些 Rollup 的插件支持，但测试了一下，banner 功能并没有生效，所以昨晚有空就了解了一下 Vite 插件怎么开发，并参照 Webpack banner plugin 的功能自己写了一个，下面是插件的功能说明，同步了 npm 上的 README。

## 功能

为每个 chunk 文件头部添加 banner 注释。

## 安装

从 npm (或者 yarn 或者 pnpm) 安装：

```bash
npm install --save-dev vite-plugin-banner
```

## 选项

| 插件选项类型        | 作用描述             | 使用例子                      |
| :------------------ | :------------------- | :---------------------------- |
| string              | 横幅注释的内容       | [基础用法](#基础用法)         |
| BannerPluginOptions | 请参阅下方的类型声明 | [可选参数格式](#可选参数格式) |

· Type Declarations:

```ts
/**
 * 来自 `vite.config.[ts|js]` 的一些选项
 * @tips 从 `0.2.0` 开始支持此选项类型
 */
export interface BannerPluginOptions {
  /**
   * Banner 的注释内容
   */
  content: string

  /**
   * Vite.js 配置的输出目录
   * @default `dist`
   */
  outDir?: string

  /**
   * 是否将错误信息打印到控制台
   * @tips 从 `0.4.0` 开始支持此选项
   * @default `false`
   */
  debug?: boolean
}
```

## 用法

在大多数情况下，只需使用 `String` 格式作为插件选项。

在一些特殊情况下，比如在 [VitePress](https://vitepress.vuejs.org/) 中，可能需要使用 `Object` 格式来传递插件选项，详见 [可选参数格式](#可选参数格式) 。

### 基础用法

在 `vite.config.ts` 添加：

```ts
// vite.config.ts
import banner from 'vite-plugin-banner'
// 其他依赖...

export default defineConfig({
  plugins: [banner('This is the banner content.')],
})
```

当你在你的项目上运行 `npm run build` 打包的时候，在 `dist` 文件夹（或者你在 `vite.config.ts` 配置的其他 [build.outDir](https://vitejs.dev/config/#build-outdir) ），除了 `vendor` 文件外，所有的 `js` 和 `css` 文件都会添加一个 banner 注释在文件顶部。

例如，在生成的 `app.b3a7772e.js` 里:

```js
/* This is the banner content. */
var e=Object.assign;import{M as t,d as a,u as r,c......
```

### 高级用法

当然，最理想的 banner 注释是和你的项目信息相关联。

首先，你需要更新你的 `package.json` 文件，像这样，包含类似的字段内容：

```json
{
  "name": "chengpeiquan.com",
  "version": "0.1.0",
  "description": "My personal website, technology stack based on Vue.js 3.0, and Vite 2.0, use Server Side Generation.",
  "author": "chengpeiquan",
  "homepage": "https://chengpeiquan.com/"
}
```

然后，在你的 `vite.config.ts` 导入 `package.json`，像这样更新 banner 插件的内容：

```ts
// vite.config.ts
import pkg from './package.json'
// 其他依赖...

export default defineConfig({
  plugins: [
    banner(
      `/**\n * name: ${pkg.name}\n * version: v${pkg.version}\n * description: ${pkg.description}\n * author: ${pkg.author}\n * homepage: ${pkg.homepage}\n */`,
    ),
  ],
})
```

运行 `npm run build` 打包, 你可以看到生成出来的 banner 注释更详细：

例如，在生成的 `app.6936be52.js` 里:

```js
/**
 * name: chengpeiquan.com
 * version: v0.1.0
 * description: My personal website, technology stack based on Vue.js 3.0, and Vite 2.0, use Server Side Generation.
 * author: chengpeiquan
 * homepage: https://chengpeiquan.com/
 */
var e=Object.assign;import{M as t,d as a,u as r,c......
```

### 趣味用法

如果你想制作一些个性化的 banner 注释，像什么表白啊、佛系啊、招聘信息啊什么的，可以通过一些在线生成器去制作有趣的内容。

比如在这些网站上可以直接生成:

- [http://www.network-science.de/ascii/](http://www.network-science.de/ascii/)

- [https://www.bootschool.net/ascii](https://www.bootschool.net/ascii)

```ts
// vite.config.ts
export default defineConfig({
  plugins: [
    banner(`
    ██   ██         ███████   ██      ██ ████████   ██    ██   ███████   ██     ██
    ░██  ░██        ██░░░░░██ ░██     ░██░██░░░░░   ░░██  ██   ██░░░░░██ ░██    ░██
    ░██  ░██       ██     ░░██░██     ░██░██         ░░████   ██     ░░██░██    ░██
    ░██  ░██      ░██      ░██░░██    ██ ░███████     ░░██   ░██      ░██░██    ░██
    ░██  ░██      ░██      ░██ ░░██  ██  ░██░░░░       ░██   ░██      ░██░██    ░██
    ░██  ░██      ░░██     ██   ░░████   ░██           ░██   ░░██     ██ ░██    ░██
    ░██  ░████████ ░░███████     ░░██    ░████████     ░██    ░░███████  ░░███████ 
    ░░   ░░░░░░░░   ░░░░░░░       ░░     ░░░░░░░░      ░░      ░░░░░░░    ░░░░░░░  
    `),
  ],
})
```

执行 `npm run build` 打包, 还是在 `app.d9a287b8.js` ，现在变成了：

```js
/*
    ██   ██         ███████   ██      ██ ████████   ██    ██   ███████   ██     ██
    ░██  ░██        ██░░░░░██ ░██     ░██░██░░░░░   ░░██  ██   ██░░░░░██ ░██    ░██
    ░██  ░██       ██     ░░██░██     ░██░██         ░░████   ██     ░░██░██    ░██
    ░██  ░██      ░██      ░██░░██    ██ ░███████     ░░██   ░██      ░██░██    ░██
    ░██  ░██      ░██      ░██ ░░██  ██  ░██░░░░       ░██   ░██      ░██░██    ░██
    ░██  ░██      ░░██     ██   ░░████   ░██           ░██   ░░██     ██ ░██    ░██
    ░██  ░████████ ░░███████     ░░██    ░████████     ░██    ░░███████  ░░███████
    ░░   ░░░░░░░░   ░░░░░░░       ░░     ░░░░░░░░      ░░      ░░░░░░░    ░░░░░░░
     */
var e=Object.assign;import{M as t,d as a,u as r,c......
```

### 可选参数格式

我不确定除了 VitePress 还有哪些场景需要用到这种方式来传入选项，所以我用 VitePress 来举例，希望能给到你参考。

```ts
// docs/.vitepress/config.ts
import { defineConfig } from 'vitepress'
import banner from 'vite-plugin-banner'
import pkg from '../../package.json'

const outDir = '../dist'

export default defineConfig({
  // 指定打包的输出目录
  outDir,

  // 使用 Vite 插件
  vite: {
    plugins: [
      // 请记住在这里使用 Object 格式的选项
      banner({
        outDir,
        content: `/**\n * name: ${pkg.name}\n * version: v${pkg.version}\n * description: ${pkg.description}\n * author: ${pkg.author}\n * homepage: ${pkg.homepage}\n */`,
      }),
    ],
  },
  // ...
})
```

为什么要这么做？

因为在 VitePress 里，通过 viteConfig.build.outDir 拿到的永远是一个 `.temp` 的临时目录，不是最终的输出目录，所以你需要手动指定输出目录来告知插件。

当然，随着 Vitepress 的版本更新，不一定需要这么做，只是当你需要的时候，可以选择这么处理。
