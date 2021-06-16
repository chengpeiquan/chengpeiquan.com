---
title: 项目代码风格统一神器 editorconfig的作用与配置说明
desc: 团队协作，或者有时候你从GitHub或者其他地方拷贝人家的组件插件下来，想修改，发现代码风格不一致，比如自己习惯2个空格的缩进，但别人是4个空格，或者直接用tab，这就emmm了不是…
keywords: editorconfig,统一编辑器格式
date: 2019-03-15 23:36:00
cover: https://cdn.jsdelivr.net/gh/chengpeiquan/assets-storage/img/2019/03/1-2.jpg
categories:
  - tech
---

团队协作，或者有时候你从 GitHub 或者其他地方拷贝人家的组件插件下来，想修改，发现代码风格不一致，比如自己习惯 2 个空格的缩进，但别人是 4 个空格，或者直接用 tab，这就 emmm 了不是…

分享一个神器，只需要命名为 .editorconfig ，保存到自己的项目根目录下，即可让项目下所有文件都统一代码风格，非常棒！

![](https://cdn.jsdelivr.net/gh/chengpeiquan/assets-storage/img/2019/03/2-2.jpg)

> 官网 https://editorconfig.org/

## 常用配置：

附上我常用的一个 config 文件：

```javascript
# http://editorconfig.org
root = true

[*]
charset = utf-8
end_of_line = lf
indent_size = 2
indent_style = space
insert_final_newline = true
max_line_length = 80
trim_trailing_whitespace = true

[*.md]
max_line_length = 0
trim_trailing_whitespace = false
```

配置基本都是语义化，一看就知道都什么意思，可根据自己的习惯调整！

## 更多配置：

当然也支持更多的配置，具体的配置说明如下：

### 一、常用属性配置

**1、root \<boolean>**

是否是顶级配置文件，设置为 true 的时候才会停止搜索.editorconfig 文件

**2、charset <"latin" | "utf-8" | "utf-8-bom" | "utf-16be" | "utf-16le">**

编码格式

**3、indent_style <"tab" | "space">**

缩进方式

**4、indent_size \<number>**

缩进大小

**5、end_of_line<"lf" | "cr" | "crlf">**

换行符类型

**6、insert_final_newline \<boolean>**

是否让文件以空行结束

**7、trim_trailing_whitespace \<boolean>**

是否删除行尾空格

**8、max_line_length \<number>**

最大行宽。

### 二、常用文件名匹配

**1、\***

匹配除/之外的任意字符

**2、\*\***

匹配任意字符串

**3、?**

匹配任意单个字符

**4、[name]**

匹配 name 字符

**5、[!name]**

不匹配 name 字符

**6、[s1,s2,s3]**

匹配给定的字符串

**7、[num1..num2]**

匹配 num1 到 mun2 直接的整数

> 配置项说明转自简书 https://www.jianshu.com/p/00ac7bd5e74e

睡觉！
