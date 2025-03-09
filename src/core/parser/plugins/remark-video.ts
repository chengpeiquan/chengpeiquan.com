import { isArray, isObject, isString } from '@bassist/utils'
import { type Root } from 'mdast'
import { visit } from 'unist-util-visit'

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
 *   ;```md
 *   :::video
 *   src
 *   poster
 *   title
 *   :::
 *   ```
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
 * I have customized a compilation process in Markdown Parser, so not all HTML
 * codes are allowed to be rendered.
 *
 * When Markdown is being converted to AST, many HTML tags will be discarded,
 * and the same is true for Video.
 *
 * In order to uniformly implement custom rendering content, this plugin
 * implements the ability of `video` directive.
 *
 * One more important thing, since rehype-sanitize is enabled, remember to
 * configure the options to allow rendering of video tags and attributes.
 *
 * @example
 *   Enter the following into the markdown file:
 *
 *   ```md
 *   :::video
 *   https://example.com/video-src.mp4
 *   https://example.com/video-poster.jpg
 *   A video title
 *   :::
 *   ```
 *
 *   Compile and output a Video tag:
 *
 *   ```html
 *   <video
 *   src="https://example.com/video-src.mp4"
 *   poster="https://example.com/video-poster.jpg"
 *   title="Hello World"
 *   />
 *   ```
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
