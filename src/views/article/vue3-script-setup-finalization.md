---
title: Vue3.0最新动态：script-setup定稿 部分实验性API将弃用
desc: 从尤大的Twitter上获取到了最新的开发进展，期待已久的script-setup组件模式终于定稿，不再是实验性功能了，当然对比之前的实验性阶段也有一些新的变化，包括一些API被弃用，同时也有新的API补充进来代替原有的功能。
keywords: script setup,vue 3.0 script setup,vue3 script setup,script setup prop,script setup emit,defineProps,vue 3.0 defineProps,vue defineProps,vue3 defineProps,prop defineProps,setup defineProps,defineEmits,vue 3.0 defineEmits,vue defineEmits,vue3 defineEmits,emit defineEmits,setup defineEmits,useAttrs,vue 3.0 useAttrs,vue useAttrs,vue3 useAttrs,setup useAttrs,useSlots,vue 3.0 useSlots,vue useSlots,vue3 useSlots,setup useSlots
date: 2021-07-05 13:15:13
cover: https://cdn.jsdelivr.net/gh/chengpeiquan/assets-storage//img/2021/07/20210705181949.jpg
categories:
  - tech
repo: https://github.com/chengpeiquan/learning-vue3
---

[[toc]]

今天一早收到一条 issue [#107](https://github.com/chengpeiquan/learning-vue3/issues/107) ，有开发者在咨询我 Vue 3.0 script setup 的新 API 怎么用。

最近一段时间挺忙，加上官方的开发动态也不是很多新东西，所以关注的比较少，看了一下 release 记录，发现最新的 2 个小版本对这个新特性改动还算蛮大的，之前的用法都调整了不少。

今天距离上一次发文讨论 script-setup 新特性已经有 4 个多月了（[回顾上一篇](https://chengpeiquan.com/article/vue3-script-setup.html)），虽然截止至 7 月 2 日的 `3.1.4` 版本，script-setup 还是处于实验性阶段，但在同一天，尤大在 [twitter](https://twitter.com/youyuxi/status/1410744671848910851) 上发布了一条推文，预告了它将会在 `3.2.0` 版本脱离实验状态，正式进入 Vue 3.0 的队伍。

先简单梳理一下本次定稿下来的一些调整：

## useContext API 被弃用

在原先，可以通过该 API 来获取组件的上下文信息，包含了 attrs 、slots 、emit、expose 等父子组件通信数据和方法。

```ts
// 导入 useContext 组件
import { useContext } from 'vue'

// 获取 context
const ctx = useContext()
```

该 API 将在 3.2 版本之后删除，context 里面的数据，会用新的 useSlots 和 useAttrs API 来代替。

## 新增 useSlots API 和 useAttrs API

在 useContext API 被删除后，原先的上下文数据，将由这两个新 API 获取到。

### useAttrs

顾名思义， useAttrs 可以是用来获取 attrs 数据的（也就是非 props 的属性值）。

```ts
// 导入 useAttrs 组件
import { useAttrs } from 'vue'

// 获取 attrs
const attrs = useAttrs()

// attrs是个对象，和 props 一样，需要通过 key 来得到对应的单个 attr
console.log(attrs.msg);
```

如果当前组件里没有将某个属性指定为 props，那么父组件绑定下来的属性值，都会进入到 attrs 里，通过这个新 API 来拿到。

### useSlots

同样，通过 API 的命名也能了解它是用来获取插槽数据的。

但这个 API 对大部分同学来说应该用的比较少，因为大部分 Vue 开发者应该都是用的 SFC 模式（单组件），插槽可以直接在 template 里使用 `<slot />` 标签渲染。

所以，我个人觉得这个 API 的目标用户是面向 JSX / TSX 的开发者，简单的用法参考如下：

父组件，可以传入默认插槽和命名插槽：

```html
<template>
  <!-- 子组件 -->
  <ChildTSX>
    <!-- 默认插槽 -->
    <p>I am a default slot from TSX.</p>
    <!-- 默认插槽 -->

    <!-- 命名插槽 -->
    <template #msg>
      <p>I am a msg slot from TSX.</p>
    </template>
    <!-- 命名插槽 -->
  </ChildTSX>
  <!-- 子组件 -->
</template>

<script setup lang="ts">
import ChildTSX from '@cp/context/Child.tsx'
</script>
```

那么在 JSX / TSX 的子组件，通过 useSlots 来获取父组件传进来的 slots 数据进行渲染：

```ts
import { defineComponent, useSlots } from 'vue'

const ChildTSX = defineComponent({
  setup() {
    // 获取插槽数据
    const slots = useSlots()

    // 渲染组件
    return () => (
      <div>
        // 渲染默认插槽
        <p>{ slots.default ? slots.default() : '' }</p>

        // 渲染命名插槽
        <p>{ slots.msg ? slots.msg() : '' }</p>
      </div>
    )
  },
})

export default ChildTSX
```

## 新增 defineExpose API

在标准组件写法里，子组件的数据都是默认隐式暴露给父组件的，但在 script-setup 模式下，所有数据只是默认 return 给 template 使用，不会暴露到组件外，所以父组件是无法直接通过挂载 ref 变量获取子组件的数据。

如果要调用子组件的数据，需要先在子组件显示的暴露出来，才能够正确的拿到，这个操作，就是由 expose 来完成。

expose 也是 context 的一个组件成员，原来的用法，是从 useContext 里导出：

```ts
// 导入 useContext 组件
import { useContext } from 'vue'

// 启用expose组件
const { expose } = useContext();

// 定义一个想提供给父组件拿到的数据
const msg: string = 'Hello World!';

// 显示暴露的数据，才可以在父组件拿到
expose({
  msg
});
```

由于 useContext 会在未来版本里移除，所以新增了 defineExpose API 来实现 expose 的功能。

新的 API 用法：

```ts
// 导入 defineExpose 组件
import { defineExpose } from 'vue'

// 定义数据
const msg: string = 'Hello World!'

// 暴露给父组件
defineExpose({
  msg
})
```

父组件就可以通过 ref API 去拿到子组件暴露出来的 `msg` 数据了。

## 改名 defineEmits API

使用 defineEmits 取待原来的 defineEmit API ，也就是改名了。

好吧，我之前的文章还特地强调了 defineProps 是复数结尾，带有 s，而 defineEmit 没有，如今，都统一了，都是复数形式。

从尤大的更新说明里看，大约只是一个 typo 更新，对比原来的 defineEmit ，目的是使用新的 defineEmits 与标准组件的 emits 命名上更为接近，和 defineProps 也更统一。

╮(╯▽╰)╭ 所以用法方面和原来是没什么区别的：

```ts
// 导入 defineEmits 组件
import { defineEmits } from 'vue'

// 获取 emit
const emit = defineEmits(['say-hi', 'change-name']);

// 调用 emit 打招呼
emit('say-hi', 'Hello!');

// 调用 emit 改名
emit('change-name', 'Tom');
```

## 新增 withDefaults API

说完 emits，经常与之同时出现的 props 也有一些变化，本次是带来了一个全新的 withDefaults API，用于辅助 defineProps 来指定 prop 的默认值。

在以前的文章我有提及到，当你用 TypeScript 编程时，defineProps 有两种类型指定方式：

1. 通过构造函数进行检查（传统方法）

第一种方式是使用 JavaScript 原生构造函数进行类型规定，使用这种方法时，如果你要限制 props 的类型和默认值，需要通过一个 “对象” 入参来传递给 defineProps，比如：

```ts
// 导入 defineProps 组件
import { defineProps } from 'vue'

// 定义 props
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

2. 使用类型注解进行检查（TS 专属）

第二种方式是按照 TS 的书写习惯来定义数据类型，这种情况下需要遵循 TypeScript 的类型规范，比如字符串是 string，而不是 String。

```ts
// 导入 defineProps 组件
import { defineProps } from 'vue'

// 对象类型接口
interface UserInfo {
  id: number
  age: number
}

// 定义 props
defineProps<{
  name: string
  phoneNumber: number
  userInfo: UserInfo
  tags: string[]
}>()
```

在此之前，使用第二种方法，是无法指定默认值的（在当时的 RFC 的文档里也有说明无法指定）。

如今，这个新的 withDefaults API 可以让你在使用 TS 类型系统时，也可以指定 props 的默认值。

它接收两个入参：

参数|类型|含义
:--|:--|:--
props|object|通过 defineProps 传入的 props
defaultValues|object|根据 props 的 key 传入默认值

可能缺乏一些官方描述，还是看参考用法可能更直观：

```ts
import { defineProps, withDefaults } from 'vue'

withDefaults(defineProps<{
  size?: number
  labels?: string[]
}>(), {
  size: 3,
  labels: () => ['default label']
})
```

## 顶级 await 的支持

不必再配合 async 就可以直接使用 await 了，这种情况下，组件的 setup 会自动变成 async setup 。

```html
<script setup lang="ts">
  const post = await fetch(`/api/post/1`).then((r) => r.json())
</script>
```

它转换成标准组件的写法就是：

```html
<script lang="ts">
import { defineComponent, withAsyncContext } from 'vue'

export default defineComponent({
  async setup() {
    const post = await withAsyncContext(
      fetch(`/api/post/1`).then((r) => r.json())
    )

    return {
      post
    }
  }
})
</script>
```

## 参考资料

以上所有的资料都来自于尤大在 PR 227 的评论通告……

传送门：[\<script setup\> Finalization](https://github.com/vuejs/rfcs/pull/227#issuecomment-870105222)

好隐蔽的说，而且原来的 RFC 仓库的文档也删除了，换了新的文档也是找了好久才翻到新的，本文先根据尤大的通告做一波简单的说明，后续将会详细更新到 [Vue3.0学习教程与实战案例](https://vue3.chengpeiquan.com/) 里。