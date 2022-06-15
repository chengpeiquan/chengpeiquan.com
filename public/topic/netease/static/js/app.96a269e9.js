/*!
 * name: my-netease
 * version: v0.1.0
 * description: Record my work and life in Netease in the last five years.
 * author: chengpeiquan
 * homepage: https://chengpeiquan.com
 *
 */ ;(function (e) {
  function t(t) {
    for (
      var n, i, s = t[0], p = t[1], m = t[2], u = 0, o = [];
      u < s.length;
      u++
    )
      (i = s[u]),
        Object.prototype.hasOwnProperty.call(c, i) && c[i] && o.push(c[i][0]),
        (c[i] = 0)
    for (n in p) Object.prototype.hasOwnProperty.call(p, n) && (e[n] = p[n])
    r && r(t)
    while (o.length) o.shift()()
    return g.push.apply(g, m || []), a()
  }
  function a() {
    for (var e, t = 0; t < g.length; t++) {
      for (var a = g[t], n = !0, s = 1; s < a.length; s++) {
        var p = a[s]
        0 !== c[p] && (n = !1)
      }
      n && (g.splice(t--, 1), (e = i((i.s = a[0]))))
    }
    return e
  }
  var n = {},
    c = { app: 0 },
    g = []
  function i(t) {
    if (n[t]) return n[t].exports
    var a = (n[t] = { i: t, l: !1, exports: {} })
    return e[t].call(a.exports, a, a.exports, i), (a.l = !0), a.exports
  }
  ;(i.m = e),
    (i.c = n),
    (i.d = function (e, t, a) {
      i.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: a })
    }),
    (i.r = function (e) {
      'undefined' !== typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(e, Symbol.toStringTag, { value: 'Module' }),
        Object.defineProperty(e, '__esModule', { value: !0 })
    }),
    (i.t = function (e, t) {
      if ((1 & t && (e = i(e)), 8 & t)) return e
      if (4 & t && 'object' === typeof e && e && e.__esModule) return e
      var a = Object.create(null)
      if (
        (i.r(a),
        Object.defineProperty(a, 'default', { enumerable: !0, value: e }),
        2 & t && 'string' != typeof e)
      )
        for (var n in e)
          i.d(
            a,
            n,
            function (t) {
              return e[t]
            }.bind(null, n)
          )
      return a
    }),
    (i.n = function (e) {
      var t =
        e && e.__esModule
          ? function () {
              return e['default']
            }
          : function () {
              return e
            }
      return i.d(t, 'a', t), t
    }),
    (i.o = function (e, t) {
      return Object.prototype.hasOwnProperty.call(e, t)
    }),
    (i.p = '')
  var s = (window['webpackJsonp'] = window['webpackJsonp'] || []),
    p = s.push.bind(s)
  ;(s.push = t), (s = s.slice())
  for (var m = 0; m < s.length; m++) t(s[m])
  var r = p
  g.push([0, 'chunk-vendors']), a()
})({
  0: function (e, t, a) {
    e.exports = a('56d7')
  },
  3675: function (e, t, a) {},
  '56d7': function (e, t, a) {
    'use strict'
    a.r(t)
    a('e260'), a('e6cf'), a('cca6'), a('a79d')
    var n = a('2b0e'),
      c = function () {
        var e = this,
          t = e.$createElement,
          a = e._self._c || t
        return a('div', { attrs: { id: 'app' } }, [a('Home')], 1)
      },
      g = [],
      i =
        (a('58c2'),
        a('abb0'),
        function () {
          var e = this,
            t = e.$createElement,
            a = e._self._c || t
          return a(
            'div',
            { staticClass: 'main' },
            [
              e._m(0),
              a('Loading'),
              a('Music'),
              a(
                'swiper',
                {
                  ref: 'mySwiper',
                  staticClass: 'swiper swiper-no-swiping',
                  attrs: { options: e.swiperOption },
                },
                [
                  a(
                    'swiper-slide',
                    { staticClass: 'page page-1' },
                    [a('Page1')],
                    1
                  ),
                  a(
                    'swiper-slide',
                    { staticClass: 'page page-2' },
                    [a('Page2')],
                    1
                  ),
                  a(
                    'swiper-slide',
                    { staticClass: 'page page-3' },
                    [a('Page3')],
                    1
                  ),
                  a(
                    'swiper-slide',
                    { staticClass: 'page page-4' },
                    [a('Page4')],
                    1
                  ),
                  a(
                    'swiper-slide',
                    { staticClass: 'page page-5' },
                    [a('Page5')],
                    1
                  ),
                  a(
                    'swiper-slide',
                    { staticClass: 'page page-6' },
                    [a('Page6')],
                    1
                  ),
                ],
                1
              ),
              a('Header', {
                attrs: { page: e.page },
                on: {
                  turnPage: function (t) {
                    return e.turnPage(arguments)
                  },
                },
              }),
            ],
            1
          )
        }),
      s = [
        function () {
          var e = this,
            t = e.$createElement,
            a = e._self._c || t
          return a('div', { staticClass: 'thumb' }, [
            a('img', {
              attrs: {
                src: '//cdn.chengpeiquan.com/my-netease/img/me-share.jpg',
                alt: '',
              },
            }),
          ])
        },
      ],
      p = function () {
        var e = this,
          t = e.$createElement,
          a = e._self._c || t
        return e.isShow
          ? a(
              'div',
              { staticClass: 'loading', class: { fadeOut: !e.isLoading } },
              [
                a('div', { staticClass: 'me' }, [
                  a('img', {
                    ref: 'me',
                    staticClass: 'top',
                    style:
                      'clip: rect(0px, ' +
                      e.width +
                      'px, ' +
                      e.height +
                      'px, 0px);',
                    attrs: {
                      src: '//cdn.chengpeiquan.com/my-netease/img/me-real.jpg',
                      alt: '',
                    },
                  }),
                  a('img', {
                    staticClass: 'bottom',
                    attrs: {
                      src: '//cdn.chengpeiquan.com/my-netease/img/me.jpg',
                      alt: '',
                    },
                  }),
                  a('div', { staticClass: 'progress' }, [
                    e._v(e._s(e.progress) + '%'),
                  ]),
                ]),
              ]
            )
          : e._e()
      },
      m = [],
      r = {
        data: function () {
          return {
            isLoading: !0,
            isShow: !0,
            width: 0,
            height: 0,
            realHeight: 0,
            progress: 0,
            mainfest: [],
          }
        },
        mounted: function () {
          this.initLoading()
        },
        methods: {
          initLoading: function () {
            var e = this,
              t = new Image()
            ;(t.onload = function () {
              var t = e.$refs.me
              ;(e.width = t.width),
                (e.height = t.height),
                (e.realHeight = t.height),
                e.startLoading()
            }),
              (t.src = a('a6d3'))
          },
          startLoading: function () {
            var e = this,
              t = Math.ceil(100 * Math.random()),
              a = setInterval(function () {
                if (e.height > 0) {
                  ;(t = Math.ceil(100 * Math.random())), e.height--
                  var n = Math.ceil((e.height / e.realHeight) * 100)
                  e.progress = 100 - n
                } else
                  clearInterval(a),
                    (e.isLoading = !1),
                    setTimeout(function () {
                      e.isShow = !1
                    }, 500)
              }, t)
          },
        },
      },
      u = r,
      o = (a('8e9a'), a('0c7c')),
      d = Object(o['a'])(u, p, m, !1, null, '1a336b7f', null),
      h = d.exports,
      l = function () {
        var e = this,
          t = e.$createElement,
          a = e._self._c || t
        return a('div', { staticClass: 'music' }, [
          a('audio', {
            ref: 'bgm',
            attrs: { src: e.music, loop: '', preload: '' },
          }),
          a('div', {
            staticClass: 'control',
            class: [{ pause: !e.isPlaying }, { rotating: e.isPlaying }],
            on: { click: e.control },
          }),
        ])
      },
      y = [],
      v = {
        data: function () {
          return {
            isPlaying: !1,
            isHasFirstTouched: !1,
            music: '//cdn.chengpeiquan.com/mp3/jingzizhong.mp3',
          }
        },
        computed: {
          bgm: function () {
            return this.$refs.bgm
          },
        },
        mounted: function () {
          this.initMusic()
        },
        methods: {
          initMusic: function () {
            var e = this
            document.addEventListener('touchstart', function () {
              e.isPlaying ||
                e.isHasFirstTouched ||
                (e.play(), (e.isHasFirstTouched = !0))
            })
          },
          control: function () {
            this.isPlaying ? this.pause() : this.play()
          },
          play: function () {
            this.bgm.play(), (this.isPlaying = !0)
          },
          pause: function () {
            this.bgm.pause(), (this.isPlaying = !1)
          },
        },
      },
      A = v,
      j = (a('b3c9'), Object(o['a'])(A, l, y, !1, null, '7daf1884', null)),
      q = j.exports,
      b = function () {
        var e = this,
          t = e.$createElement,
          a = e._self._c || t
        return a(
          'header',
          { staticClass: 'header' },
          e._l(e.yearList, function (t, n) {
            return a(
              'span',
              {
                key: n,
                staticClass: 'item',
                class: { cur: n === e.page },
                on: {
                  click: function (t) {
                    return e.$emit('turnPage', n)
                  },
                },
              },
              [e._v(' ' + e._s(t) + ' ')]
            )
          }),
          0
        )
      },
      E = [],
      f = {
        props: ['page'],
        data: function () {
          return { yearList: ['2015', '2016', '2017', '2018', '2019', '2020'] }
        },
      },
      R = f,
      I = (a('a1d1'), Object(o['a'])(R, b, E, !1, null, '384061b2', null)),
      w = I.exports,
      M = function () {
        var e = this,
          t = e.$createElement
        e._self._c
        return e._m(0)
      },
      N = [
        function () {
          var e = this,
            t = e.$createElement,
            a = e._self._c || t
          return a('section', { staticClass: 'content' }, [
            a('p', [
              e._v(
                ' 2015年，在鼠厂成为阿里移动事业群不久，因为马云的两点最真实，于是蹭了个阿里人的身份挥手告别我那群可爱的老伙计们。 '
              ),
            ]),
            a('img', {
              attrs: {
                src: '//cdn.chengpeiquan.com/my-netease/img/page1/1.jpg',
              },
            }),
            a('p', [
              e._v(
                ' 六一儿童节那天，一边庆祝着自己的节日，一边坐在了网易大厦办理了入职手续，成了猪厂的一员。 '
              ),
            ]),
            a('img', {
              attrs: {
                src: '//cdn.chengpeiquan.com/my-netease/img/page1/2.jpg',
              },
            }),
            a('p', [
              e._v(
                ' 当时也没想到能因此一做就直接做了五年，而且一直跟着大话手游，五年时间没换过部门没换过团队，相信在网易应该属于挺国宝的物种了，离职前几天HR电话回访了快半小时，我才反应过来啊原来我一直在大话团队这么多年了，竟然一直只跟一款游戏，竟然相处了这么久。 '
              ),
            ]),
            a('p', [
              e._v(
                ' 现在回想起来，除了工作之外，因为工作带来的生活里的东西也收获得挺多，对部门对团队还是满满的感恩和敬意，这也是我迟迟没有发朋友圈官宣离职的原因，因为总想写点什么，纪念一下这五年的青春。 '
              ),
            ]),
            a('p', { staticClass: 'hr' }, [e._v('分割线')]),
            a('p', [e._v('在网易收获的第一件记忆深刻的事情，是我换了把琴。')]),
            a('p', [
              e._v(
                ' 先把时间轴调回2014年底，当时在鼠厂的最后半年多吧，在建明哥哥的一次偶然借琴的情况下，一直觉得贝斯EEEE根音伴奏应该很无聊的我，第一次摸到了BASS真琴，颠覆了我对低音乐器的理解，并且认识了不少Bassline很出色的乐队。 '
              ),
            ]),
            a('p', [
              e._v(
                ' 于是从那个时候开始开启了我的低音生活，每天下班不再只是打游戏，弹贝斯成了我一个很大的爱好，但是那个时候的收入去掉生活费和家用，只够我拿着Ibanez的入门琴，看着视频里的好琴做做梦。 '
              ),
            ]),
            a('p', [
              e._v(
                ' 没成想入职后不久的6月底，就实现了每个乐手都有的Fender梦，在师傅阿Cat的帮助下，托人从日本帮我带了把性价比特别高的琴回国，于是曾经觉得遥不可及的Fender，自己有一天也会拥有。 '
              ),
            ]),
            a('img', {
              attrs: {
                src: '//cdn.chengpeiquan.com/my-netease/img/page1/3.jpg',
              },
            }),
            a('p', [
              e._v(
                ' 上图就是收到琴当天拍的，Fender的Ajb-m，超Nice！那段时间超喜欢红辣椒乐队，这把琴拿来Slap超顺手！ '
              ),
            ]),
            a('img', {
              attrs: {
                src: '//cdn.chengpeiquan.com/my-netease/img/page1/4.jpg',
              },
            }),
            a('p', [
              e._v(
                ' 然后你看到这张照片旁边的单车了么？那几年我还热衷骑行，晚上经常骑着大行412这个超经典小车子在科韵路和珠江边游走。 '
              ),
            ]),
            a('img', {
              attrs: {
                src: '//cdn.chengpeiquan.com/my-netease/img/page1/5.jpg',
              },
            }),
            a('p', [
              e._v(
                ' 不过运动难免会受伤，于是15年9月，经历了一次挺严重的车祸，骑车在科韵路下坡的时候出了点意外整个人飞了出去（是真的飞了出去 - - 整个人都懵了，躺着起不来）。 '
              ),
            ]),
            a('p', [
              e._v(
                ' 于是手就被摩擦成这样，当时痛归痛，竟然还觉得蛮好看的，因为伤疤面积太大，不仅没有苦恼，反而觉得有花臂的feel，啊哈哈哈哈哈哈真是作死。 '
              ),
            ]),
            a('p', [
              e._v(
                '后来的事情你们都知道了哈哈哈哈（我的手），故事就是从这里开始的！'
              ),
            ]),
            a('img', {
              attrs: {
                src: '//cdn.chengpeiquan.com/my-netease/img/page1/6.jpg',
              },
            }),
            a('img', {
              attrs: {
                src: '//cdn.chengpeiquan.com/my-netease/img/page1/7.jpg',
              },
            }),
            a('p', [
              e._v(
                ' 不幸中的万幸是没伤到骨头，皮外伤也挺快就好了，转眼到了国庆节，忙碌之余玩的烘焙竟然有了第一笔订单（此处感激敲美丽的陛下哈哈哈哈哈，真的是烘焙路上莫大的鼓励！） '
              ),
            ]),
            a('img', {
              attrs: {
                src: '//cdn.chengpeiquan.com/my-netease/img/page1/8.jpg',
              },
            }),
            a('p', [
              e._v(
                ' 换琴三个月后，10月底，卖掉了我人生中的第一把贝斯，从慢慢学会弹根音，到学会slap，还陪我第一次演出，依依不舍，但自己换了Fender后确实没什么机会同时玩两把琴了，很开心有个可爱的妹子接受它，而且妹子也成了好朋友直到现在！ '
              ),
            ]),
            a('img', {
              attrs: {
                src: '//cdn.chengpeiquan.com/my-netease/img/page1/9.jpg',
              },
            }),
            a('img', {
              attrs: {
                src: '//cdn.chengpeiquan.com/my-netease/img/page1/10.jpg',
              },
            }),
            a('img', {
              attrs: {
                src: '//cdn.chengpeiquan.com/my-netease/img/page1/11.jpg',
              },
            }),
            a('img', {
              attrs: {
                src: '//cdn.chengpeiquan.com/my-netease/img/page1/12.jpg',
              },
            }),
            a('p', [
              e._v(
                ' 12月的时候，在想念很久的改装车但又不太会配置的情况下，好邻居乐乐妹子在出车子，跟她收了过来，圆了我改装小4的梦，特别好骑！贼快，贼省力！ '
              ),
            ]),
            a('img', {
              attrs: {
                src: '//cdn.chengpeiquan.com/my-netease/img/page1/13.jpg',
              },
            }),
            a('p', [
              e._v(
                ' 2015年就在这里到年底了，其实说实话，当初刚从鼠厂到猪厂的时候，遇到大话手游刚上线，从以前6点下班变成每天9点多10点下班，甚至从早上8点多直接待到第二天凌晨1点多，加班强度增加不少，有点hold不住，但是生活里愉快的事情也挺多，工作以外的正向收益对于当时的自己来说，还是蛮值得的，于是慢慢的就留下来了。 '
              ),
            ]),
          ])
        },
      ],
      B = {},
      V = Object(o['a'])(B, M, N, !1, null, '7778b016', null),
      X = V.exports,
      x = function () {
        var e = this,
          t = e.$createElement
        e._self._c
        return e._m(0)
      },
      F = [
        function () {
          var e = this,
            t = e.$createElement,
            a = e._self._c || t
          return a('section', { staticClass: 'content' }, [
            a('p', [
              e._v(
                ' 2016年1月，国际惯例，年会表演 - -。初来乍到也没什么特别计划，于是跟着凑人数上去演了个情景剧，于是第一次接触到了假发…… '
              ),
            ]),
            a('p', [
              e._v(
                'emmmm，你们看，你们看，现在的我的头发，又是在这个时候受影响…'
              ),
            ]),
            a('img', {
              attrs: {
                src: '//cdn.chengpeiquan.com/my-netease/img/page2/1.jpg',
              },
            }),
            a('p', [
              e._v(
                ' 那次年会最后没中奖（现在回想起来五年来居然一次也没中过…），不过那一次有个摆摊环节很好玩，组长苏苏知道我会烘焙，让我去负责我们组的摊位，卖！蛋！挞！ '
              ),
            ]),
            a('p', [
              e._v(
                ' 然后那天烤了60个蛋挞在现场卖光了，哈哈哈哈哈（对了，现在不就是提倡摆摊吗，我居然有摆摊经验耶妈耶！） '
              ),
            ]),
            a('img', {
              attrs: {
                src: '//cdn.chengpeiquan.com/my-netease/img/page2/2.jpg',
              },
            }),
            a('p', [
              e._v(
                ' 2月过完年，第一次在春节期间出去旅行，第一次踏上云南的土地，选择了一个比较小众，但是超级美的地方 —— 泸沽湖！ '
              ),
            ]),
            a('p', [
              e._v(
                ' 当时到那边是要从丽江坐大巴去，印象中只有这个方式是最近的，所以当时先飞去丽江落地，再订了辆车送我去泸沽湖，整整颠簸了我六七个小时，差点崩溃的我，但是到了那边，超级美的景色很快就把我安抚了下来！这一趟真的超值，等以后不晕车了，还要再去一次！ '
              ),
            ]),
            a('img', {
              attrs: {
                src: '//cdn.chengpeiquan.com/my-netease/img/page2/3.jpg',
              },
            }),
            a('img', {
              attrs: {
                src: '//cdn.chengpeiquan.com/my-netease/img/page2/4.jpg',
              },
            }),
            a('p', [
              e._v(
                ' 那几天还体验了一把跨省骑行，从云南骑去四川再骑回云南（哈哈哈哈其实就是沿着泸沽湖骑了一圈），一个地方覆盖了两个省，公路骑行真的好玩。 '
              ),
            ]),
            a('p', [
              e._v(
                ' 痛仰的《公路之歌》好像就在云南写的，“梦想在什么地方？总是那么令人向往。” '
              ),
            ]),
            a('img', {
              attrs: {
                src: '//cdn.chengpeiquan.com/my-netease/img/page2/5.jpg',
              },
            }),
            a('img', {
              attrs: {
                src: '//cdn.chengpeiquan.com/my-netease/img/page2/6.jpg',
              },
            }),
            a('p', [
              e._v(
                ' 哈哈哈哈哈哈哈哈哈哈哈哈哈哈那次回来后，带给乐队的手信我竟然用这么粉嫩嫩的袋子装，少女心啊少女心！ '
              ),
            ]),
            a('img', {
              attrs: {
                src: '//cdn.chengpeiquan.com/my-netease/img/page2/7.jpg',
              },
            }),
            a('p', [
              e._v(
                ' 继续插播个我们乐队的笑话（那次排练真实发生的哈哈哈哈哈哈哈哈哈哈哈哈哈）：主唱：“你们三个靠谱吗？”“靠谱！”“那怎么还弹错！？”“都说靠谱了，今天忘了带谱过来……” 哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈…… '
              ),
            ]),
            a('img', {
              attrs: {
                src: '//cdn.chengpeiquan.com/my-netease/img/page2/8.jpg',
              },
            }),
            a('p', [
              e._v(
                ' 3月初的时候，好声音广州海选开启，陪乐队主唱伟大去参赛，成绩还不错哈哈哈哈那次晋级了！ '
              ),
            ]),
            a('img', {
              attrs: {
                src: '//cdn.chengpeiquan.com/my-netease/img/page2/9.jpg',
              },
            }),
            a('p', [
              e._v(
                ' 4月，第一次专程跑来香港看演出，终于实现了我在beyond现场的梦，虽然只是beyond吉他手阿Paul的个人音乐会，但在喜欢beyond的这十几二十年里，主要原因就是有阿Paul的吉他在！ '
              ),
            ]),
            a('img', {
              attrs: {
                src: '//cdn.chengpeiquan.com/my-netease/img/page2/10.jpg',
              },
            }),
            a('p', [
              e._v(
                ' 此时距离2005年beyond解散，已经过去10年了，阿Paul第一次唱《谁伴我闯荡》，那一次超长的尾奏，弹了足足1分30秒，真的重复的让人想哭… '
              ),
            ]),
            a('img', {
              attrs: {
                src: '//cdn.chengpeiquan.com/my-netease/img/page2/11.jpg',
              },
            }),
            a('p', [
              e._v(
                '当时自己录的现场视频，阿Paul沧桑的声音真的很适合这两首歌！'
              ),
            ]),
            a('p', [e._v('《谁伴我闯荡》：')]),
            a('div', { staticClass: 'youku-video' }, [
              a('iframe', {
                attrs: {
                  width: '100%',
                  height: '100%',
                  src: 'https://player.youku.com/embed/XMTUyOTM1MjI3Mg==',
                  frameborder: '0',
                },
              }),
            ]),
            a('p', [e._v('《灰色轨迹》：')]),
            a('div', { staticClass: 'youku-video' }, [
              a('iframe', {
                attrs: {
                  width: '100%',
                  height: '100%',
                  src: 'https://player.youku.com/embed/XMTUyOTM0OTEwNA==',
                  frameborder: '0',
                },
              }),
            ]),
            a('p', [
              e._v(
                ' 看完演出的第二天，发现通利琴行就在住的地方附近，去那里看到了家驹的吉他。 '
              ),
            ]),
            a('img', {
              attrs: {
                src: '//cdn.chengpeiquan.com/my-netease/img/page2/12.jpg',
              },
            }),
            a('img', {
              attrs: {
                src: '//cdn.chengpeiquan.com/my-netease/img/page2/13.jpg',
              },
            }),
            a('p', [e._v('去洗衣街看了beyond当年的二楼后座。')]),
            a('img', {
              attrs: {
                src: '//cdn.chengpeiquan.com/my-netease/img/page2/14.jpg',
              },
            }),
            a('img', {
              attrs: {
                src: '//cdn.chengpeiquan.com/my-netease/img/page2/15.jpg',
              },
            }),
            a('p', [
              e._v(
                ' 五月的时候大话工作室开启了大话手游内部pk赛，跟组里的小伙伴本来只是想玩一玩，结果在马军师和稽老板的指挥下，一路吊打各路选手，直接冲到总决赛，牛逼！ '
              ),
            ]),
            a('img', {
              attrs: {
                src: '//cdn.chengpeiquan.com/my-netease/img/page2/16.jpg',
              },
            }),
            a('p', [e._v('哈哈哈冠军是策划队伍，虽败犹荣！')]),
            a('img', {
              attrs: {
                src: '//cdn.chengpeiquan.com/my-netease/img/page2/17.jpg',
              },
            }),
            a('p', [e._v('那一背包的iPhone真的好重哈哈哈哈哈哈！！！！！！')]),
            a('img', {
              attrs: {
                src: '//cdn.chengpeiquan.com/my-netease/img/page2/18.jpg',
              },
            }),
            a('p', [
              e._v(
                ' 5月底，获得公司旅游名额，第一次出国（真的！），那一次，选择去韩国看美女（事实证明韩剧就是韩剧hhhhhhhhhhhhhh）。 '
              ),
            ]),
            a('img', {
              attrs: {
                src: '//cdn.chengpeiquan.com/my-netease/img/page2/19.jpg',
              },
            }),
            a('p', [e._v('去了趟韩国还学会了做韩式炸鸡，真有我的！！！')]),
            a('img', {
              attrs: {
                src: '//cdn.chengpeiquan.com/my-netease/img/page2/20.jpg',
              },
            }),
            a('p', [e._v('6月，入职网易一周年，给自己做了个轻芝士蛋糕庆祝。')]),
            a('img', {
              attrs: {
                src: '//cdn.chengpeiquan.com/my-netease/img/page2/21.jpg',
              },
            }),
            a('p', [
              e._v(
                '同时庆祝摸贝斯两周年，顺便换了个贝斯音箱，一直用到了现在。'
              ),
            ]),
            a('img', {
              attrs: {
                src: '//cdn.chengpeiquan.com/my-netease/img/page2/22.jpg',
              },
            }),
            a('p', [e._v('7月，网易半年度优秀员工！')]),
            a('img', {
              attrs: {
                src: '//cdn.chengpeiquan.com/my-netease/img/page2/23.jpg',
              },
            }),
            a('p', [e._v('达成了从广州骑行去佛山的成就！')]),
            a('img', {
              attrs: {
                src: '//cdn.chengpeiquan.com/my-netease/img/page2/24.jpg',
              },
            }),
            a('img', {
              attrs: {
                src: '//cdn.chengpeiquan.com/my-netease/img/page2/25.jpg',
              },
            }),
            a('p', [e._v('月底，黑妹来到我家，从此过上了猫奴的日子！！！')]),
            a('img', {
              attrs: {
                src: '//cdn.chengpeiquan.com/my-netease/img/page2/26.jpg',
              },
            }),
            a('p', [
              e._v(
                '8月，过了一个很撑的生日，那天从早餐直落宵夜，给自己做了一天吃的…'
              ),
            ]),
            a('img', {
              attrs: {
                src: '//cdn.chengpeiquan.com/my-netease/img/page2/27.jpg',
              },
            }),
            a('p', [
              e._v('9月，第一次给贝斯换上荧光弦，从此爱上了黑粉配色 - -'),
            ]),
            a('p', [e._v('before：')]),
            a('img', {
              attrs: {
                src: '//cdn.chengpeiquan.com/my-netease/img/page2/28.jpg',
              },
            }),
            a('p', [e._v('after：')]),
            a('img', {
              attrs: {
                src: '//cdn.chengpeiquan.com/my-netease/img/page2/29.jpg',
              },
            }),
            a('p', [
              e._v(
                ' 10月，因为痛仰的《西湖》，特地跑了一趟杭州，那天在西湖边听着《西湖》，循环了一个下午。 '
              ),
            ]),
            a('img', {
              attrs: {
                src: '//cdn.chengpeiquan.com/my-netease/img/page2/30.jpg',
              },
            }),
            a('img', {
              attrs: {
                src: '//cdn.chengpeiquan.com/my-netease/img/page2/31.jpg',
              },
            }),
            a('p', [
              e._v(
                ' 杭州回来后，以我的琴为原型，在阿吉的帮助下，设计出了我第一个纹身，从此踏上了花臂的不归路……（褒义词！哈哈哈！） '
              ),
            ]),
            a('img', {
              attrs: {
                src: '//cdn.chengpeiquan.com/my-netease/img/page2/32.jpg',
              },
            }),
            a('img', {
              attrs: {
                src: '//cdn.chengpeiquan.com/my-netease/img/page2/33.jpg',
              },
            }),
            a('img', {
              attrs: {
                src: '//cdn.chengpeiquan.com/my-netease/img/page2/34.jpg',
              },
            }),
            a('p', [e._v('11月，人生第一次扎辫子……')]),
            a('img', {
              attrs: {
                src: '//cdn.chengpeiquan.com/my-netease/img/page2/35.jpg',
              },
            }),
            a('p', [
              e._v(
                ' 这一年忘记是什么时候，因为原主唱伟大去了深圳，加上大家各有所忙，所以解散了。 '
              ),
            ]),
            a('p', [
              e._v(
                ' 不过在12月的时候，又遇到了郭老板，加上自己部门里的鼓手乐乐，很快又组了支新乐队，这段时间吉他手郭老板教会了我很多东西！ '
              ),
            ]),
            a('img', {
              attrs: {
                src: '//cdn.chengpeiquan.com/my-netease/img/page2/36.jpg',
              },
            }),
            a('img', {
              attrs: {
                src: '//cdn.chengpeiquan.com/my-netease/img/page2/37.jpg',
              },
            }),
            a('img', {
              attrs: {
                src: '//cdn.chengpeiquan.com/my-netease/img/page2/38.jpg',
              },
            }),
          ])
        },
      ],
      C = {},
      z = Object(o['a'])(C, x, F, !1, null, 'd4aecc72', null),
      L = z.exports,
      _ = function () {
        var e = this,
          t = e.$createElement
        e._self._c
        return e._m(0)
      },
      H = [
        function () {
          var e = this,
            t = e.$createElement,
            a = e._self._c || t
          return a('section', { staticClass: 'content' }, [
            a('p', [
              e._v(
                ' 2017年1月，新乐队筹备演出，自己也购置了新的装备，第一次买了个超级厚的琴包，也定格了我后面的琴包风格都是这样的厚重款（主要是真的很保护琴哈哈哈）。 '
              ),
            ]),
            a('img', {
              attrs: {
                src: '//cdn.chengpeiquan.com/my-netease/img/page3/1.jpg',
              },
            }),
            a('p', [
              e._v(
                ' 作为贝斯手，玩了这么久的贝斯才第一次购入DI效果器，Darkglass B7K豪华版，好用！ '
              ),
            ]),
            a('img', {
              attrs: {
                src: '//cdn.chengpeiquan.com/my-netease/img/page3/2.jpg',
              },
            }),
            a('p', [
              e._v(
                ' 随后，第一场演出，然后确定了乐队名字“胸口碎大石”…（丢，真的用了2年多这个名字） '
              ),
            ]),
            a('img', {
              attrs: {
                src: '//cdn.chengpeiquan.com/my-netease/img/page3/3.jpg',
              },
            }),
            a('p', [
              e._v(
                '当时这把琴的黑粉配真是骚出天际了 - - （视频渣画质哈哈哈哈）'
              ),
            ]),
            a('img', {
              attrs: {
                src: '//cdn.chengpeiquan.com/my-netease/img/page3/4.jpg',
              },
            }),
            a('p', [
              e._v(
                '3月，带黑妹去绝育，这一块剃毛的正方形区域，好好笑哈哈哈哈哈哈…'
              ),
            ]),
            a('img', {
              attrs: {
                src: '//cdn.chengpeiquan.com/my-netease/img/page3/5.jpg',
              },
            }),
            a('p', [
              e._v(
                '4月，在公司弄到了一个排练房，乐队终于有个固定的地方可以排练了！！！'
              ),
            ]),
            a('img', {
              attrs: {
                src: '//cdn.chengpeiquan.com/my-netease/img/page3/6.jpg',
              },
            }),
            a('img', {
              attrs: {
                src: '//cdn.chengpeiquan.com/my-netease/img/page3/7.jpg',
              },
            }),
            a('p', [
              e._v('5月，开启了第一场排练直播，哈哈哈哈有点羞涩那个时候。'),
            ]),
            a('img', {
              attrs: {
                src: '//cdn.chengpeiquan.com/my-netease/img/page3/8.jpg',
              },
            }),
            a('p', [
              e._v(
                ' 作为暖场乐队嘉宾，参与了两场网易家庭日的现场活动（网易大厦&侨鑫国际）。 '
              ),
            ]),
            a('img', {
              attrs: {
                src: '//cdn.chengpeiquan.com/my-netease/img/page3/9.jpg',
              },
            }),
            a('img', {
              attrs: {
                src: '//cdn.chengpeiquan.com/my-netease/img/page3/10.jpg',
              },
            }),
            a('img', {
              attrs: {
                src: '//cdn.chengpeiquan.com/my-netease/img/page3/11.jpg',
              },
            }),
            a('p', [
              e._v(
                ' 6月，在小臂上加了个图案，每次想恼怒/生气/抑郁/暴躁的时候，平静下来让负能量慢慢消失，大概就是第二块文身的意义…… '
              ),
            ]),
            a('img', {
              attrs: {
                src: '//cdn.chengpeiquan.com/my-netease/img/page3/12.jpg',
              },
            }),
            a('p', [
              e._v(
                '随后公司旅游，选择了欧洲之行，去了意大利和法国，体验很好的一次出行！'
              ),
            ]),
            a('img', {
              attrs: {
                src: '//cdn.chengpeiquan.com/my-netease/img/page3/13.jpg',
              },
            }),
            a('img', {
              attrs: {
                src: '//cdn.chengpeiquan.com/my-netease/img/page3/14.jpg',
              },
            }),
            a('p', [
              e._v(
                ' 在罗马斗兽场还收获了我日常工作常用的手绘形象的原型照片，阿梅梅拍的，不愧是设计师！ '
              ),
            ]),
            a('img', {
              attrs: {
                src: '//cdn.chengpeiquan.com/my-netease/img/page3/15.jpg',
              },
            }),
            a('p', [
              e._v(
                ' 7月，购入了我的第三把贝斯，念念不忘的MusicMan，依然是我到目前拥有的最贵的一把琴，两万大洋，但是音色、手感真的超棒！！！！！ '
              ),
            ]),
            a('p', [
              e._v(
                ' 五弦贝斯玩起来果然比四弦要更爽！！！！果然乐器这种东西是一分钱一分货！害，不后悔！真的很值！！！ '
              ),
            ]),
            a('img', {
              attrs: {
                src: '//cdn.chengpeiquan.com/my-netease/img/page3/16.jpg',
              },
            }),
            a('img', {
              attrs: {
                src: '//cdn.chengpeiquan.com/my-netease/img/page3/17.jpg',
              },
            }),
            a('img', {
              attrs: {
                src: '//cdn.chengpeiquan.com/my-netease/img/page3/18.jpg',
              },
            }),
            a('img', {
              attrs: {
                src: '//cdn.chengpeiquan.com/my-netease/img/page3/19.jpg',
              },
            }),
            a('p', [
              e._v(
                '当然也没忘记我的小黑，终于买到当时特别难买的粉色背带，继续骚出天际…'
              ),
            ]),
            a('img', {
              attrs: {
                src: '//cdn.chengpeiquan.com/my-netease/img/page3/20.jpg',
              },
            }),
            a('img', {
              attrs: {
                src: '//cdn.chengpeiquan.com/my-netease/img/page3/21.jpg',
              },
            }),
            a('p', [
              e._v('8月生日，这次做了个很多奶油的蛋糕，很好吃哈哈哈哈！'),
            ]),
            a('img', {
              attrs: {
                src: '//cdn.chengpeiquan.com/my-netease/img/page3/22.jpg',
              },
            }),
            a('p', [
              e._v(
                ' 9月，痛仰终于来广州开了专场live，感谢xinlin小姐姐陪我看演出哈哈哈哈！！！！ '
              ),
            ]),
            a('img', {
              attrs: {
                src: '//cdn.chengpeiquan.com/my-netease/img/page3/23.jpg',
              },
            }),
            a('img', {
              attrs: {
                src: '//cdn.chengpeiquan.com/my-netease/img/page3/24.jpg',
              },
            }),
            a('p', [
              e._v('那段时间头发也慢慢变长了，每天都可以扎着去上班了。'),
            ]),
            a('img', {
              attrs: {
                src: '//cdn.chengpeiquan.com/my-netease/img/page3/25.jpg',
              },
            }),
            a('p', [
              e._v(
                '月底，去加了第三个图案，沉迷猫奴的身份，以黑妹为原型，设计了只猫。'
              ),
            ]),
            a('img', {
              attrs: {
                src: '//cdn.chengpeiquan.com/my-netease/img/page3/26.jpg',
              },
            }),
            a('img', {
              attrs: {
                src: '//cdn.chengpeiquan.com/my-netease/img/page3/27.jpg',
              },
            }),
            a('p', [
              e._v(
                ' 10月，在纹了猫的纹身不久，家里迎来新成员，第二只猫，取名“底迪”（台湾腔的弟弟），不过现在都是直接喊弟弟了哈哈哈。 '
              ),
            ]),
            a('p', [
              e._v(
                '感谢婷姐让弟弟来到我身边，特别可爱，特别粘我，超级乖！！！！'
              ),
            ]),
            a('img', {
              attrs: {
                src: '//cdn.chengpeiquan.com/my-netease/img/page3/28.jpg',
              },
            }),
            a('img', {
              attrs: {
                src: '//cdn.chengpeiquan.com/my-netease/img/page3/29.jpg',
              },
            }),
            a('p', [
              e._v(
                ' 黑妹作为姐姐，也是很宠弟弟，相处的特别好，两只猫的生活真的是很棒啊！！！ '
              ),
            ]),
            a('img', {
              attrs: {
                src: '//cdn.chengpeiquan.com/my-netease/img/page3/30.jpg',
              },
            }),
            a('img', {
              attrs: {
                src: '//cdn.chengpeiquan.com/my-netease/img/page3/31.jpg',
              },
            }),
            a('p', [
              e._v(
                ' 11月，有生之年系列，这次终于来到beyond演出现场，感受到了很多不一样的编曲版本，如今都快60岁了，希望以后还能有机会再看看演出。 '
              ),
            ]),
            a('img', {
              attrs: {
                src: '//cdn.chengpeiquan.com/my-netease/img/page3/32.jpg',
              },
            }),
            a('p', [
              e._v(
                ' 12月，加了第四个图，一个留声机，音乐相关哈哈哈，寓意是脑海想象着的音乐、曲子，最终都有能力通过自己的形式表达出来。 '
              ),
            ]),
            a('img', {
              attrs: {
                src: '//cdn.chengpeiquan.com/my-netease/img/page3/33.jpg',
              },
            }),
            a('p', [
              e._v(
                ' 然后又很巧的，纹了留声机之后，郭老板给乐队搞了套静音排练系统，第一次接触这玩意，真6！ '
              ),
            ]),
            a('img', {
              attrs: {
                src: '//cdn.chengpeiquan.com/my-netease/img/page3/34.jpg',
              },
            }),
            a('p', [
              e._v(
                ' 最后，2017年的最后，我去了迷笛音乐节！！！为什么这么激动！因为，这一届之后，深圳再无迷笛！！！！ '
              ),
            ]),
            a('p', [
              e._v(
                ' 而且这次主要是奔着扭曲机器去的，去年才知道有这支牛逼的乐队，没想到年底就有他们的演出，虽然第一次参加音乐节，一个人去有点怂，但还是去了，幸亏去了！！！ '
              ),
            ]),
            a('img', {
              attrs: {
                src: '//cdn.chengpeiquan.com/my-netease/img/page3/35.jpg',
              },
            }),
            a('img', {
              attrs: {
                src: '//cdn.chengpeiquan.com/my-netease/img/page3/36.jpg',
              },
            }),
            a('p', [
              e._v(
                ' 那一天还有二手玫瑰，郁乐队！！！但是太嗨了，自己都没拍到照片，因为那次站在前排都在Pogo哈哈哈哈哈！ '
              ),
            ]),
          ])
        },
      ],
      W = {},
      O = Object(o['a'])(W, _, H, !1, null, '3a25dfe4', null),
      Q = O.exports,
      P = function () {
        var e = this,
          t = e.$createElement
        e._self._c
        return e._m(0)
      },
      Y = [
        function () {
          var e = this,
            t = e.$createElement,
            a = e._self._c || t
          return a('section', { staticClass: 'content' }, [
            a('p', [
              e._v(
                ' 2018年1月，首次把新金属带上网易的舞台，我们来自地下，现在站在了你们的面前。 '
              ),
            ]),
            a('p', [
              e._v(
                ' 长达10分钟的扭曲机器的《镜子中》，给足了贝斯手存在感！！！你现在在听的BGM，就是镜子中的纯音乐版本！！！ '
              ),
            ]),
            a('img', {
              attrs: {
                src: '//cdn.chengpeiquan.com/my-netease/img/page4/1.jpg',
              },
            }),
            a('p', [
              e._v('摄影师拍的照片都缺了点味道，还是放直播截图比较有内味。'),
            ]),
            a('img', {
              attrs: {
                src: '//cdn.chengpeiquan.com/my-netease/img/page4/2.jpg',
              },
            }),
            a('p', [
              e._v(
                '那次还收获了到目前为止最帅的一张舞台照（果然不露脸的都帅哈哈哈哈哈）'
              ),
            ]),
            a('img', {
              attrs: {
                src: '//cdn.chengpeiquan.com/my-netease/img/page4/3.jpg',
              },
            }),
            a('img', {
              attrs: {
                src: '//cdn.chengpeiquan.com/my-netease/img/page4/4.jpg',
              },
            }),
            a('p', [
              e._v(
                ' 5月，去找阿吉帮忙看怎么填充新的图案，画了一下午，最后觉得都不太合适，不过那天画在手臂上的图案倒是让我更向往满手纹身的样子。 '
              ),
            ]),
            a('img', {
              attrs: {
                src: '//cdn.chengpeiquan.com/my-netease/img/page4/5.jpg',
              },
            }),
            a('p', [e._v('7月，头发已经到肩膀了。')]),
            a('img', {
              attrs: {
                src: '//cdn.chengpeiquan.com/my-netease/img/page4/6.jpg',
              },
            }),
            a('p', [
              e._v(
                ' 8月，阿吉给我加了第五个图案，大臂内侧这个位置好痛哈哈哈哈哈哈哈，可能是太嫩了这个部位。 '
              ),
            ]),
            a('img', {
              attrs: {
                src: '//cdn.chengpeiquan.com/my-netease/img/page4/7.jpg',
              },
            }),
            a('img', {
              attrs: {
                src: '//cdn.chengpeiquan.com/my-netease/img/page4/8.jpg',
              },
            }),
            a('p', [
              e._v(
                '那天还顺手拍下店里一个女纹身师Riko的背影，认真工作的女生真好看啊！'
              ),
            ]),
            a('img', {
              attrs: {
                src: '//cdn.chengpeiquan.com/my-netease/img/page4/9.jpg',
              },
            }),
            a('img', {
              attrs: {
                src: '//cdn.chengpeiquan.com/my-netease/img/page4/10.jpg',
              },
            }),
            a('p', [
              e._v(
                ' 随后，跑去澳洲给自己过了个生日，第一次学会了如何自助通关，感谢Cathy在此之前的全程指导哈哈哈哈，还有Amy、鹏哥、万哥的带玩！ '
              ),
            ]),
            a('img', {
              attrs: {
                src: '//cdn.chengpeiquan.com/my-netease/img/page4/11.jpg',
              },
            }),
            a('p', [
              e._v(
                ' 在澳洲拍的最多的就是海鸥了，然后居然跟海鸥混的很熟，那天在悉尼和海鸥面对面的站着，这种照片也拍的出来笑死我了！ '
              ),
            ]),
            a('img', {
              attrs: {
                src: '//cdn.chengpeiquan.com/my-netease/img/page4/12.jpg',
              },
            }),
            a('p', [
              e._v(
                ' 回国后，收到hr送的教师节礼物，作为TMT内训师，第一次感觉教师节跟自己有关系，第一次拍了正装照，哈哈哈花臂少年第一次显得那么正经。 '
              ),
            ]),
            a('img', {
              attrs: {
                src: '//cdn.chengpeiquan.com/my-netease/img/page4/13.jpg',
              },
            }),
            a('img', {
              attrs: {
                src: '//cdn.chengpeiquan.com/my-netease/img/page4/14.jpg',
              },
            }),
            a('p', [
              e._v(
                ' 9月，第一次烫头发，长发甩头，首选郁乐队刘老师的同款蓬松，哈哈哈哈哈那天发微博还被刘老师赞了！ '
              ),
            ]),
            a('img', {
              attrs: {
                src: '//cdn.chengpeiquan.com/my-netease/img/page4/15.jpg',
              },
            }),
            a('img', {
              attrs: {
                src: '//cdn.chengpeiquan.com/my-netease/img/page4/16.jpg',
              },
            }),
            a('p', [
              e._v(
                '10月，第二次去杭州玩，碰巧遇上长滩音乐节，竟然扭机有来！果断去啊！'
              ),
            ]),
            a('img', {
              attrs: {
                src: '//cdn.chengpeiquan.com/my-netease/img/page4/17.jpg',
              },
            }),
            a('p', [e._v('摇旗呐喊的热情，体现的淋漓尽致。')]),
            a('img', {
              attrs: {
                src: '//cdn.chengpeiquan.com/my-netease/img/page4/18.jpg',
              },
            }),
            a('img', {
              attrs: {
                src: '//cdn.chengpeiquan.com/my-netease/img/page4/19.jpg',
              },
            }),
            a('p', [
              e._v('11月11日，扭机的广州专场live，燥翻了整个夜晚！！！'),
            ]),
            a('img', {
              attrs: {
                src: '//cdn.chengpeiquan.com/my-netease/img/page4/20.jpg',
              },
            }),
            a('img', {
              attrs: {
                src: '//cdn.chengpeiquan.com/my-netease/img/page4/21.jpg',
              },
            }),
            a('p', [
              e._v(
                ' 2018是扭曲机器成军20周年，这次演出真的特别开心，《镜子中》的大合唱至今难忘，此处必须放上乐队的特写！ '
              ),
            ]),
            a('img', {
              attrs: {
                src: '//cdn.chengpeiquan.com/my-netease/img/page4/22.jpg',
              },
            }),
            a('img', {
              attrs: {
                src: '//cdn.chengpeiquan.com/my-netease/img/page4/23.jpg',
              },
            }),
            a('img', {
              attrs: {
                src: '//cdn.chengpeiquan.com/my-netease/img/page4/24.jpg',
              },
            }),
            a('img', {
              attrs: {
                src: '//cdn.chengpeiquan.com/my-netease/img/page4/25.jpg',
              },
            }),
            a('img', {
              attrs: {
                src: '//cdn.chengpeiquan.com/my-netease/img/page4/26.jpg',
              },
            }),
            a('p', [
              e._v(
                ' 看完演出的第二天，发现现场认识的妹子小璐璐居然是网易同事，然后她也居然发现，年初看到网易舞台上居然出现《镜子中》这样的曲目，是我们乐队Cover的，哈哈哈哈哈哈哈。 '
              ),
            ]),
            a('img', {
              attrs: {
                src: '//cdn.chengpeiquan.com/my-netease/img/page4/27.jpg',
              },
            }),
            a('img', {
              attrs: {
                src: '//cdn.chengpeiquan.com/my-netease/img/page4/28.jpg',
              },
            }),
            a('img', {
              attrs: {
                src: '//cdn.chengpeiquan.com/my-netease/img/page4/29.jpg',
              },
            }),
            a('p', [
              e._v(
                ' 月中，演出那天认识的奶粉妹子，把我的Fender收了，自从我买了MM琴之后，很少玩了，转给需要的人继续玩，让它继续发光发热！ '
              ),
            ]),
            a('img', {
              attrs: {
                src: '//cdn.chengpeiquan.com/my-netease/img/page4/30.jpg',
              },
            }),
            a('p', [e._v('抱着它最后玩了一把，第二把琴就此告别。')]),
            a('img', {
              attrs: {
                src: '//cdn.chengpeiquan.com/my-netease/img/page4/31.jpg',
              },
            }),
            a('p', [
              e._v(
                ' 12月，期待了很久的迷笛音乐节，得到不给举办的消息，并且永远失去了，以后要看迷笛，得去很远很远很远的地方了。 '
              ),
            ]),
            a('img', {
              attrs: {
                src: '//cdn.chengpeiquan.com/my-netease/img/page4/32.jpg',
              },
            }),
            a('p', [
              e._v('所以说珍惜眼前人有多重要，还好去年去了，今年说没就没了。'),
            ]),
          ])
        },
      ],
      Z = {},
      G = Object(o['a'])(Z, P, Y, !1, null, '020fba19', null),
      k = G.exports,
      S = function () {
        var e = this,
          t = e.$createElement
        e._self._c
        return e._m(0)
      },
      T = [
        function () {
          var e = this,
            t = e.$createElement,
            a = e._self._c || t
          return a('section', { staticClass: 'content' }, [
            a('p', [
              e._v('元旦，找阿吉加了第六个图，鲤鱼抱元宝，直接纹到了手腕。'),
            ]),
            a('img', {
              attrs: {
                src: '//cdn.chengpeiquan.com/my-netease/img/page5/1.jpg',
              },
            }),
            a('img', {
              attrs: {
                src: '//cdn.chengpeiquan.com/my-netease/img/page5/2.jpg',
              },
            }),
            a('p', [
              e._v(
                '1月12号，和璐璐去看了小雨乐队的演出，民乐金属的魅力真的很大！！！'
              ),
            ]),
            a('img', {
              attrs: {
                src: '//cdn.chengpeiquan.com/my-netease/img/page5/3.jpg',
              },
            }),
            a('img', {
              attrs: {
                src: '//cdn.chengpeiquan.com/my-netease/img/page5/4.jpg',
              },
            }),
            a('img', {
              attrs: {
                src: '//cdn.chengpeiquan.com/my-netease/img/page5/5.jpg',
              },
            }),
            a('p', [
              e._v(
                ' 最后还在官方现场宣传照上面，凭着纹身在茫茫人海中快速的找到了自己哈哈哈哈哈哈。 '
              ),
            ]),
            a('img', {
              attrs: {
                src: '//cdn.chengpeiquan.com/my-netease/img/page5/6.jpg',
              },
            }),
            a('p', [
              e._v(
                ' 3月，在开发者大会见到了大漠老师、张鑫旭老师真人，读他们的博客很久了，收获很多，这次大会也收获很多，然而得知这是最后一届关于css的开发者大会…… '
              ),
            ]),
            a('img', {
              attrs: {
                src: '//cdn.chengpeiquan.com/my-netease/img/page5/7.jpg',
              },
            }),
            a('img', {
              attrs: {
                src: '//cdn.chengpeiquan.com/my-netease/img/page5/8.jpg',
              },
            }),
            a('p', [
              e._v(
                '5月，太湖迷笛音乐节，最佳年度摇滚男歌手，颁给了被消失的逼哥。'
              ),
            ]),
            a('img', {
              attrs: {
                src: '//cdn.chengpeiquan.com/my-netease/img/page5/9.jpg',
              },
            }),
            a('p', [
              e._v(
                ' 虽然逼哥被国家封杀到现在，但他的作品却流传了下来，庆幸当初抄过的谱子，什么时候能回来啊！这个世界会好吗？ '
              ),
            ]),
            a('img', {
              attrs: {
                src: '//cdn.chengpeiquan.com/my-netease/img/page5/10.jpg',
              },
            }),
            a('p', [
              e._v('520那天，扭曲机器乐队的道哥来广州，两个贝斯手的合照。'),
            ]),
            a('img', {
              attrs: {
                src: '//cdn.chengpeiquan.com/my-netease/img/page5/11.jpg',
              },
            }),
            a('p', [e._v('月底加了第七个图，寓意三羊开泰。')]),
            a('img', {
              attrs: {
                src: '//cdn.chengpeiquan.com/my-netease/img/page5/12.jpg',
              },
            }),
            a('img', {
              attrs: {
                src: '//cdn.chengpeiquan.com/my-netease/img/page5/13.jpg',
              },
            }),
            a('img', {
              attrs: {
                src: '//cdn.chengpeiquan.com/my-netease/img/page5/14.jpg',
              },
            }),
            a('p', [e._v('然后就飞去泰国玩了！')]),
            a('img', {
              attrs: {
                src: '//cdn.chengpeiquan.com/my-netease/img/page5/15.jpg',
              },
            }),
            a('p', [
              e._v(
                '哈哈哈哈哈哈哈哈哈哈哈哈在那边赶上了榴莲节，榴莲吃到饱太爽了！'
              ),
            ]),
            a('img', {
              attrs: {
                src: '//cdn.chengpeiquan.com/my-netease/img/page5/16.jpg',
              },
            }),
            a('img', {
              attrs: {
                src: '//cdn.chengpeiquan.com/my-netease/img/page5/17.jpg',
              },
            }),
            a('p', [
              e._v(
                ' 啊对了！5月17号，在网易云音乐的【因乐交友】小程序上面，认识了我师妹，一个听歌习惯、生活习惯、吃饭口味、专业技能都基本一样，听核的小姑娘。 '
              ),
            ]),
            a('img', {
              attrs: {
                src: '//cdn.chengpeiquan.com/my-netease/img/page5/18.jpg',
              },
            }),
            a('p', [
              e._v(
                ' 是的，我朋友圈里的师妹，就是她，没有别人hhhhhh，那次本来想约一起去醒山的演出，可惜演出的时间刚好我在泰国，有点可惜，我到现在还没看到醒山的现场呢！ '
              ),
            ]),
            a('p', [
              e._v(
                ' 6月，第二次看小雨的演出，师妹要考试，然后还是和璐璐去看，哈哈哈上次看小雨也是跟的璐璐。 '
              ),
            ]),
            a('img', {
              attrs: {
                src: '//cdn.chengpeiquan.com/my-netease/img/page5/19.jpg',
              },
            }),
            a('img', {
              attrs: {
                src: '//cdn.chengpeiquan.com/my-netease/img/page5/20.jpg',
              },
            }),
            a('img', {
              attrs: {
                src: '//cdn.chengpeiquan.com/my-netease/img/page5/21.jpg',
              },
            }),
            a('p', [e._v('8月生日，师妹给我买了生日礼物，超开心！！！')]),
            a('img', {
              attrs: {
                src: '//cdn.chengpeiquan.com/my-netease/img/page5/22.jpg',
              },
            }),
            a('img', {
              attrs: {
                src: '//cdn.chengpeiquan.com/my-netease/img/page5/23.jpg',
              },
            }),
            a('p', [
              e._v(
                ' 生日后的那个周五晚上，师妹等我加完班，带我飞了一波学生才有的晚市69折的海底捞，5点半下班的她，等我9点加完班一起去赶晚市，第一次见面一点都不拘束，特别活泼！ '
              ),
            ]),
            a('p', [
              e._v(
                ' 9月，在某次和师妹吃饭的过程中，给我试戴了她的耳环，然后我入坑了 - - 回来了买了一堆耳钉哈哈哈哈哈哈哈哈哈哈 '
              ),
            ]),
            a('img', {
              attrs: {
                src: '//cdn.chengpeiquan.com/my-netease/img/page5/24.jpg',
              },
            }),
            a('img', {
              attrs: {
                src: '//cdn.chengpeiquan.com/my-netease/img/page5/25.jpg',
              },
            }),
            a('p', [
              e._v(
                ' 12月，抢到了乐夏的演出票，可惜新年碰上疫情没有如期举行，还不知道会延期到什么时候… '
              ),
            ]),
            a('img', {
              attrs: {
                src: '//cdn.chengpeiquan.com/my-netease/img/page5/26.jpg',
              },
            }),
          ])
        },
      ],
      J = {},
      U = Object(o['a'])(J, S, T, !1, null, '3642e792', null),
      K = U.exports,
      D = function () {
        var e = this,
          t = e.$createElement
        e._self._c
        return e._m(0)
      },
      $ = [
        function () {
          var e = this,
            t = e.$createElement,
            a = e._self._c || t
          return a('section', { staticClass: 'content' }, [
            a('p', [
              e._v('2020，开年遇上疫情，开始戴口罩的生活，哪也不能去，难受。'),
            ]),
            a('img', {
              attrs: {
                src: '//cdn.chengpeiquan.com/my-netease/img/page6/1.jpg',
              },
            }),
            a('p', [
              e._v(
                ' 2月，过了一个很惨的新年，因为饮食不当加上天气大降温，痛风发作的很厉害，直接站不起来，差点死在床上，不过总算死而复生。 '
              ),
            ]),
            a('p', [e._v('要加强锻炼啊！！！！！')]),
            a('img', {
              attrs: {
                src: '//cdn.chengpeiquan.com/my-netease/img/page6/2.jpg',
              },
            }),
            a('p', [
              e._v(
                ' 3月疫情好转，终于可以回广州，师妹给我买了个小奶锅煮面做早餐，庆祝我康复。 '
              ),
            ]),
            a('img', {
              attrs: {
                src: '//cdn.chengpeiquan.com/my-netease/img/page6/3.jpg',
              },
            }),
            a('p', [
              e._v(
                ' 疫情期间闲下来思考了很多，从这两年的工作内容、产品线业务情况、发展方向等等，思考了蛮多东西，代码越写越少，PPT越写越多，这不是我想要的生活，还是决定趁年轻，多考虑一下个人发展，继续深造。 '
              ),
            ]),
            a('p', [e._v('这个6月，在入职五周年之际，选择了离开。')]),
            a('img', {
              attrs: {
                src: '//cdn.chengpeiquan.com/my-netease/img/page6/4.jpg',
              },
            }),
            a('p', [
              e._v(
                ' 泡泡名也改了，签名也改了，这几年在网易收获最多的就是音乐上面的东西，决定以一个贝斯手的身份告别。 '
              ),
            ]),
            a('img', {
              attrs: {
                src: '//cdn.chengpeiquan.com/my-netease/img/page6/5.jpg',
              },
            }),
            a('p', [e._v('好了，网易，再见。')]),
            a('img', {
              attrs: {
                src: '//cdn.chengpeiquan.com/my-netease/img/page6/6.jpg',
              },
            }),
            a('p', [e._v('Bye.')]),
            a('img', {
              attrs: {
                src: '//cdn.chengpeiquan.com/my-netease/img/page6/7.jpg',
              },
            }),
          ])
        },
      ],
      ee = {},
      te = Object(o['a'])(ee, D, $, !1, null, '0c43dac8', null),
      ae = te.exports,
      ne = {
        components: {
          Loading: h,
          Music: q,
          Header: w,
          Page1: X,
          Page2: L,
          Page3: Q,
          Page4: k,
          Page5: K,
          Page6: ae,
        },
        data: function () {
          return {
            page: 0,
            swiperOption: {
              direction: 'vertical',
              speed: 800,
              resistanceRatio: 0,
              effect: 'fade',
            },
          }
        },
        computed: {
          swiper: function () {
            return this.$refs.mySwiper.$swiper
          },
        },
        methods: {
          turnPage: function (e) {
            var t = e[0]
            ;(this.page = t),
              this.swiper.slideTo(t),
              (document.querySelector(
                '.page-'.concat(t + 1, ' .content')
              ).scrollTop = 0)
          },
        },
      },
      ce = ne,
      ge = (a('a1da'), Object(o['a'])(ce, i, s, !1, null, '7c766e0a', null)),
      ie = ge.exports,
      se = {
        name: 'App',
        components: { Home: ie },
        data: function () {
          return {
            isMobile: /iPhone|phone|android|iPod|pad|iPad/i.test(
              navigator.userAgent.toLowerCase()
            ),
          }
        },
        created: function () {
          this.isMobile ||
            (window.location.href =
              'https://chengpeiquan.com/article/my-netease.html')
        },
      },
      pe = se,
      me = Object(o['a'])(pe, c, g, !1, null, null, null),
      re = me.exports,
      ue = a('7212'),
      oe = a.n(ue)
    a('41fa')
    n['default'].use(oe.a),
      (n['default'].config.productionTip = !1),
      new n['default']({
        render: function (e) {
          return e(re)
        },
      }).$mount('#app')
  },
  '58c2': function (e, t, a) {},
  '8e9a': function (e, t, a) {
    'use strict'
    a('d69b')
  },
  a1d1: function (e, t, a) {
    'use strict'
    a('ddf7')
  },
  a1da: function (e, t, a) {
    'use strict'
    a('f5ef')
  },
  a6d3: function (e, t) {
    e.exports =
      'data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAAAeAAD/4QMvaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjYtYzE0NSA3OS4xNjM0OTksIDIwMTgvMDgvMTMtMTY6NDA6MjIgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjAzMkU0MTZFOUMzQTExRUFCNThGQ0JDMjVCODg4QUJBIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjAzMkU0MTZEOUMzQTExRUFCNThGQ0JDMjVCODg4QUJBIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE3IChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjI1OEM1NTEzNEM3MTExRTlCNkM0RDYxMkZGQzhFOTI3IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjI1OEM1NTE0NEM3MTExRTlCNkM0RDYxMkZGQzhFOTI3Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+/+4ADkFkb2JlAGTAAAAAAf/bAIQAEAsLCwwLEAwMEBcPDQ8X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'
  },
  abb0: function (e, t, a) {},
  b3c9: function (e, t, a) {
    'use strict'
    a('3675')
  },
  d69b: function (e, t, a) {},
  ddf7: function (e, t, a) {},
  f5ef: function (e, t, a) {},
})
