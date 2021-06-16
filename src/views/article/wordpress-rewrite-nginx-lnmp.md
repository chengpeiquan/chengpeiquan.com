---
title: 基于lnmp配置WordPress的Nginx伪静态方法
desc: Nginx配置rewrite，基于lnmp搭建的话，其实配置起来非常简单，只需要在lnmp上输入几个简单的指令就可以把域名和伪静态类型关联上，重启Nginx后直接生效~
keywords: wordpress,rewrite,nginx,lnmp
date: 2018-09-06 01:43:00
cover: https://cdn.jsdelivr.net/gh/chengpeiquan/assets-storage/img/2018/09/1-2.jpg
categories:
  - tech
---

搭好博客之后，打算配置伪静态，由于习惯直接搜索引擎，导致折腾了几个小时都没解决，最后去官网转了一下，人家本来就有相关的文档，吃一堑长一智，Mark 下来。

配置其实非常简单，只需要在 lnmp 上输入几个简单的指令就可以把域名和伪静态类型关联上，重启 Nginx 后直接生效，不需要和网上那些教程一样说的，频繁修改这个文件那个文件，还有核对伪静态代码是否正确什么的。

## 配置步骤：

1、WordPress 后台 - 设置 - 固定链接，配置好自己想要的伪静态格式。

2、打开终端，连接服务器，开始处理服务端的 rewrite 规则配置。

```javascript
//打开终端，输入ssh 你的用户名@你的服务器IP
//回车后会提示你输入服务器密码，登录后就可以开始配置了
ssh root@192.168.1.1

//登入成功，可以先查看当前绑定的域名情况（这里指服务端的配置情况，和域名解析指向那块没关系）
//输入查询指令
lnmp vhost list

//如果是新搭建的服务器，上面的查询结果应该是空，这个时候开始添加自己的域名
//输入添加指令
lnmp vhost add

//会提示你输入需要绑定的域名
//Please enter domain(example: www.lnmp.org):
www.chengpeiquan.com

//再下一步可以再绑定其他域名或者泛域名，根据需要配置
//Enter more domain name(example: lnmp.org *.lnmp.org):
chengpeiquan.com

//配置好域名，会提示你绑定网站的目录
//默认是新建一个网站域名的文件夹，但如果和我一样先建了网站再绑域名的话，就要输入网站的目录了（从根目录开始）
//Please enter the directory for the domain:
//Default directory: /home/wwwroot/chengpeiquan.com:
/home/wwwroot/default

//接下来就是重点了，问你是否允许rewrite，我们伪静态就是要的这个，必须yes
//Allow Rewrite rule? (y/n)
y

//接着是选择要引入的rewrite的规则，lnmp默认已经把各种常用的程序规则配好，但是没引入，所以在这个步骤就需要根据自己的需求引入想要的配置
//Please enter the rewrite of programme,
//wordpress,discuzx,typecho,thinkphp,laravel,codeigniter,yii2 rewrite was exist.
//(Default rewrite: other):
wordpress

//后面的问题就没什么影响了，看自己需要设置是否允许log、SSL证书什么的
//配置完毕后，重启Nginx，搞定
/etc/init.d/nginx restart
```

以上就是所有操作步骤，参考文档：

> lnmp 官网配置说明 https://lnmp.org/faq/lnmp-vhost-add-howto.html
