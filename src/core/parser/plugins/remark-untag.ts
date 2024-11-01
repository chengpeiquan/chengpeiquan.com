import { squeezeParagraphs } from 'mdast-squeeze-paragraphs'
import { visit } from 'unist-util-visit'
import { type PhrasingContent, type Root } from 'mdast'
import { isNumber, isString } from '@bassist/utils'

/**
 * Remove all links, images, references and so on.
 *
 * @description Base on `remark-unlink` plugin
 *
 * @see https://github.com/remarkjs/remark-unlink
 *
 * @returns
 *   Transform.
 */
export const remarkUntag = () => {
  return (tree: Root) => {
    visit(tree, (node, index, parent) => {
      const ignore =
        node.type === 'link' ||
        node.type === 'linkReference' ||
        node.type === 'image' ||
        node.type === 'imageReference' ||
        node.type === 'definition' ||
        node.type === 'code' ||
        node.type === 'html' ||
        node.type === 'yaml'

      // const ignore = !(
      //   node.type === 'text' ||
      //   node.type === 'heading' ||
      //   node.type === 'paragraph' ||
      //   node.type === 'strong'
      // )

      if (parent && isNumber(index) && ignore) {
        console.log(node)

        const replacement: PhrasingContent[] =
          'children' in node
            ? node.children
            : 'alt' in node && isString(node.alt)
              ? [{ type: 'text', value: node.alt }]
              : []

        parent.children.splice(index, 1, ...replacement)
        return index
      }
    })

    squeezeParagraphs(tree)
  }
}
