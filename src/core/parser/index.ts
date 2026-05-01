'use server'

import { readFile } from 'node:fs/promises'
import { extname } from 'node:path'
import { isDate, isString } from '@bassist/utils'
import { compile } from '@blackwork/machine'
import matter from 'gray-matter'
import {
  type ContentItem,
  type ContentMetadata,
  type RemoteContentConfig,
  fileExtensions,
  isValidRemoteContentConfig,
} from '@/config/content-config'
import { defaultOwner } from '@/config/project-config'
import { ContentProcessorMode } from '@/core/types'
import { apis } from '@/fetcher'
import { components } from './components'

type ParseMarkdownRes = Pick<ContentItem, 'headings' | 'html' | 'jsxElement'>

const OBJECT_REPLACEMENT_CHAR = '\uFFFC'

const processRemoteMarkdown = (
  markdown: string,
  remote: RemoteContentConfig,
): string => {
  try {
    const { content } = matter(markdown)
    let text = content
      .trimStart()
      .replace(/^#\s+[^\n]+\n?/, '')
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
        return await apis.gh.fetchMarkdown(
          remote.owner ?? defaultOwner,
          remote.repo,
          remote.path,
        )
      }

      default: {
        return ''
      }
    }
  } catch {
    return ''
  }
}

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

  return {
    date: cstDate.toLocaleString('zh-CN', {
      timeZone: 'Asia/Shanghai',
    }),
    timestamp: cstDate.getTime(),
  }
}

const parseSlug = (filePath: string) => {
  const fragments = filePath.split('/')
  const lastFragment = fragments.at(-1)
  if (!lastFragment) return ''

  const extension = fileExtensions.find((ext) => lastFragment.endsWith(ext))
  return extension ? lastFragment.slice(0, -extension.length) : ''
}

const parseMarkdown = async (
  filePath: string,
  markdown: string,
  mode?: ContentProcessorMode,
): Promise<ParseMarkdownRes> => {
  const fallbackRes: ParseMarkdownRes = {
    headings: [],
    html: '',
    jsxElement: null,
  }

  if (mode === ContentProcessorMode.MetaOnly) {
    return fallbackRes
  }

  if (mode === ContentProcessorMode.TextOnly) {
    return {
      headings: [],
      html: markdown,
      jsxElement: null,
    }
  }

  try {
    const isMdx = extname(filePath) === '.mdx'
    const result = await compile(markdown, {
      format: isMdx ? 'mdx' : 'markdown',
      components:
        mode === ContentProcessorMode.HtmlOnly ? undefined : components,
    })

    return {
      headings: result.headings as ContentItem['headings'],
      html: result.html,
      jsxElement:
        mode === ContentProcessorMode.HtmlOnly ? null : result.jsxElement,
    }
  } catch (error) {
    console.error('[Parse error] ', error)
    return fallbackRes
  }
}

export interface ParseOptions {
  ignoreDetails?: boolean
  mode?: ContentProcessorMode
}

export const parse = async (
  filePath: string,
  { ignoreDetails = false, mode }: ParseOptions = {},
): Promise<ContentItem | null> => {
  try {
    const raw = (await readFile(filePath, 'utf-8')) || ''
    const { content: localMarkdown, data } = matter(raw)

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
      const rawMarkdown = await fetchRemoteMarkdown(remote)
      return processRemoteMarkdown(rawMarkdown, remote)
    })()

    const markdown = isRemoteEnabled
      ? localMarkdown + remoteMarkdown
      : localMarkdown

    const { headings, html, jsxElement } = await parseMarkdown(
      filePath,
      markdown,
      mode,
    )

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
