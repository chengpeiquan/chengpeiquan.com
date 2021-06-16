---
title: 把node脚本打包成exe文件 在无node环境的机器上运行
desc: 有时候做的一些活动页面，会涉及到数据存储，虽然有一套公共业务接口，具备对应的数据导出，但是活动这种东西，一向没有那么中规中矩，总会有那么几次无法用公共接口来满足，遇到一些需要定制的情况，在赶工期的时候就只能是先满足数据录入需要部分，保证顺利上线，至于数据的导出，那往往是不在考虑范围的。
keywords: node打包exe,js打包exe,pkg如何使用
date: 2019-10-02 10:48:00
cover: https://cdn.jsdelivr.net/gh/chengpeiquan/assets-storage/img/2019/10/1.jpg
categories:
  - tech
---

有时候做的一些活动页面，会涉及到数据存储，虽然有一套公共业务接口，具备对应的数据导出，但是活动这种东西，一向没有那么中规中矩，总会有那么几次无法用公共接口来满足，遇到一些需要定制的情况，在赶工期的时候就只能是先满足数据录入需要部分，保证顺利上线，至于数据的导出，那往往是不在考虑范围的。

那么要导出的话怎么办，通常来说就是服务端的同学从服务器上把 log 文件拖下来，交给运营同学自己分析。如果是独立的 log 还好，一份 log 就是一份想要的目标数据，但如果不是，比如说还混杂了一些其他 log，或者是想把多天的 log 合并到一起，那可能就会难倒运营了。

这个时候前端同学可以搭把手帮个忙，毕竟 node 在手，天下我有。

脚本怎么写就不说啦，主要是说一下最后怎么分享出去，毕竟我们写的时候都是基于 node 环境，npm 各种包，再 npm run xxxxx 运行，不可能也让每个运营同学都安装一遍 node 吧！最不济的，还要把 node 主程序放到项目文件夹里，像下面这样，把 start.js 拖到 node.exe 上面运行，但也是很难受的一堆文件，如果被手痒改了里面的文件内容，报错了你还要去修 - -。

![](https://cdn.jsdelivr.net/gh/chengpeiquan/assets-storage/img/2021/02/20210216230555.jpg)

不过 node 这么万能，肯定有他自己的解决办法，那就是直接打包成一个可运行的程序，比如 Windows 的 exe 文件，目前亲测好用的就是一个 pkg 包，操作简单，效果靠谱，还支持 MacOS 和 Linux 平台的文件打包。

> 官方文档 https://www.npmjs.com/package/pkg

使用方式也很简单：

```javascript
// 全局安装pkg
npm install -g pkg

// 进入你的项目目录
cd project

// 执行打包exe文件，其中start.js就是你的入口文件
pkg -t win start.js

// 如果你需要支持win/linux/mac多个平台的话，就执行这一句
pkg start.js
```

上面是最基本的打包操作，打包后，会在当前项目下生成对应的 exe 文件，可以把这个程序和需要的载入目录（比如我示例的 log 文件夹）进行分享，告知运营有 log 就丢进 log 文件夹，然后运行即可。

对比原来一堆文件的文件夹，现在就只需要变成简洁的工具目录，可太友好了：

![](https://cdn.jsdelivr.net/gh/chengpeiquan/assets-storage/img/2021/02/20210216230610.jpg)

直接双击 start.exe，即可运行脚本，读取 log 文件夹的 log 文件，生成 result.xlsx 结果文件（根据实际需求调整目录结构）。
