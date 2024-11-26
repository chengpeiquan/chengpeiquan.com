---
title: 记录一次 ERR_INCOMPLETE_CHUNKED_ENCODING 的问题排查
desc: 最近博客改版也顺便改了部署方式，页面访问也检查了重定向配置等等，看起来似乎没什么问题，但还是收到了一个反馈 RSS 订阅源报错的情况，反馈在 RSS 聚合软件里提示订阅报错了，反馈在 RSS 聚合软件里提示订阅报错了，我自己也尝试了确实不行，奇了怪了！
keywords: ERR_INCOMPLETE_CHUNKED_ENCODING,Nginx配置size,Nginx ERR_INCOMPLETE_CHUNKED_ENCODING,RSS订阅失败
date: 2024-11-25 23:58:02
cover: https://cdn.chengpeiquan.com/img/2024/11/202411260003399.jpg?x-oss-process=image/interlace,1
categories:
  - tech
---

最近博客改版也顺便改了部署方式，页面访问也检查了重定向配置等等，看起来似乎没什么问题，但还是收到了一个反馈 RSS 订阅源报错的情况（ issue 见 [#370](https://github.com/chengpeiquan/chengpeiquan.com/issues/370) ，订阅源见 [feed.xml](https://chengpeiquan.com/feed.xml) ，感谢 [@AsanZhang](https://github.com/AsanZhang) 的反馈 ）。

反馈在 RSS 聚合软件里提示订阅报错了，我自己也尝试了确实不行，奇了怪了！

![在 RSS 聚合软件里提示订阅报错了](https://cdn.chengpeiquan.com/img/2024/11/202411260041359.jpg?x-oss-process=image/interlace,1)

## 报错截图和信息

在浏览器直接访问 XML ，发现 Network 里 Failed 了，控制台还报了个错误信息：

```bash
net::ERR_INCOMPLETE_CHUNKED_ENCODING 200 (OK)
```

截图如下：

![请求状态](https://cdn.chengpeiquan.com/img/2024/11/202411260038604.jpg?x-oss-process=image/interlace,1)

![控制台的错误信息](https://cdn.chengpeiquan.com/img/2024/11/202411260038606.jpg?x-oss-process=image/interlace,1)

这个报错有点眼熟啊！想起前段时间给博客加搜索功能的时候，一开始想做全文搜索，结果部署后也遇到类似的报错，本地 build 完预览没事，线上就跪了。

![之前做搜索的时候也遇到过类似错误](https://cdn.chengpeiquan.com/img/2024/11/202411261313239.jpg?x-oss-process=image/interlace,1)

但那次因为是把所有文章都处理到一个 JSON 文件里，但因为文章里有很多代码块等内容，引起问题的原因比较多，例如可能破坏了数据结构、文件本身也很大，所以做搜索的时候最后决定去掉全文，改成了只搜标题，解决了当时遇到的问题，但没想到在 RSS 这里还是遇到类似的情况了。

那会还在本地 Docker 部署对比了，但本地也正常，愣是没怀疑到线上多了一层 Nginx 可能是个坑。

## 解决思路

由于对 Nginx 并没有过多的深入使用，常年处于基础的转发配置阶段，所以直接请教 GPT 帮我解决。

![ChatGPT 给我的解决思路](https://cdn.chengpeiquan.com/img/2024/11/202411260112210.jpg?x-oss-process=image/interlace,1)

## 调整 Nginx 的配置

原来的配置是这样子，比较早期的默认配置：

```nginx
server_names_hash_bucket_size 128;
client_header_buffer_size 32k;
large_client_header_buffers 4 32k;
client_max_body_size 50m;

sendfile   on;
tcp_nopush on;

keepalive_timeout 60;

tcp_nodelay on;

fastcgi_connect_timeout 300;
fastcgi_send_timeout 300;
fastcgi_read_timeout 300;
fastcgi_buffer_size 64k;
fastcgi_buffers 4 64k;
fastcgi_busy_buffers_size 128k;
fastcgi_temp_file_write_size 256k;
```

按照 GPT 的描述， `proxy_buffer_size` 、 `proxy_buffers` 和 `proxy_busy_buffers_size` 这些参数用于调整代理缓冲区的大小， `fastcgi_buffer_size` 、 `fastcgi_buffers` 和 `fastcgi_busy_buffers_size` 这些参数用于调整 FastCGI 缓冲区的大小，另外还建议我新增 Proxy 缓冲区相关配置。

打开 nginx.conf 文件，修改配置如下：

```diff
fastcgi_connect_timeout 300;
fastcgi_send_timeout 300;
fastcgi_read_timeout 300;
-fastcgi_buffer_size 64k;
+fastcgi_buffer_size 128k;
-fastcgi_buffers 4 64k;
+fastcgi_buffers 4 128k;
-fastcgi_busy_buffers_size 128k;
+fastcgi_busy_buffers_size 256k;
-fastcgi_temp_file_write_size 256k;
+fastcgi_temp_file_write_size 512k;

+proxy_buffer_size 128k;
+proxy_buffers 8 128k;
+proxy_busy_buffers_size 256k;
+proxy_temp_file_write_size 512k;
```

调整完这些配置后，重启 Nginx 服务以应用更改。

```bash
sudo nginx -s reload
```

现在确实解决了，成功订阅！

![成功订阅！](https://cdn.chengpeiquan.com/img/2024/11/202411261331139.jpg?x-oss-process=image/interlace,1)
