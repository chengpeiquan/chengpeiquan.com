---
title: 基于Vue-CLI 3.0配置webpack的跨域限制代理功能devServer.proxy
desc: 接口跨域一直是个头疼的问题，之前的业务页面都基于一套限制比较少的接口在交互，所以大部分还是写完静态页面然后替换数据部分，直接打包到测试环境即可，所以一直不太在意本地调试的问题。
keywords: vue跨域,webpack跨域
date: 2019-03-08 11:10:00
cover: https://cdn.jsdelivr.net/gh/chengpeiquan/assets-storage/img/2019/03/1-1.jpg
categories:
  - tech
---

接口跨域一直是个头疼的问题，之前的业务页面都基于一套限制比较少的接口在交互，依赖 chrome 的 Host Switch Plus 和 Allow-Control-Allow-Origin: \*就能简单解决本地调试的问题，所以大部分情况下还是写完静态页面然后替换数据部分，直接打包到测试环境即可，所以一直也不觉得麻烦。

不过最近业务变动比较大，一些新的业务接口也开始接了进来，并且新接口对域名白名单也做了很多限制，导致原来的方法以及 ip 测试服无法使用，所以新问题就来了，我必须找一个能代替测试服的测试方式解决我在开发过程中遇到的调试问题（毕竟我总不能每次改动都打包发布到正式环境吧！）。

第一个想法就是 node 这么牛逼，应该可以直接做代理吧，所以查了一下，发现是 webpack 就具备的功能，既然是 webpack 有的东西，那 3.0 的脚手架应该也可以轻松配置，于是翻了一下官方文档关于 config 的那一 part，还真的有，嘿嘿！

> 先附上 vue 的官方文档   https://cli.vuejs.org/zh/config/#devserver-proxy

当然，所有配置都是基于 webpack，更多的要看 webpack 的官方文档。

> webpack 的官方文档   https://webpack.docschina.org/configuration/dev-server/

下面是我在工作环境中，采取的几种处理方式的小笔记。

## 注意事项

1、以下的所有方式，调试的时候都是 npm run serve 启动本机测试服，打包的时候都是 npm run build 跟平时一样打包。

![](https://cdn.jsdelivr.net/gh/chengpeiquan/assets-storage/img/2019/03/2-1.jpg)

2、配置的 proxy 指向，在项目文件里的请求必须都是相对地址，不能是以 http/https 开头的绝对地址，只有相对地址才会发起代理请求。

### 接口和项目处于同域名

这种情况就是我原来接触最多的接口，之前能直接丢到测试服也是因为测试服也有一套跟正式环境一样的测试接口，所以项目里引入接口都是写 / 开头的，从根目录开始的相对地址。

比如：

项目地址是 chengpeiquan.com/web-app/project-name/

接口地址是 chengpeiquan.com/api/index.php?module=newslist

**配置方式参考如下：**

```javascript
// vue.config.js
// 配置所有无法请求成功的url都指向预设的代理网站
module.exports = {
  // ……
  devServer: {
    proxy: 'https://chengpeiquan.com',
  },
  // ……
}

// xxx.vue文件里，以axios请求为例
// url必须是从根目录开始的相对地址，这样在localhost找不到这个接口的情况下，代理就会去预设的chengpeiquan.com请求真正的接口地址
// 这样打包到正式环境也是可以正常获取根目录下的接口请求
this.$ajax({
  method: 'post',
  url: '/api/index.php?module=newslist',
  data: {
    // ……
  },
  responseType: 'json',
})
  .then((response) => {
    // ……
  })
  .catch((error) => {
    // ……
  })
```

### 二、接口和项目不在同域名

这种情况就是我现在新的业务场景。

比如：

项目地址是 chengpeiquan.com/web-app/project-name/

接口地址是 2dang.com/api/index.php?module=newslist

由于接口已经不是项目所在的域名，所以线上是不能用相对地址配置接口 url，但是调试的时候又必须是相对地址，所以针对这种情况，封装了一个接口域名函数来判断当前的环境，决定是以绝对地址请求还是相对地址请求。

**配置方式参考如下：**

```javascript
// vue.config.js
// 配置以/api开头的url都指向预设的代理网站
module.exports = {
  // ……
  devServer: {
    proxy: {
      '/api': {
        target: 'https://2dang.com',
        ws: true,
        changOrigin: true,
      },
    },
  },
  // ……
}

// main.js
// 设置接口的默认域名，判断当前环境，生产环境需要返回接口的域名进行拼接，不然上线后请求的路径会错误
export const apiDomain = (domain) => {
  process.env.NODE_ENV === 'production'
    ? (domain = 'https://2dang.com')
    : (domain = '')
  return domain
}
Vue.prototype.$apiDomain = apiDomain

// xxx.vue文件里，以axios请求为例
// url必须是从根目录开始的相对地址，这样在localhost找不到这个接口的情况下，代理就会去预设的2dang.com请求真正的接口地址
// 而拼接了this.$apiDomain()之后，打包到正式环境会拼接好接口的域名，这样就不影响线上的访问了
// 这样打包到正式环境也是可以正常获取根目录下的接口请求
this.$ajax({
  method: 'post',
  url: this.$apiDomain() + '/api/index.php?module=newslist',
  data: {
    // ……
  },
  responseType: 'json',
})
  .then((response) => {
    // ……
  })
  .catch((error) => {
    // ……
  })
```

上面 2 个是最简单的例子，主要是记录起来备忘，更多配置可以看 webpack 的官方文档。
