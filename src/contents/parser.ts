'use server'

import matter from 'gray-matter'
import remarkParse from 'remark-parse'
import remarkUnwrapImages from 'remark-unwrap-images'
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
import rehypeReact, { type Options as RehypeReactOptions } from 'rehype-react'
import { unified } from 'unified'
import { isArray, isObject } from '@bassist/utils'
import { fs } from '@bassist/node-utils'
import {
  type ContentItem,
  type ContentMetadata,
  type HeadingItem,
  fileExtensions,
} from '@/config/content-config'
import { img } from './components'
import { Fragment, jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime'
import type React from 'react'

const isValidHeading = (v: unknown): v is HeadingItem => isObject(v) && !!v.id

const components = {
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

interface ParseMarkdownRes {
  headings: HeadingItem[]
  jsxElement: React.JSX.Element | null
  html: string
}

/**
 * Transforming Markdown to HTML,
 * and add slugs / anchors, and extract headings
 *
 * @param markdown - Extract from `gray-matter`
 */
const parseMarkdown = async (markdown: string): Promise<ParseMarkdownRes> => {
  try {
    const processor = unified()
      // Processing Markdown
      .use(remarkParse)
      .use(remarkUnwrapImages)
      .use(remarkGfm)
      .use(remarkStringify)

      // Transforming Markdown to HTML
      .use(remarkRehype)

      // Processing HTML
      .use(rehypeSlug, { prefix: '' })
      .use(rehypeAutolinkHeadings)
      .use(rehypeExtractToc)
      .use(rehypeShiki, {
        // https://shiki.style/themes
        themes: {
          light: 'one-light',
          dark: 'dracula-soft',
        },
      })
      .use(rehypeExternalLink)
      .use(rehypeSanitize, {
        // No need `user-content-` prefix
        clobberPrefix: '',
      })
      .use(rehypeStringify)

      // Instead of this usage
      // `import { toJsxRuntime } from 'hast-util-to-jsx-runtime'`
      // `const mdastTree = processor.parse(file)`
      // `const hastTree = await processor.run(mdastTree, file)`
      // `const jsxElement = toJsxRuntime(hastTree, {...options})`
      .use(rehypeReact, rehypeReactOptions)

    // Instead of this usage
    // `import { read } from 'to-vfile'`
    // `.process(await read(filePath))`
    const file = await processor.process(markdown)
    const jsxElement = file?.result || null
    const html = String(file)

    const rawHeadings = isArray(file?.data?.toc) ? file.data.toc : []
    const headings = rawHeadings.filter((i) => isValidHeading(i))

    return {
      headings,
      jsxElement,
      html,
    }
  } catch (e) {
    console.error('[Parse error] ', e)

    return {
      headings: [],
      jsxElement: null,
      html: '',
    }
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

export const parse = async (filePath: string): Promise<ContentItem | null> => {
  try {
    const raw = (await fs.readFile(filePath, 'utf-8')) || ''
    const { content: markdown = '', data = {} } = matter(raw)

    const { date: utcDate, ...rest } = data
    const { date, timestamp } = parseDate(utcDate)

    const { headings, jsxElement, html } = await parseMarkdown(markdown)
    const slug = parseSlug(filePath)

    const metadata = {
      ...rest,
      date,
      timestamp,
    } as unknown as ContentMetadata

    return {
      slug,
      headings,
      jsxElement,
      html,
      metadata,
    } satisfies ContentItem
  } catch (e) {
    return null
  }
}
