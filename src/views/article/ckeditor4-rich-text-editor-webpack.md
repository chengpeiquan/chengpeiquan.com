---
title: 基于CKEditor4的富文本编辑器 WebPack引入说明与配置注意事项
desc: 前几天对接了个需求，说因为传统的CMS太笨重，并且一些业务结合点想落地的话改造太麻烦，想让我这边帮他做一个发布后台，前后端分离，他只负责数据和接口，其他的由我自己把控。我当时没立即答应，因为我不会啊 - - 哈哈哈没玩过这东西，之前做发布都是直接走CMS或者WordPress这种直接现成的发布系统，偶尔自己做一些活动用的传图发布页面也是简单的一个textarea就完事。不过好奇心又很强，也想学多点东西，还是接了过来，然后让他给我点时间我得尝试一下。
keywords: ckeditor,ckeditor4,ckeditor传图,ckeditor编辑,ckeditor赋值,ckeditor路径
date: 2018-10-22 00:48:00
cover: https://cdn.jsdelivr.net/gh/chengpeiquan/assets-storage/img/2018/10/1-3.jpg
categories:
  - tech
---

[[toc]]

前几天对接了个需求，说因为传统的 CMS 太笨重，并且一些业务结合点想落地的话改造太麻烦，想让我这边帮他做一个发布后台，前后端分离，他只负责数据和接口，其他的由我自己把控。简单看了一下需求，说是发布后台，实际上对我来说就是一个前台发布页面，只不过通过 OpenID 登录后，识别不同的用户身份来决定是否允许发布或者修改删除。

我之前做的发布页面都是偏简单化的东西，几个 input 搭配一个 textarea 就完事（传图/提交按钮其实也是 input 哈哈哈），第一次面对复杂需求说要富文本编辑器，想自己造轮子是不可能了，于是先查阅了一下现成的 JS 插件，倒是出乎意料的多。普遍用的比较多的还是 CKEditor，包括我们公司的很多内部发布系统也是用的这个，Ok，心里有底，可以开搞了。

## 版本选择

因为需求要的编辑器功能比较多，我选择的是功能最强大的 full 版（总大小 1.7M，核心文件 700K），并且由于最新版的 ck5 包括插件只能全部走 npm 安装打包，对打包出来的项目文件大小影响很大（如果你和我一样不打算多个 html 出口的话）。

所以我选择了传统一点的 ck4，可以不作为项目的核心文件打包，并且根据页面需要动态按需载入（我喜欢 SPA 的思维方式，哪怕用 jQ 也是喜欢单个页面，根据不同的 Query 去实现“页”与“页”之间的切换，嗯没错，这次的实现是走的 jQuery 去实现，Vue 按理来说应该问题也不大）。

html 部分，写一个 textarea

```javascript
<textarea name="editor" id="editor"></textarea>
```

引入插件后

```javascript
//js里通过CKEditor的api去替换那个textarea生成富文本编辑器
CKEDITOR.replace('editor')

//最后可以通过ck的api获取编辑器内容提交
CKEDITOR.instances.editor.getData()
```

> 官网下载 https://ckeditor.com/ckeditor-4/download/<br>
> 开发文档 https://ckeditor.com/docs/ckeditor4/latest/guide/

注：下载的时候一般无需勾选“Easy Image”，因为图片这块通常都是存自己的服务器，用不到这个功能。

## 开发过程

### 确认打包结构

由于 jQuery 在 WebPack 并没有像 Vue 那么统一的部署格式，我个人是习惯按这样的分支去安排文件的放置，app 是个人开发用的文件夹，public 是打包后的线上文件夹，从 app 里打包的东西都会生成到 static 里（每次都清空并重新生成带新 hash 的文件）。

由于编辑器工具是个无需频繁修改的插件文件，所以在 public 下创建了个 plugins 插件并放进去，这样每次打包都不会影响到 plugins，如果需要发布到线上预览，也只需要更新原来的 index 和 static，无需一直重复发布 plugins。

![](https://cdn.jsdelivr.net/gh/chengpeiquan/assets-storage/img/2018/10/1-4.jpg)

### 动态引入插件

由于不是 import 到项目里，所以需要在用到编辑器的时候才把它载入进来，动态载入 JS 文件，jQuery 是比较简单的，利用 getScript 引入即可，剩下的要干嘛干嘛就写到 done 的回调里就 ok。

```javascript
$.getScript('./plugins/ckeditor/ckeditor.js').done(function () {
  CKEDITOR.replace('editor')
  // 编辑器加载完毕后要执行的操作
  // 比如配置传图接口
  // 比如提交等等
  // ...
})
```

### 修改插件配置

执行完第 2 步里的东西，会发现编辑器加载过程中会有报错。

因为 CKEditor 有很多自己的小插件，比如语言包、编辑器的样式文件、拓展功能等，它的引入规则是“CKEditor 从哪里引入，它的插件就从哪里引入”，因为核心文件 ckeditor.js 里有这么一个引入方式：

```javascript
CKEDITOR.getUrl('contents.css')
```

就相当于你在 index.html 里引入里了 CKEditor，那么这个 contents.css 的路径就是直接从项目根目录里加载，然而现在我们的文件是在 plugins 下，所以需要修改编辑器的配置。

> 官网对编辑器 path 的说明   https://ckeditor.com/docs/ckeditor4/latest/guide/dev_basepath.html

无需修改核心文件的东西，只需要在 getScript 的回调里添加就行（官网是建议在 html 里作为全局变量配置，不过我这样子在项目里也可以生效，就放一起维护了）。

```javascript
$.getScript('./plugins/ckeditor/ckeditor.js').done(function () {
  const CKEDITOR_BASEPATH = './plugins/ckeditor/'
  CKEDITOR.replace('editor')
})
```

那么到这一步，编辑器就可以出来了（上面的标题和类别选择不是富文本的）。

![](https://cdn.jsdelivr.net/gh/chengpeiquan/assets-storage/img/2018/10/2-1.jpg)

### 传图功能实现

生成好的编辑器，默认是不显示文件上传控件的，只能插入远程图片 url，通过对官网 api 文档的查阅，确定好传图的配置方式，添加即可实现。

> 官网 api 文档 https://ckeditor.com/docs/ckeditor4/latest/api/CKEDITOR_config.html

```javascript
//api.image是我配置好的传图接口变量，实际是一个接口的url
filebrowserImageUploadUrl: api.image
```

但是在上传后，出现了一个提示“不正确的服务器响应”。

![](https://cdn.jsdelivr.net/gh/chengpeiquan/assets-storage/img/2018/10/233.jpg)

一脸懵逼的翻阅文档，找到了原因，是接口返回的格式不对（相对于编辑器需要的返回结果的不对，有固定要求），解决办法如下：

> 官网关于传图后 success 与 error 返回的格式要求说明文档 https://ckeditor.com/docs/ckeditor4/latest/guide/dev_file_upload.html

```javascript
// 成功的返回格式
{
    "uploaded": 1,
    "fileName": "foo(2).jpg",
    "url": "/files/foo(2).jpg",
    "error": {
        "message": "A file with the same name already exists. The uploaded file was renamed to \"foo(2).jpg\"."
    }
}

// 失败的返回格式
{
    "uploaded": 0,
    "error": {
        "message": "The file is too big."
    }
}
```

### 文章编辑功能

编辑功能的思路，一开始是想着从接口拿到原来的文章数据后，放到编辑器内容框里就行，然而却发现编辑器是用 iframe 来实现。

虽然可以也可以通过操作 iframe 来实现，但觉得别扭，后来翻阅文档找到一个功能就是 setData，CKEditor 自己有 api 可以直接向编辑器添加数据。

```javascript
// instanceReady是监听编辑器载入成功并渲染完毕，必须放到这里才能给编辑器赋值
CKEDITOR.on('instanceReady', function (e) {
  //一系列操作，比如请求接口等...

  //这个是从接口拿下来的数据
  const content = article_data[0].content

  //这个是利用jQuery直接操作iframe的语句，不需要，但是备注一下免得以后用到
  // $(".cke_wysiwyg_frame").contents().find(".cke_editable").html(content);

  //这个是通过ck的api实现填充数据
  CKEDITOR.instances.editor.setData(content)
})
```

## 汇总一下代码

到这里就暂时没有什么问题了，项目主要涉及到的功能和问题主要是上面这几个，以后有其他问题再陆续补充，目前用到的代码如下。

```javascript
$.getScript('./plugins/ckeditor/ckeditor.js').done(function () {
  // 修改编辑器插件文件的引入路径，需要在生成编辑器之前定义好
  const CKEDITOR_BASEPATH = './plugins/ckeditor/'

  // 创建编辑器
  CKEDITOR.replace('editor', {
    // 修改传图预览的默认文案
    image_previewText: CKEDITOR.tools.repeat(' ', 100),
    // 修改传图接口（api.image是我提前定义好的配置，否则就直接写接口的url）
    filebrowserImageUploadUrl: api.image,
    // 修改编辑器的默认高度
    height: 400,
  })

  // 监听编辑器载入情况
  CKEDITOR.on('instanceReady', function (e) {
    //一些判断，看是否需要进入编辑模式
    //请求接口啥的...
    const content = article_data[0].content
    //把接口的内容赋值到编辑器里
    CKEDITOR.instances.editor.setData(content)
  })

  // 提交按钮的操作
  $('#submit').click(function () {
    //获取各种输入的值
    //一些input、select之类的val

    //这一句是通过ck的api获取编辑器的内容，富文本是包含了各种p标签、img标签的混杂的html
    const editor_content = CKEDITOR.instances.editor.getData()

    //一些判断，看该填的是否有填…
    //然后就是post到接口提交了
  })
})
```

以上。
