---
title: Git的选择性合并操作笔记：合并某个版本或某个提交
desc: 今天帮朋友解决了一个代码合并的问题，他有两个项目， B 项目最初是基于 A 项目作为架构底子，根据业务进行了不同需求的开发，沉淀了不少新功能，而 A 项目本身也在继续维护，可以简单的理解为， A 项目是通过类似 create-preset 这样的脚手架拉取下来的一个项目模板，而 B 项目是一个业务项目，所以 A 项目通常只提供一些公共功能的维护升级，而 B 项目更注重业务功能开发。
keywords: github,github上传,github删除文件夹
date: 2023-02-02 16:56:00
cover: https://cdn.chengpeiquan.com/img/2023/02/20230202170739.jpg?x-oss-process=image/interlace,1
categories:
  - tech
---

今天帮朋友解决了一个代码合并的问题，他有两个项目， B 项目最初是基于 A 项目作为架构底子，根据业务进行了不同需求的开发，沉淀了不少新功能，而 A 项目本身也在继续维护，可以简单的理解为， A 项目是通过类似 [create-preset](https://github.com/awesome-starter/create-preset) 这样的脚手架拉取下来的一个项目模板，而 B 项目是一个业务项目，所以 A 项目通常只提供一些公共功能的维护升级，而 B 项目更注重业务功能开发。

|  项目  | 作用                                                  |
| :----: | :---------------------------------------------------- |
| A 项目 | 基础模板，提供一些公共功能的维护升级                  |
| B 项目 | 业务项目，在 A 项目的基础上，围绕具体业务进行功能开发 |

因此 B 项目想升级 A 项目的功能，并不是不可能，冲突也不一定会很多。不过因为不是每个版本都升级，所以如果手动合并代码，工作量又比较大。分享了几个方案给他尝试，当然这些操作对我来说也不怎么常用，所以记录起来，以后自己用到也不用重新踩坑。

下面的演示都基于同一个 Git 仓库的不同分支，实际处理中，可以选择把 B 项目放到 A 项目的某个分支来实现合并，也可以通过 `git remote add <shortname> <url>` ，将两个项目关联到同一个 Git 远程仓库。

## 合并某个版本

先看看一个版本合并的操作，假设 B 项目不想完全升级到 A 项目的最新版本（可能因为最新版本是一个包含破坏性升级的 Major 版本，出现了很多不兼容的情况），那么可以选择其中一个 Minor 次要版本进行升级。

### 处理思路

由于并不是每个项目都有打 Tag ，所以可以选择指定某个 Commit Hash 作为临界点。在这个例子里，将 A 项目在某个 commit 记录之前的功能，都需要同步给 B 项目，这里使用 `git merge <commit_hash>` 命令来实现。

### 具体操作

随便拉取了一个旧的版本，拉取深度为 `10` （主要参数是 `--depth 10` ，其他的 `--branch` 和 `--single-branch` 可以视情况指定，这里只是为了单纯拉取 `main` 分支的代码）。

```bash
git clone https://github.com/chengpeiquan/test.git --branch main --single-branch --depth 10
```

进入仓库文件夹，使用 `git log` 命令查看本地仓库和远程仓库的 `main` 分支差异（这里使用了 `--oneline` 参数简化了提交记录的展示）。

```bash
cd test
git log --oneline main origin/main
```

看一下 Log ，确实是 10 条 Commit 差异：

```bash
# git log --oneline main origin/main
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
```

将本地的 Commit 记录重置到拉取时的那个 Commit ，如果不执行这一步，在 Merge 的时候会提示 `Already up-to-date.` 的信息，无法合并。

```bash
git reset --hard f49e8b0
```

在 10 条 Commit 差异里，现在使用 `git merge <commit_hash>` 命令合并第五条 Commit （它的 Hash 是 `cb7d560` ），保留 5 条差异。

```bash
git merge cb7d560
```

合并成功反馈：

```bash
# git merge cb7d560
Updating f49e8b0..cb7d560
Fast-forward
README.md | 14 +++++++++++---
docs/introduction.md | 1 -
docs/zh/introduction.md | 1 -
3 files changed, 11 insertions(+), 5 deletions(-)
delete mode 100644 docs/introduction.md
delete mode 100644 docs/zh/introduction.md
```

再次查看本地 `main` 分支和远程 `main` 分支的差异：

```bash
git log --oneline main origin/main
```

本地的 HEAD 已经在第五条了：

```bash
# git log --oneline main origin/main
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
```

为了避免覆盖，创建一个新分支来提交刚刚本地合并后的代码：

```bash
git checkout -b dev
```

再次检查一下新分支 `dev` 分支和远程 `main` 分支的差异：

```bash
git log --oneline dev origin/main
```

确认没有问题（因为是从本地 `main` 分支创建的，所以代码是一样的，但在进行敏感操作之前，还是养成一个二次检查的习惯）。

```bash
# git log --oneline dev origin/main
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
```

可以提交到远程的 `dev` 分支了（也就是实际上 B 项目代码所在的分支）。

```bash
git push -u origin dev
```

![main 分支的提交记录](https://cdn.chengpeiquan.com/img/2023/02/20230203163624.jpg?x-oss-process=image/interlace,1)

![dev 分支的提交记录](https://cdn.chengpeiquan.com/img/2023/02/20230203163625.jpg?x-oss-process=image/interlace,1)

## 合并某个提交

有时候仅仅想单独合并某一条或者某几条 Commit 的改动，不希望包含该 Commit 之前的其他 Commit ，可以选择这个方案来处理。

### 处理思路

与 [合并某个版本](#合并某个版本) 的操作不同，这种情况会产生新的 Commit Hash ，因此整个提交历史会被打乱，所以比较适合简单的代码合并，例如某个模块新增了功能，而其他的功能并不需要，只想要这个模板的新功能，那么选择这个方案会比较合适。

这个方案就不再是使用 `git merge` 了，而是使用 `git cherry-pick <commit_hash>` 命令来实现。

### 具体操作

继续在 `dev` 分支上操作，也是先查看差异：

```bash
git log --oneline dev origin/main
```

由于前面 [合并某个版本](#合并某个版本) 的操作是合并第五个 Commit 以及之前的提交记录，因此还有 5 个未同步的记录。

```bash
# git log --oneline dev origin/main
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
```

这里挑选未同步的记录里面的一个，只合并这个：

```bash
git cherry-pick 4898c9c
```

合并成功反馈：

```bash
# git cherry-pick 4898c9c
Auto-merging README.md
[dev 3f8b616] chore: backup
Date: Mon Dec 5 13:54:43 2022 +0800
1 file changed, 5 insertions(+), 1 deletion(-)
```

现在重新查看本地 `dev` 分支和远程 `main` 分支的差异，可以看到多出来一个新的提交了。

```bash
# git log --oneline dev origin/main
3f8b616 (HEAD -> dev) chore: backup
3ad0947 (origin/main, origin/HEAD) chore: backup
fc322fe chore: backup
1cc6c01 chore: backup
4898c9c chore: backup
8258834 chore: backup
cb7d560 (main) chore: backup
10b3bb5 chore: backup
2119218 chore: backup
1c0c5ba feat: backup
f49e8b0 (grafted) chore: backup
```

## 其他补充

在演示项目上操作通常还是很顺利的，但实际项目里可能会存在代码冲突，建议在操作时，按照小版本的提交去合并同步，减少冲突的解决成本。
