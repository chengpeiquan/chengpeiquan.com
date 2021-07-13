---
title: 聊一聊Vue3.0的script-setup 以及全新的props/emits专属API
desc: 今天想聊一聊 Vue 3.0 的 script-setup，以及目前三个很少被提及到的 API —— defineProps 、 defineEmit 和 useContext。截止到我撰写本文，它们在 Vue 3.0 的官网都还没有相关的用法说明，因为目前还属于实验性的新特性，什么时候会并入正式轨道，时间上还不清楚，但事实上在项目里已经可以使用起来了，自己体验了一段时间，真的爽！！！
keywords: script setup,vue 3.0 script setup,vue3 script setup,script setup prop,script setup emit,defineProps,vue 3.0 defineProps,vue defineProps,vue3 defineProps,prop defineProps,setup defineProps,defineEmit,vue 3.0 defineEmit,vue defineEmit,vue3 defineEmit,emit defineEmit,setup defineEmit,useContext,vue 3.0 useContext,vue useContext,vue3 useContext,setup useContext
date: 2021-03-05 00:48:13
cover: https://cdn.jsdelivr.net/gh/chengpeiquan/assets-storage/img/2021/02/20210305211036.jpg
categories:
  - tech
repo: https://github.com/chengpeiquan/learning-vue3
---

[[toc]]

> 2021-07-05：由于版本更新，本文部分内容已有过期，最新的相关内容请阅读：[Vue3.0最新动态：script-setup定稿 部分实验性API将弃用](https://chengpeiquan.com/article/vue3-script-setup-finalization.html)

***

> 2021-03-21：本文已同步到 [高效开发 - Vue3.0 学习教程与实战案例](https://vue3.chengpeiquan.com/efficient.html) 一章，可直接看专题文档了解更多。

今天想聊一聊 Vue 3.0 的 script-setup，以及目前三个很少被提及到的 API —— defineProps 、 defineEmit 和 useContext。

截止到我撰写本文，它们在 Vue 3.0 的官网都还没有相关的用法说明，**因为目前还属于实验性的新特性**，什么时候会并入正式轨道，时间上还不清楚，但事实上在项目里已经可以使用起来了，自己体验了一段时间，真的爽！！！

目前在社区讨论方面，script-setup 的知名度还是可以的，但是对应的另外 3 个专属 API 还是比较默默无名，这说明什么？看热闹的人多，实际体验的人少。

很多人应该还只是处于单纯知道 script-setup 对于原来的 setup 起到什么样的便利性，但一旦哪天真的想用起来，会发现不知道 props 怎么用，不知道 emit 怎么用，用法完全变了，还一时半会搜不到文档，关键时刻被卡住（这一点在 stackoverflow 上的问题咨询体现的比较明显），这也是我想写一写这篇文章的目的，提前科普这几个新特性。

> <br>在阅读这篇文章之前，需要对 Vue 3.0 的 setup 函数有一定的了解，如果还处于完全没有接触过的阶段，请先抽点时间阅读 [单组件的编写 - Vue3.0 学习教程与实战案例](https://vue3.chengpeiquan.com/component.html) 。<br> ><br>另外，根据 vue-next 的 [changelog](https://github.com/vuejs/vue-next/blob/master/CHANGELOG.md) ，记得先把 vue 和 @vue/compiler-sfc 这两个依赖都升级到 v3.0.4 版本或以上（这两个依赖必须保持同样的版本号，我自己是在目前最新的 v3.0.7 版本下跑通了所有 API，版本太低会报错，因为旧版本还没有包含更新的内容）<br>

本文会划分为四个部分：

1. 讲一讲 script-setup

2. 回顾一下 props 和 emits

3. 讲一讲 defineProps 和 defineEmit

4. 讲一讲 useContext

通过这几个维度来讲一讲这个便捷版 setup 的用法和需要注意的问题。

## 什么是 script-setup

在 Vue 3.0 的 .vue 组件里，标准的 setup 用法，默认的 SFC 规范里（注：SFC，即 Single-File Component，`.vue` 单组件）要求，在 setup 里面定义的数据如果需要在 template 使用，都需要 return 出来，如果你使用的是 TypeScript ，还需要借助 defineComponent 来帮助你对类型的自动推导。

```html
<!-- 标准组件格式 -->
<script lang="ts">
  import { defineComponent } from 'vue'

  export default defineComponent({
    setup() {
      // 要给 template 用的数据需要 return 出来才可以
      return {}
    },
  })
</script>
```

关于 setup 和 defineComponent 的说明和用法，可以查阅我以前写的 [全新的 setup 函数](https://vue3.chengpeiquan.com/component.html#%E5%85%A8%E6%96%B0%E7%9A%84-setup-%E5%87%BD%E6%95%B0-new) 。

而 script-setup 的推出是为了让熟悉 3.0 的用户可以更高效率的开发组件，减少一些心智负担，只需要给 script 标签添加一个 setup 属性，那么整个 script 就直接会变成 setup 函数，所有顶级变量、函数，均会自动暴露给模板使用（无需再一个个 return 了）。

Vue 会通过单组件编译器，在编译的时候将其处理回标准组件，所以目前这个方案只适合用 `.vue` 文件写的工程化项目。

```html
<!-- 使用 script-setup 格式 -->
<script setup lang="ts">
  // ...
</script>
```

对，就是这样，代码量瞬间大幅度减少……

而组件的挂载，在原来的写法是需要 import 后再放到 components 里才能够启用：

```html
<!-- 标准组件格式 -->
<script lang="ts">
  import { defineComponent } from 'vue'

  // 需要先导入组件
  import Header from '@cp/Header.vue'

  export default defineComponent({
    // 需要通过 components 才能启用子组件
    components: {
      Header,
    },
    setup() {
      // ...
    },
  })
</script>
```

在 script-setup 模式下，只需要导入组件即可，编译器会自动识别并启用。

```html
<!-- 使用 script-setup 格式 -->
<script setup lang="ts">
  import Header from '@cp/Header.vue'
</script>
```

其他的变量、函数，以及 onMounted 等生命周期，还有像 watch 、 computed 等监听/计算功能，都跟原来一样定义就可以了，没有太大的区别。

区别比较大的还是 props / emits 的定义和调用，由于在 export 组件的时候没有了对象式选项，setup 也没有了函数入参，标准组件的用法无法直接迁移到 script-setup ，因此针对该模式， Vue 3.0 单独推出了三个专属的 API：defineProps 、 defineEmit 和 useContext 。

在了解它俩之前，想先给大家回顾下什么是 props 和 emits ，已经了解熟悉它们的同学可以直接跳去本文 [什么是 defineProps 和 defineEmit](#什么是-defineprops-和-defineemit) 部分。

## 什么是 props 和 emits

通常我们为了避免一个页面（父组件）写的又长又臭，会根据布局/功能模块，把页面切割为不同的小模块（子组件），最后再像搭积木一样把它搭回来，完成我们的作品，我画了一个示例图，就是下面这样子：

![每一个“积木”都是一个组件](https://cdn.jsdelivr.net/gh/chengpeiquan/assets-storage/img/2021/01/20210303180727.png)

比如上面是一个 home.vue , 它包含了 Header.vue / Footer.vue / Content.vue / Sidebar.vue 等子组件，如果此时页面上有一个公共的数据，有多个子组件都需要用到的话，就没有必要在诸如 Content / Sidebar 里分别获取或者定义了，而是在父组件 home 里面处理好后，传递给子组件使用。

props 就是在这种情况下用于父组件向子组件传递数据，而 emits 则是让子组件可以向父组件发起通信。

在 home.vue 定义了一个数据和方法之后，传递给子组件 Content.vue ：

```html
<template>
  <content :name="name" @change-name="changeName" />
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue'
  import Content from '@cp/Content.vue'

  export default defineComponent({
    components: {
      Content,
    },
    setup() {
      const name = ref<string>('Petter')

      const changeName = (): void => {
        name.value = 'Tom'
      }

      return {
        name,
        changeName,
      }
    },
  })
</script>
```

子组件通过 prop 来接收 name 数据，通过 emit 来接收和提交名字的变更方法 changeName ：

```html
<script lang="ts">
  import { defineComponent } from 'vue'

  export default defineComponent({
    props: ['name'],
    emits: ['changeName'],
    setup(props, { emit }) {
      setTimeout(() => {
        emit('changeName', 'Tom')
      }, 1000)
    },
  })
</script>
```

当然，这里不是想说 props 和 emits 怎么用，关于 props 和 emits 的定义和具体用法，在 [props / emits](https://vue3.chengpeiquan.com/communication.html#props-emits) 一节已有详细的总结和案例，这篇文章里就不再展开更多说明啦！

## 什么是 defineProps 和 defineEmit

回来说这两个 API ，顾名思义， defineProps 一看就知道是用来定义 props 的，而 defineEmit 则是用来定义 emits 的，那么它俩跟上面提到的 props / emits 有什么区别？

在你的项目 `node_modules\@vue\runtime-core\dist\runtime-core.d.ts` 里，有一段针对该 API 的注释（不要问我怎么找到这里的，我只能跟你说我用的 VSCode …）：

```ts
/**
 * Compile-time-only helper used for declaring props inside `<script setup>`.
 * This is stripped away in the compiled code and should never be actually
 * called at runtime.
 */
```

很清晰的解释了它们的使用限制，只能用于 script-setup 。

那么我们来看下用便捷版 setup 写法之后，父组件长什么样：

```html
<!-- 这是父组件，template 下发了 prop 和 emit -->
<template>
  <Child :name="name" @change-name="changeName" />
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import Child from '@cp/Child.vue'

  const name = ref<string>('Petter')

  const changeName = (): void => {
    name.value = 'Tom'
  }
</script>
```

有没有瞬间清爽百倍的感觉！！！

在 script-setup 的写法里，所有数据都是默认 `return` 的，子组件也无需通过 `components` 选项进行挂载了，默认导入即生效，在编码过程中，可以大大的提高开发效率。

> 所以疑问就来了，父组件是爽了，那么子组件呢？整个 script 都变成了一个大的 setup function ，没有了组件选项，也没有了 setup 入参，如何获取父组件传下来的 props 和 emits 呢？

所以，这两个新的 API ，就是在 script-setup 里帮助子组件拿到父级传过来的 props 和 emits 。

> 注：以下所有的 JS / TS 部分，如果没有特别说明，都是指写在 `<script setup>` 里

## defineProps

defineProps 是一个方法，内部返回一个对象，也就是挂载到这个组件上的所有 props ，它和普通的 props 用法一样，如果不指定为 prop， 则传下来的属性会被放到 attrs 那边去。

### 基础用法

所以，如果只是单纯在 template 里使用，那么其实就这么简单定义就可以了：

```js
import { defineProps } from 'vue'

defineProps(['name', 'userInfo', 'tags'])
```

使用 `string[]` 数组作为入参，把 prop 的名称作为数组的 item 传给 defineProps 就可以了。

> 记得从 vue 导入 defineProps 噢，下面的代码就不重复 import 啦！！！

如果 script 里的方法要拿到 props 的值，你也可以使用字面量定义：

```ts
const props = defineProps(['name', 'userInfo', 'tags'])

console.log(props.name)
```

但在作为一个 Vue 老玩家，都清楚不显性的指定 prop 类型的话，很容易在协作中引起程序报错，那么应该如何对每个 prop 进行类型检查呢？

有两种方式来处理类型定义。

### 通过构造函数进行检查

这是第一种方式：使用 JavaScript 原生构造函数进行类型规定。

也就是跟我们平时定义 prop 类型时一样， Vue 会通过 instanceof 来进行 [类型检查](https://v3.cn.vuejs.org/guide/component-props.html#%E7%B1%BB%E5%9E%8B%E6%A3%80%E6%9F%A5) 。

使用这种方法，需要通过一个 “对象” 入参来传递给 defineProps，比如：

```ts
defineProps({
  name: String,
  userInfo: Object,
  tags: Array,
})
```

所有原来 props 具备的校验机制，都可以适用，比如你除了要限制类型外，还想指定 name 是可选，并且带有一个默认值：

```ts
defineProps({
  name: {
    type: String,
    required: false,
    default: 'Petter',
  },
  userInfo: Object,
  tags: Array,
})
```

更多的 props 校验机制，可以点击 [带有类型限制的 props](https://vue3.chengpeiquan.com/communication.html#%E5%B8%A6%E6%9C%89%E7%B1%BB%E5%9E%8B%E9%99%90%E5%88%B6%E7%9A%84-props) 和 [可选以及带有默认值的 props](https://vue3.chengpeiquan.com/communication.html#%E5%8F%AF%E9%80%89%E4%BB%A5%E5%8F%8A%E5%B8%A6%E6%9C%89%E9%BB%98%E8%AE%A4%E5%80%BC%E7%9A%84-props) 了解更多。

### 使用类型注解进行检查

这是第二种方式：使用 TypeScript 的类型注解。

和 ref 等 API 的用法一样，defineProps 也是可以使用尖括号 <> 来包裹类型定义，紧跟在 API 后面，另外，由于 defineProps 返回的是一个对象（因为 props 本身是一个对象），所以尖括号里面的类型还要用大括号包裹，通过 `key: value` 的键值对形式表示，如：

```ts
defineProps<{ name: string }>()
```

注意到了吗？这里使用的类型，和第一种方法提到的指定类型时是不一样的，在这里，不再使用构造函数校验，而是需要遵循使用 TypeScript 的类型，比如字符串是 string，而不是 String。

如果有多个 prop ，就跟写 interface 一样：

```ts
defineProps<{
  name: string
  phoneNumber: number
  userInfo: object
  tags: string[]
}>()
```

其中，举例里的 userInfo 是一个对象，你可以简单的指定为 object，也可以先定义好它对应的类型，再进行指定：

```ts
interface UserInfo {
  id: number
  age: number
}

defineProps<{
  name: string
  userInfo: UserInfo
}>()
```

如果你想对某个数据设置为可选，也是遵循 TS 规范，通过英文问号 `?` 来允许可选：

```ts
// name 是可选
defineProps<{
  name?: string
  tags: string[]
}>()
```

如果你想设置可选参数的默认值，这个暂时不支持，不能跟 TS 一样指定默认值，在 RFC 的文档里也有说明目前无法指定。

> Unresolved questions: Providing props default values when using type-only props declaration.

不过如果你确实需要默认指定，并且无需保留响应式的话，我自己测试是可以按照 ES6 的参数默认值方法指定：

```ts
const { name = 'Petter' } = defineProps<{
  name?: string
  tags: string[]
}>()
```

这样如果传入了 name 则按传入的数据，否则就按默认值，但是，有个但是，就是这样 name 就会失去响应性（因为响应式数据被解构后会变回普通数据），请注意这一点！

> 需要强调的一点是：这两种校验方式只能二选一，否则会引起程序报错

## defineEmit

defineEmit 也是一个方法，它接受的入参格式和标准组件的要求是一致的。

> 注意：defineProps 是复数结尾，带有 s，defineEmit 没有！

由于 emit 并非提供给模板直接读取，所以需要通过字面量来定义 emits，最基础的用法也是传递一个 string[] 数组进来，把每个 emit 的名称作为数组的 item 。

```ts
// 获取 emit
const emit = defineEmit(['chang-name'])

// 调用 emit
emit('chang-name', 'Tom')
```

由于 defineEmit 的用法和原来的 emits 选项差别不大，这里也不重复说明更多的诸如校验之类的用法了，可以查看 [接收 emits](https://vue3.chengpeiquan.com/communication.html#%E6%8E%A5%E6%94%B6-emits) 一节了解更多。

## useContext

在标准组件写法里，setup 函数默认支持两个入参：

| 参数    | 类型   | 含义                   |
| :------ | :----- | :--------------------- |
| props   | object | 由父组件传递下来的数据 |
| context | object | 组件的执行上下文       |

这里的第二个参数 context，在 script-setup 写法里，就需要通过 useContext 来获取，一样的，记得先导入依赖：

```ts
// 导入 useContext 组件
import { useContext } from 'vue'

// 获取 context
const ctx = useContext()

// 打印 attrs
console.log(ctx.attrs)
```

你也可以对它进行解构，直接获取到内部的数据：

```ts
// 直接获取 attrs
const { attrs } = useContext()
```

对于 context 的使用和注意事项，如果不了解的话，可以在 [setup 的参数使用](https://vue3.chengpeiquan.com/component.html#setup-%E7%9A%84%E5%8F%82%E6%95%B0%E4%BD%BF%E7%94%A8) 了解更多。

## 参考资料

以上所有的资料都来自于 Vue 的 rfcs 仓库，原文传送门：[script-setup - vuejs/rfcs](https://github.com/vuejs/rfcs/blob/script-setup-2/active-rfcs/0000-script-setup.md) 。

除了看英文说明适当做了翻译之外，大部分坑点都是自己在 DEMO 里运行出来总结的，后面如果有什么变动的话，建议以官网文档的正式版为准，我也会留意他们正式发布后的变化进行内容更新。

## 结语

目前在运行项目的时候，控制台会有提醒：

```bash
[@vue/compiler-sfc] <script setup> is still an experimental proposal.
Follow its status at https://github.com/vuejs/rfcs/pull/227.

[@vue/compiler-sfc] When using experimental features,
it is recommended to pin your vue dependencies to exact versions to avoid breakage.
```

告知 script setup 当前仍然是个实验性的新特性，还没有作为正式特性发布，后面会不会有变化还不好说，本文仅作为目前有用到这个新特性的同学参考。

更多关于 Vue 3.0 的起步教程，可以在 [Vue3.0 学习教程与实战案例](https://vue3.chengpeiquan.com) 了解，稍后有时间我也会把这部分内容一起合并进去。
