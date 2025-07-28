---
title: 让你在编写 JavaScript 的时候也能享受 TypeScript 的类型检查
desc: 现在前端没有几个不写 TypeScript 了吧，但是有时候还是不得不写 JS ，比如我最近写脚手架的时候，代码是直接跑在 Node Runtime 里，没有编译环节，所以用的依然还是 JavaScript 。然而，发现离开了类型限制之后，感觉要写很多注释才能保证一个项目的完整性，就很烦…
keywords: javascript type,js type,javascript with typescript
date: 2022-01-19 14:42:00
cover: https://cdn.chengpeiquan.com/img/2021/11/20220119155350.jpg?x-oss-process=image/interlace,1
categories:
  - tech
maybeLegacy: true
---

现在前端没有几个不写 TypeScript 了吧，但是有时候还是不得不写 JS ，比如我最近写脚手架的时候，代码是直接跑在 Node Runtime 里，没有编译环节，所以用的依然还是 JavaScript 。

然而，发现离开了类型限制之后，感觉要写很多注释才能保证一个项目的完整性，就很烦……

于是，翻了一下 TypeScript 官网，找到了一篇文章： [JS Projects Utilizing TypeScript](https://www.typescriptlang.org/docs/handbook/intro-to-js-ts.html)

大致意思就是在 VSCode 里，配合 ESLint 和 JSDoc 风格的注释，可以实现在 JavaScript 里享受 TypeScript 的类型检查机制，试了一下，还不错，虽然没有写 TS 那么爽，但确实比直接用 JS 写项目要爽。

配合类型系统，可以节约大量注释的编写，并且一些相同参数格式的地方，导入对应的类型，无需一直重复说明。

> 这篇文章我会默认你开启了 ESLint

## 准备工作

需要安装这个依赖，用来检查 JSDoc 语法。

```bash
yarn add -D eslint-plugin-jsdoc
```

## 配置 ESLint

打开你的 ESLint 配置文件，比如我的是 `.eslintrc.js` ，配置 JSDoc 规则支持，这里省略了其他的选项，根据你的项目配置其他的。

```js
module.exports = {
  // ...
  extends: [
    // 继承 JSDoc 的配置
    'plugin:jsdoc/recommended',
    // ...
  ],
  parserOptions: {
    // 需要开启 module 支持
    sourceType: 'module',
    // ...
  },
  plugins: [
    // 引入 JSDoc 插件
    'jsdoc',
    // ...
  ],
  // 这个是 JSDoc 的一个配置
  settings: {
    jsdoc: {
      mode: 'typescript',
    },
  },
}
```

## 开启检查

要在 JavaScript 文件中开启检查，需要在 JS 文件最前面打上一句注释，这样就会以 TS 的标准来检查你的 JS 代码。

```js
// @ts-check

const foo = () => {
  // ...
}
```

虽然就一句注释，但非常关键，如果缺少，后面的检查都不会生效。

## 忽略检查

如果有一些地方确实可以忽略检查的，可以通过 `ignore` 注释语句来跳过检查。

```js
// @ts-check

// @ts-ignore
const foo = () => {
  // ...
}
```

## 检查配置

采用这种方式的检查机制，你可以参考 `tsconfig.json` 的配置，在你的项目根目录下创建一个 `jsconfig.json` 去管理的检查配置。

可以在 TS 官网查看如何配置：[What is a tsconfig.json](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html) 。

## 定义类型

简单的类型定义可以通过普通注释实现：

```js
/**
 * 打个招呼
 *
 * @param {string} name 对方的名字
 * @returns {string} 欢迎语句
 */
const greet = (name) => `Hello, ${name}!`
```

你在调用这个函数的时候，就可以通过 VSCode 的提示轻松了解它的入参、返回都是些什么格式要求。

![VSCode 提示](https://cdn.chengpeiquan.com/img/2021/11/20220119153103.jpg?x-oss-process=image/interlace,1)

如果你不按照要求传入对应的数据类型， ESLint 会给你提示报错，太爽了！！！

![哈哈哈哈报错了！](https://cdn.chengpeiquan.com/img/2021/11/20220119155720.jpg?x-oss-process=image/interlace,1)

联合类型也是可以写在里面，还有像数组、对象的格式也支持。

```js
/**
 * 打个招呼
 *
 * @param {{ action: string; name: string }} option 选项 action: 行为 name: 对方的名字
 * @returns {string} 欢迎语句
 */
const greet = ({ action, name }) => `${action}, ${name}!`
```

![对象的注释也可以清晰提示](https://cdn.chengpeiquan.com/img/2021/11/20220119153658.jpg?x-oss-process=image/interlace,1)

关于如何编写注释来定义类型可以参考 TS 官网的这篇文章：[Type Checking JavaScript Files](https://www.typescriptlang.org/docs/handbook/type-checking-javascript-files.html) 。

## 类型文件

当然上面是最简单的用法，实际上需要涉及到很多高级类型的用法，可以通过 `.d.ts` 文件来管理。

首先梳理一下自己的目录，建立一个 `types` 文件夹和 `index.d.ts` 文件。

![目录结构](https://cdn.chengpeiquan.com/img/2021/11/20220119150609.jpg?x-oss-process=image/interlace,1)

里面的类型都需要导出：

```ts
export interface Foo {
  // ...
}
```

然后在 JS 文件里，通过 `@typedef` 和 `import` 关键词来导入这个类型。

```js
/**
 * 获取 Foo 列表
 *
 * @typedef {import('../types').Foo} Foo
 * @returns {Foo[]} 一个 Foo 类型的数组
 */
const getFooList = () => {
  // ...
}
```

关于如何在 JSDoc 里写接口可以参考这一篇文章的说明：[How to Write TypeScript Interfaces in JSDoc Comments](https://goulet.dev/posts/how-to-write-ts-interfaces-in-jsdoc/)

## 相关阅读

更多的 JSDoc 语法可以查看 TS 官网的这一篇：[JSDoc Reference](https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html)

## 使用感受

如果是小型项目，并且只跑在 Node 环境，这个方式还是很方便的。

不过最近脚手架越写越有想法，打算做大，所以我打算重构成纯 TypeScript 了哈哈哈，多了一步打包环节，但是相对于维护代码，还是可以忍受的。

所以如果稍微大型点的项目，还是老老实实写 TS 吧，这个只是用在一些简单的项目里，作为一个可选的参考方案。
