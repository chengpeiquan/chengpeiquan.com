---
title: TSC编译时指定生成d.ts的目录 并解决无法导入package.json和alias别名的问题
desc: 虽然之前在构建 JS Library 的时候，也是有生成 `d.ts` 文件在输出目录，但总归比较凌乱，意思就是构建出来的 JS Library 和 DTS 文件都在同一级文件夹里。不是说不能用吧，总归看起来有点 low ，如果是单个 DTS 文件还好，但有时候构建出来会有好几个 DTS 这种情况下都放在一起总觉得有点别扭，所以今天想看一下能不能更优雅一点，存档在 types 文件夹里。
keywords: javascript type,js type,javascript with typescript
date: 2022-01-21 12:22:00
cover: https://cdn.chengpeiquan.com/img/2021/11/20220121141631.jpg?x-oss-process=image/interlace,1
categories:
  - tech
---

虽然之前在构建 JS Library 的时候，也是有生成 `d.ts` 文件在输出目录，但总归比较凌乱，意思就是构建出来的 JS Library 和 DTS 文件都在同一级文件夹里。

如果是单个 DTS 文件还好，但有时候构建出来会有好几个 DTS ，这种情况下都放在一起总觉得有点别扭，所以今天想看一下能不能更优雅一点，存档在 types 文件夹里，或者是合并成一个文件。

## 开始尝试

根据官网的 [tsconfig](https://www.typescriptlang.org/tsconfig) 说明，很快就搞好了目标配置（这里省略了其他选项，只展示与生成 DTS 相关的部分）：

```json
{
  "compilerOptions": {
    "resolveJsonModule": true,
    "noEmit": false,
    "rootDir": ".",
    "outDir": "./dist",
    "emitDeclarationOnly": true,
    "declaration": true,
    "declarationDir": "./dist/types"
  },
  "include": ["./src"],
  "exclude": ["node_modules"]
}
```

执行 build 命令，很完美的，生成的 `d.ts` 文件都会放在我们指定的 `dist/types` 文件夹下。

不过好像有哪里不对，原来是它还根据源码的目录格式，生成多了一级 `src` ，变成了 `dist/types/src` ，强迫症不能忍啊！

![多了一级 src 目录](https://cdn.chengpeiquan.com/img/2021/11/20220121112339.jpg?x-oss-process=image/interlace,1)

## 修改 rootDir

再次阅读了 TypeScript 官网的说明，把 [rootDir](https://www.typescriptlang.org/tsconfig#rootDir) 指向源码目录：

```diff
{
  "compilerOptions": {
    "resolveJsonModule": true,
    "noEmit": false,
-    "rootDir": ".",
+    "rootDir": "./src",
    "outDir": "./dist",
    "emitDeclarationOnly": true,
    "declaration": true,
    "declarationDir": "./dist/types"
  },
  "include": ["./src"],
  "exclude": ["node_modules"]
}
```

此时编译后，已经可以看到 DTS 文件成功的生成到 `dist/types` 文件夹下了！不再带有那一层 `src` 文件夹。

但是！但是程序的正常编译居然报错了！源码里有一部分数据是导入了 `package.json` 的字段作为值，比如版本号，包名等等，所以这里出现了一个报错。

![修改 rootDir 之后报错了](https://cdn.chengpeiquan.com/img/2021/11/20220121113324.jpg?x-oss-process=image/interlace,1)

## 解决方案

既然是 JSON 导入出错，那么问题很明显是跟 JSON 配置有关，尝试关闭 `tsconfig` 里的 `resolveJsonModule` 选项：

```diff
{
  "compilerOptions": {
-    "resolveJsonModule": true,
+    "resolveJsonModule": false,
    "noEmit": false,
    "rootDir": ".",
    "outDir": "./dist",
    "emitDeclarationOnly": true,
    "declaration": true,
    "declarationDir": "./dist/types"
  },
  "include": ["./src"],
  "exclude": ["node_modules"]
}
```

然后打开你源码根目录下的 DTS 文件，声明一个 module 用于识别 JSON 文件：

```ts
// e.g. src/global.d.ts
declare module '*.json'
```

再次执行 build ，完美达成预期！

![完美达到预期](https://cdn.chengpeiquan.com/img/2021/11/20220121113455.jpg?x-oss-process=image/interlace,1)

来到这里第一个小目标是已经达成了！接下来看看怎么合并成单个文件。

## 合并文件

查了好久资料，确认单纯通过 TSC 编译出来的 DTS 文件无法做到只有单个，如果你确实觉得这种跟源码目录一样的 DTS 文件还是过于累赘，那么需要借助外部插件来实现文件合并了。

e.g. [dts-generator](https://github.com/SitePen/dts-generator)

这样构建出来的 DTS 文件只有一个，比如 `dist/types/index.d.ts` 。

## 处理别名

到目前，如果你只是简单的项目结构，都是通过 `../foo/bar` 的相对路径来引入的话，没有什么问题。

但如果你跟我一样用了 `alias` 别名，会发现生成的 DTS 文件并不支持 `alias` （比如源码里通过 `@foo/bar` 来代替 `src/foo/bar` 或者 `../../foo/bar` ）。

这个也是要借助外部插件来实现转换，这里测试了几款外部工具，最有效的是 [tscpaths](https://github.com/joonhocho/tscpaths) 。

需要明确的是，它本身不支持编译生成 DTS 文件，而是在 TSC 编译时，根据 `tsconfig.json` 的 `paths` 配置，将 TypeScript 编译出来的 DTS 文件里的绝对路径替换为相对路径。

```bash
pnpm add -D tscpaths
```

然后在你的 `package.json` 的 `build` 命令里面，将它补充在 tsc 命令后面，比如：

```json
{
  "scripts": {
    "build": "tsc && tscpaths -p tsconfig.json -s ./src -o ./dist/types && vite build"
  }
}
```

这样 DTS 里的路径就不再是 `@foo/bar` 了，而是根据目录层级自动转换成 `../../foo/bar` 这样的相对路径。

## 参考资料

['package.json' is not under 'rootDir' - StackOverflow](https://stackoverflow.com/questions/55753163/package-json-is-not-under-rootdir/61426303#61426303)

[Export single .d.ts from several typescript files + entrypoint - StackOverflow](https://stackoverflow.com/questions/39722682/export-single-d-ts-from-several-typescript-files-entrypoint)

[tsc - doesn't compile alias paths - StackOverflow](https://stackoverflow.com/questions/59179787/tsc-doesnt-compile-alias-paths#comment112917582_59386941)
