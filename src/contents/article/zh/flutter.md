---
title: 从前端开发者身份入门Flutter和Dart的学习笔记
desc: 有很多相似，又有很多不同，慢慢适应一下
keywords: flutter,dart
date: 2022-01-27 16:02:00
cover: https://cdn.chengpeiquan.com/img/2021/11/20220127161927.jpg?x-oss-process=image/interlace,1
categories:
  - tech
isDraft: true
---

最近有空，接触一下 Flutter 和 Dart 的开发，虽然说前端入门 Flutter 比较友好，但个人觉得最最最开始其实不怎么友好，当然写了几个小时 Dart 之后感觉确实都是熟悉的身影，但真的刚入门的那一两个小时真的特别困，所以还是要不定期记录一些遇到的问题。

![](https://cdn.chengpeiquan.com/img/2021/11/20220127163236.jpg?x-oss-process=image/interlace,1)

本文主要面向平时写 Vue + TypeScript 的开发者，主要通过一些常用知识点的对比，来加快对 Flutter 的入门学习，因为很多道理是相同的，区别只在于怎么用。

## 在线文档

国内很多中文文档都十分陈旧，主要原因跟 Flutter 的版本更新比较频繁有关系，如果看国内那些老文档，你连 Hello World 都跑不起来… 建议直接阅读官方的英文文档。

点击阅读：[Flutter 官方英文文档](https://docs.flutter.dev/)

不过也有本不错的开源书一直在更新维护，也值得一看！

点击阅读：[Flutter 实战·第二版](https://book.flutterchina.club/)

Dart 语言上手倒是没有太大的难度，主要了解一下语法结构就好，大部分在敲 DEMO 代码的实践过程中就能理解和记住了，在 Flutter 实战这本书有一章是总结了一些 Dart 的速记，可以看看。

点击阅读：[Dart 语言简介](https://book.flutterchina.club/chapter1/dart.html)

另外对于编程风格，建议有空先看一波 Flutter 官方提供的风格指南。

点击阅读：[Style Guide For Flutter Repo](https://github.com/flutter/flutter/wiki/Style-guide-for-Flutter-repo)

## 项目起步

建议先阅读一遍 [万字长文轻松彻底入门 Flutter，秒变大前端](https://zhuanlan.zhihu.com/p/90836859)，有个大概的了解再自己折腾。

看完了，就开始折腾了，作为一个前端，相对于 Android Studio ，当然是更愿意用 VSCode 啦！

> 用 VSCode 的好处是自动热重载， 用 Terminal 需要自己手动在命令行敲 `r` 才能刷新，就很 emmm…

### VSCode 支持

VSCode 的 Flutter 和 Dart 支持特别友好，安装对应的插件就行。

- [Flutter - VS Code Market](https://marketplace.visualstudio.com/items?itemName=Dart-Code.flutter)

- [Dart - VS Code Market](https://marketplace.visualstudio.com/items?itemName=Dart-Code.dart-code)

### 启动调试

调试有两种方式，一个是直接在 Chrome 上预览网页版，一个是在模拟器上预览（我是 Windows 开发所以也只能体验一下安卓模拟器）。

#### Chrome 模拟器

调试的话可以通过 VSCode 的 [lunch.json](https://github.com/chengpeiquan/flutter_demo/blob/main/.vscode/launch.json) 配置一个 Flutter 启动。

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Flutter",
      "type": "dart",
      "request": "launch"
    }
  ]
}
```

或者在 Windows Terminal 等终端里 `cd` 进项目目录，跑 `flutter run` 运行。

会唤起 Chrome 浏览器，支持热重载。

#### 安卓模拟器

我按照这个教程配置了一波，运行成功了。

[[Flutter] 调用VS Code 模拟器(虚拟机), 不借助Genymotion](https://blog.csdn.net/qq_40259641/article/details/90475896)

### 项目入口

`lib` 文件夹是 `main.dart` 为应用程序的入口文件， `runApp` 是 Flutter 应用的入口。

```dart
void main() {
  runApp(const MyApp());
}
```

其他的文件可以参照平时的开发习惯，分文件编写后 import 进来。

阿里有个 Star 很多的项目 [Flutter GO](https://github.com/alibaba/flutter-go/tree/master/lib)，可以参考下项目结构

### 路由管理

Flutter 和 Vue 一样，也是有路由的概念，通过定义路由文件和关联路由表，即可实现一套 APP 的路由。

一般情况下（我个人觉得的）最好是用命名路由并通过路由名称跳转。

```dart
MaterialApp(
  // ...
  // 在这里注册命名路由
  routes: {
    'list': (context) => const ListPage(),
  },
  home: const MyHomePage(
    title: '程沛权',
    avatar: 'https://avatars.githubusercontent.com/u/24845958?v=4',
  ),
);
```

比如，如果单纯的从首页 `push` 到列表页面，地址栏不会更新，依旧是首页的地址，热重载刷新后依然是回到首页去，开发调试过程中非常麻烦。

```dart
// 地址栏依旧是 http://localhost:55368/#/
Navigator.push(context, MaterialPageRoute(
  builder: (context) {
    return const ListPage();
  },
));
```

但是如果通过 `pushNamed` 来跳转到注册的路由，则可以得到一条专用的地址（地址格式和 Vue Router 的 `hash` 模式一毛一样…），这样热重载后依然可以停留在列表页。

```dart
// 地址栏会切换到 http://localhost:55368/#list
Navigator.pushNamed(context, 'list');
```

点击阅读：[路由管理](https://book.flutterchina.club/chapter2/flutter_router.html#_2-4-1-%E4%B8%80%E4%B8%AA%E7%AE%80%E5%8D%95%E7%A4%BA%E4%BE%8B) 这一章。

## 设计风格对比

在 Flutter 有两类主流的设计风格： Material 和 Cupertino 。

[Material widgets](https://api.flutter.dev/flutter/material/material-library.html) 实现了 iOS，Android 和 web 三端的 Material 设计风格。

[Cupertino widgets](https://api.flutter.dev/flutter/cupertino/cupertino-library.html) 基于 Apple Human Interface Guidelines 实现了当前的 iOS 设计风格。

一般情况下都是默认采用 Android 的 Material 风格， DEMO 也是这样，不知道实际开发的时候会不会用 Cupertino 还是其他，有待实践。

有一篇文章做了一些选择方面的介绍： [Material 還是 Cupertino？](https://kendevlog.wordpress.com/2020/11/04/flutter_mat_vs_cup/)

## 部件速记对比

都说写前端的人比较容易上手 Dart 和 Flutter ，感觉虽然确实没有那么难入门，不过一开始也会觉得一头雾水，这里放一些标签对比，在实现功能的时候可以快速找到应该用什么部件：

| HTML Tag | Flutter Widget |
| :------: | :------------: |
|   div    |   Container    |
|   span   |      Text      |
|   img    |     Image      |

更多的部件可以查看官网的 API 文档：[API Docs - Flutter](https://api.flutter.dev/)

还有两个比较重要的部件类型需要记住：

|      类型       | 用途说明                                                                       |
| :-------------: | :----------------------------------------------------------------------------- |
| StatelessWidget | 无状态变更，UI静态固化的Widget， 页面渲染性能更高。                            |
| StatefulWidget  | 因状态变更可以导致UI变更的的Widget，涉及到数据渲染场景，都使用StatefulWidget。 |

## 运算符

虽然 Dart 的运算符和 TypeScript / JavaScript 大同小异，但还是有些不太一样，比如…

```bash
The '===' operator is not supported.dart(unsupported_operator)
```

建议看一遍：[Dart 运算符、流程控制](https://juejin.cn/post/6844903983882960909)

## 常见问题

建议先阅读一波 Flutter 实战 那本书，起步流程什么的，在上面都有，这里只记录一些踩坑到比较蛋疼的问题。

### Android SDK 报错

Flutter 开发需要有 Android Studio 环境，但是安装了 Android SDK 后会报 `unable to access android sdk add-on list` ，在 StackOverflow 找到了解决方案：

1. 打开 `Settings`
2. 点击 `HTTP Proxy` ，选择 `Auto-detect proxy settings`
3. 测试 `youtube.com`

参考链接 [Unable to access Android SDK add-on list](https://stackoverflow.com/questions/28918069/unable-to-access-android-sdk-add-on-list)

### 安卓模拟器报错

暂时无解，折腾了 2 个上午都没搞明白怎么弄，可能公司电脑的问题，等回家再试试。

![报错界面](https://cdn.chengpeiquan.com/img/2022/01/20220129104628.jpg?x-oss-process=image/interlace,1)

### GlobalKey 报错

在调整路由结构的时候，遇到一个 GlobalKey 的报错如下：

```bash
A GlobalKey was used multiple times inside one widge's child list…
```

一开始是把所有路由都挂到了命令路由里去了，包括 `home` ，所以首页就崩溃了。

```dart
MaterialApp(
  title: 'Flutter Demo',
  theme: ThemeData(primarySwatch: Colors.blueGrey),
  darkTheme: ThemeData(primarySwatch: black),
  routes: routes,
);
```

然后把首页配置回来才可以，看来首页还是要独立抽离一个配置。

```diff
MaterialApp(
  title: 'Flutter Demo',
  theme: ThemeData(primarySwatch: Colors.blueGrey),
  darkTheme: ThemeData(primarySwatch: black),
  routes: routes,
+  home: const HomePage(
+    title: '程沛权',
+    avatar: 'https://avatars.githubusercontent.com/u/24845958?v=4',
+  ),
);
```

### 打印 LOG

类似于 `console.log` ， Dart 使用 `print` 来打印 LOG ，如果是在 Chrome 模拟器预览的话，按 F12 打开 Console 面板就可以看到 LOG 了。

不过有个问题就是 VSCode 一直报一个很烦人的提示，查了一下原来是新版本的 Flutter 要求用 `debugPrint` 代替 `print` 了。

点击查看：[Avoid `print` calls in production code. (Documentation)](https://stackoverflow.com/a/69531249/15117507)

### 自定义 Widget

在 Flutter ， `widget` 类似于前端项目的 `component` ，在实现的时候目前探索是有两种方式可以写出来：

一种是前端常用的函数式编程，通过函数直接 `return` 一个 `widget` 。

```dart
Widget Avatar(
    {required String url, required double width}) {
  return Container(
    // ...
  );
}
```

一种是面向对象编程，通过 `class` 去定义一个 `widget` 。

```dart
class Avatar extends StatelessWidget {
  const Avatar(
      {Key? key, required this.url, required this.width})
      : super(key: key);

  final String url;
  final double width;

  @override
  Widget build(BuildContext context) {
    return Container(
      // ...
    );
  }
}
```

在 StackOverflow 上有关于这个问题的讨论：[What is the difference between functions and classes to create reusable widgets?](https://stackoverflow.com/questions/53234825/what-is-the-difference-between-functions-and-classes-to-create-reusable-widgets)

还有一个官方在 YouTube 上的视频教程说明这一点： [Flutter解析：小部件与辅助方法（Helper Method）](https://www.youtube.com/watch?v=IOyq-eTRhvo)

大佬总结了一些对比就是：

#### Classes 的优点

> 允许性能优化（ const 构造函数，更细粒度的重建）<br>
> 确保在两个不同布局之间切换正确处理资源（函数可能会重用某些先前的状态）<br>
> 确保热重载正常工作（使用函数可能会破坏 showDialogs 之类的热重载）<br>
> 已集成到小部件检查器中。<br>
> 我们 ClassWidget 在 devtool 显示的小部件树中看到，这有助于理解屏幕上的内容<br>
> 我们可以重写 debugFillProperties 以打印传递给小部件的参数是什么<br>
> 更好的错误消息<br>
> 如果发生异常（如 ProviderNotFound ），框架将为您提供当前构建的小部件的名称。如果您仅在函数 + 中拆分小部件树 Builder ，则您的错误将没有有用的名称<br>
> 可以定义 Keys<br>
> 可以使用上下文 API

#### Functions 的优点

> 代码更少（可以使用代码生成功能小部件来解决）

所以记住最好是通过类去定义一个 widget ，而不是函数。

### 无效的 Material Color

这个情况是出现在准备给 darkTheme 设置黑色的 AppBar ，选择了 `Colors.black` 结果报了这个错误。

```bash
The argument type 'Color' can't be assigned to the parameter type 'MaterialColor?'.dartargument_type_not_assignable
```

原因是部分颜色不属于 `MaterialColor` 类型，如果要使用，需要自己创建：

```dart
const MaterialColor black = MaterialColor(
  0xFF000000,
  <int, Color>{
    50: Color(0xFF000000),
    100: Color(0xFF000000),
    200: Color(0xFF000000),
    300: Color(0xFF000000),
    400: Color(0xFF000000),
    500: Color(0xFF000000),
    600: Color(0xFF000000),
    700: Color(0xFF000000),
    800: Color(0xFF000000),
    900: Color(0xFF000000),
  },
);
```

点击查看：[Flutter更改主题颜色报错:type ‘Color‘ is not a subtype of type ‘MaterialColor‘](https://blog.csdn.net/adojayfan/article/details/113728375)

### 缺少参数传入

如果你定义了一个部件：

```dart
class Foo extends StatelessWidget {
  const Foo(Key? key) : super(key: key);
  // ...
}
```

但是调用 `Foo()` 的时候会报这样的错误：

```bash
1 positional argument(s) expected, but 0 found.
```

> 我明明不需要传 key 啊！！！为什么？？？

Dart 和 TypeScript 不一样的地方在于， TS 通过 `?` 直接可以定义参数可选，但是 Dart 的可选参数需要用花括号 `{}` 括起来，在类型后面加上问号 `?` 仅仅只是用来声明为可空，所以这样定义实际上还是表示必须传 `key` 。

所以要改成这样（注意 Foo 后面的 `()` 变成了 `({})` ）：

```diff
class Foo extends StatelessWidget {
-  const Foo(Key? key) : super(key: key);
+  const Foo({Key? key}) : super(key: key);
  // ...
}
```

### 图片部件

Flutter 的图片部件效果和 HTML 的 `img` 整体还是比较相似，不过用法上有些差距，但很好记，稍微写一下就能记住了。

#### 写法的区别

一开始比较迷惑 `Image.network` 和 `NetworkImage` 有啥区别，看了一下还真是有区别…

[Difference in NetworkImage and Image.network?](https://stackoverflow.com/questions/52242995/difference-in-networkimage-and-image-network)

#### 适应效果

和 CSS 的 `object-fit` 一样， Flutter 的图片也支持配置 fit 效果，支持的样式效果和 CSS 大同小异。

```dart
Image.network(
  'https://example.com/cover.jpg?x-oss-process=image/interlace,1',
  fit: BoxFit.cover,
)
```

关于图片的更多说明可以戳：[图片及ICON](https://book.flutterchina.club/chapter3/img_and_icon.html#_3-3-%E5%9B%BE%E7%89%87%E5%8F%8Aicon)

### 设置圆角

这个一定要点名！笑死，一个设置圆角的问题被浏览了 20 多万次…

![209k 的浏览量…](https://cdn.chengpeiquan.com/img/2022/01/20220129164221.jpg?x-oss-process=image/interlace,1)

具体戳：[Add border to a Container with borderRadius in Flutter](https://stackoverflow.com/questions/58350235/add-border-to-a-container-with-borderradius-in-flutter)

### 静态资源

Flutter 也有类似于 Vue 的 public 文件夹，存放一些静态资源，但是这里的路径有个坑，反复查了很多遍 [Adding assets and images](https://docs.flutter.dev/development/ui/assets-and-images) 文档都没有说引入的时候文件是要放在哪里，从哪里引入（ Vue 就有明确的说明 public 下的资源是从根目录读取），所以花了很多时间在调试路径的问题。

不过还好机智的打印了一波路径和看请求，最终还是跑通了。

首先需要去项目根目录下的 `pubspec.yaml` 文件里配置 `assets` 字段的数据：

```yaml
flutter:
  # To add assets to your application, add an assets section, like this:
  assets:
    - assets/mock/
```

这里的路径注意了！ `assets/mock/` 代表着我把 `mock` 文件夹放在了项目根目录下的 `assets` 文件夹里，为什么不是别的地方？

因为经过不断打印错误的路径，发现 Flutter 的静态资源真的是从 `/assets/` 开始的，不是根目录，也不是基于当前文件去写相对地址。

注释里的 `like this` 真的就是要跟他一样从 assets 开始配置，而不是 YAML 语法格式相同就好…也就是我这里的 JSON 文件的路径是类似：

```bash
http://localhost:52128/assets/mock/list.json
```

这样在 Dart 文件里就可以直接省略掉 assets 开头：

```dart
await DefaultAssetBundle.of(context).loadString('mock/list.json');
```

否则放别的地方你还要一直 `../` 之类的去写更复杂的相对路径。

### 解析 JSON

因为要 Mock 一些数据，所以写了几个 JSON 文件作为静态资产去导入，有几个需要注意的：

```dart
// 确保导入了这个库
import 'dart:convert';
```

然后才可以使用 `jsonDecode()` 或者 `json.decode()` 去解析 JSON 内容。

参考资料：[How to decode JSON in Flutter?](https://stackoverflow.com/questions/51601519/how-to-decode-json-in-flutter/51601542#51601542)

### 构建异步部件

APP 肯定离不开网络请求，包括 Mock 的 JSON 数据，都是请求回来的，在这里折腾了很长时间才解决，倒不是文档看不懂，而是因为 VSCode 的 Dart 代码补全和类型补全帮我搞了几个麻烦的问题… 所以在没有绝对把握之前，还是先看文档，再去各种补全代码才是王道。

直接贴上相关的文章吧。

点击阅读：[Dart 的异步支持](https://book.flutterchina.club/chapter1/dart.html#_1-4-4-%E5%BC%82%E6%AD%A5%E6%94%AF%E6%8C%81)

点击阅读：[Flutter 异步 UI 更新](https://book.flutterchina.club/chapter7/futurebuilder_and_streambuilder.html#_7-6-1-futurebuilder)

点击阅读：[How to Build Widgets with an Async Method Call](https://flutterigniter.com/build-widget-with-async-method-call/)
