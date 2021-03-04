---
title: 聊一聊 Vue 3.0 的 defineProps 和 defineEmit
desc: 今天想聊一聊 Vue 3.0 目前一对很少被提及到的 API —— defineProps 和 defineEmit 。截止到我撰写本文（2021-03-03），它在 Vue 3.0 的官网（中 / 英），都没有找到相关的用法说明，当然，百度也搜不到有人提及他们的用法，目前人民群众的关注只存在于墙外的 Google 和 StackOverflow ，还有官方仓库的几个 issue ……
keywords: defineProps,vue 3.0 defineProps,vue defineProps,vue3 defineProps,prop defineProps,defineEmit,vue 3.0 defineEmit,vue defineEmit,vue3 defineEmit,emit defineEmit
date: 2021-03-03 20:48:13
cover: https://cdn.jsdelivr.net/gh/chengpeiquan/assets-storage/img/2021/02/20210304230008.jpg
---
[[toc]]

今天想聊一聊 Vue 3.0 目前一对很少被提及到的 API —— defineProps 和 defineEmit 。

截止到我撰写本文（2021-03-03），它在 Vue 3.0 的官网（中 / 英），都没有找到相关的用法说明，当然，百度也搜不到有人提及他们的用法，目前人民群众的关注只存在于墙外的 Google 和 StackOverflow ，还有官方仓库的几个 issue ……

不过在了解它俩之前，想先给大家回顾下什么是 props 和 emits ，已经了解熟悉它们的同学可以直接跳去本文 [什么是 defineProps 和 defineEmit](#什么是-defineprops-和-defineemit) 部分。

## 什么是 props 和 emits

通常我们为了避免一个页面（父组件）写的又长又臭，会根据布局/功能模块，把页面切割为不同的小模块（子组件），最后再像搭积木一样把它搭回来，完成我们的作品，我画了一个示例图，就是下面这样子：

![每一个“积木”都是一个组件](https://cdn.jsdelivr.net/gh/chengpeiquan/assets-storage/img/2021/01/20210303180727.png)

比如上面是一个 home.vue , 它包含了 Header.vue / Footer.vue / Content.vue / Sidebar.vue 等子组件，如果此时页面上有一个公共的数据，有多个子组件都需要用到的话，就没有必要在诸如 Content / Sidebar 里分别获取或者定义了，而是在父组件 home 里面处理好后，传递给子组件使用。

props 就是在这种情况下用于父组件向子组件传递数据，而 emits 则是让子组件可以向父组件发起通信。

在 home.vue 定义了一个数据和方法之后，传递给子组件 Content.vue ：

```html
<template>
  <Content
    :name="name"
    @change-name="changeName"
  />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import Content from '@cp/Content.vue'

export default defineComponent({
  components: {
    Content
  },
  setup () {
    const name = ref<string>('Petter');

    const changeName = (): void => {
      name.value = 'Tom';
    }

    return {
      name,
      changeName
    }
  }
})
</script>
```

子组件通过 prop 来接收 name 数据，通过 emit 来接收和提交名字的变更方法 changeName ：

```html
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: [ 'name' ],
  emits: [ 'changeName' ],
  setup (props, { emit }) {

    setTimeout(() => {
      emit('changeName', 'Tom');
    }, 1000);
    
  }
})
</script>
```

当然，这里不是想说 props 和 emits 怎么用，关于 props 和 emits 的定义和具体用法，在 [props / emits](https://vue3.chengpeiquan.com/communication.html#props-emits) 一节已有详细的总结和案例，这篇文章里就不再展开更多说明啦！

## 什么是 defineProps 和 defineEmit

回来说这两个 API ，顾名思义， defineProps 一看就知道是用来定义 props 的，而 defineEmit 则是用来定义 emits 的，那么它俩跟上面提到的 props / emits 有什么区别？为什么目前还没有人去提及到它？这就要从他们的使用场景说起…

### 使用场景

就像上面的例子一样，如果你使用 TypeScript，默认的 SFC 规范里（注：SFC，即 Single-File Component，`.vue` 单组件），在 Vue 3.0 都是需要通过 `defineComponent` 去定义组件，在 `setup` 里也需要 `return` 出来，`template` 部分才能合法的使用这些数据，包括 `components`、`props` 等选项也都需要像 2.0 一样去定义。

关于 setup 和 defineComponent 的说明和用法，可以查阅我以前写的 [全新的 setup 函数](https://vue3.chengpeiquan.com/component.html#%E5%85%A8%E6%96%B0%E7%9A%84-setup-%E5%87%BD%E6%95%B0-new) 。

在刚刚上面的 [什么是 props 和 emits](#什么是-props-和-emits)，我们可以看到在一个 `.vue` 组件里，要写的东西其实还是很啰嗦的，于是目前还有一个实验特性，或者叫 “隐藏” 写法（说它 “隐藏” 主要是还没有出现在官网文档里，但实际上尤大在社区平台上早有安利它），就是通过 “便捷版 setup ” ，减少很多 “无谓” 的操作，减少开发者的心智负担。

我们来看下用便捷版写法之后，父组件长什么样：

```html
<template>
  <Child
    :name="name"
    @change-name="changeName"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Child from '@cp/Child.vue'

const name = ref<string>('Petter');

const changeName = (): void => {
  name.value = 'Tom';
}
</script>
```

有没有瞬间清爽百倍的感觉！！！

`<script setup>` 的写法里，所有数据都是默认 `return` 的，子组件也无需通过 `components` 选项进行挂载了，默认导入即生效，在编码过程中，可以大大的提高开发效率。

>所以疑问就来了，父组件是爽了，那么子组件呢？整个 script 都变成了一个大的 setup function ，没有了组件选项，也没有了 setup 入参，如何获取父组件传下来的 props 和 emits 呢？

所以，这两个新的 API ，就是用在 `<script setup>` 里的，子组件如果想拿到父级传过来的 props 和 emits，可以通过这两个 API 来定义。

它俩在 Vue 3.0 里面是属于 Compile-time-only helper 一类的 API，也就是在 Vue 编译渲染的过程中，起到协助编译的作用，在编译后这部分代码就会被移除，不会包含到构建出来的结果中。

>注：以下所有的 JS / TS 部分，如果没有特别说明，都是指写在 `<script setup>` 里

### defineProps

defineProps 是一个方法，内部返回一个对象，也就是挂载到这个组件上的所有 props ，它和普通的 props 用法一样，如果不指定为 prop， 则传下来的属性会被放到 attrs 那边去。

#### 基础用法

所以，如果只是单纯使用，那么其实就这么简单定义就可以了：

```js
import { defineProps } from 'vue'

defineProps([
  'name',
  'userInfo',
  'tags'
])
```

>记得从 vue 导入 defineProps 噢，下面的代码就不重复 import 啦！！！

使用 string[] 数组作为入参，把 prop 的名称作为数组的 item 传给 defineProps 就可以了。

但在作为一个 Vue 老玩家，都清楚不显性的指定 prop 类型的话，很容易在协作中引起程序报错，那么应该如何对每个 prop 进行类型检查呢？

有两种方式来处理类型定义。

#### 校验之构造函数

这是第一种方式：使用 JavaScript 原生构造函数进行类型规定。

也就是跟我们平时定义 prop 类型时一样， Vue 会通过 instanceof 来进行 [类型检查](https://v3.cn.vuejs.org/guide/component-props.html#%E7%B1%BB%E5%9E%8B%E6%A3%80%E6%9F%A5) 。

使用这种方法，需要通过一个 “对象” 入参来传递给 defineProps，比如：

```ts
defineProps({
  name: String,
  userInfo: Object,
  tags: Array
});
```

所有原来 props 具备的校验机制，都可以适用，比如你除了要限制类型外，还想指定 name 是可选，并且带有一个默认值：

```ts
defineProps({
  name: {
    type: String,
    required: false,
    default: '程沛权'
  },
  userInfo: Object,
  tags: Array
});
```

更多的 props 校验机制，可以点击 [带有类型限制的 props](https://vue3.chengpeiquan.com/communication.html#%E5%B8%A6%E6%9C%89%E7%B1%BB%E5%9E%8B%E9%99%90%E5%88%B6%E7%9A%84-props) 和 [可选以及带有默认值的 props](https://vue3.chengpeiquan.com/communication.html#%E5%8F%AF%E9%80%89%E4%BB%A5%E5%8F%8A%E5%B8%A6%E6%9C%89%E9%BB%98%E8%AE%A4%E5%80%BC%E7%9A%84-props) 了解更多。

#### 校验之类型断言

这是第二种方式：使用 TypeScript 的类型断言。

和 ref 等 API 的用法一样，defineProps 也是可以使用尖括号 <> 来包裹类型定义，紧跟在 API 后面，另外，由于 defineProps 返回的是一个对象（因为 props 本身是一个对象），所以尖括号里面的类型还要用大括号包裹，如：

```ts
defineProps<{ name: string }>();
```

注意到了吗？这里使用的类型，和第一种方法提到的指定类型时是不一样的，在这里，不再使用构造函数校验，而是需要遵循使用 TypeScript 的类型，比如字符串是 string，而不是 String。

如果有多个 prop ，就跟写 interface 一样：

```ts
const { name, phoneNumber, userInfo, tags } = defineProps<{
  name: string;
  phoneNumber: number;
  userInfo: object;
  tags: string[];
}>();
```

其中，举例里的 userInfo 是一个对象，你可以简单的指定为 object，也可以先定义好它对应的类型，再进行指定：

```ts
interface UserInfo {
  id: number;
  age: number;
}

defineProps<{
  name: string;
  userInfo: UserInfo;
}>();
```

如果你想对某个数据设置为可选，也是遵循 TS 规范，通过英文问号 `?` 来允许可选：

```ts
defineProps<{
  name?: string;
  tags: string[];
}>();
```

如果你想设置可选参数的默认值，不能跟 TS 一样指定默认值，可以按照 ES6 的参数默认值方法指定：

```ts
const { name = '程沛权' } = defineProps<{
  name?: string;
  tags: string[];
}>();
```

这样如果传入了 name 则按传入的数据，否则就按默认值，但是，有个但是，就是这样 name 就会失去响应性（因为响应式数据被解构后会变回普通数据），请注意这一点！

### defineEmit

## 参考资料

第一次知道 defineProps 这个 API ，是因为在上手 Vite 的时候，想参考一下大神怎么处理，往来比较多的大神里面，来自 Vue 官方开发团队成员 [@Anthony Fu](https://github.com/antfu) 那段时间特别活跃于 Vite，然后我就参考了他的一些仓库源码，发现，咦，还有这个 API ！

然后就自己查资料，然后通过 VSCode 的一些源码文件跳转功能，从 node_modules\@vue\runtime-core\dist\runtime-core.d.ts 里，找到了 defineProps 和 defineEmit 这两个 API 的类型声明，然后就拓展去看了一下源码。


```bash
[@vue/compiler-sfc] <script setup> is still an experimental proposal.
Follow its status at https://github.com/vuejs/rfcs/pull/227.

[@vue/compiler-sfc] When using experimental features,
it is recommended to pin your vue dependencies to exact versions to avoid breakage.
```

## 结语

目前 `<script setup>` 还没有作为一个正式的新特性（每次 yarn dev 的时候都在控制台有提示），后面会不会有变化还不好说，本文仅作为目前有用到这个新特性的同学参考。

更多关于 Vue 3.0 的通信方式，可以在 [组件之间的通信 - Vue3.0学习教程与实战案例](https://vue3.chengpeiquan.com/communication.html) 了解。