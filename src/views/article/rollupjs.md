---
title: JSSDK开发思路 基于RollupJS的经验记录
desc: 虽然Rollup的推出时间应该是比Webpack早，但之前类库的工作都是公司其他前端部门负责维护，还真的没有去接触过它，直到最近自己要负责开发一个用于新业务线的JSBridge和JSLibrary，才对它有了一定的了解。
keywords: rollup,rollupjs,rollup打包,rollup babel
date: 2020-08-09 23:42:00
cover: https://cdn.jsdelivr.net/gh/chengpeiquan/assets-storage/img/2020/08/1.jpg
categories:
  - tech
---

[[toc]]

虽然 Rollup 的推出时间应该是比 Webpack 早，但之前类库的工作都是公司其他前端部门负责维护，还真的没有去接触过它，直到最近自己要负责开发一个用于新业务线的 JSBridge 和 JSLibrary，才对它有了一定的了解。

起步还是建议先阅读一遍官网的介绍，以便对它有一个基本的了解。

> RollupJS 官网 https://www.rollupjs.com/

但是官网的资料很多有坑（因为版本更新然后没有人更新官网资料导致……），所以如果全部按官网的指导走，是走不下去的，一堆问题。

最明显的一个就是 babel，官网说明默认是 babel6，但如果直接从 npm 执行安装，默认安装 babel 则是 7+，配置起来完全不是一个世界的东西……

包括搜到的很多博文也都是过期状态，无法参考，所以决定写个分享来汇总下这次遇到的问题和一些可复用的配置。

注：以下大部分操作都是依赖于命令行操作，Windows 你可以用你熟悉的 `cmd` 或者 `powerShell` 或者我熟悉的 `cmder` ，macOS 可以用终端等等。

## 创建项目

Rollup 只是个工具，不是脚手架，所以没有自己的创建命令，需要走传统的项目生成方法去创建。

```js
mkdir rollup-demo && cd rollup-demo
```

## 初始化项目

执行 `npm init` 命令，根据你的实际情况录入后回车，生成 package.json 文件。

期间建议把入口文件设置为 `src/main.js` ，因为实际项目会有很多个分文件，包括你自己编写的 lib 文件、config 文件等等，统一放到 src 下面进行归类管理。

然后打开 package，修改里面的 script 字段为：

```json
"scripts": {
  "build": "rollup -c rollup.config.js"
}
```

至于为什么修改这个，放在后面说。

## 安装依赖

帮你合并一条命令一键安装，也可以一个个装，不过最终是都要装的。

```js
npm install --save-dev rollup @rollup/plugin-node-resolve @rollup/plugin-babel @rollup/plugin-commonjs @rollup/plugin-json @rollup/plugin-alias rollup-plugin-terser rollup-plugin-banner @babel/core @babel/plugin-proposal-class-properties @babel/preset-env
```

以上的包都属于最基础的依赖，建议全部安装，各个包的说明如下：

| 基础包名                                | 作用                                              | 用途补充说明                                                                                             |
| :-------------------------------------- | :------------------------------------------------ | :------------------------------------------------------------------------------------------------------- |
| rollup                                  | Rollup 的核心包                                   |
| @rollup/plugin-node-resolve             | Rollup 插件包，帮助 Rollup 识别 node_modules 的包 |
| @rollup/plugin-babel                    | Rollup 插件包，自动化解决 babel 的转换问题        | 你可以更爽的写 ES6 以上的新语法…                                                                         |
| @rollup/plugin-commonjs                 | Rollup 插件包，可将 CommonJS 模块转换为 ES6       | 大部分 npm 包都是 CommonJS，比如常用的 axios/qs 库，如果你项目里用到了他们，不引入这个插件的话会构建失败 |
| @rollup/plugin-json                     | Rollup 插件包，可将.json 文件转换为 ES6 模块      | 比如：作为类库当然要涉及到版本更新，版本号肯定不能各种地方都手写，这种情况下就可以从 package.json 读取   |
| @rollup/plugin-alias                    | Rollup 插件包，配置路径别名                       | alias 的作用大家都懂，开发环境必备                                                                       |
| rollup-plugin-terser                    | Rollup 插件包，混淆压缩 js 代码                   | 打包发布必备                                                                                             |
| rollup-plugin-banner                    | Rollup 插件包，给打包后的文件添加注释             | 一般可以添加开发者信息、版本号等信息                                                                     |
| @babel/core                             | @rollup/plugin-babel 的依赖包，该插件基于 babel7  |
| @babel/plugin-proposal-class-properties | @rollup/plugin-babel 的依赖包，该插件基于 babel7  |
| @babel/preset-env                       | @rollup/plugin-babel 的依赖包，该插件基于 babel7  |

## 配置文件

上面提到修改了 `package.json` 的 `script` 字段，修改的含义是告知 node 在执行 build 命令的时候，通过 rollup 命令去运行一个叫 `rollup.config.js` 的配置文件（-c 是--config 的缩写）。

这个文件就是配置文件了，对工程化开发比较熟悉的同学都知道，webpack 对应有 `webpack.config.js`，Vue-CLI 对应有 `vue.config.js`，rollup 的这个配置文件功能也是如此，通过维护一份简单的配置，来实现我们个性化的打包目的。

最基本的 `rollup.config.js` 的内容如下：

```js
import resolve from '@rollup/plugin-node-resolve'
import babel from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import alias from '@rollup/plugin-alias'
import { terser } from 'rollup-plugin-terser'
import banner from 'rollup-plugin-banner'

const path = require('path')
const resolveDir = (dir) => path.join(__dirname, dir)

export default {
  input: 'src/main.js',
  output: [
    {
      file: `demo/js/demo.js`,
      format: 'umd',
      name: 'demo',
    },
    {
      file: `dist/${process.env.npm_package_version}/demo.min.js`,
      format: 'umd',
      name: 'demo',
      plugins: [terser()],
    },
  ],
  plugins: [
    resolve({
      browser: true,
    }),
    babel({
      babelHelpers: 'bundled',
    }),
    commonjs(),
    json(),
    alias({
      entries: [{ find: '@', replacement: resolveDir('src') }],
    }),
    banner(
      `name: <%= pkg.name %>\nversion: v<%= pkg.version %>\nauthor: <%= pkg.author %>`
    ),
  ],
}
```

这份配置的功能是，在执行了 `npm run build` 之后，会在 `dist` 文件夹里，生成一个 “版本号” 文件夹，版本号文件夹下是一个被压缩混淆了的版本。

同时在 `demo` 的 js 文件夹下，会生成一个没有混淆的版本用于 demo 的开发调试。

几个核心的配置选项说明：

| 字段           | 作用                                                                                                                |
| :------------- | :------------------------------------------------------------------------------------------------------------------ |
| input          | 入口文件                                                                                                            |
| output         | 出口文件，一个数组，支持打包多个版本（通常是一个完整版开发，一个混淆压缩上线）                                      |
| output.file    | 出口的文件名，需要包含到文件夹里就把路径也写上，我里面的 process.env.npm_package_version 是以版本号为文件夹归类发布 |
| output.format  | 输出格式：amd=异步模块、cjs=CommonJS、es=ES 模块文件、iife=自动执行、umd=通用模块（包含 amd/cjs/iife 为一体）       |
| output.name    | 暴露的全局变量，可以通过 window.xxx 来访问你的类库，类似 window.jQuery 的作用                                       |
| output.plugins | 打包插件，目前我只配置了一个 terser 用于打包一个压缩版本发布                                                        |

完整的配置选项可以查阅官网资料：

> 大选项列表 - Rollup.js https://www.rollupjs.com/guide/big-list-of-options/#%E6%A0%B8%E5%BF%83%E5%8A%9F%E8%83%BDcore-functionality

## 编译打包

开发阶段你可以根据自己的习惯使用各种 npm 包、自己写的 `lib/module` 文件等等，但是最终都需要在 `main.js` 导出一个变量：

```js
class Demo {
  sayHi(name) {
    console.log(`Hi, ${name}`)
  }
}

const demo = new Demo()

export default demo
```

这样使用的人就可以在引入你打包好的文件之后，通过这个变量去使用你的类库里的方法，觉得有点绕？看看最后的例子。

## 关于 Babel

因为开发阶段会使用大量的 ES6 等浏览器还不完全兼容的新特性，或者引入一些第三方库，比如 axios 之类的，对于低版本 IE 还不太友好，这些情况下都需要进行 Babel 转换。

我目前是用的这份配置，命名为 `.babelrc` 保存到项目根目录下。

```js
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "modules": false,
        "targets": {
          "browsers": "> 1%, IE 11, not op_mini all, not dead"
        },
        "useBuiltIns": "usage",
        "corejs": 2
      }
    ]
  ],
  "plugins": [
    "@babel/plugin-proposal-class-properties"
  ]
}
```

## 举个例子

我在 `main.js` 编写一个简单的函数，通过预设好的 `demo` 变量名打包导出。

dist 文件夹是最终要发版的混淆压缩版，每个版本都有独立的归类；demo 文件夹是用于开发调试的，这里的是未混淆的版本。

![](https://cdn.jsdelivr.net/gh/chengpeiquan/assets-storage/img/2020/08/1-1.jpg)

切到 demo 这边，引入打包好的文件，即可通过 `demo.xxx` 来获取类库的能力。

![](https://cdn.jsdelivr.net/gh/chengpeiquan/assets-storage/img/2020/08/1-2.jpg)

![](https://cdn.jsdelivr.net/gh/chengpeiquan/assets-storage/img/2020/08/2.jpg)

觉得 demo 这个变量没什么逼格？换成$试试……

微信的 JSSDK 也是类似的用法 `wx.config(options);` 、`wx.chooseImage()` 等等，其实大同小异，并没有那么神秘……

你可以参考 jQuery 的各种方法去玩玩，配合现在 ES6 的各种模块化，相信很快能上手！
