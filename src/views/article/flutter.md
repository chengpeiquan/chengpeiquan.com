---
title: 从前端开发者身份入门Flutter和Dart的学习笔记
desc: 有很多相似，又有很多不同，慢慢适应一下
keywords: flutter,dart
date: 2022-01-27 16:02:00
cover: https://cdn.jsdelivr.net/gh/chengpeiquan/assets-storage/img/2021/11/20220127161927.jpg
categories:
  - tech
---

[[toc]]

最近有空，接触一下 Flutter 和 Dart 的开发，虽然说前端入门 Flutter 比较友好，但个人觉得最最最开始其实不怎么友好，当然写了几个小时 Dart 之后感觉确实都是熟悉的身影，但真的刚入门的那一两个小时真的特别困，所以还是要不定期记录一些遇到的问题。

![](https://cdn.jsdelivr.net/gh/chengpeiquan/assets-storage/img/2021/11/20220127163236.jpg)

## 在线文档

国内很多中文文档都十分陈旧，主要原因跟 Flutter 的版本更新比较频繁有关系，如果看国内那些老文档，你连 Hello World 都跑不起来… 建议直接阅读官方的英文文档。

点击阅读：[Flutter 官方英文文档](https://docs.flutter.dev/)

不过也有本不错的开源书一直在更新维护，也值得一看！

点击阅读：[Flutter 实战·第二版](https://book.flutterchina.club/)

Dart 语言上手倒是没有太大的难度，主要了解一下语法结构就好，大部分在敲 DEMO 代码的实践过程中就能理解和记住了，在 Flutter 实战这本书有一章是总结了一些 Dart 的速记，可以看看。

点击阅读：[Dart 语言简介](https://book.flutterchina.club/chapter1/dart.html)

## 项目起步

作为一个前端，相对于 Android Studio ，当然是更愿意用 VSCode 啦！

### VSCode 支持

VSCode 的 Flutter 和 Dart 支持特别友好，安装对应的插件就行。

- [Flutter - VS Code Market](https://marketplace.visualstudio.com/items?itemName=Dart-Code.flutter)

- [Dart - VS Code Market](https://marketplace.visualstudio.com/items?itemName=Dart-Code.dart-code)

### 启动调试

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

### 项目入口

`lib` 文件夹是 `main.dart` 为应用程序的入口文件， `runApp` 是 Flutter 应用的入口。

```dart
void main() {
  runApp(const MyApp());
}
```

其他的文件可以参照平时的开发习惯，分文件编写后 import 进来。

## 常见问题

建议先阅读一波 Flutter 实战 那本书，起步流程什么的，在上面都有，这里只记录一些踩坑到比较蛋疼的问题。

### Android SDK 报错

Flutter 开发需要有 Android Studio 环境，但是安装了 Android SDK 后会报 `unable to access android sdk add-on list` ，在 StackOverflow 找到了解决方案：

1. 打开 `Settings`
2. 点击 `HTTP Proxy` ，选择 `Auto-detect proxy settings`
3. 测试 `youtube.com`

参考链接 [Unable to access Android SDK add-on list](https://stackoverflow.com/questions/28918069/unable-to-access-android-sdk-add-on-list)

### 自定义 Widget

在 Flutter ， `widget` 类似于前端项目的 `component` ，在实现的时候目前探索是有两种方式可以写出来：

一种是前端常用的函数式编程，通过函数去 `return` 一个 `widget` 。

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

我的 DEMO 里有一个头像组件就是自定义组件，完整源码可以戳 [avatar.dart](https://github.com/chengpeiquan/flutter_demo/blob/main/lib/widgets/avatar.dart) 。

在 StackOverflow 上有关于这个问题的讨论：[What is the difference between functions and classes to create reusable widgets?](https://stackoverflow.com/questions/53234825/what-is-the-difference-between-functions-and-classes-to-create-reusable-widgets)

还有一个官方在 YouTube 上的视频教程说明这一点： [Flutter解析：小部件与辅助方法（Helper Method）](https://www.youtube.com/watch?v=IOyq-eTRhvo)

所以记住最好是通过类去定义一个 widget ，而不是函数。

### 无效的颜色

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
