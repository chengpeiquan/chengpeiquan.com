---
title: vite-plugin-banner
desc: A banner plugin for Vite. It can adds a banner to the top of each generated chunk.
keywords: vite-plugin-banner,vite plugin,vite banner,vite comment,vite copyright
date: 2021-02-23 23:10:00
cover: https://cdn.jsdelivr.net/gh/chengpeiquan/assets-storage/img/2021/01/20210224102526.jpg
categories:
  - tech
repo: https://github.com/chengpeiquan/vite-plugin-banner
---

[[toc]]

This is my first Vite plugin. Before I start using Vite, I used rollup for a while, I have used rollup-plugin-banner and rollup-plugin-banner2. But I import them into vite.config.ts and found that them doesn't work. So, I try to learn the plugin development of vite, so there is this work, Its features is similar to webpack bannerPlugin.

It follows Vite's plugin [development specifications](https://vitejs.dev/guide/api-plugin.html), It currently works normally in Vite 2.0, and it can inherit some options of vite.config, e.g. build.outDir.

## Features

Adds a banner to the top of each generated chunk.

## Usage

> ℹ️ **Only support for Vite 2.**

### Install

Install the package from npm (or yarn).

```bash
npm install --save-dev vite-plugin-banner
```

### Basic usage

Add it to `vite.config.ts`

```ts
// vite.config.ts
import Banner from 'vite-plugin-banner'
// Other dependencies...

export default defineConfig({
  plugins: [Banner('This is the Banner content.')],
})
```

When you run `npm run build` on your project, In the `dist` folder(Or the [build.outDir](https://vitejs.dev/config/#build-outdir) in `vite.config.ts` you configured), Except for `vendor` files, all `js` and `css` files will add a banner to the top.

e.g. in `app.b3a7772e.js`:

```js
/* This is the Banner content. */
var e=Object.assign;import{M as t,d as a,u as r,c......
```

### Advanced usage

Of course, the most ideal banner is related to your package information.

First, You need to update your `package.json` like this, For example, it contains such field content:

```json
// package.json
{
  "name": "chengpeiquan.com",
  "version": "0.1.0",
  "description": "My personal website, technology stack based on Vue.js 3.0, and Vite 2.0, use Server Side Generation.",
  "author": "chengpeiquan",
  "homepage": "https://chengpeiquan.com/"
}
```

Then, import the `package.json` into `vite.config.ts`, update the banner like this:

```ts
// vite.config.ts
import pkg from './package.json'
// Other dependencies...

export default defineConfig({
  plugins: [
    Banner(
      `/**\n * name: ${pkg.name}\n * version: v${pkg.version}\n * description: ${pkg.description}\n * author: ${pkg.author}\n * homepage: ${pkg.homepage}\n */`
    ),
  ],
})
```

Run `npm run build`, you can see the banner become more detailed.

e.g. in `app.6936be52.js`:

```js
/**
 * name: chengpeiquan.com
 * version: v0.1.0
 * description: My personal website, technology stack based on Vue.js 3.0, and Vite 2.0, use Server Side Generation.
 * author: chengpeiquan
 * homepage: https://chengpeiquan.com/
 */
var e=Object.assign;import{M as t,d as a,u as r,c......
```

### Fun usage

If you want to make some banners that show your personality, you can make some interesting content from some online generators.

Such as:

- [http://www.network-science.de/ascii/](http://www.network-science.de/ascii/)

- [https://www.bootschool.net/ascii](https://www.bootschool.net/ascii)

```ts
// vite.config.ts
export default defineConfig({
  plugins: [
    Banner(`
    ██   ██         ███████   ██      ██ ████████   ██    ██   ███████   ██     ██
    ░██  ░██        ██░░░░░██ ░██     ░██░██░░░░░   ░░██  ██   ██░░░░░██ ░██    ░██
    ░██  ░██       ██     ░░██░██     ░██░██         ░░████   ██     ░░██░██    ░██
    ░██  ░██      ░██      ░██░░██    ██ ░███████     ░░██   ░██      ░██░██    ░██
    ░██  ░██      ░██      ░██ ░░██  ██  ░██░░░░       ░██   ░██      ░██░██    ░██
    ░██  ░██      ░░██     ██   ░░████   ░██           ░██   ░░██     ██ ░██    ░██
    ░██  ░████████ ░░███████     ░░██    ░████████     ░██    ░░███████  ░░███████ 
    ░░   ░░░░░░░░   ░░░░░░░       ░░     ░░░░░░░░      ░░      ░░░░░░░    ░░░░░░░  
    `),
  ],
})
```

Run `npm run build`, e.g. in `app.d9a287b8.js`:

```js
/*
    ██   ██         ███████   ██      ██ ████████   ██    ██   ███████   ██     ██
    ░██  ░██        ██░░░░░██ ░██     ░██░██░░░░░   ░░██  ██   ██░░░░░██ ░██    ░██
    ░██  ░██       ██     ░░██░██     ░██░██         ░░████   ██     ░░██░██    ░██
    ░██  ░██      ░██      ░██░░██    ██ ░███████     ░░██   ░██      ░██░██    ░██
    ░██  ░██      ░██      ░██ ░░██  ██  ░██░░░░       ░██   ░██      ░██░██    ░██
    ░██  ░██      ░░██     ██   ░░████   ░██           ░██   ░░██     ██ ░██    ░██
    ░██  ░████████ ░░███████     ░░██    ░████████     ░██    ░░███████  ░░███████
    ░░   ░░░░░░░░   ░░░░░░░       ░░     ░░░░░░░░      ░░      ░░░░░░░    ░░░░░░░
     */
var e=Object.assign;import{M as t,d as a,u as r,c......
```

## License

MIT License © 2021 [chengpeiquan](https://github.com/chengpeiquan)
