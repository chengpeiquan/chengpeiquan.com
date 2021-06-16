---
title: js-file-reader 一句代码把input的file转换为base64和blob格式
desc: 目前除了美团之外，其他的外卖app（像饿了么啊、瑞幸啊、麦当劳肯德基啊）都没提供自动计算账单的功能，自己每次拉excel算的蛋疼，所以写了这个，无需纠结红包、抵扣券等乱七八糟的减免，会自动计算折扣比例来得到最终账单。
keywords: file reader,js file reader,web file reader,read file
date: 2020-09-28 00:22:00
cover: https://cdn.jsdelivr.net/gh/chengpeiquan/assets-storage/img/2020/09/2-3.jpg
categories:
  - tech
repo: https://github.com/chengpeiquan/js-file-reader
---

[[toc]]

最近做后台比较多，而且经常要用到文件上传和预览，写的有点烦 - -，所以弄了这个小玩意…

NpmJS 主页：[https://www.npmjs.com/package/js-file-reader](https://www.npmjs.com/package/js-file-reader 'js-file-reader')

GitHub 主页：[https://github.com/chengpeiquan/js-file-reader](https://github.com/chengpeiquan/js-file-reader 'js-file-reader')

## 功能

通过 `input` 的 `file` 属性选择文件后，只需要一句代码，就可以通过这个小工具获取对应的 `base64` 和 `blob` 值。

适合原生、虚拟 DOM 和各种框架的上传控件使用。

## 预览

demo 已集成了 `native`原生 DOM 、 `vue`虚拟 DOM，以及基于 Vue 生态的`vuetify` 、 `iview` 、 `element` 等 UI 框架的上传控件，可以按 `f12` 开启控制台查看文件选择后得到的转换结果（讲道理其他框架应该也都是可以的）。

点击预览：[js-file-reader demo](https://chengpeiquan.github.io/js-file-reader/demo/ 'js-file-reader demo')

![](https://cdn.jsdelivr.net/gh/chengpeiquan/assets-storage/img/2020/09/2-2.jpg)

## 参数

### 传入的参数：

|   参数   | 是否必填 | 参数类型 | 参数说明                                                   |
| :------: | :------: | :------: | ---------------------------------------------------------- |
| fileList |    是    |  object  | 可以是一个文件对象，或者是对象数组（对应文件的单选和多选） |

### 返回的参数：

|  参数  |   参数类型   | 参数说明                                       |
| :----: | :----------: | ---------------------------------------------- |
| result | object array | 不管传入单个还是多个，最终都是返回一个对象数组 |

其中每个 item 都包含 2 个字段：

`base64` 是 base64 编码格式的转换结果，可用于本地预览

`blob` 是二进制文件转换结果，可用于上传到服务端

## 安装

### 通过 npm 安装

```
npm install js-file-reader --save-dev
```

### 通过 cdn 安装

```html
<script src="https://cdn.jsdelivr.net/npm/js-file-reader/dist/js-file-reader.min.js"></script>
```

## 使用

通过 npm 安装的项目，需要先在 `main.js` 里引入插件（通过 cdn 则无需该步骤）。

```js
import readFile from 'js-file-reader'
```

安装插件后，通过 cdn 引入的可直接通过 api `readFile` 操作。

如果是 npm 安装的，需要挂载到诸如 Vue 的原型上全局使用。

```js
// main.js
Vue.prototype.$readFile = readFile
```

挂载后就可以通过 `this.$readFile` 来操作了。

## 方法

插件目前只有一个方法，就是 `readFile`。

推荐使用 `async/await` 来获取转换结果：

```js
async getFileInfo (e) {
  const FILE_LIST = [...e.target.files];
  const RESULT = await readFile(FILE_LIST);
  console.log(RESULT);
}
```

也可通过 `Promise` 来获取结果：

```js
readFile(fileList).then(function (result) {
  console.log(result)
})
```
