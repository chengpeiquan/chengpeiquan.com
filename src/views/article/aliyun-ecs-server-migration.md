---
title: 阿里云ECS从香港迁移至国内节点实战教程
desc: 之前因为贪图管理上的方便，一直把这个博客的服务器假设在香港那边，其实速度体验和稳定性啥的都挺好，不过最近打算给博客上线一个小程序版本，受于腾讯的政策要求，必须备案和接入https，考虑了一下，看了一下国内地区的ECS价格，刚好有优惠，所以决定做一个迁移。
keywords: 阿里云ESC迁移,阿里云迁移,阿里云服务器迁移
date: 2020-02-28 18:10:00
cover: https://cdn.jsdelivr.net/gh/chengpeiquan/assets-storage/img/2020/02/1-1.jpg
categories:
  - tech
---

之前因为贪图管理上的方便，一直把这个博客的服务器假设在香港那边，其实速度体验和稳定性啥的都挺好，不过最近打算给博客上线一个小程序版本，受于腾讯的政策要求，必须备案和接入 https，考虑了一下，看了一下国内地区的 ECS 价格，刚好有优惠，所以决定做一个迁移。

购买服务器的过程就省略了…我是在同一个账号下买的新的 ECS，迁移操作也是基于同一个账号来说的。

## 迁移前的准备

迁移前需要对原来的服务器上的数据做备份，主要操作是创建快照和生成镜像。

1、访问原来的香港 ECS 实例，在“实例管理-本实例磁盘”，点击“创建快照”。

![](https://cdn.jsdelivr.net/gh/chengpeiquan/assets-storage/img/2020/02/1-2.jpg)

2、然后切换到“本实例快照”列表，等待该快照进度 100%之后，对这个快照“创建自定义镜像”。

![](https://cdn.jsdelivr.net/gh/chengpeiquan/assets-storage/img/2020/02/2.jpg)

3、在刚刚创建好的镜像右侧，点击复制镜像，然后选择目标区域为要调整的国内区域。

![](https://cdn.jsdelivr.net/gh/chengpeiquan/assets-storage/img/2020/02/3.jpg)

## 开始进行迁移

1、切换到国内的 ECS，在实例管理，点击停止运行。

![](https://cdn.jsdelivr.net/gh/chengpeiquan/assets-storage/img/2020/02/5.jpg)

2、 继续在实例管理这个界面，配置信息的“更多”里面，选择“更换操作系统”

![](https://cdn.jsdelivr.net/gh/chengpeiquan/assets-storage/img/2020/02/6.jpg)

3、 选择刚刚复制过来的自定义镜像

![](https://cdn.jsdelivr.net/gh/chengpeiquan/assets-storage/img/2020/02/7.jpg)

然后就更换成功了！！！

![](https://cdn.jsdelivr.net/gh/chengpeiquan/assets-storage/img/2020/02/8.jpg)

## 重启服务器

此时打开新的 ECS 的公网 ip，会发现 502 Bad Gateway，因为需要对 nginx 等服务进行重启，重启之后就可以正常访问网站内容了。
