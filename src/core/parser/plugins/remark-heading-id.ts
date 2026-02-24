// Referenced from https://github.com/imcuttle/remark-heading-id
import {
  isArray,
  isFinite,
  isFunction,
  isMap,
  isNull,
  isObject,
  isSet,
  isString,
  isUndefined,
  kebabCase,
} from '@bassist/utils'
import { type Heading, type PhrasingContent, type Root } from 'mdast'
import { visit } from 'unist-util-visit'

const isEmpty = (value: any) => {
  if (isNull(value) || isUndefined(value)) {
    return true
  }
  if (isArray(value) || isString(value)) {
    return !value.length
  }
  if (!isFunction(value) && isFinite(value?.length)) {
    return !value.length
  }
  if (isMap(value) || isSet(value)) {
    return !value.size
  }
  if (isObject(value) && Object.keys(value).length > 0) {
    return false
  }
  return true
}

const extractText = (children: any) => {
  return children
    .map((child: any) => {
      if (!isEmpty(child?.value)) {
        return child?.value
      } else if (child?.children && child?.children?.length > 0) {
        return extractText(child?.children)
      } else {
        return ''
      }
    })
    .join(' ')
}

const formatDefaultId = (value: string) => {
  return kebabCase(value.replace(/\\s+/g, ' ').trim())
}

const getDefaultId = (children: PhrasingContent[]) => {
  return formatDefaultId(extractText(children))
}

const setNodeId = (node: Heading, id: string) => {
  if (!node.data) node.data = {}
  if (!node.data.hProperties) node.data.hProperties = {}
  // @ts-expect-error
  node.data.id = node.data.hProperties.id = id
}

interface RemarkHeadingIdOptions {
  /**
   * If no custom id was found, use default instead
   *
   * @default false
   */
  defaults?: boolean

  /**
   * If the default id is used multiple times, append a counter to the id
   *
   * @default true
   */
  uniqueDefaults?: boolean
}

const remarkHeadingId = (
  options: RemarkHeadingIdOptions = { defaults: false, uniqueDefaults: true },
) => {
  return (tree: Root) => {
    const uniqueDefaultIdsCounters: Record<string, number> = {}

    visit(tree, 'heading', (headingNode: Heading) => {
      const lastChild = headingNode.children[headingNode.children.length - 1]
      if (lastChild && lastChild.type === 'text') {
        let string = lastChild.value.replace(/ +$/, '')
        const matched = string.match(/ {#([^]+?)}$/)

        if (matched) {
          const id = matched[1]
          if (id.length) {
            setNodeId(headingNode, id)

            string = string.substring(0, matched.index)
            lastChild.value = string
            return
          }
        }
      }

      if (options.defaults) {
        // If no custom id was found, use default instead
        let defaultIdCandidate = getDefaultId(headingNode.children)
        if (options.uniqueDefaults) {
          if (uniqueDefaultIdsCounters[defaultIdCandidate] === undefined) {
            // First time this default id is used: initialize counter
            uniqueDefaultIdsCounters[defaultIdCandidate] = 0
          } else {
            // Id already used: increment counter and append it to defaultIdCandidate
            uniqueDefaultIdsCounters[defaultIdCandidate]++
            defaultIdCandidate += `-${uniqueDefaultIdsCounters[defaultIdCandidate]}`
          }
        }
        setNodeId(headingNode, defaultIdCandidate)
      }
    })
  }
}

export default remarkHeadingId
