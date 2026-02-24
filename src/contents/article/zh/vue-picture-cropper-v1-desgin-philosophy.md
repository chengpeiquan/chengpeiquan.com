---
title: Vue Picture Cropper 发布 1.x 版本 讲一讲背后的设计理念
desc: 这个春节假期对 vue-picture-cropper 这个包进行了一次改版，主要想解决一些工程设计上的老问题。虽然是个 Breaking Change ，但对用户来说迁移成本不大，并且有了一些更灵活的用法（例如组合式函数），我自己则在重写源码时积累了一些思考点，在这篇文章里分享一下。
keywords: vue-picture-cropper,Vue Picture Cropper,cropperjs
date: 2026-02-24 17:05:02
cover: https://cdn.chengpeiquan.com/img/2026/02/202602241657195.jpg?x-oss-process=image/interlace,1
categories:
  - tech
repo: https://github.com/chengpeiquan/vue-picture-cropper
remote:
  type: github
  repo: vue-picture-cropper
  path: docs/contents/zh/guide/design.md
  replacements:
    - from: ./hook-api.md
      to: https://cropper.chengpeiquan.com/zh/guide/hook-api
    - from: ./migration.md
      to: https://cropper.chengpeiquan.com/zh/guide/migration
    - from: ../examples/basic-component.md
      to: https://cropper.chengpeiquan.com/zh/examples/basic-component
---

这个春节假期对 [vue-picture-cropper](https://github.com/chengpeiquan/vue-picture-cropper) 这个包进行了一次改版，主要想解决一些工程设计上的老问题，例如 [#49](https://github.com/chengpeiquan/vue-picture-cropper/issues/49) 、 [#45](https://github.com/chengpeiquan/vue-picture-cropper/issues/45) 这些 issue 提到的问题。

虽然是个 Breaking Change ，但对用户来说迁移成本不大，并且有了一些更灵活的用法（例如组合式函数），我自己则在重写源码时积累了一些思考点，在这篇文章里分享一下。


