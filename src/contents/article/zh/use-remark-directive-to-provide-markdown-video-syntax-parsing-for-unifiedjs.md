---
title: 使用 remark-directive 为 Unifiedjs 提供 Markdown 视频语法的解析
desc: 最近对博客进行了一次技术栈迁移， Markdown Parser 的整个工作流程都是自己管理的，包括不同结果的输出，例如：提供给 RSS 订阅用的 HTML ，提供给列表和搜索用的 Metadata ，以及提供给详情页作为 React 组件渲染内容用的 JSX ，这些过程并不算复杂，事实上进展确实是很顺利，但是在我以为即将大功告成之际，突然发现渲染出来的内容少了一个东西：我的视频呢？
keywords: markdown video,unifiedjs video,remarkjs video,rehypejs video
date: 2024-11-10 01:34:05
cover: https://cdn.chengpeiquan.com/img/2024/11/202411100141298.jpg?x-oss-process=image/interlace,1
categories:
  - tech
maybeLegacy: true
---

最近对博客进行了一次技术栈迁移，其中对 Markdown 的解析渲染支持也从 [Markdown-it](https://github.com/markdown-it) 系列迁移至 [Unifiedjs](https://github.com/unifiedjs) 系列，在 Unified 的工作流程里，又包含了处理 Markdown 的 [Remarkjs](https://github.com/remarkjs) 系列以及处理 HTML 的 [Rehypejs](https://github.com/rehypejs) 系列。

在博客里， Markdown Parser 的整个工作流程都是自己管理的，包括不同结果的输出，例如：提供给 RSS 订阅用的 HTML ，提供给列表和搜索用的 Metadata ，以及提供给详情页作为 React 组件渲染内容用的 JSX ，这些过程并不算复杂，事实上进展确实是很顺利，但是在我以为即将大功告成之际，突然发现渲染出来的内容少了一个东西：我的视频呢？

## 改版前的表现

改版之前是使用 Markdown-it 作为技术栈， Markdown 代码与 HTML 代码的相处非常和谐，对于没有 Markdown 原生语法支持的 HTML 标签，都可以直接编写 HTML 代码进行渲染，内嵌视频最初就是这样子实现的。

像这样，在 Markdown 里直接编写 HTML 代码，即可直接输出 HTML 。

```md
<video 
  src="https://cdn.chengpeiquan.com/video/my-cats-in-mountain-view-room.mp4" 
  poster="https://cdn.chengpeiquan.com/img/2022/12/20221231235941.jpg?x-oss-process=image/interlace,1"
  title="山景房里的三只猫"
  controls
  preload="auto"
/>
```

但改版后，原本应该渲染为视频的地方，都只剩下一个 `<p></p>` 标签，很明显是在 Markdown 代码转换过程中被过滤了。

## 理解 Unified 的工作流程

像我这种 Parser 流程比较长，中间处理环节还是动态变化的情况，很怕这些奇怪的问题，但还好 Unified 的设计非常清晰，先了解一下实现原理，更方便找到问题的原因。上面提到了 Unified 包含了 Remark 和 Rehype 两个系列的工作流，因为在 Unified 生态的工作过程中，都是基于 AST 语法树工作，可以简单地理解为：

1. 先由 Remark 负责把 Markdown 文件的内容转为 MDAST ，在这个过程中所有代码都是围绕 Markdown 工作
2. 再通过中间插件 [remark-rehype](https://github.com/remarkjs/remark-rehype) ，把 MDAST 转为 HAST
3. 最终由 Rehype 处理 HAST ，自此阶段开始，所有工作都是围绕 HTML 展开，最终输出什么样的结果也是在这个阶段处理

以上流程可以反过来，也就是先处理 HTML 再还原为 Markdown ，如果是这种流程，中间插件需要更换为 [rehype-remark](https://github.com/rehypejs/rehype-remark) 。

> 名词解释：
>
> MDAST —— Markdown Abstract Syntax Tree ， Markdown 抽象语法树
>
> HAST —— Hypertext Abstract Syntax Tree ，超文本抽象语法树

## 问题的排查

了解了工作流程，就可以分三个阶段排查问题了，要么就是在 Remark 环节把 HTML 代码屏蔽了，要么就是 Rehype 环节有问题，要么就是中间的 AST 转换抛弃了这部分代码。

此时 Parser 里的处理器插件是这么启用的：

```ts
const processor = unified()
  .use(remarkPlugins) // Markdown to MDAST
  .use(remarkRehypePlugins) // MDAST to HAST
  .use(rehypePlugins) // HAST to HTML
  .use(reactPlugins) // HTML to JSX

const file = await processor.process(markdown)
```

这里的每一个 Plugins 变量都是一个数组，会根据我的构建场景动态启用插件（相关源码见：[core/parser](https://github.com/chengpeiquan/chengpeiquan.com/blob/main/src/core/parser/index.ts) ），例如：

```ts
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'
import remarkStringify from 'remark-stringify'
import { type PluggableList } from 'unified'

const remarkPlugins: PluggableList = [
  [remarkParse], // e.g. [plugin, pluginOptions]
  [remarkGfm],
  [remarkStringify],
]
```

因此先仅启用 remarkPlugins ，发现一切正常，继续启用 remarkRehypePlugins ，就出问题了， Markdown 里的 `<video />` 标签被过滤了。

所以我在 remark-rehype 的文档里找到了关于 HTML 标签过滤的说明：

> 因为在 markdown 中支持 HTML 是一项繁重的任务（性能和包大小） ，而且并不总是需要的，要同时使用两者，您还必须配置 `allowDangerousHtml: true` 选项。 —— 详见 [When should I use this?](https://github.com/remarkjs/remark-rehype?tab=readme-ov-file#when-should-i-use-this)

## 解决方案

原因被定位到了就很好解决，目前是找到了这些解决方案，可以根据需要处理。

### 开启 allowDangerousHtml

根据 [remark-rehype](https://github.com/remarkjs/remark-rehype) 的文档，仅需开启该选项即可支持将 Markdown 里的 HTML 代码作为半标准节点嵌入 HAST 中 `raw` 。

```ts
import remarkRehype from 'remark-rehype'
import { type PluggableList } from 'unified'

const remarkRehypePlugins: PluggableList = [
  [remarkRehype, { allowDangerousHtml: true }],
]
```

> 注意：除了该插件需要开启该选项之外，像我的博客还使用了 [rehype-stringify](https://github.com/rehypejs/rehype/tree/main/packages/rehype-stringify) 插件，它也需要一起开启该选项。

由于我还使用了 [rehype-sanitize](https://github.com/rehypejs/rehype-sanitize) 用于对 HTML 内容的清理，因此仅开启该选项在我的博客里并不能直接达到目的，还要在 Sanitize 进行放行，并且平时写 React 组件的习惯上，我对 [dangerouslySetInnerHTML](https://react.dev/reference/react-dom/components/common#dangerously-setting-the-inner-html) 的使用非常克制，有一些代码洁癖让我不喜欢这个方案，因此我放弃了它。

### 将 Raw HTML 转为 HAST

在 [remark-rehype](https://github.com/remarkjs/remark-rehype) 的文档里，描述 `allowDangerousHtml` 部分提及到了另外一个插件： [rehype-raw](https://github.com/rehypejs/rehype-raw) 。

这个插件很适合希望支持渲染嵌入在 Markdown 里的 HTML（需要传递 `allowDangerousHtml: true` 给 remark-rehype ）,它可以获取 Markdown 里的 HTML 字符串并将它们作为实际节点包含到 HAST 中。

在开启 allowDangerousHtml 选项时， Markdown 里的 HTML 代码仅作为半标准节点嵌入 HAST 中 `raw` 属性，但配合这个插件，可以将原始的 HTML 字符串解析为标准的 HAST 节点。

处理过程需要依赖一个完整的 HTML 解析器（详见 [parse5](https://github.com/inikulin/parse5) ），它将完全按照浏览器解析的方式重新创建抽象语法树，同时保持原始数据和位置信息完好无损。

注意在使用过程中的插件顺序：

```ts
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'
import rehypeRaw from 'rehype-raw'
import { type PluggableList } from 'unified'

const remarkRehypePlugins: PluggableList = [
  [remarkRehype, { allowDangerousHtml: true }],
]

const rehypePlugins: PluggableList = [
  [rehypeStringify, { allowDangerousHtml: true }],
  [rehypeRaw],
]
```

这个方案处理过程比较繁重，但这是支持不受信任内容的唯一方法，除非类似那种内容完全由用户提交的场景，否则在内容可控的场景下，都不推荐使用这个方案。

### 使用 Markdown 图片语法

这是一个最轻巧的解决方案，几乎没有多余的处理成本。

因为我的博客文章详情页最终是通过 JSX 进行渲染（可参考 [markup/renderer](https://github.com/chengpeiquan/chengpeiquan.com/blob/main/src/components/markup/renderer.tsx) ），因此完整的处理过程是：`Markdown > MDAST > HAST > HTML > JSX` ，在最后一个环节使用 [rehype-react](https://github.com/rehypejs/rehype-react) 的时候，可以将 HTML 代码转换为 React 组件需要的 JSX 代码。

```ts
import rehypeReact, { type Options as RehypeReactOptions } from 'rehype-react'
import { a, img } from './components'
import { Fragment, jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime'
import { type PluggableList } from 'unified'

const components = {
  a, // e.g. `<a />` --> Next.js `<Link />`
  img, // e.g. `<img />` --> Next.js `<Image />`
} as unknown as RehypeReactOptions['components']

const rehypeReactOptions = {
  Fragment,
  components, // e.g. Record<tagName, componentName>
  ignoreInvalidStyle: true,
  jsx,
  jsxs,
  passKeys: true,
  passNode: true,
  development: false,
} satisfies RehypeReactOptions

const reactPlugins: PluggableList = [[rehypeReact, rehypeReactOptions]]
```

所以我想到了一个方案，使用 Markdown 内置的图片语法，将视频链接放在原本需要放图片链接的位置，然后在转 JSX 的过程中，判断 URL 结尾的扩展名将视频 URL 分配给 Video 组件。

```md
![山景房里的三只猫](https://cdn.chengpeiquan.com/video/my-cats-in-mountain-view-room.mp4)
```

```tsx
// components.tsx

const video = async (props: React.VideoHTMLAttributes<HTMLVideoElement>) => {
  // 组件里的其它逻辑
  // ...

  return <video {...props} />
}

export const img = async (props: React.ImgHTMLAttributes<HTMLImageElement>) => {
  // 判断常用的视频文件扩展名，将其转发给视频组件渲染
  if (props?.src?.endsWith('.mp4')) {
    return <video {...props} />
  }

  // 组件里的其它逻辑
  // ...

  return <img {...props} />
}
```

事实上在文章详情里实现很完美，但我考虑到了 RSS 订阅源里的 HTML 代码并没有得到解决，并且这种方式无法配置视频的 `poster` 属性，所以这个方案也被我放弃了。

### 使用 Markdown 自定义指令

这个方案是在 GitHub [Remarkjs Discussions](https://github.com/orgs/remarkjs/discussions) 里搜索时找到了几个讨论，提供了很棒的灵感！

- [Embed videos in markdown? #1043](https://github.com/orgs/remarkjs/discussions/1043)
- [displaying video by link in react-markdown #957](https://github.com/orgs/remarkjs/discussions/957)
- [What can remark actually do / how to display videos in markdown? #557](https://github.com/orgs/remarkjs/discussions/557)
- [How to type a custom plugin on project? #747](https://github.com/orgs/remarkjs/discussions/747)

Remark 提供了这方面的插件支持，仅需安装 [remark-directive](https://github.com/remarkjs/remark-directive) 插件，这是对 [Markdown 指令语法提案](https://talk.commonmark.org/t/generic-directives-plugins-syntax/444) 的实现（这个提案很有意思，值得阅读！），可以使用和 Markdown 十分接近的语法实现一些自定义功能。

看到这里的读者应该不会陌生，很多知名的静态生成器项目都支持自定义指令，例如：

- [告示 - Docusaurus](https://docusaurus.io/zh-CN/docs/markdown-features/admonitions)
- [自定义容器 - VitePress](https://vitepress.dev/zh/guide/markdown#custom-containers)

## 最终实现方案

简单说一下实现方案，最终是通过编写一个 Remark 插件实现自定义指令，以 `:::video` 的语法，在 Markdown 内容里配置视频的 `src` 、 `poster` 、 `title` 属性。

> 源码在 [plugins/remark-video](https://github.com/chengpeiquan/chengpeiquan.com/blob/main/src/core/parser/plugins/remark-video.ts) ，这里贴的代码在未来可能会有变化。

### 所需的依赖

先安装依赖，由于不需要在运行时使用，所以统一安装到 `devDependencies` 里。

```bash
pnpm add -D remark-directive unist-util-visit @types/mdast
```

这些插件的作用：

|       插件       |                     作用                     | 写本文时使用的版本号 |
| :--------------: | :------------------------------------------: | :------------------: |
| remark-directive |             添加对通用指令的支持             |        ^3.0.0        |
| unist-util-visit | 遍历 AST 语法树节点，导出了一个 `visit` 方法 |        ^5.0.0        |
|   @types/mdast   |     为 TypeScript 提供插件主要参数的类型     |        ^4.0.4        |

### 设计时的想法

考虑到需要配置的参数如 `src` 和 `poster` 的 URL 都比较长，用 `leafDirective` 语法会比较难维护，因此选择了 `containerDirective` 语法，按照约定，从上往下分为三行内容，分别是 `src` 、 `poster` 以及 `title` ：

```md
:::video
https://example.com/video-src.mp4
https://example.com/video-poster.jpg
A video title
:::
```

其他的视频播放器属性，由指令插件统一管理，因此不需要在 Markdown 里自定义配置。

### 编写指令插件

按照 README 的例子，很快就能编写一个自定义插件了，这里就不赘述具体的过程，看代码和注释即可。

````ts
import { type Root } from 'mdast'
import { visit } from 'unist-util-visit'
import { isArray, isObject, isString } from '@bassist/utils'

// For the `src` and `poster` attributes
interface LinkNode {
  type: 'link'
  url: string
  children?: unknown[]
  [key: string]: unknown
}

// For the `title` attribute
interface TextNode {
  type: 'text'
  value: string
  [key: string]: unknown
}

interface VideoDirectiveNodeChildren {
  children: (TextNode | LinkNode | unknown)[]
}

interface VideoDirectiveNode {
  type: 'containerDirective'
  name: 'video'
  children: VideoDirectiveNodeChildren[]
  [key: string]: unknown
}

interface HyperScriptData {
  hName?: string
  hProperties?: {
    [key: string]: unknown
  }
  [key: string]: unknown
}

/**
 * With container directive
 *
 * @example
 *
 * ```md
 * :::video
 * src
 * poster
 * title
 * :::
 * ```
 */
const isVideoNode = (i: unknown): i is VideoDirectiveNode => {
  if (!isObject(i)) return false
  const children = i?.children?.[0]?.children
  return (
    i.type === 'containerDirective' &&
    i.name === 'video' &&
    isArray(children) &&
    children.length > 0
  )
}

const isLinkNode = (i: unknown): i is LinkNode => {
  return isObject(i) && i.type === 'link' && isString(i.url) && !!i.url
}

const isTextNode = (i: unknown): i is TextNode => {
  return isObject(i) && i.type === 'text' && isString(i.value) && !!i.value
}

const isValidChildNode = (i: unknown) => isLinkNode(i) || isTextNode(i)

/**
 *
 * @description
 *
 * I have customized a compilation process in Markdown Parser,
 * so not all HTML codes are allowed to be rendered.
 *
 * When Markdown is being converted to AST,
 * many HTML tags will be discarded, and the same is true for Video.
 *
 * In order to uniformly implement custom rendering content,
 * this plugin implements the ability of `video` directive.
 *
 * One more important thing, since rehype-sanitize is enabled,
 * remember to configure the options to allow
 * rendering of video tags and attributes.
 *
 * @example
 *
 * Enter the following into the markdown file:
 *
 * ```md
 * :::video
 * https://example.com/video-src.mp4
 * https://example.com/video-poster.jpg
 * A video title
 * :::
 * ```
 *
 * Compile and output a Video tag:
 *
 * ```html
 * <video
 *  src="https://example.com/video-src.mp4"
 *  poster="https://example.com/video-poster.jpg"
 *  title="Hello World"
 * />
 * ```
 *
 * @returns Transformer
 */
const remarkVideo = () => {
  return (tree: Root) => {
    // Prevents the following judgment from being inferred as never
    visit(tree, (node: unknown) => {
      if (!isVideoNode(node)) return

      const [srcNode, posterNode, titleNode] = node.children[0].children
        .map((i) => {
          if (isLinkNode(i)) return i
          if (isTextNode(i)) {
            i.value = i.value.replace(/\n/g, '').trim()
            if (i.value) return i
          }
          return undefined
        })
        .filter(isValidChildNode)

      const src = srcNode.url
      const poster = posterNode.url
      const title = titleNode.value

      const data = (node.data || (node.data = {})) as HyperScriptData
      data.hName = 'video'
      data.hProperties = {
        src,
        poster,
        title,
        controls: true,
        preload: 'auto',
        className: 'w-full aspect-video rounded-lg',
      }
    })
  }
}

export default remarkVideo
````

### 启用插件

在我的博客项目里，是在 [core/parser](https://github.com/chengpeiquan/chengpeiquan.com/blob/main/src/core/parser/index.ts) 里启用插件（也就是最终提供给 `unified().use()` 使用 ），在使用的过程中，如果启用了另外一个 [rehype-sanitize](https://github.com/rehypejs/rehype-sanitize) 插件，还需要在该插件的选项里配置 `tagNames` 和 `attributes` 的白名单列表。

```ts
import remarkDirective from 'remark-directive'
import remarkVideo from './plugins/remark-video'
import { type PluggableList } from 'unified'

const remarkPlugins: PluggableList = [
  [remarkParse],
  [remarkDirective],
  [remarkVideo],
]

const rehypePlugins: PluggableList = [
  // ...
  [
    rehypeSanitize,
    {
      // No need `user-content-` prefix
      clobberPrefix: '',
      // https://github.com/syntax-tree/hast-util-sanitize#tagnames
      tagNames: [...toArray(defaultSchema.tagNames), 'video'],
      // https://github.com/syntax-tree/hast-util-sanitize#attributes
      attributes: {
        ...(defaultSchema.attributes || {}),
        video: ['src', 'poster', 'controls', 'preload', 'className'],
      },
    },
  ],
  // ...
]

// ...
```

### 最终结果

这就是这段 Markdown 指令渲染出来的效果（当然，不包括下面的标题展示，那是我另外包裹了一层 `figure` 标签，详见 [parser/components](https://github.com/chengpeiquan/chengpeiquan.com/blob/main/src/core/parser/components.tsx) ，在转换为 JSX 的时候处理的）。

```md
:::video
https://cdn.chengpeiquan.com/video/my-cats-in-mountain-view-room.mp4
https://cdn.chengpeiquan.com/img/2022/12/20221231235941.jpg?x-oss-process=image/interlace,1
山景房里的三只猫
:::
```

:::video
https://cdn.chengpeiquan.com/video/my-cats-in-mountain-view-room.mp4
https://cdn.chengpeiquan.com/img/2022/12/20221231235941.jpg?x-oss-process=image/interlace,1
山景房里的三只猫
:::
