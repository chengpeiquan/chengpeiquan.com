'use server'

import React from 'react'
import matter from 'gray-matter'
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'
import remarkStringify from 'remark-stringify'
import remarkRehype from 'remark-rehype'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeExtractToc from '@stefanprobst/rehype-extract-toc'
import rehypeShiki from '@shikijs/rehype'
import rehypeExternalLink from 'rehype-external-links'
import rehypeSanitize from 'rehype-sanitize'
import rehypeStringify from 'rehype-stringify'
import rehypeUnwrapImages from 'rehype-unwrap-images'
import rehypeReact, { type Options as RehypeReactOptions } from 'rehype-react'
import { remarkText } from './plugins/remark-text'
import { type PluggableList, unified } from 'unified'
import { readFile } from 'node:fs/promises'
import { isArray, isObject } from '@bassist/utils'
import {
  type ContentItem,
  type ContentMetadata,
  type HeadingItem,
  fileExtensions,
} from '@/config/content-config'
import { a, img } from './components'
import { Fragment, jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime'
import { ContentProcessorMode } from '@/core/types'

const isValidHeading = (v: unknown): v is HeadingItem => isObject(v) && !!v.id

const components = {
  a,
  img,
} as unknown as RehypeReactOptions['components']

// The type is still wrong, but they works fine.
// https://github.com/rehypejs/rehype-react/issues/39
const jsx = _jsx as RehypeReactOptions['jsx']
const jsxs = _jsxs as RehypeReactOptions['jsxs']

const rehypeReactOptions = {
  Fragment,
  components,
  ignoreInvalidStyle: true,
  jsx,
  jsxs,
  passKeys: true,
  passNode: true,
  development: false,
} satisfies RehypeReactOptions

const createProcessor = (
  mode: ContentProcessorMode = ContentProcessorMode.FamilyBucket,
) => {
  const isMetaOnly = mode === ContentProcessorMode.MetaOnly
  const isTextOnly = mode === ContentProcessorMode.TextOnly
  const isHtmlOnly = mode === ContentProcessorMode.HtmlOnly
  // const isFamilyBucket = mode === ContentProcessorMode.FamilyBucket

  if (isMetaOnly) return null

  // Processing Markdown
  const remarkPlugins: PluggableList = [
    [remarkParse],
    [remarkGfm],
    [remarkStringify],
  ]

  if (isTextOnly) {
    remarkPlugins.push([remarkText])
  }

  // Transforming Markdown to HTML
  const remarkRehypePlugins: PluggableList = isTextOnly ? [] : [[remarkRehype]]

  // Processing HTML
  const rehypePlugins: PluggableList = (() => {
    if (isTextOnly) return []
    if (isHtmlOnly) return [[rehypeStringify]]

    return [
      [rehypeSlug, { prefix: '' }],
      [rehypeAutolinkHeadings],
      [rehypeExtractToc],
      [rehypeExternalLink],
      [rehypeUnwrapImages],
      [
        rehypeSanitize,
        {
          // No need `user-content-` prefix
          clobberPrefix: '',
        },
      ],
      [
        rehypeShiki,
        {
          // https://shiki.style/themes
          themes: {
            light: 'one-light',
            dark: 'dracula-soft',
          },
        },
      ],
      [rehypeStringify],
    ]
  })()

  // Instead of this usage
  // `import { toJsxRuntime } from 'hast-util-to-jsx-runtime'`
  // `const mdastTree = processor.parse(file)`
  // `const hastTree = await processor.run(mdastTree, file)`
  // `const jsxElement = toJsxRuntime(hastTree, {...options})`
  const reactPlugins: PluggableList =
    isTextOnly || isHtmlOnly ? [] : [[rehypeReact, rehypeReactOptions]]

  const processor = unified()
    .use(remarkPlugins)
    .use(remarkRehypePlugins)
    .use(rehypePlugins)
    .use(reactPlugins)

  return processor
}

type ParseMarkdownRes = Pick<ContentItem, 'headings' | 'html' | 'jsxElement'>

/**
 * Transforming Markdown to HTML,
 * and add slugs / anchors, and extract headings
 *
 * @param markdown - Extract from `gray-matter`
 *
 * @param mode - See `createProcessor`
 */
const parseMarkdown = async (
  markdown: string,
  mode?: ContentProcessorMode,
): Promise<ParseMarkdownRes> => {
  const fallbackRes: ParseMarkdownRes = {
    headings: [],
    html: '',
    jsxElement: null,
  }

  try {
    const processor = createProcessor(mode)
    if (!processor) return { ...fallbackRes }

    // Instead of this usage
    // `import { read } from 'to-vfile'`
    // `.process(await read(filePath))`
    const file = await processor.process(markdown)

    const html = String(file)
    const jsxElement = React.isValidElement(file?.result) ? file.result : null

    const rawHeadings = isArray(file?.data?.toc) ? file.data.toc : []
    const headings = rawHeadings.filter((i) => isValidHeading(i))

    return {
      headings,
      html,
      jsxElement,
    }
  } catch (e) {
    console.error('[Parse error] ', e)
    return { ...fallbackRes }
  }
}

/**
 * In fact, the original date in markdown file is CST time,
 * e.g. `2019/09/15 01:35:00`
 *
 * Btw: Here, CST refers to China Standard Time UT+8:00
 *
 * But the `matter` method will return a UTC time,
 * e.g. `2019/09/15T01:35:00.000Z`
 *
 * @param utcDate - The `date` from `matter(markdown)`
 */
const parseDate = (utcDate: string) => {
  if (!utcDate) {
    return { date: '', timestamp: 0 }
  }

  const cstDate = new Date(utcDate)
  cstDate.setHours(cstDate.getHours() - 8)

  const date = cstDate.toLocaleString('zh-CN', {
    timeZone: 'Asia/Shanghai',
  })

  const timestamp = cstDate.getTime()

  return { date, timestamp }
}

const parseSlug = (filePath: string) => {
  const fragments = filePath.split('/')
  const lastFragment = fragments.at(-1)
  if (!lastFragment) return ''

  const extension = fileExtensions.find((ext) => lastFragment.endsWith(ext))
  return extension ? lastFragment.slice(0, -extension.length) : ''
}

export interface ParseOptions {
  /**
   * When only using the introductory data for a list,
   * ignore the parsing of the detailed information.
   */
  ignoreDetails?: boolean

  /**
   * See `createProcessor`
   */
  mode?: ContentProcessorMode
}

export const parse = async (
  filePath: string,
  { ignoreDetails = false, mode }: ParseOptions = {},
): Promise<ContentItem | null> => {
  try {
    const raw = (await readFile(filePath, 'utf-8')) || ''
    const { content: markdown = '', data = {} } = matter(raw)

    const { date: utcDate, ...rest } = data
    const { date, timestamp } = parseDate(utcDate)
    const slug = parseSlug(filePath)

    const metadata = {
      ...rest,
      date,
      timestamp,
    } as unknown as ContentMetadata

    if (ignoreDetails) {
      return {
        slug,
        headings: [],
        html: '',
        jsxElement: null,
        metadata,
      } satisfies ContentItem
    }

    const { headings, html, jsxElement } = await parseMarkdown(markdown, mode)

    return {
      slug,
      headings,
      html,
      jsxElement,
      metadata,
    } satisfies ContentItem
  } catch (e) {
    return null
  }
}
