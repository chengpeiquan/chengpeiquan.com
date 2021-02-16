---
title: 基于Vue-CLI 3.0的骨架屏实现方案
desc: 大型Project的首次载入速度一般会比较慢，虽然Vue可以配置路由懒加载，但有时候打包出来的chunk还是会比较大，这个时候可以结合骨架屏来提高用户等待加载时的体验。
keywords: Vue骨架屏,Vue3.0骨架屏,Vue Skeleton
date: 2019-03-01 16:14:00
cover: https://cdn.jsdelivr.net/gh/chengpeiquan/assets-storage/img/2019/03/1.jpg
---

大型Project的首次载入速度一般会比较慢，虽然Vue可以配置路由懒加载，但有时候打包出来的chunk还是会比较大，这个时候可以结合骨架屏来提高用户等待加载时的体验。

![](https://cdn.jsdelivr.net/gh/chengpeiquan/assets-storage/img/2019/03/2.jpg)

## 安装依赖

3.0的骨架屏和2.0不太一样，简化了不少操作，可直接依赖一个插件vue-skeleton-webpack-plugin来处理，我们需要先安装它。

>官方文档 https://github.com/lavas-project/vue-skeleton-webpack-plugin

## 配置config

脚手架3.0的好处就是所有配置都集中到vue.config.js处理，非常方便，核心的config代码贴一下，完整代码最后会附上。

```javascript
//引入插件
const SkeletonWebpackPlugin = require('vue-skeleton-webpack-plugin');

module.exports = {
	//其他的基础配置
	//下面开始配置插件相关的东西，可参考官方文档
	configureWebpack: (config)=>{
		config.plugins.push(new SkeletonWebpackPlugin({
			webpackConfig: {
				entry: {
					app: path.join(__dirname, './src/Skeleton.js'),
				},
			},
			minimize: true,
			quiet: true,
		}))
	},
	//这个是让骨架屏的css分离，直接作为内联style处理到html里，提高载入速度
	css: {
		extract: true,
		sourceMap: false,
		modules: false
	}
}
```

## 创建骨架屏文件

需要2个核心文件，1个是骨架屏模板Skeleton.vue，一个是动态引入到项目的Skeleton.js

Skeleton.vue：模板在这里就不贴代码了，常规的template和style根据首屏的布局，写一个简化版的纯色模板即可，可在最后下载demo参考。

Skeleton.js：参考main.js，但是需要通过export default单独暴露给Vue。

```javascript
// - Skeleton.js
import Vue from 'vue';
import Skeleton from './Skeleton.vue';

export default new Vue({
	components: { Skeleton },
	render: h => h(Skeleton),
});
```

以上文件保存到src目录下，和App.vue同级。

## 预览效果

以上，就完成了骨架屏的配置，预览效果可以通过chrome模拟器，调节到low-end mobile模式，降速查看骨架屏的渲染是否ok～

## Demo下载

相关的demo我发布到github了，可以下载看一下～node_modules没有一起放上来，下载后自己先npm install。

>https://github.com/chengpeiquan/vue-skeleton