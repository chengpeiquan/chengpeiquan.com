---
title: git-commit-analytics
desc: A tool to analyze your git repository's commit log. It can help you generate daily/weekly or longer work reports.
keywords: git log,git commit analytics,git report,git commit report,git log report
date: 2022-01-02 16:00:00
cover: https://cdn.jsdelivr.net/gh/chengpeiquan/assets-storage/img/2022/01/20220103225914.jpg
categories:
  - tech
---

[[toc]]

A tool to analyze your git repository's commit log. It can help you generate daily/weekly or longer work reports.

![git-commit-analytics](https://cdn.jsdelivr.net/gh/chengpeiquan/assets-storage/img/2022/01/20220103021254.gif)

## Download

This is a client tool, so you need to download the program to use it. See: [The Latest Release](https://github.com/analyticsjs/git-commit-analytics/releases/latest) to download.

## Change Log

You can look at the [CHANGELOG](https://github.com/analyticsjs/git-commit-analytics/blob/main/CHANGELOG.md) to understand the content of each update. 

## Usage

Create and fill in your configuration file, and then run the program to get your work report.

## Configuration

You need to create a `config.json` at the same folder with the program, and write the content in the following format.

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

The configuration items are described as follows:

key|type|description
:-:|:-:|:--
lang|string|Set program default language, support `en` (English) and `zh` (Simplified Chinese).
authors|string[]|Filter the author name of commits, support multiple author names, for you may have different names in different repos.
dateRange|[string, string]|Fill in [start date, end date], support the legal time format, and count from the start date `00:00:00` to the end date `23:59:59`.
repos|string[]|The Git repo folder on your computer, need to be switched to the branch you want to count.
format|{ [key: string]: string }|Format your folder name as the project name.
includes|string[]|The commit message prefix to be included in the statistics.
excludes|string[]|In the statistical results, exclude commit messages that contain these keywords.

Among them, `authors` / `includes` / `excludes` will be created as regular expressions to match data.

## Report

The report file will be generated in `markdown` syntax (probably the most common format for developer?) and saved as a file in `.txt` format (probably the most compatible format?).

The project name will be classified as the second-level title, and 7 types of commit prefixes will be classified as the third-level title:

type|description
:-:|:-:
feat|Features
fix|Bug Fixes
docs|Documentation
style|Optimized Style
refactor|Refactored
test|Test Cases
chore|Chores

You can click [Commit message and Change log writing guide](https://www.ruanyifeng.com/blog/2016/01/commit_message_change_log.html) to learn how to standardize the git commit.
