import { squeezeParagraphs } from 'mdast-squeeze-paragraphs'
import { visit } from 'unist-util-visit'
import { type PhrasingContent, type Root, type RootContent } from 'mdast'
import { isNumber, isString } from '@bassist/utils'

/**
 * Keep only the most basic text content
 * as a data source for simple searches
 *
 * @description Base on `remark-unlink` plugin
 *
 * @see https://github.com/remarkjs/remark-unlink
 *
 * @returns
 *   Transform.
 */
export const remarkText = () => {
  return (tree: Root) => {
    visit(tree, (node, index, parent) => {
      const whitelist =
        node.type === 'text' ||
        node.type === 'heading' ||
        node.type === 'paragraph' ||
        node.type === 'strong'

      if (parent && isNumber(index) && !whitelist) {
        const replacement: (PhrasingContent | RootContent)[] =
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
