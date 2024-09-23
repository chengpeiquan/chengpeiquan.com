---
title: Truffle初探和踩坑笔记
desc: 能找到的教程都好老，记录一版踩坑笔记，后面遇到类似的问题可以快速处理。
keywords: truffle,trufflesuite,智能合约,DAPP
date: 2021-10-11 22:32:20
cover: https://cdn.chengpeiquan.com/img/2021/10/20211012094643.jpg?x-oss-process=image/interlace,1
categories:
  - tech
---

一个刚入门的 Truffle DEMO 和学习笔记，能找到的教程都好老，记录一版踩坑笔记，后面遇到类似的问题可以快速处理，啃的 Truffle 的英文文档，国内的翻译文档都太老了，都快速找到的停留在 2019 年之前，实在没法看。

官方文档：[Truffle Document](https://www.trufflesuite.com/docs/truffle/overview)

模板库：[Truffle Boxes](https://www.trufflesuite.com/boxes)

Truffle 的模板库有点类似于 GitHub 仓库的 template 功能，你可以根据你的技术选型，在初始化 Truffle 项目的时候，选择合适的模板创建项目，比如基于 React / Vue / Vyper 等等，再去做调整。

## 了解概念

开始搞事情之前，先了解几个新概念，我估计大部分人应该还是跟我一样，刚接触的时候都是一脸懵逼。

Truffle 是一个开发智能合约的工具，也可以用来做 DAPP ，这两个概念，引用别的地方的说明大概了解一下：

> 智能合约 —— 可以简单理解为脚本，用来处理各种业务逻辑

> DAPP —— 包含完整的智能合约 + 用户UI交互界面，载体可以是 Android APP/ iOS APP/ WEB APP ，只要主要逻辑和数据在区块链上就可以

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

| 依赖环境 |                           下载地址                           |
| :------: | :----------------------------------------------------------: |
|   C++    | [Visual Studio](https://visualstudio.microsoft.com/zh-hans/) |
|  Python  |        [node-gyp](https://github.com/nodejs/node-gyp)        |

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

|      命令       |               作用               |
| :-------------: | :------------------------------: |
| truffle compile |         编译成 JSON 文件         |
|  truffle test   | 运行 JavaScript 和 Solidity 测试 |
| truffle develop |     调试个人区块链（命令行）     |
| truffle console |      调试个人区块链（GUI）       |
| truffle publish |     将包发布到以太坊包注册表     |

完整命令参见：[Commands](https://www.trufflesuite.com/docs/truffle/reference/truffle-commands)

## 使用 GUI 调试

develop 命令默认基于命令行，可以下载 [Ganache](https://github.com/trufflesuite/ganache-ui/releases) 通过 GUI 来调试。

下载和安装后，需要修改项目的 `truffle-config.js` 文件：

```js
module.exports = {
  // ...
  networks: {
    development: {
      host: '127.0.0.1',
      port: 7545,
      network_id: '*',
    },
  },
  // ...
}
```

然后启动 Ganache ，点击 "Quick Start" ，就可以运行个人区块链了。

![Ganache UI](https://cdn.chengpeiquan.com/img/2021/10/20211012095732.jpg?x-oss-process=image/interlace,1)

在命令行运行 `truffle console` 可以进入 GUI 情况下的调试命令状态（等价于命令行情况的 `truffle develop`）。

## 解决单元测试异常

在实际体验中发现，如果你在刚刚的 [使用 GUI 调试](#使用-gui-调试) 环节直接配置了 networks 之后，会发现无法再执行 `truffle test` 了（当然，执行 `truffle develop` 是没问题的，因为它等价于使用 Ganache）…

控制台会出现如下报错：

```bash
λ truffle test
> Something went wrong while attempting to connect to the network at http://127.0.0.1:7545. Check your network configuration.

Could not connect to your Ethereum client with the following parameters:
    - host       > 127.0.0.1
    - port       > 7545
    - network_id > *
Please check that your Ethereum client:
    - is running
    - is accepting RPC connections (i.e., "--rpc" or "--http" option is used in geth)
    - is accessible over the network
    - is properly configured in your Truffle configuration file (truffle-config.js)

Truffle v5.4.14 (core: 5.4.14)
Node v16.1.0
```

然后你把 `truffle-config.js` 里的 `networks` 注释掉，会发现其实又可以了，就很迷……

### 解决方法一

在 GitHub 的 Issue 区查了也有人遇到一样的情况，所以很快有了这个解决方法：

1. 重新启动 Ganache ，点击 "New Workspace" ，进入配置：

![配置 Ganache 的工作区](https://cdn.chengpeiquan.com/img/2021/11/20211108105128.jpg?x-oss-process=image/interlace,1)

2. 点击 “Add Project” ，进入到你的 truffle 项目文件夹，把项目的 `truffle-config.js` 添加到工作区，然后点击右上角的 “Start” 或者 “Restart” 启动运行。

在启动 Ganache 的时候，运行 `truffle test` 就不会出现网络问题了（下次启动 GUI 的时候，选择工作区的配置启动连接，就可以对应的给你的项目开启测试支持了）。

![后续选择工作区来启动](https://cdn.chengpeiquan.com/img/2021/11/20211108142643.jpg?x-oss-process=image/interlace,1)

### 解决方法二

由于方法一要基于 GUI 才能解决这个问题，那如果以后跑在服务器上面，没有 GUI 可以用咋办？观察了一下控制台，在没有配置 `networks` 选项的时候，执行测试命令时，使用的网络是不一样的：

配置 networks 前：

```bash
λ truffle test
Using network 'test'.
```

配置 networks 后：

```bash
λ truffle test
Using network 'development'.
```

为什么会出现这个情况？官方文档也没有说明，得去看一下仓库相关的代码了，看看有没有门路…

按照一般的大型开源项目的习惯，在 GitHub 仓库里找到了 commands 相关的文件，其中 test 命令是位于 [truffle/packages/core/lib/commands/test/index.js](https://github.com/trufflesuite/truffle/blob/develop/packages/core/lib/commands/test/index.js#L141-L215) ，这里可以看到测试命令的运行规则是：

1. 有配置了 `networks.development` 就优先按这个配置启动测试工作

2. 如果没有的话，会创建一个 `networks.test` 的选项，并先通过 `Develop.connectOrStart` 启动连接开发环境再启动测试工作

所以我们另外一个解决方式就是：

1. 先开启 develop 环境

```bash
λ truffle develop
Truffle Develop started at http://127.0.0.1:9545/
```

2. 然后在 develop 环境下运行测试命令（此时不需要再补 truffle 前缀了），就可以正常运行了

```bash
truffle(develop)> test
Using network 'develop'.

Compiling your contracts...
===========================
```

## 项目构建

虽然直接执行 `truffle build` 可以完成一个最基本的构建行为。

## 其他常见问题

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

接上一个问题，移除了 `constructor` 的可见性，又会报缺少可见性的问题（韩红听了都想打人.jpg?x-oss-process=image/interlace,1）：

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
}
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

因为出现的问题只存在于 VS Code ，所以可以确认是语法插件的问题，后面在插件仓库的 Issue [#193](https://github.com/juanfranblanco/vscode-solidity/issues/193) 找到了原因。

不过好像当前无法解决，所以目前只能是人肉忽视，强迫症也没办法…

功能不影响测试和编译，不是大问题。
