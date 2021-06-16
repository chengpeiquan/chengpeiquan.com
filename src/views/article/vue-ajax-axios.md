---
title: Vue使用ajax 关于axios遇到乱码等问题的那些坑
desc: 这个情况当时是很懵逼的，因为在PC端，以及使用Chrome的移动端模拟器测试都一切正常，但到了真机上提交数据时，只要包含了中文，post到服务端的结果永远是【銆愭姤鍚嶇粍鍒】，这个至今还是不知道到底是什么鬼。
keywords: vue ajax,vue axios,axios乱码,axios get,axios post,axios,qs,axios qs
date: 2018-09-06 01:46:00
cover: https://cdn.jsdelivr.net/gh/chengpeiquan/assets-storage/img/2018/09/1-1.jpg
categories:
  - tech
---

从 jQuery 刚转到 Vue 的时候，对 ajax 的替代方案是选择了 npm 上的 axios，理由也比较简单，两者的 api 相似，调用方式也很接近，过渡可以说是无缝吧，不过在做第一个项目的时候还是踩了个坑，特此记录下来。

先说一下遇到的那些坑：

## 移动端真机 post 乱码

这个情况当时是很懵逼的，因为在 PC 端，以及使用 Chrome 的移动端模拟器测试都一切正常，但到了真机上提交数据时，只要包含了中文，post 到服务端的结果永远是【銆愭姤鍚嶇粍鍒 】，至今还是不知道这个到底是什么鬼。

当时搜索了很多 issue，都是建议在 Content-Type 添加 charset 为 utf-8，但实测没什么用，最后还是老老实实回顾了一下英文的官方文档，发现这么一句话：

> Alternatively, you can encode data using the qs library:

qs library？赶紧去查了一下 qs 之后，恍然大悟，于是引入了 qs，完美解决（这一点和当初 jQuery 就不一样，之前压根就没遇到这种情况 emm）。

最后回顾一下 axios 的使用方法：

> axios 官方文档 https://www.npmjs.com/package/axios<br>
> qs 官方文档  https://www.npmjs.com/package/qs

```javascript
//安装axios和qs
npm i axios
npm i qs

//打开main.js，在全局引入
//注意这里axios和qs都不能用use，因为不属于Vue的插件，不带安装接口，得用prototype原型引入
//引入后，就可以在任意组件里使用this.$ajax去调用axios了，qs也是this.$qs
import axios from 'axios'
import qs from 'qs'

Vue.prototype.$ajax = axios
Vue.prototype.$qs = qs

//注意回调那里我是用了箭头函数提升了this，否则需要提前先设定一个变量把this存储起来

//get请求，注意是使用params
this.$ajax({
	method: "get",
	url: "接口的地址",
	params: {
		param1: "接口参数…",
		param2: "接口参数…",
		param3: "接口参数…"
		// ……
		// 更多的参数，一般都是page页码，tpp每页数量等
	},
	responseType: "json"
}).then((response)=>{
	// 请求成功后执行的操作
	// ...
}).catch((error)=>{
	// 请求失败，一般都是返回对应的提示给用户
	// ...
});

//post请求，注意是使用data和qs
this.$ajax({
	method: "post",
	url: "接口的地址",
	data: this.$qs.stringify({
		param1: "接口参数…",
		param2: "接口参数…",
		param3: "接口参数…"
		// ……
		// 更多的参数，一般都是用户填写的数据、用户身份校验信息等
	}),
	responseType: "json"
}).then((response)=>{
	// 请求成功执行的操作
	// ...
}).catch((error)=>{
	// 请求失败，一般都是返回对应的提示给用户
	// ...
});
```

目前主要就是上面这些，其他的扩展需求，等以后根据项目实际需要再陆续继续补充记录。
