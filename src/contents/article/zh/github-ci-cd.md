---
title: 2022 年的第一天，把开源工作交给了 CI / CD（待完善）
desc: 新年的第一天，我把 GitHub 的全自动流水线搭起来了。
keywords: github ci cd,github workflows
date: 2022-01-01 23:49:00
cover: https://cdn.chengpeiquan.com/img/2022/01/20220103233657.jpg?x-oss-process=image/interlace,1
categories:
  - tech
---

接触 CI / CD 不是一天两天了，从最开始的在 GitHub Actions 到公司的 Jenkins ，2021 年也用的不少，确实感受到了自动化带来的很多便利，最基础的打包构建环节也已经全部交给了 CI 来处理。

不过很长时间也就停留在打包构建环节，没了… 原因也比较简单，就是公司的前端业务主要还是页面为主，确实用不到太多 CI 环节的东西。

其实自己留意开源项目也蛮长时间，发现很多东西可以做，比如说代码质量检查、自动发布版本、自动生成 CHANGLOG 等等，元旦假期刚好好友小毅 [@chawyehsu](https://github.com/chawyehsu) 也准备搞一下这块，俩人刚好一起琢磨了一下，把各自的流程都跑起来了。

目前我是做了这两条流水线：

## 主流水线

```bash
在 develop 分支开发
---→ Push 后自动发起 PR
---→ Merge 到 main 分支后自动打包
---→ 自动生成 CHANGELOG
---→ 自动打 Tag 发布 Release
```

## 分支流水线

根据当前仓库的类型，后续的流程会有点不一样：

### Package

前端的包理所当然是要发布到 NPM 了，所以接下来会执行自动发包操作。

> TODO: 这里后面补充一下具体打 workflow 配置，暂时需要观察效果稳定性

### Program

除了 NPM 包，还有一类项目是会打包成 `.exe` 或者 `.dmg` 程序，一般是 Electron 或者 PKG Node 项目。

这里要执行的操作是把构建出来的文件，发布静态资产到 Release 上面去提供下载。

可以戳 [Releases - Git Commit Analytics](https://github.com/analyticsjs/git-commit-analytics/releases) 查看效果。

![在 Release 可下载构建好的程序](https://cdn.chengpeiquan.com/img/2022/01/20220104161947.jpg?x-oss-process=image/interlace,1)

> TODO: 这里后面补充一下具体打 workflow 配置，暂时需要观察效果稳定性
