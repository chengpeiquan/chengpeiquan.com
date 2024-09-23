---
title: macOS 基于 Android Studio 修改模拟器 Hosts
desc: 用回 macOS 一段时间了，各种软件对 M 系列芯片基本上也都有支持的版本，除了安卓模拟器 - - 。之前在 Windows 上面常用的 MuMu 、雷电、夜神等模拟器，不是没有 Mac 版，就是虽然有 Mac 版，但不支持 M 系列芯片（ ARM 架构），所以抛弃一系列国产模拟器，回归 Android Studio 。
keywords: mac, macOS, mac emulator, android emulator, android emulator hosts
date: 2024-02-10 21:03:00
cover: https://cdn.chengpeiquan.com/img/2024/02/202402102106942.jpg?x-oss-process=image/interlace,1
categories:
  - tech
---

用回 macOS 一段时间了，各种软件对 M 系列芯片基本上也都有支持的版本，除了安卓模拟器 - - 。之前在 Windows 上面常用的 MuMu 、雷电、夜神等模拟器，不是没有 Mac 版，就是虽然有 Mac 版，但不支持 M 系列芯片（ ARM 架构），所以抛弃一系列国产模拟器，回归 Android Studio 。

## 创建模拟器

安装和创建模拟器的过程不赘述了，切记要修改 Hosts 的话，需要模拟器支持 Root ，因此不能选择 Google Play 的 System Image ，否则只能以 Readonly 模式启动模拟器，无法 Root 。

![不要选择 Google Play](https://cdn.chengpeiquan.com/img/2024/02/202402102127890.jpg?x-oss-process=image/interlace,1)

![选择这种普通的](https://cdn.chengpeiquan.com/img/2024/02/202402102127906.jpg?x-oss-process=image/interlace,1)

## 启动可写权限的模拟器

需要通过命令行以 Writable 的模式启动，这个时候不需要开启 Android Studio 了（从 AS 启动的模拟器只有 Readonly 权限）。

```bash
# 访问 Android Studio 的模拟器文件夹
cd ~/Library/Android/sdk/emulator/

# 查询所有的模拟器列表
./emulator -list-avds

# 添加可写权限进行启动（这里的 Pixel_7_Pro_API_33 是模拟器名称）
./emulator -avd Pixel_7_Pro_API_33 -writable-system
```

此时模拟器就运行起来，命令行不要关闭，否则模拟器也会退出。

## 检查 ADB 启用状态

下一步操作需要通过 `adb` 命令来执行（关于 ADB 是什么，详细可以见 Android 的官方文档：[Android 调试桥 (adb)](https://developer.android.com/tools/adb?hl=zh-cn) ），但这里只是想确认它是否存在。

所以直接看 StackOverflow 的操作即可：[Set up adb on Mac OS X](https://stackoverflow.com/questions/17901692/set-up-adb-on-mac-os-x) 。 因为安装 Android Studio 的时候就默认一起装了，所以直接看里面的 “Option 3 - If you already have Android Studio installed” 部分。

注意：我是使用 [Oh My Zsh](https://github.com/ohmyzsh/ohmyzsh) 的 ZSH Shell ，所以配置文件和 StackOverflow 答案里不一样，记得留意自己用的是哪个 Shell 。

```bash
echo 'export ANDROID_HOME=/Users/$USER/Library/Android/sdk' >> ~/.zshrc
echo 'export PATH=${PATH}:$ANDROID_HOME/tools:$ANDROID_HOME/platform-tools' >> ~/.zshrc
source ~/.zshrc
```

![我的 .zshrc 配置](https://cdn.chengpeiquan.com/img/2024/02/202402102146502.png?x-oss-process=image/interlace,1)

设置后重启 Terminal ，通过 `adb version` 命令查看是否启用成功。

```bash
adb version

Android Debug Bridge version 1.0.41
Version 34.0.5-10900879
Installed as /Users/chengpeiquan/Library/Android/sdk/platform-tools/adb
Running on Darwin 23.1.0 (arm64)
```

## 修改 Hosts

首先确认模拟器编号，通过命令行启动模拟器后，在设置界面可以看到这个 `5554` 端口号（可能是别的端口）。

![通过命令行启动模拟器](https://cdn.chengpeiquan.com/img/2024/02/202402102220605.jpg?x-oss-process=image/interlace,1)

或者是通过 Android Studio 启动模拟器，也可以看到端口号。

![通过 Android Studio 启动模拟器](https://cdn.chengpeiquan.com/img/2024/02/202402102220607.png?x-oss-process=image/interlace,1)

开始修改 Hosts 啦。

```bash
# 通过 ADB 开启 Root 权限
adb root

# 挂载已启动的模拟器文件，这里记得对应模拟器的端口号
adb -s emulator-5554 remount

# 拉取模拟器的文件到桌面，方便修改
adb pull /system/etc/hosts ~/Desktop/hosts
```

接下来就和之前在 Windows 上修改 Hosts 一样啦，改完后把文件 push 回去。

```bash
# 改完后把 hosts 文件 push 回去
adb push ~/Desktop/hosts /system/etc/hosts

# 查看模拟器上的 hosts 文件内容，确认是否修改成功
adb shell cat /etc/hosts
```
