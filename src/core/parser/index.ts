'use server'

import { readFile } from 'node:fs/promises'
import { isDate, isObject, isString, toArray } from '@bassist/utils'
import rehypeShiki from '@shikijs/rehype'
import rehypeExtractToc from '@stefanprobst/rehype-extract-toc'
import matter from 'gray-matter'
import React from 'react'
import { Fragment, jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeExternalLink from 'rehype-external-links'
import rehypeReact, { type Options as RehypeReactOptions } from 'rehype-react'
import rehypeSanitize, { defaultSchema } from 'rehype-sanitize'
import rehypeSlug from 'rehype-slug'
import rehypeStringify from 'rehype-stringify'
import rehypeUnwrapImages from 'rehype-unwrap-images'
import remarkDirective from 'remark-directive'
import remarkGfm from 'remark-gfm'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import remarkStringify from 'remark-stringify'
import { type PluggableList, unified } from 'unified'
import {
  type ContentItem,
  type ContentMetadata,
  type HeadingItem,
  type RemoteContentConfig,
  fileExtensions,
  isValidRemoteContentConfig,
} from '@/config/content-config'
import { defaultOwner } from '@/config/project-config'
import { ContentProcessorMode } from '@/core/types'
import { apis } from '@/fetcher'
import { a, img, video } from './components'
import remarkHeadingId from './plugins/remark-heading-id'
import remarkVideo from './plugins/remark-video'

const isValidHeading = (v: unknown): v is HeadingItem => isObject(v) && !!v.id

const components = {
  a,
  img,
  video,
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
    [remarkHeadingId],
    [remarkGfm],
    [remarkDirective],
    [remarkVideo],
    [remarkStringify],
  ]

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
          // https://github.com/syntax-tree/hast-util-sanitize#tagnames
          tagNames: [...toArray(defaultSchema.tagNames), 'video'],
          // https://github.com/syntax-tree/hast-util-sanitize#attributes
          attributes: {
            ...(defaultSchema.attributes ?? {}),
            video: ['src', 'poster', 'controls', 'preload', 'className'],
          },
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
 * Transforming Markdown to HTML, and add slugs / anchors, and extract headings
 *
 * @param markdown - Extract from `gray-matter`
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
    if (!processor) {
      return { ...fallbackRes }
    }

    // Instead of this usage
    // `import { read } from 'to-vfile'`
    // `.process(await read(filePath))`
    const file = await processor.process(markdown)

    const html = String(file)
    const jsxElement = React.isValidElement(file?.result) ? file.result : null

    const rawHeadings = toArray(file?.data?.toc)
    const headings = rawHeadings.filter(isValidHeading)

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
 * Unicode Object Replacement Character (U+FFFC), often from copy-paste.
 */
const OBJECT_REPLACEMENT_CHAR = '\uFFFC'

/**
 * Process remote markdown: strip frontmatter, strip leading H1, strip U+FFFC
 * placeholders, then apply optional replacements (e.g. relative → absolute
 * URLs). Keeps all cleanup and substitution in one place.
 */
const processRemoteMarkdown = (
  markdown: string,
  remote: RemoteContentConfig,
): string => {
  try {
    const { content } = matter(markdown)
    let text = content
      .trimStart()
      .replace(/^#\s+[^\n]+\n?/, '') // Remove leading ATX H1 (e.g. "# MyHeading {#my-heading}")
      .trimStart()
      .replaceAll(OBJECT_REPLACEMENT_CHAR, '')

    if (remote.replacements?.length) {
      for (const { from, to } of remote.replacements) {
        text = text.replaceAll(from, to)
      }
    }

    return text
  } catch (error) {
    console.error('[Process remote markdown error] ', error)
    return markdown
  }
}

const fetchRemoteMarkdown = async (remote: RemoteContentConfig) => {
  if (!isValidRemoteContentConfig(remote)) return ''

  try {
    switch (remote.type) {
      case 'github': {
        const res = await apis.gh.fetchMarkdown(
          remote.owner ?? defaultOwner,
          remote.repo,
          remote.path,
        )
        return res
      }

      default: {
        return ''
      }
    }
  } catch {
    return ''
  }
}

/**
 * In fact, the original date in markdown file is CST time, e.g. `2019/09/15
 * 01:35:00`
 *
 * Btw: Here, CST refers to China Standard Time UT+8:00
 *
 * But the `matter` method will return a UTC time, e.g.
 * `2019/09/15T01:35:00.000Z`
 *
 * @param utcDate - The `date` from `matter(markdown)`
 */
const parseDate = (utcDate: unknown) => {
  if (!utcDate) {
    return { date: '', timestamp: 0 }
  }

  const normalizedDate = isDate(utcDate) || isString(utcDate) ? utcDate : ''
  if (!normalizedDate) {
    return { date: '', timestamp: 0 }
  }

  const cstDate = new Date(normalizedDate)
  if (Number.isNaN(cstDate.getTime())) {
    return { date: '', timestamp: 0 }
  }

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
   * When only using the introductory data for a list, ignore the parsing of the
   * detailed information.
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
    const { content: localMarkdown = '', data = {} } = matter(raw)

    const { date: utcDate, remote, ...rest } = data
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

    const isRemoteEnabled = isValidRemoteContentConfig(remote)

    const remoteMarkdown = await (async () => {
      if (!isRemoteEnabled) return ''
      const raw = await fetchRemoteMarkdown(remote)
      return processRemoteMarkdown(raw, remote)
    })()

    const markdown = isRemoteEnabled
      ? localMarkdown + remoteMarkdown
      : localMarkdown

    const { headings, html, jsxElement } = await parseMarkdown(markdown, mode)

    return {
      slug,
      headings,
      html,
      jsxElement,
      metadata,
    } satisfies ContentItem
  } catch (error) {
    console.error('[Parse error] ', {
      filePath,
      error,
    })

    return null
  }
}
