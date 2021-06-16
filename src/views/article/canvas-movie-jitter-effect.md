---
title: 电影故障抖动视觉效果实现：对大话手游愚人节专题的探究
desc: 前几天愚人节的时候，大话手游官网上了一个专题，里面很多图片位置都使用了一个类似电影那种画面抖动的效果（目前只剩下一个slogan了，其他都下线了），很好奇是怎么实现的，于是扒了一下页面的源码，了解了一些实现思路，整理一下以后可能会用到。
keywords: 抖屏效果
date: 2020-04-20 23:47:00
cover: https://cdn.jsdelivr.net/gh/chengpeiquan/assets-storage/img/2020/04/1.jpg
categories:
  - tech
repo: https://github.com/chengpeiquan/canvas-movie-jitter-effect
---

[[toc]]

前几天愚人节的时候，大话手游官网上了一个专题（[专题地址](https://dhxy.163.com/2020/gsq/)），里面很多图片位置都使用了一个类似电影那种画面抖动的效果（目前只剩下一个 slogan 了，其他都下线了），很好奇是怎么实现的，于是扒了一下页面的源码，了解了一些实现思路，整理一下以后可能会用到。

## 效果

![](https://cdn.jsdelivr.net/gh/chengpeiquan/assets-storage/img/2020/04/1.gif)

## 起因

其实这个需求如果是直接给你做，你能不能马上有思路去做出来呢？相信大部分人都会有，那我为啥还要去看他们怎么实现的呢？

想做这件事的原因，主要是：

1、想知道对方是怎么实现的，那个抖动的特效，是有素材还是直接前端处理出来的，是不是在自己的预料之中。

2、自己虽然能马上想到一些实现方案，但还是想看看是否有更优秀的解决办法，可以偷师学习！

3、看看这个效果的素材是怎么处理的，以后遇到类似的需求，我是不是可以把一些锅甩给设计师？

## 思路

在看它是怎么实现之前，先凭经验猜测了一下，有多少种可能实现的方式：gif 动图、视频、flash、逐帧动画、图片切换、背景图切换、svg、canvas…（前端牛逼啊！！！！）

当然每种方法的实现成本不一样，对应的体验和性能也不一样，思路有了，那么来验证一下官网是怎么做的。

## 探路

我开始以为是用的视频，因为按网易游戏以往的尿性来说，营销页面上的动态类主视觉基本都是用视频来实现的…那么要怎么看实现方法呢？当然是看 DOM 啊！

![](https://cdn.jsdelivr.net/gh/chengpeiquan/assets-storage/img/2020/04/1-1.jpg)

所以，用的是 canvas，那就有趣了！还好不是视频，直接弄个视频引入的话也就没这篇文章什么事了…

canvas 的动画效果，都是一帧一帧的定时走出来的，这说明素材是来自设计师之手，不一定是前端直接处理的。

接下来就找素材了，这种效果的素材，基本上都是图片，找图片的过程就比较简单了，作为主视觉上这么大的 slogan，结合刚刚查看 DOM 的时候，你发现那个地方的 className 就叫 slogan，那么对应的素材命名，肯定也跟 slogan 有关，单刀直入切到 img，搜索 slogan 关键词，全都出来了。

![](https://cdn.jsdelivr.net/gh/chengpeiquan/assets-storage/img/2020/04/2.jpg)

可以看出他们是把整个动画过程的每一帧，都处理了一张图片素材，我们先把素材弄下来。

![](https://cdn.jsdelivr.net/gh/chengpeiquan/assets-storage/img/2020/04/3.jpg)

一共有 30 帧，30 张一样尺寸的素材，现在素材有了，接下来就可以开始尝试效果复原。

## 实现

实现方案我上面说了，那就一个方案一个方案来看怎么实现，完整的在线 demo 在文末有地址。

方案根据推荐度从低到高说起吧，实现难度基本上也是从低到高这样…

### 方案一：使用 gif 动图

先从最容易想到的方案说起吧，动图从制作成本来说是最省事的…只需要一个 img 标签就可以导进来了。

【推荐】★★★☆☆

【优点】简单，直接导个 gif 引入就完事，纯 html。

【弊端】一般来说动图都会比较大，像 demo 里面只有一个 slogan 动图都去到了 866KB，太多的 gif 对页面的渲染速度有影响，用户体验不是最佳。

```javascript
// html
<section class="section section-01">
  <div class="img">
    <img src="img/slogan.gif">
  </div>
</section>
```

### 方案二：切换图片地址

结合我们的素材，已经是处理好一帧一帧这样的过渡状态，那通过定时切换的效果，把他们按指定的时间和顺序切下去，也可以达到想要的效果。

【推荐】★★☆☆☆

【优点】简单，批量导出每一帧的 png 素材出来，定时替换图片的地址就完事（而且每一帧的素材都不会很大）。

【弊端】需要频繁的操作 DOM，性能方面开销太大。

```javascript
// html
<section class="section section-02">
  <div class="img">
    <img src="img/0.png">
  </div>
</section>

// js
<script type="text/javascript">
  const slogan = {
    index: 0,
    indexMax: 29,
    time: 0,
    dom: document.querySelector('.section-02 .img img'),
    auto(speed){
      let change = setInterval( () => {
        // 动态调整图片帧显示
        this.index < this.indexMax ? this.index++ : this.index = 0;
        this.dom.setAttribute('src', `img/${this.index}.png`);

        // 每运行10次动画周期后销毁定时器，进行垃圾回收后再重新创建
        this.time += speed;
        if ( this.time > this.indexMax * speed * 10) {
          clearInterval(change);
          change = null;
          this.time = 0;
          this.auto(speed);
        }
      }, speed);
    }
  }
  slogan.auto(100);
</script>
```

### 方案三：使用定时器切换背景图

【推荐】★★☆☆☆

和方法二比较类似，只不过方法二是切换图片的 src，这里是切换 div 的样式，来达到换背景图的效果，优缺点说起来差不多。

```javascript
// html
<section class="section section-03">
  <div class="img bg"></div>
</section>

// js
<script type="text/javascript">
  const sloganBg = {
    index: 0,
    indexMax: 29,
    time: 0,
    dom: document.querySelector('.section-03 .bg'),
    auto(speed){
      let change = setInterval( () => {
        // 先移除上一帧的样式
        this.dom.classList.remove(`bg-${this.index}`);

        // 动态调整图片帧显示
        this.index < this.indexMax ? this.index++ : this.index = 0;
        this.dom.classList.add(`bg-${this.index}`);

        // 每运行10次动画周期后销毁定时器，进行垃圾回收后再重新创建
        this.time += speed;
        if ( this.time > this.indexMax * speed * 10) {
          clearInterval(change);
          change = null;
          this.time = 0;
          this.auto(speed);
        }
      }, speed);
    }
  }
  sloganBg.auto(100);
</script>
```

### 方案四：使用 css3 逐帧动画

这个办法我是比较推荐的，实现成本并不高，写起来也很简单，体验又好。

【推荐】★★★★☆

【优点】简单，性能好，生成雪碧图，然后写个动画就完事。

【弊端】部分古董设备不兼容，然后还有个问题，就是像 demo 里的这个素材，做成雪碧图贼他妈大（2.24MB，经过 tinypin 压缩后还是有 640KB），所以素材太大的情况下，最好不要用这个办法来搞。

```javascript
// css
<style>
.go {
  background-image: url('../img/sprites.png');
  background-repeat: no-repeat;
  animation: go steps(29, end) 3s infinite;
}
@keyframes go {
  100% {
    background-position: -0 -8729px;
}
</style>

// html
<section class="section section-04">
  <div class="img bg go"></div>
</section>
```

实现思路：

1、把所有的帧素材都合并为一张雪碧图，减少 http 请求，通过 animation 的背景图移动来实现视觉上的切换。

2、这里运用到了 css3 的 animation-timing-function 的 steps，减少动画过程的代码编写

3、结合第 2 点，因为 steps(number, position)的两个参数，第一个参数是设定有多少帧，第二个参数是设置动画的连续方式，所以根据 steps 的特性，我们生成的雪碧图需要无间隔并且连贯（我生成的就是从上到下排序下来的）

这里推荐一个在线工具：[快速生成雪碧图](https://www.toptal.com/developers/css/sprite-generator)

还有关于里面的 steps 的用法，可以参考张老师的文章：[CSS3 animation 属性中的 steps 功能符深入介绍
](https://www.zhangxinxu.com/wordpress/2018/06/css3-animation-steps-step-start-end/)

### 方案五：使用 canvas 逐帧绘制

终于来到一开头提到的 canvas 实现方案了。大话官网专题，我看了一下源代码，虽然代码被混淆，但还是可以看出，应该是通过引入插件来实现的。

![](https://cdn.jsdelivr.net/gh/chengpeiquan/assets-storage/img/2020/04/4.jpg)

![](https://cdn.jsdelivr.net/gh/chengpeiquan/assets-storage/img/2020/04/5.jpg)

我们自己写其实也不难，因为知道了本身的实现套路（有逐帧素材，然后通过逐帧逐帧去绘制渲染出来），那就可以着手编写代码了。

【推荐】★★★★★

【优点】canvas 在性能上有天然的优势，对于高频率的更新渲染，用 canvas 重绘来实现效果更佳。

【弊端】古董机对 canvas 的兼容性不太友好，如果可以抛弃这些古董用户的话，还是推荐这个方案！

```javascript
// html
<section class="section section-05">
  <div class="img"></div>
</section>

// js
<script type="text/javascript">
  const sloganCanvas = {
    index: 0,
    indexMax: 29,
    canvasWidth: 801,
    canvasHeight: 301,
    init(){
      // 创建画布
      const canvas = document.createElement('canvas');
      canvas['width'] = this.canvasWidth;
      canvas['height'] = this.canvasHeight;
      document.querySelector('.section-05 .img').appendChild(canvas);

      // 绘制内容
      this.draw(this.index, canvas);
    },
    draw(index, canvas){
      const context = canvas.getContext('2d');
      const img = new Image();
      img.onload = () => {
        // 绘制前先清空画布
        context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);

        // 然后再绘制当前帧
        context.drawImage(img, 0, 0, this.canvasWidth, this.canvasHeight);

        // 画完更换下一帧的索引
        this.index < this.indexMax ? this.index++ : this.index = 0;
        setTimeout( () => {
          this.draw(this.index, canvas);
        }, 100);
      }
      img.src = `img/${this.index}.png`;
    }
  }
  sloganCanvas.init();
</script>
```

实现思路：

1、动态创建 canvas，不要写死 canvas 的宽度和高度，实际需求如果要覆盖移动端，请动态计算尺寸后生成（官网专题是不做移动端了，移动端纯 jpg 图，感觉有点可惜）

2、载入每帧的素材的时候，后续操作都要放在 img 的 onload 事件里执行

3、每次进行绘制之前，记得先清空画布，否则会一直叠加绘制，就没法看了…

4、通过 setTimeout 的延时回调控制无限循环动画的速度

## 最后

有几个方案我没有写，关于 svg 对这个需求的实现，暂时没有思路，我选择放弃，以后想到了再来补上！

而视频和 flash 这些多媒体的展示方案，这里就略过了，处理成本对我来说还是比较高的，要配合设计的主视觉去输出优质的素材，我不太擅长…（所以这种方案可以考虑把活交给设计师…）

最后放上 demo 地址：[电影抖屏效果 demo](https://chengpeiquan.github.io/canvas-movie-jitter-effect/index.html)
