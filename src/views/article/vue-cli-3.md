---
title: Vue-CLI脚手架3.0升级小结（含Win版Node升级与PowerShell踩坑记录）
desc: Vue脚手架3.0出来也蛮久了，秉着前人先踩坑的习惯，最近才开始升级。整个过程还是蛮顺利的，不过也有一些小小的问题，简单记录起来。
keywords: vue cli 3.0 升级,vue cli 升级报错
date: 2018-11-21 19:50:00
cover: https://cdn.jsdelivr.net/gh/chengpeiquan/assets-storage/img/2018/11/1-2.jpg
categories:
  - tech
---

[[toc]]

Vue 脚手架 3.0 出来也蛮久了，秉着前人先踩坑的习惯，最近才开始升级。整个过程还是蛮顺利的，不过也有一些小小的问题，简单记录起来。

系统版本：Windows 7 64 位（公司限制无法使用管理员权限）

命令程序：PowerShell（公司限制无法使用 CMD）

> 官方文档 https://cli.vuejs.org/zh/guide/

## 关于 Node.js 版本升级

Vue-cli 3.0 需要 8.9 或者更高的 node，官方推荐 8.11+，我 check 了一下本机的 node 版本，有点老，才 7.0，于是需要先解决版本升级的问题。

先从官网下载 node 安装包，由于公司是 Windows 的机器，而且不开放管理员权限，无法直接通过 msi 文件安装，于是选择了下载 zip 免安装包，下载后直接解压，覆盖原来的 node 目录的文件即可升级。

然而一开始选择的最新版 node 目前使用有问题，安装 npm 包的时候一直报错 asyncWrite is not a function，半天定位不到原因，后来在 stackoverflow 上看到这个问题，通过降级到 8.11.2 来解决（所以最新版还是不知道什么原因和怎么解决 emmm）。

> https://stackoverflow.com/questions/50597159/npm-err-asyncwrite-is-not-a-function

![](https://cdn.jsdelivr.net/gh/chengpeiquan/assets-storage/img/2018/11/1.jpg)

附上 Node 的相关下载地址。

> 官网下载 https://nodejs.org/zh-cn/download/<br>历史版本 https://nodejs.org/zh-cn/download/releases/<br>我选的版本 https://nodejs.org/download/release/v8.11.2/node-v8.11.2-win-x64.zip

## 关于 Node 的环境变量

直接通过安装包安装的 node 现在都不需要配置这个了，会自动设置好，但如果跟我一样，没有管理员权限，通过 zip 解压的话，第一次使用 node 需要关联上这个 path。

方法也比较简单，就直接截图示范了，path 的内容就是你的 node 的路径。

![](https://cdn.jsdelivr.net/gh/chengpeiquan/assets-storage/img/2018/11/2.jpg)

## 安装 Vue-CLI 3.0

本来以为要踩坑也得等到使用的时候才会踩，安装怎么说也得很顺利吧，然而现实就是比较残酷，安装的时候就踩了个大坑。

根据官方文档说明，卸载了旧版脚手架之后，使用 `npm install -g @vue/cli` 就可以直接安装，但是频繁报错，说存在无法识别的标记，如下图：

![](https://cdn.jsdelivr.net/gh/chengpeiquan/assets-storage/img/2018/11/3.jpg)

并且这个问题，百度和谷歌都找不到原因，根本没有人提问，我能怎么办，我很绝望啊！

幸亏天无绝人之路，有位同事对 PowerShell 比较熟，一眼就帮我看出问题所在，是@引起的，在 CMD 是可以直接这么安装，但是在 PS，@是个特殊字符，需要进行转义，需要在@前面加上\`，再次尝试 ，转义后立即可以安装了，感动到哭。

![](https://cdn.jsdelivr.net/gh/chengpeiquan/assets-storage/img/2018/11/4.jpg)

## 修改 Vue 项目配置

3.0 的目录结构比 2.0 精简了好多，具体的这里不细说了，官方文档也说的很清晰，这里附上我在用的 vue.config.js 文件给大家参考。

配置文档说明 https://cli.vuejs.org/zh/config/

```javascript
const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  publicPath: './',
  assetsDir: 'static',
  productionSourceMap: false,
  lintOnSave: false,
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('@img', resolve('src/assets/img'))
      .set('@styl', resolve('src/assets/styl'))
      .set('@js', resolve('src/assets/js'))
      .set('@cp', resolve('src/components'))
      .end()
    config.module
      .rule('images')
      .test(/\.(png|jpe?g|gif|webp|svg)(\?.*)?$/)
      .use('url-loader')
      .loader('url-loader')
      .options({
        limit: 10000,
        fallback: {
          loader: 'file-loader',
          options: {
            name: 'static/img/[name].[hash:8].[ext]',
          },
        },
      })
      .end()
  },
}
```
