---
title: Truffle初探和踩坑笔记
desc: 能找到的教程都好老，记录一版踩坑笔记，后面遇到类似的问题可以快速处理。
keywords: truffle,trufflesuite,智能合约,DAPP
date: 2021-10-11 22:32:20
cover: https://cdn.jsdelivr.net/gh/chengpeiquan/assets-storage/img/2021/10/20211012094643.jpg
categories:
  - tech
---

[[toc]]

一个刚入门的 Truffle DEMO 和学习笔记，能找到的教程都好老，记录一版踩坑笔记，后面遇到类似的问题可以快速处理，啃的 Truffle 的英文文档，国内的翻译文档都太老了，都快速找到的停留在 2019 年之前，实在没法看。

官方文档：[Truffle Document](https://www.trufflesuite.com/docs/truffle/overview)

模板库：[Truffle Boxes](https://www.trufflesuite.com/boxes)

Truffle 的模板库有点类似于 GitHub 仓库的 template 功能，你可以根据你的技术选型，在初始化 Truffle 项目的时候，选择合适的模板创建项目，比如基于 React / Vue / Vyper 等等，再去做调整。

## 了解概念

开始搞事情之前，先了解几个新概念，我估计大部分人应该还是跟我一样，刚接触的时候都是一脸懵逼。

Truffle 是一个开发智能合约的工具，也可以用来做 DAPP ，这两个概念，引用别的地方的说明大概了解一下：

>智能合约 —— 可以简单理解为脚本，用来处理各种业务逻辑

>DAPP —— 包含完整的智能合约 + 用户UI交互界面，载体可以是 Android APP/ iOS APP/ WEB APP ，只要主要逻辑和数据在区块链上就可以

至于怎么把数据和界面连接起来，后面了解了再补充，先记录一下前期的一些学习体验问题。

目前最知名的区块链游戏体验：[Axie Infinity](https://dappradar.com/ethereum/games/axie-infinity)

## 安装问题

需要全局安装，但理论上第一次安装会得到好几屏幕的报错信息…

```bash
# 全局安装 Truffle
yarn global add truffle
```

因为在 Node 基础上还需要 Python 和 C++ 编译器…

不过其实我之前都有装过，看了报错都是 gyp 相关的，更新了 gyp 就可以了。

依赖环境|下载地址
:-:|:-:
C++|[Visual Studio](https://visualstudio.microsoft.com/zh-hans/)
Python|[node-gyp](https://github.com/nodejs/node-gyp)

然后再次全局安装 Truffle 就可以了，如果可以正确查询到版本号，说明安装成功了。

```bash
# 查询当前的 Truffle 版本
truffle -v
```

## VS Code 配置

点击安装 [solidity](https://marketplace.visualstudio.com/items?itemName=JuanBlanco.solidity) 语言高亮和语法补全功能支持。

## 项目初始化

直接执行初始化命令 `truffle init` 只得到了一个空项目，前期建议先按照官方文档 [Quick Start](https://www.trufflesuite.com/docs/truffle/quickstart) 里面的建议，先用官方推荐的 [MetaCoin](https://www.trufflesuite.com/boxes/metacoin) 项目模板来学习：

```bash
# 创建并进入 DEMO 项目文件夹
mkdir truffle-demo && cd truffle-demo

# 通过模板创建一个 Truffle 项目
truffle unbox metacoin
```

初始化后的项目结构：

```bash
truffle-demo
│
│ # Solidity 合约目录
├─contracts
│
│ # 部署脚本目录
├─migrations
│
│ # 测试脚本目录
├─test
│
│ # Truffle 配置文件
└─truffle-config.js
```

## 配置文件

和其他前端项目一样，都有一个统一的项目配置文件 `truffle-config.js` ，这个看文档按需要的配就可以了。

[选项文档](https://www.trufflesuite.com/docs/truffle/reference/configuration)

## 常用命令

命令|作用
:-:|:-:
truffle compile|编译成 JSON 文件
truffle test|运行 JavaScript 和 Solidity 测试
truffle develop|调试个人区块链（命令行）
truffle console|调试个人区块链（GUI）
truffle publish|将包发布到以太坊包注册表

完整命令参见：[Commands](https://www.trufflesuite.com/docs/truffle/reference/truffle-commands)

## 使用 GUI 调试

develop 命令默认基于命令行，可以下载 [Ganache](https://github.com/trufflesuite/ganache-ui/releases) 通过 GUI 来调试。

下载和安装后，需要修改项目的 `truffle-config.js` 文件：

```js
module.exports = {
  // ...
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*",
    },
  },
  // ...
};
```

然后启动 Ganache ，点击 "Quick Start" ，就可以运行个人区块链了。

![Ganache UI](https://cdn.jsdelivr.net/gh/chengpeiquan/assets-storage/img/2021/10/20211012095732.jpg)

在命令行运行 `truffle console` 可以进入 GUI 情况下的调试命令状态（等价于命令行情况的 `truffle develop`）。

## 常见问题

一些刚上手可能遇到的问题和解决方案。

由于官方 DEMO 的上次实际更新是 1 年前（最新更新只是无关痛痒的注释修改），所以为了可持续发展，Solidity 的语言版本始终选择较新的 0.8+ ，而不是默认的 0.5+ ，默认版本可落后太多了。

### 版本号报错

初始化后，打开 `.sol` 文件时， VS Code 会报下面这样的问题：

```bash
Source file requires different compiler version (current compiler is 0.8.6+commit.11564f7e.Emscripten.clang) - note that nightly builds are considered to be strictly less than the released version
```

因为模板项目的版本可能比较老，跟不上当前的编译器版本，所以根据提示的版本号，手动更新到对应版本就可以了，也可以在 [Solidity](https://github.com/ethereum/solidity/releases) 的 GitHub 仓库查看最新版本号。

```diff
- pragma solidity >=0.4.25 <0.7.0;
+ pragma solidity >=0.4.25 <=0.8.6;
```

或者是下面这种（个人比较推荐）：

```diff
- pragma solidity >=0.4.25 <0.7.0;
+ pragma solidity ^0.8.6;
```

这个是 Solidity 语言的强制要求，为了避免智能合约在编译过程中出现兼容问题，在 soliditylang 的官方文档有说明 [version-pragma](https://docs.soliditylang.org/en/develop/layout-of-source-files.html#version-pragma)

具体的版本管理方式，比如 `>=` 也可以用 `^` 符号代替版本兼容范围，和 Node 的 `package.json` 的版本管理是一样的。

### 构造函数的可见性被忽略

这个报错是在上面那个版本号报错问题，解决了之后出现的：

```bash
Visibility for constructor is ignored. If you want the contract to be non-deployable, making it "abstract" is sufficient.
```

这个是 Solidity 语言在 v0.7.0 的更新（[CHANGLOG](https://docs.soliditylang.org/en/v0.7.0/070-breaking-changes.html#functions-and-events)）

由于模板原本是 `<0.7.0` ，使用的是低于 0.7 版本，所以没有出现这个报错，我们改成了 `^0.8.6` ，所以出现了这个问题。

只需要移除掉 `constructor` 的可见性就可以了：

```diff
contract Migrations {
  // ...

-  constructor() public {
+  constructor() {
    // ...
  }

  // ...
}
```

### 缺少构造函数可见性

接上一个问题，移除了 `constructor` 的可见性，又会报缺少可见性的问题（韩红听了都想打人.jpg）：

```bash
SyntaxError: No visibility specified. Did you intend to add "public"?
```

这是因为编译器使用的默认版本比较低（0.5.16），而我们用的是 0.8+ 了，版本之间不兼容，所以导致编译出错。

可以在 `truffle-config` 里统一修改，指定编译版本范围和我们的文件里保持一致。

```js
module.exports = {
  compilers: {
    solc: {
      version: '^0.8.6',
    },
  },
};
```

### 导入依赖报错

比如在测试文件里，会导入 Truffle 自身的依赖：

```solidity
import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
```

此时执行测试命令是成功的，但是在 VS Code 会报诸如下面的错误：

```bash
Source "truffle/Assert.sol" not found: File import callback not supported
```

因为出现的问题只存在于 VS Code ，所以可以确认是语法插件的问题，后面在插件仓库的 Issue  [#193](https://github.com/juanfranblanco/vscode-solidity/issues/193) 找到了原因。

不过好像当前无法解决，所以目前只能是人肉忽视，强迫症也没办法…

功能不影响测试和编译，不是大问题。
