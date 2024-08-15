'use server'

import matter from 'gray-matter'
import { extname, join } from 'node:path'
import { fs } from '@bassist/node-utils'
import { z } from 'zod'
import { type Locale, locales } from '@/config/locale-config'
import {
  type ContentFolder,
  type ContentItem,
  type ContentMetadata,
  PAGE_SIZE,
  contentFolders,
  contentItemSchema,
  contentRootFolder,
  fileExtensions,
  isValidContentItem,
} from '@/config/content-config'

const contentRootPath = join(process.cwd(), 'src', contentRootFolder)

const getMarkdownFiles = (dir: string) => {
  try {
    return fs
      .readdirSync(dir)
      .filter((file) => fileExtensions.includes(extname(file)))
      .map((i) => join(dir, i))
  } catch (e) {
    return []
  }
}

const getFileMap = (folder: ContentFolder) => {
  const fileMap = new Map<Locale, string[]>()

  locales.forEach((i) => {
    const fileDir = join(contentRootPath, folder, i)
    fileMap.set(i, getMarkdownFiles(fileDir))
  })

  return fileMap
}

const getFilePaths = (folder: ContentFolder, locale: Locale) => {
  if (!contentFolders.includes(folder)) return []
  if (!locales.includes(locale)) return []
  return getFileMap(folder).get(locale) || []
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
  const cstDate = new Date(utcDate)
  cstDate.setHours(cstDate.getHours() - 8)

  const date = cstDate.toLocaleString('zh-CN', {
    timeZone: 'Asia/Shanghai',
  })

  const timestamp = cstDate.getTime()

  return { date, timestamp }
}

const getContentByFilePath = async (
  filePath: string,
): Promise<ContentItem | null> => {
  try {
    const markdown = (await fs.readFile(filePath, 'utf-8')) || ''
    const { content = '', data = {} } = matter(markdown)
    const { date: utcDate, ...rest } = data
    const { date, timestamp } = parseDate(utcDate)

    const metadata = {
      ...rest,
      date,
      timestamp,
    } as unknown as ContentMetadata

    return { content, metadata } satisfies ContentItem
  } catch (e) {
    return null
  }
}

interface GetContentOptions {
  folder: ContentFolder
  slug: string
  locale: Locale
}

export const getContent = ({ folder, slug, locale }: GetContentOptions) => {
  const filePaths = getFilePaths(folder, locale)
  if (!filePaths.length) return null

  // This is a convention:
  // The same slug can only correspond to one extension.
  const possibleFileNames = fileExtensions.map((ext) => slug + ext)
  const filePath = filePaths.find((path) =>
    possibleFileNames.some((name) => path.endsWith(name)),
  )

  if (!filePath) return null

  return getContentByFilePath(filePath)
}

interface GetContentsOptions {
  locale: Locale
  page: number
  pageSize?: number
}

interface GetContentsResponse {
  items: ContentItem[]
  page: number
  pageSize: number
  total: number
  lastPage: number
}

export const getContents = async (
  folder: ContentFolder,
  { locale, page = 1, pageSize = PAGE_SIZE }: GetContentsOptions,
) => {
  const contentsResponseSchema = z.object({
    items: z.array(contentItemSchema).default([]),
    page: z.number().default(page),
    pageSize: z.number().default(pageSize),
    total: z.number().default(0),
    lastPage: z.number().default(1),
  })

  const defaultRes = contentsResponseSchema.parse({})

  try {
    const filePaths = getFilePaths(folder, locale)
    if (!filePaths.length) return defaultRes

    const allContents = await Promise.all(filePaths.map(getContentByFilePath))
    const contents = allContents
      .filter(isValidContentItem)
      .filter((i) => !i.metadata.isDraft)
      .sort((a, b) => b.metadata.timestamp - a.metadata.timestamp)

    const start = 0 + pageSize * (page - 1)
    const end = start + pageSize
    const items = contents.slice(start, end)
    const total = contents.length
    const lastPage = Math.ceil(total / pageSize)

    return {
      items,
      page,
      pageSize,
      total,
      lastPage,
    } satisfies GetContentsResponse
  } catch (e) {
    return defaultRes
  }
}
