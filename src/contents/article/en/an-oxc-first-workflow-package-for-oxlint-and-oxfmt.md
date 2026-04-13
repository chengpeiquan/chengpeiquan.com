---
title: An Oxc-first workflow package for Oxlint and Oxfmt
desc: 'I have been following the Oxc project for quite a while. After seeing it enter the 1.x line some time ago, I had wanted to put together a configuration for it, and over the past few days I finally found time to work on it. At the current stage, however, Oxlint still cannot fully replace ESLint, so for now I simply call this package Integration rather than oxc-config.'
keywords: oxc,oxlint,oxfmt,eslint,bassist
date: 2026-04-14 01:30:00
cover: https://cdn.chengpeiquan.com/img/2026/04/202604071351894.jpg?x-oss-process=image/interlace,1
categories:
  - open-source
repo: https://github.com/chengpeiquan/bassist
remote:
  type: github
  repo: bassist
  path: packages/oxc-integration/README.md
---

I have been following the [Oxc](https://oxc.rs/) project for quite a while. After seeing it enter the 1.x line some time ago, I had wanted to put together a configuration for it, and over the past few days I finally found time to work on it.

At the current stage, however, Oxlint still cannot fully replace ESLint. It has to be Oxlint first and ESLint second. The good part is that the two can work together perfectly, so from a project's perspective you can still solve code quality issues through a single linting workflow. Oxfmt, on the other hand, can fully replace Prettier's native rules, although some plugins still require trade-offs. For example, I have to temporarily give up Pangu spacing formatting for Markdown.

Because both linting setups need to work together, I have not formally named this package `oxc-config` yet. For now, I simply call it `Integration`, an integration solution or, more precisely, a workflow.

This is an open source project I published on GitHub. If it helps you, please [give bassist a Star](https://github.com/chengpeiquan/bassist).
