'use server'

import { extname, join } from 'node:path'
import { readdirSync } from 'node:fs'
import { z } from 'zod'
import { type Locale, locales } from '@/config/locale-config'
import {
  type ContentFolder,
  type ContentItem,
  type GetListResponse,
  contentFolders,
  contentItemSchema,
  contentRootFolder,
  fileExtensions,
  getPagination,
  isValidContentItem,
} from '@/config/content-config'
import { type ParseOptions, parse } from './parser'

const contentRootPath = join(process.cwd(), 'src', contentRootFolder)

const getMarkdownFiles = (dir: string) => {
  try {
    return readdirSync(dir)
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

export const getContent = async ({
  folder,
  slug,
  locale,
}: GetContentOptions) => {
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

interface GetContentsOptions extends ParseOptions {
  locale: Locale
  category?: string
  page: number
  pageSize: number
}

export const getContents = async (
  folder: ContentFolder,
  { locale, category, page = 1, pageSize, ...parseOptions }: GetContentsOptions,
) => {
  const contentsResponseSchema = z.object({
    items: z.array(contentItemSchema).default([]),
    page: z.number().default(page || 1),
    pageSize: z.number().default(pageSize),
    total: z.number().default(0),
    lastPage: z.number().default(1),
    category: z.string().optional(),
    isEmpty: z.boolean().default(true),
  })

  const defaultRes = contentsResponseSchema.parse({})

  try {
    const filePaths = getFilePaths(folder, locale)
    if (!filePaths.length) return defaultRes

    const getIntro = (i: string) => parse(i, parseOptions)
    const allContents = await Promise.all(filePaths.map(getIntro))
    const contents = allContents
      .filter(isValidContentItem)
      .filter((i) => !i.metadata.isDraft)
      .filter((i) =>
        category ? i.metadata.categories?.includes(category) : true,
      )
      .sort((a, b) => b.metadata.timestamp - a.metadata.timestamp)

    const pagination = getPagination(contents, page, pageSize)

    return {
      page,
      pageSize,
      category,
      ...pagination,
    } satisfies GetListResponse<ContentItem>
  } catch (e) {
    return defaultRes
  }
}
