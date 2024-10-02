'use server'

import { extname, join } from 'node:path'
import { fs } from '@bassist/node-utils'
import { z } from 'zod'
import { type Locale, locales } from '@/config/locale-config'
import {
  type ContentFolder,
  type ContentItem,
  contentFolders,
  contentItemSchema,
  contentRootFolder,
  fileExtensions,
  isValidContentItem,
} from '@/config/content-config'
import { parse } from './parser'

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
  const possibleFileNames = fileExtensions.map(
    (ext) => `${locale}/${slug}${ext}`,
  )
  const filePath = filePaths.find((path) =>
    possibleFileNames.some((name) => path.endsWith(name)),
  )

  if (!filePath) return null

  return parse(filePath)
}

interface GetContentsOptions {
  locale: Locale
  category?: string
  page: number
  pageSize: number
}

interface GetContentsResponse {
  items: ContentItem[]
  page: number
  pageSize: number
  total: number
  lastPage: number
  category?: string
}

export const getContents = async (
  folder: ContentFolder,
  { locale, category, page = 1, pageSize }: GetContentsOptions,
) => {
  const contentsResponseSchema = z.object({
    items: z.array(contentItemSchema).default([]),
    page: z.number().default(page || 1),
    pageSize: z.number().default(pageSize),
    total: z.number().default(0),
    lastPage: z.number().default(1),
    category: z.string().optional(),
  })

  const defaultRes = contentsResponseSchema.parse({})

  try {
    const filePaths = getFilePaths(folder, locale)
    if (!filePaths.length) return defaultRes

    const getIntro = (i: string) => parse(i, { ignoreDetails: true })
    const allContents = await Promise.all(filePaths.map(getIntro))
    const contents = allContents
      .filter(isValidContentItem)
      .filter((i) => !i.metadata.isDraft)
      .filter((i) =>
        category ? i.metadata.categories?.includes(category) : true,
      )
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
      category,
    } satisfies GetContentsResponse
  } catch (e) {
    return defaultRes
  }
}
