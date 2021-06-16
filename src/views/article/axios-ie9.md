---
title: 解决axios的responseType为"json"时IE9报undefined的兼容办法
desc: 虽然axios说可以兼容IE9，但实际上在项目开发过程中，IE9报错，而且目前的情况是responseType为"json"时才会报这个异常，相关请求代码大致如下
keywords: axios undefined,axios ie9,axios response undefined
date: 2018-10-20 23:16:00
cover: https://cdn.jsdelivr.net/gh/chengpeiquan/assets-storage/img/2018/10/1-8.jpg
categories:
  - tech
---

虽然 axios 说可以兼容 IE9，但实际上在项目开发过程中，IE9 报错，而且目前的情况是 responseType 为"json"时才会报这个异常。

## 定位问题：

因为 IE9 下，指定 json 格式的请求，response 只返回 responseText，而其他浏览器都可以正常返回 data

![](https://cdn.jsdelivr.net/gh/chengpeiquan/assets-storage/img/2018/10/1-5.jpg)

相关请求代码大致如下：

```javascript
// main.js
import axios from 'axios'
Vue.prototype.$ajax = axios

// xxx.vue组件内请求接口
this.$ajax({
  // …
  responseType: 'json',
})
  .then((response) => {
    // 虽然请求成功，但并不会进入这里
  })
  .catch((error) => {
    // 而是直接报错
  })
```

## 解决方案：

解决方案也很简单，判断接口返回的数据是否正常，如果请求 json 格式返回的 data 为空，则将响应数据指向 responseText。

经过搜索发现将以下代码添加至 main.js 即可解决该异常，很好用！感恩 Github，附上 issue 原文链接。

> https://github.com/axios/axios/issues/265#issuecomment-333014355

```javascript
// 处理axios在IE下的坑爹问题
axios.interceptors.response.use((response) => {
  // IE 8-9
  if (
    response.data == null &&
    response.config.responseType === 'json' &&
    response.request.responseText != null
  ) {
    try {
      // eslint-disable-next-line no-param-reassign
      response.data = JSON.parse(response.request.responseText)
    } catch (e) {
      // ignored
    }
  }
  return response
})
```
