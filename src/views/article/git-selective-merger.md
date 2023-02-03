---
title: Git选择性合并操作笔记
desc:
keywords: github,github上传,github删除文件夹
date: 2023-02-02 16:56:00
cover: https://cdn.chengpeiquan.com/img/2023/02/20230202170739.jpg?x-oss-process=image/interlace,1
categories:
  - tech
---

[[toc]]

今天帮朋友解决了一个代码合并的问题，他有两个项目， B 项目最初是基于 A 项目作为架构底子，根据业务进行了不同需求的开发，沉淀了不少新功能，而 A 项目本身也在继续维护，其中 A 项目有一些功能升级是 B 项目需要的，如果手动合并代码，工作量又比较大。

分享给他几个方案尝试，当然这些操作对我来说也不怎么常用，所以记录起来，以后自己用到也不用重新踩坑。

## 合并某个版本

使用场景是： A 项目

随便拉取了一个旧的版本，拉取深度为 10 。

git clone https://github.com/chengpeiquan/test.git --branch main --single-branch --depth 10

进入仓库文件夹并查看差异
cd test
git log --oneline main origin/main

看一下 log ，确实是 10 条 commit 差距
3ad0947 (HEAD -> main, origin/main, origin/HEAD) chore: backup
fc322fe chore: backup
1cc6c01 chore: backup
4898c9c chore: backup
8258834 chore: backup
cb7d560 chore: backup
10b3bb5 chore: backup
2119218 chore: backup
1c0c5ba feat: backup
f49e8b0 (grafted) chore: backup

将本地的 commit 记录重置到拉取时的那个 commit
git reset --hard f49e8b0

我合并第五条，保留 5 条差异
git merge cb7d560

合并成功反馈
Updating f49e8b0..cb7d560
Fast-forward
README.md | 14 +++++++++++---
docs/introduction.md | 1 -
docs/zh/introduction.md | 1 -
3 files changed, 11 insertions(+), 5 deletions(-)
delete mode 100644 docs/introduction.md
delete mode 100644 docs/zh/introduction.md

再次查看差异
git log --oneline main origin/main

本地的 HEAD 已经在第五条了
3ad0947 (origin/main, origin/HEAD) chore: backup
fc322fe chore: backup
1cc6c01 chore: backup
4898c9c chore: backup
8258834 chore: backup
cb7d560 (HEAD -> main) chore: backup
10b3bb5 chore: backup
2119218 chore: backup
1c0c5ba feat: backup
f49e8b0 (grafted) chore: backup

为了避免覆盖，我创建一个新分支来提交

git checkout -b dev

再次检查一下
git log --oneline dev origin/main

一样没有问题
3ad0947 (origin/main, origin/HEAD) chore: backup
fc322fe chore: backup
1cc6c01 chore: backup
4898c9c chore: backup
8258834 chore: backup
cb7d560 (HEAD -> dev, main) chore: backup
10b3bb5 chore: backup
2119218 chore: backup
1c0c5ba feat: backup
f49e8b0 (grafted) chore: backup

提交到远程的 dev 分支
git push -u origin dev

查看差异
git log --oneline dev origin/main

刚才是合并到第五个，还有 5 个未同步的
3ad0947 (origin/main, origin/HEAD) chore: backup
fc322fe chore: backup
1cc6c01 chore: backup
4898c9c chore: backup
8258834 chore: backup
cb7d560 (HEAD -> dev, main) chore: backup
10b3bb5 chore: backup
2119218 chore: backup
1c0c5ba feat: backup
f49e8b0 (grafted) chore: backup

挑选未同步的里面的一个，只合并这个
git cherry-pick 4898c9c

合并成功反馈
Auto-merging README.md
[dev 3f8b616] chore: backup
Date: Mon Dec 5 13:54:43 2022 +0800
1 file changed, 5 insertions(+), 1 deletion(-)
