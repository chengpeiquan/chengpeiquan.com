---
title: 干净的 TypeScript 项目在编译时报错 Cannot find module 'undici-types' 的原因和解决
desc: 很久前配合 《前端工程化：基于 Vue.js 3.0 的设计与实践》 一书在 TypeScript 章节里讲解的内容，提供了一个很干净的 demo （见 hello-node ），除了必要的基础技术栈外，没有过多的第三方依赖，一直运行良好，直到这个假期收到了读者反馈，和我说在运行 npm run build 时出现类似下方的报错，无法正确编译。
keywords: javascript type,js type,javascript with typescript
date: 2024-04-06 21:55:00
cover: https://cdn.chengpeiquan.com/img/2024/04/202404062211878.jpg?x-oss-process=image/interlace,1
categories:
  - tech
---

[[toc]]

很久前配合 [《前端工程化：基于 Vue.js 3.0 的设计与实践》](https://vue3.chengpeiquan.com/) 一书在 TypeScript 章节里讲解的内容，提供了一个很干净的 demo （见 [hello-node](https://github.com/learning-vue3/hello-node) ），这里的 “干净” 是指除了必要的基础技术栈外，没有过多的第三方依赖，一直运行良好。

当然在教程里还是主动引导读者自己从零开始创建这个 Hello 项目，这也带来了这个假期遇到的一个读者反馈的问题。

前几天在 GitHub Issue 的评论区，有位读者和我反馈说在运行 `npm run build` 时出现类似下方的报错，无法正确编译（见 [#193 (comment)](https://github.com/chengpeiquan/learning-vue3/issues/193#issuecomment-2036541817) ）。

![读者反馈](https://cdn.chengpeiquan.com/img/2024/04/202404062221402.jpg?x-oss-process=image/interlace,1)

## 触发错误日志

遇到反馈的问题，首先是要先复现问题，于是先把仓库里的演示项目拉下来跑了一下，依然可以正常运行，但因为 “自己的代码自己清楚” ，马上联想到一个区别，就是读者自己创建的项目，依赖可能都是最新版，而我的演示项目由于 package.json 和 package-lock.json 里的版本号已有指定，因此 node_modules 下安装好的依赖可能并不完全一样，所以在演示仓库的项目里，这个错误没有被触发。

因此我把 node_modules 和 package-lock.json 文件删除，再重新安装依赖，确实，现在演示项目也无法通过编译了，还好日志很清晰，报错是来自 `node_modules/@types/node/globals.d.ts` 这个文件：

```bash
➜  hello-node git:(main) ✗ npm run build

> @learning-vue3/node@1.0.0 build
> tsc src/ts/index.ts --outDir dist --target es6

node_modules/@types/node/globals.d.ts:6:76 - error TS2792: Cannot find module 'undici-types'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?

6 type _Request = typeof globalThis extends { onmessage: any } ? {} : import("undici-types").Request;
                                                                             ~~~~~~~~~~~~~~

node_modules/@types/node/globals.d.ts:7:77 - error TS2792: Cannot find module 'undici-types'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?

7 type _Response = typeof globalThis extends { onmessage: any } ? {} : import("undici-types").Response;
                                                                              ~~~~~~~~~~~~~~
// ...
```

## 分析错误日志

由于这个项目是很入门的演示项目，主要为了演示 Common JS 模块和 ES Module 模块的开发，以及一些 TypeScript 语法的入门，并没有涉及到 Node.js API 的操作，因此也没有主动去安装 `@types/node` 这个包。

> 这里顺便补充个说明： `@types/node` 包主要是为 TypeScript 提供 Node.js API 的类型定义，如果在项目里调用了 Node.js 的 API ，则需要显式安装它，使 TypeScript 可以识别到这些 API 。

所以 `@types/node` 这个包只能是第三方依赖带进来一并被安装的，为了方便排查，重新克隆了一个演示项目的原版，并通过 `npm list @types/node` 查看可以正常 `build` 时的依赖版本号，以及是哪个包引入的这个依赖。

```bash
➜  hello-node-original git:(main) ✗ npm list @types/node

@learning-vue3/node@1.0.0 /Users/chengpeiquan/Documents/projects/demo/h2
└─┬ ts-node@10.9.1
  └── @types/node@18.11.0
```

此时正常 `build` 的 `@types/node` 版本号是 `18.11.0` ，是从 `ts-node` 引入的。

同样的命令在有问题的项目下运行，得到不同的版本号 `20.12.5` 。

```bash
➜  hello-node git:(main) ✗ npm list @types/node

@learning-vue3/node@1.0.0 /Users/chengpeiquan/Documents/projects/demo/hello-node
└─┬ ts-node@10.9.2
  └── @types/node@20.12.5
```

查看项目 `node_modules/ts-node` 目录下的 package.json 文件，看到 `ts-node` 对 `@types/node` 的依赖版本号是设置为 `*` 号，也就是通配符（下面是关键信息的列举，非全部）。

```json
{
  "name": "ts-node",
  "version": "10.9.2",
  "peerDependencies": {
    "@types/node": "*"
  }
}
```

通配符版本号是指允许任何版本的依赖项，会安装最新可用版本，这也是为什么删除了 node_modules 目录和 package-lock.json 文件后，重新安装依赖后版本变化这么大的原因。

关于这个 `undici-types` 依赖，查看了 `@types/node` 的 package.json 文件，确实在后面的版本里引入其作为 `dependencies` 依赖，而之前的版本并没有，在 GitHub 溜达了一圈，原因可能来自 [Node.js Undici 的这个 issue](https://github.com/nodejs/undici/issues/2261) ）。

## 解决问题

原因查明，解决方案就好办了，这里提供两个有效的解决方案。

### 使用 skipLibCheck 选项

由于 demo 的报错主要来自第三方库的代码检查（ TypeScript 默认会检查所有代码），在实际的项目开发中为了节省编译时间和跳过源码之外的问题报错，通常会启用 `skipLibCheck` 选项通知 TypeScript 跳过这些依赖库的类型检查（扩展名为 `.d.ts` 的文件），从而只检查开发者编写的源代码。

这也是为什么写了那么久的 TypeScript 从来没有遇到这种问题的原因，因为在实际项目里一直都是跳过对第三方库的检查啊哈哈哈。

选择这个方案的话，如果是走 CLI 选项编译，可以在命令里添加一个 `--skipLibCheck` 选项：

```json
// package.json
{
  "scripts": {
    "build": "tsc src/ts/index.ts --outDir dist --target es6 --skipLibCheck"
  }
}
```

如果是通过 tsconfig.json 配置编译选项，则是添加在 `compilerOptions` 里：

```json
// tsconfig.json
{
  "compilerOptions": {
    "target": "es6",
    "module": "es6",
    "outDir": "./dist",
    "skipLibCheck": true
  }
}
```

关于 [skipLibCheck 选项](https://www.typescriptlang.org/tsconfig#skipLibCheck) 的更多说明可以在 TypeScript 官网文档上查阅。

### 添加 moduleResolution

除了 `skipLibCheck` ，还有一个解决方案，还记得错误日志吗？在错误日志里给出了两个解决方案的建议：

```bash
Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?
```

由于这是一个第三方库的报错，因此 `paths` 方案不适用（该方案适合对源码目录下的文件配置 Alias 别名）。

因此可以通过另外一个建议，添加 `--moduleResolution` 选项。

```json
// package.json
{
  "scripts": {
    "build": "tsc src/ts/index.ts --outDir dist --target es6 --moduleResolution node"
  }
}
```

也可以成功解决编译问题，同理，也可以在 tsconfig.json 里配置该选项：

```json
// tsconfig.json
{
  "compilerOptions": {
    "target": "es6",
    "module": "es6",
    "outDir": "./dist",
    "moduleResolution": "Node"
  }
}
```

关于 [moduleResolution 选项](https://www.typescriptlang.org/tsconfig#moduleResolution) 的更多说明可以在 TypeScript 官网文档上查阅。
