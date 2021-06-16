---
title: Github发布项目与删除文件夹操作指令
desc: Git的指令还是记不太住，发篇文帮助记忆，记录起来方便查阅。
keywords: github,github上传,github删除文件夹
date: 2019-02-05 14:56:00
cover: https://cdn.jsdelivr.net/gh/chengpeiquan/assets-storage/img/2019/02/1-2.jpg
categories:
  - tech
---

Git 的指令还是记不太住，发篇文帮助记忆～

## 发布项目文件到仓库

把 github 上面的仓库克隆到本地，先去自己 Git 项目仓库复制克隆地址，再通过指令克隆到本地

```javascript
git clone https://github.com/xxx/xxxx.git
```

克隆成功后，本地项目文件夹下面就会多出个文件夹，该文件夹名即为 github 上面的项目名，把要上传的文件都放到这个文件夹里面去。

进入克隆下来的项目文件夹，比如这个项目名叫 myGit

```javascript
cd myGit
```

添加要发布的文件，一般新项目都是全选即可（注：全选是在 add 后面用一个空格和点，此操作是把 myGit 文件夹下面的文件都添加进来，如果想指定单个文件夹，则 add 后面空格+文件夹名称，文件也同理）

```javascript
git add .
```

补充提交信息，注明本次发布更新的原因或者调整内容等

```javascript
git commit -m "提交信息注释"
```

执行发布命令，就会开始把刚刚 add 到暂存区的文件都 push 到 github 上面，此步骤需要输入对应的 Github 的帐号和密码。

```javascript
git push -u origin master
```

## 删除仓库里的文件夹

在 github 上的仓库设置里，只能删除整个仓库，不能删除文件夹或文件，所以只能通过命令来解决。

和上传的准备工作一样，先将远程仓库里面的项目克隆下来，然后进入克隆好的项目文件夹里

```javascript
git clone https://github.com/xxx/xxxx.git
cd myGit
```

删除之前可以查看有哪些文件夹

```javascript
dir
```

比如要删掉一个叫 oldGit 的子文件夹

```javascript
git rm -r --cached oldGit
```

和提交一样，填写操作记录说明

```javascript
git commit -m "删除了oldGit"
```

发布本次的更新操作

```javascript
git push -u origin master
```

以上，记录起来方便查阅。
