---
title: 解决 better-sqlite3 连接 SQLite 时报错 Could not locate the bindings file
desc: 有一个 Nest 服务是用 Docker 部署的，因为连了 SQLite ，迁移服务器后出现了一点问题，问题倒不是出在 SQLite 上，而是 TypeORM 基于 better-sqlite3 操作 SQLite ，这个库少了一个编译好的 Node.js 模块，导致在 Docker 里运行的时候，会报错。
keywords: Docker SQLite,Docker better-sqlite3,SQLite Could not locate the bindings file
date: 2025-02-16 00:42:33
cover: https://cdn.chengpeiquan.com/img/2025/02/202502160042456.jpg?x-oss-process=image/interlace,1
categories:
  - tech
---

五年前买的阿里云 ECS 这个月底到期，前天准备续费的时候发现买个新的更划算，不仅价格差不多，还多了 1GB 内存，那还续个屌…… 服务器上要迁移的东西不多，影响不大，所以就直接买个新的了。

## 简单的迁移工作

由于老的服务器上部署的大多是前端项目（数据是连 Serverless 的 API 操作的，不在这台机器上），并且基本都是用 Docker 部署的，所以迁移工作都比较简单，在源码仓库上修改 Workflow 的目标机器 IP 和 SSH Key ，重新运行一次 CI 打包，就可以把新的镜像推送到新的服务器上了。

其他的像 SSL 证书， Nginx 配置，都是拷贝过去后重启一下 Nginx 就搞定，等服务都起来了，去 DNS 解析那里把域名指向新机器的 IP 就迁移完了，都问题不大。

除了有一个 Nest 服务，因为连了 SQLite ，迁移后出现了一点问题。

## 部署后运行报错

问题倒不是出在 SQLite 上，用 Docker 连接这种嵌入式数据库，都是通过 Volumes 挂载到宿主机器上的，所以访问的数据库文件路径是宿主机器上的路径，知道了这一点，把 SQLite 数据迁移到新服务器上也很简单，并且在新机器上直接用 SQLite 查询数据，也都没问题。

至于在 Docker 里使用 SQLite 本身，只需要在 Dockerfile 里，在安装 libc6-compat 的时候记得一起安装 sqlite 就可以。

```dockerfile
# Dockerfile

# Use the official Node.js image as the base image
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat sqlite

# Set the working directory inside the container
WORKDIR /app

# ...
```

但是 Docker 容器运行后，访问接口却挂了，通过 `docker logs` 查询容器的日志，发现启动后这里有个报错：

```bash
[Nest] 1  - 02/15/2025, 1:23:01 PM     LOG [InstanceLoader] ScheduleModule dependencies initialized +1ms
[Nest] 1  - 02/15/2025, 1:23:01 PM   ERROR [TypeOrmModule] Unable to connect to the database. Retrying (1)...
Error: Could not locate the bindings file. Tried:
 → /app/node_modules/.pnpm/better-sqlite3@11.7.0/node_modules/better-sqlite3/build/better_sqlite3.node
 → /app/node_modules/.pnpm/better-sqlite3@11.7.0/node_modules/better-sqlite3/build/Debug/better_sqlite3.node
 → /app/node_modules/.pnpm/better-sqlite3@11.7.0/node_modules/better-sqlite3/build/Release/better_sqlite3.node
 → /app/node_modules/.pnpm/better-sqlite3@11.7.0/node_modules/better-sqlite3/out/Debug/better_sqlite3.node
 → /app/node_modules/.pnpm/better-sqlite3@11.7.0/node_modules/better-sqlite3/Debug/better_sqlite3.node
 → /app/node_modules/.pnpm/better-sqlite3@11.7.0/node_modules/better-sqlite3/out/Release/better_sqlite3.node
 → /app/node_modules/.pnpm/better-sqlite3@11.7.0/node_modules/better-sqlite3/Release/better_sqlite3.node
 → /app/node_modules/.pnpm/better-sqlite3@11.7.0/node_modules/better-sqlite3/build/default/better_sqlite3.node
 → /app/node_modules/.pnpm/better-sqlite3@11.7.0/node_modules/better-sqlite3/compiled/18.20.6/linux/x64/better_sqlite3.node
 → /app/node_modules/.pnpm/better-sqlite3@11.7.0/node_modules/better-sqlite3/addon-build/release/install-root/better_sqlite3.node
 → /app/node_modules/.pnpm/better-sqlite3@11.7.0/node_modules/better-sqlite3/addon-build/debug/install-root/better_sqlite3.node
 → /app/node_modules/.pnpm/better-sqlite3@11.7.0/node_modules/better-sqlite3/addon-build/default/install-root/better_sqlite3.node
 → /app/node_modules/.pnpm/better-sqlite3@11.7.0/node_modules/better-sqlite3/lib/binding/node-v108-linux-x64/better_sqlite3.node
    at bindings (/app/node_modules/.pnpm/bindings@1.5.0/node_modules/bindings/bindings.js:126:9)
    at new Database (/app/node_modules/.pnpm/better-sqlite3@11.7.0/node_modules/better-sqlite3/lib/database.js:48:64)
    at BetterSqlite3Driver.Database [as sqlite] (/app/node_modules/.pnpm/better-sqlite3@11.7.0/node_modules/better-sqlite3/lib/database.js:11:10)
    at BetterSqlite3Driver.createDatabaseConnection (/app/node_modules/.pnpm/typeorm@0.3.20_better-sqlite3@11.7.0_sqlite3@5.1.7_ts-node@10.9.2_@types+node@20.17.9_typescript@5.7.2_/node_modules/typeorm/driver/better-sqlite3/BetterSqlite3Driver.js:88:41)
    at async BetterSqlite3Driver.connect (/app/node_modules/.pnpm/typeorm@0.3.20_better-sqlite3@11.7.0_sqlite3@5.1.7_ts-node@10.9.2_@types+node@20.17.9_typescript@5.7.2_/node_modules/typeorm/driver/sqlite-abstract/AbstractSqliteDriver.js:171:35)
    at async DataSource.initialize (/app/node_modules/.pnpm/typeorm@0.3.20_better-sqlite3@11.7.0_sqlite3@5.1.7_ts-node@10.9.2_@types+node@20.17.9_typescript@5.7.2_/node_modules/typeorm/data-source/DataSource.js:136:9)
[Nest] 1  - 02/15/2025, 1:23:04 PM   ERROR [TypeOrmModule] Unable to connect to the database. Retrying (2)...
Error: Could not locate the bindings file. Tried:
```

## 错误日志分析

在 Node 服务端程序连接 SQLite 是用了 [better-sqlite3](https://github.com/WiseLibs/better-sqlite3) 这个库，它是 Node.js 中速度最快、最简单的 SQLite 库，在 Nestjs 里也是支持用 TypeORM 来基于这个库操作 SQLite 。

### better-sqlite3 的产物

和普通的依赖包直接引入 dist 产物开箱即用不一样，它还需要编译一次原生绑定文件，默认情况下，它会尝试在安装时自动构建原生模块，对比本地在 node_modules 里的目录文件，和 npmjs 上的发布文件列表，会发现线上的发布版少了 `better_sqlite3.node` 这个文件，提示的报错信息也是少了这个文件。

![本地在 node_modules 里的 better-sqlite3 目录文件](https://cdn.chengpeiquan.com/img/2025/02/202502161617227.jpg?x-oss-process=image/interlace,1)

![npmjs 上的 better-sqlite3 发布文件列表](https://cdn.chengpeiquan.com/img/2025/02/202502161617228.jpg?x-oss-process=image/interlace,1)

### 构建脚本解析

在 better-sqlite3 的 [package.json](https://github.com/WiseLibs/better-sqlite3/blob/v11.7.0/package.json) 里，可以看到 `install` 脚本就是执行这个安装后编译 Node.js 模块的操作。

```json
{
  "scripts": {
    "install": "prebuild-install || node-gyp rebuild --release",
    "build-release": "node-gyp rebuild --release",
    "build-debug": "node-gyp rebuild --debug",
    "rebuild-release": "npm run lzz && npm run build-release",
    "rebuild-debug": "npm run lzz && npm run build-debug",
    "test": "mocha --exit --slow=75 --timeout=5000",
    "benchmark": "node benchmark",
    "download": "bash ./deps/download.sh",
    "lzz": "lzz -hx hpp -sx cpp -k BETTER_SQLITE3 -d -hl -sl -e ./src/better_sqlite3.lzz"
  }
}
```

这个 npm `install` 脚本，是 npm 的 [生命周期](https://docs.npmjs.com/cli/v8/using-npm/scripts#npm-install) 之一，当执行 npm install 时触发（其它包管理器如 pnpm install 也会触发）。如果 npm 包的根目录下有一个名为 binding.gyp 的文件，当没有自定义 install 或 preinstall 脚本时， npm 将默认使用 [node-gyp](https://github.com/nodejs/node-gyp) rebuild 命令对 binding.gyp 进行编译。

> node-gyp 是 Node.js 官方提供的跨平台命令行工具，用于编译 Node.js 的原生插件模块。

可以看到 better-sqlite3 的根目录下，也是存在一个 [binding.gyp](https://github.com/WiseLibs/better-sqlite3/blob/v11.7.0/binding.gyp) 文件，所以在 install 依赖的时候，better-sqlite3 会尝试使用 `prebuild-install` 来下载已编译好的二进制文件，如果没有找到匹配的文件，则会退回使用 `node-gyp rebuild --release` 来手动编译源代码。

better-sqlite3 这行 install 命令的意思是：

1. prebuild-install：

   - 这个命令会首先检查是否有已经构建好的二进制文件（预编译的二进制文件）。 它是由 [prebuild-install](https://github.com/prebuild/prebuild-install) 这个工具提供的，用来自动下载已编译好的二进制文件，避免在安装时重新编译原生模块，这个步骤是为了加速安装过程，并且能够在大多数情况下避免编译原生代码，尤其是针对不同平台的预编译文件。
   - prebuild-install 会检查与当前 Node.js 版本和操作系统匹配的预编译包，如果找到了，则直接使用。

2. node-gyp rebuild --release：
   - 如果没有找到匹配的预编译文件（比如第一次安装时或没有适用的二进制文件），则会执行 node-gyp rebuild，这会尝试从源代码编译原生模块。
   - node-gyp 是一个用于编译 Node.js 本地模块的工具，它会根据模块中的 C++ 源代码生成并编译 .node 文件。
   - --release 参数表示以发布模式编译（优化后的版本），而不是调试模式。

但以上虽然是理论上的预期方案和兜底方案，但不知道为什么在 CI 机器上居然都没有执行成功，导致最后缺少了这个编译好的二进制文件。

## 解决思路

既然确认问题就是因为少了这个编译的 Node.js 模块，那么可以尝试手动 build 一下，主动生成 `better_sqlite3.node` 文件。

因此在 Dockerfile 里，通过 `pnpm i` 之类安装项目依赖这一步的后面，添加如下代码：

```dockerfile
# Dockerfile

# ...

RUN apk add --update --no-cache python3 build-base gcc && ln -sf /usr/bin/python3 /usr/bin/python
RUN cd node_modules/better-sqlite3 && pnpm build-release

# ...
```

手动安装编译需要的依赖，并手动执行 better-sqlite3 的构建脚本，主动生成运行程序需要的 `better_sqlite3.node` 文件，然后就一切恢复正常了！

## 感慨一下

之前 CI 构建没问题的时候是基于 Ubuntu 22.04.5 ，现在构建失败的时候是基于 Ubuntu 24.04.1 ，只能说 CI 机器的新系统环境少了一些预装的依赖，导致 node-gyp build 没有执行成功。

这次自己的主服务器迁移是从旧机器的 CentOS 7 迁移到新机器的 Debian 12 ，在选择 Debian 之前，还一度先装了 Ubuntu 24 ，然后看到一些建议说作为主服务器还是稳定优先，建议用 Debian ，所以就重新装了系统。

![来自大佬的踩坑经验建议](https://cdn.chengpeiquan.com/img/2025/02/202502161727289.jpg?x-oss-process=image/interlace,1)

没想到话音刚落就在 CI 机器踩了 Ubuntu 的坑，害，对 Linux 这些系统版本不太熟，还是得多多学习呀。
