---
title: git-commit-analytics 分析Git Commit记录生成工作日报
desc: 一个可以分析你的 Git 仓库 commit 记录的工具。它可以帮你生成一份工作日报 / 周报，或者你需要的更长时间范围的工作报告。
keywords: git log,git commit analytics,git report,git commit report,git log report
date: 2022-01-02 16:00:00
cover: https://cdn.jsdelivr.net/gh/chengpeiquan/assets-storage/img/2022/01/20220103234230.jpg
categories:
  - tech
---

[[toc]]

一个可以分析你的 Git 仓库 commit 记录的工具。它可以帮你生成一份工作日报 / 周报，或者你需要的更长时间范围的工作报告。

![git-commit-analytics](https://cdn.jsdelivr.net/gh/chengpeiquan/assets-storage/img/2022/01/20220103021254.gif)

## 客户端下载

这是一个客户端工具，所以你需要下载程序去使用它，点击 [最新版本](https://github.com/analyticsjs/git-commit-analytics/releases/latest) 去下载客户端。

## 更新记录

你可以查看 [更新记录](https://github.com/analyticsjs/git-commit-analytics/blob/main/CHANGELOG.md) 去了解每个版本的更新内容。

## 使用说明

创建并填写你的配置文件，然后运行程序，即可获得你的工作报告。

## 配置文件

你需要在与程序相同的文件夹下，创建一个名为 `config.json` 的文件，并写入以下格式的内容。

```json
{
  "lang": "en",
  "authors": [
    "chengpeiquan"
  ],
  "dateRange": [
    "2021-12-01",
    "2022-01-31"
  ],
  "repos": [
    "D:\\Git\\git-commit-analytics"
  ],
  "format": {
    "git-commit-analytics": "Git Commit Analytics"
  },
  "includes": [
    "feat",
    "fix",
    "docs",
    "style",
    "refactor",
    "test",
    "chore"
  ],
  "excludes": [
    "typo",
    "backup",
    "progress"
  ]
}
```

配置项说明如下：

key|type|description
:-:|:-:|:--
lang|string|设置软件的默认语言，支持 `en` （英语）和 `zh` （简体中文）。
authors|string[]|筛选 commit 的作者名称，支持多个作者名称，用于你在不同的仓库可能有不同的名字。
dateRange|[string, string]|填写 [开始日期， 结束日期] ， 支持合法的时间格式，会从开始日期的 `00:00:00` 统计到截止日期的 `23:59:59` 。
repos|string[]|你电脑里的 Git 仓库文件夹，需要提前切换到你要统计的分支。
format|{ [key: string]: string }|格式化你的文件夹名称为项目名。
includes|string[]|要纳入统计的 commit message 前缀。
excludes|string[]|在统计出来的结果里，排除掉包含了这些关键词的 commit message 。

Among them, `authors` / `includes` / `excludes` will be created as regular expressions to match data.

其中，`authors` / `includes` / `excludes` 会创建为正则表达式去匹配数据。

## 工作报告

The report file will be generated in `markdown` syntax (probably the most common format for developer?) and saved as a file in `.txt` format (probably the most compatible format?).

报告文件会以 `markdown` 语法生成（可能是对程序员最通用的格式？），并以 `.txt` 格式的文件保存（可能是兼容性最好的格式？）。

The project name will be classified as the second-level title, and 7 types of commit prefixes will be classified as the third-level title:

会以项目名称作为二级标题归类，以 7 个类型的 commit 前缀作为三级标题归类：

type|description
:-:|:-:
feat|功能开发
fix|BUG修复
docs|完善文档
style|优化样式
refactor|代码重构
test|测试用例
chore|其他优化

你可以点击 [Commit message 和 Change log 编写指南](https://www.ruanyifeng.com/blog/2016/01/commit_message_change_log.html) 学习如何规范化提交 Git Commit 。
