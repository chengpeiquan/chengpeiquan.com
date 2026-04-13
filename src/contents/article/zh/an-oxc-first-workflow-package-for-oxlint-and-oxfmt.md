---
title: 适用于 Oxlint 与 Oxfmt 的 Oxc 优先工作流
desc: '很早之前就对 Oxc 这个项目一直保持关注，看到前段时间开始进入 1.x 版本，一直想弄一套配置，这几天终于有时间搞一下。不过目前阶段 OXLint 还是无法完整替代 ESLint ，只能是以 OXLint 为主， ESLint 为辅，所以我搞了一个配置包还没有正式定名为 oxc-config ，暂时只称之为 integration ，一个集成方案。'
keywords: oxc,oxlint,oxfmt,eslint,bassist
date: 2026-04-14 01:30:00
cover: https://cdn.chengpeiquan.com/img/2026/04/202604071351894.jpg?x-oss-process=image/interlace,1
categories:
  - open-source
repo: https://github.com/chengpeiquan/bassist
remote:
  type: github
  repo: bassist
  path: packages/oxc-integration/README.zh-CN.md
---

很早之前就对 [Oxc](https://oxc.rs/) 这个项目一直保持关注，看到前段时间开始进入 1.x 版本，一直想弄一套配置，这几天终于有时间搞一下。

不过目前阶段 OXLint 还是无法完整替代 ESLint ，只能是以 OXLint 为主， ESLint 为辅，但是两者可以完美结合，对项目来说，仍然可以以一套 Lint 方案去解决代码问题， OXFmt 倒是可以完美代替 Prettier 原生规则，只是部分插件仍然需要取舍，例如 Markdown 的盘古之白格式化，我只能暂时舍弃。

由于需要两套 Lint 同时工作，所以这个配置包还没有正式定名为 oxc-config ，暂时只称之为 Integration ，一个集成方案或者说是一套工作流。

这是我在 GitHub 上发布的一个开源项目。如果它对你有帮助，欢迎前往 [bassist](https://github.com/chengpeiquan/bassist) 点一个 Star。
