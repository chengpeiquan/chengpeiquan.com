'use server'

import { readdirSync, statSync } from 'node:fs'
import { extname, join } from 'node:path'
import process from 'node:process'
import { z } from 'zod'
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
import { type Locale, defaultLocale, locales } from '@/config/locale-config'
import { type ParseOptions, parse } from './parser'

const contentRootPath = join(process.cwd(), 'src', contentRootFolder)

const getFilePaths = (
  folder: ContentFolder,
  locale: Locale,
  strict = false,
) => {
  if (!contentFolders.includes(folder)) return []
  if (!locales.includes(locale)) return []
  const folderPath = join(contentRootPath, folder)
  const dir = join(folderPath, locale)

  try {
    return readdirSync(dir)
      .filter((file) => fileExtensions.includes(extname(file)))
      .map((file) => join(dir, file))
  } catch (error) {
    if (!strict) return []
    // An untranslated locale may be absent, but a missing content root or
    // unreadable directory must never be published as an empty index.
    if (
      locale !== defaultLocale &&
      (error as NodeJS.ErrnoException).code === 'ENOENT' &&
      statSync(folderPath).isDirectory()
    )
      return []
    throw error
  }
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
  strict?: boolean
  locale: Locale
  category?: string
  page: number
  pageSize: number
}

export const getContents = async (
  folder: ContentFolder,
  {
    locale,
    category,
    page,
    pageSize,
    strict = false,
    ...parseOptions
  }: GetContentsOptions,
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
    const filePaths = getFilePaths(folder, locale, strict)
    if (!filePaths.length) return defaultRes

    const getIntro = async (filePath: string) => {
      const content = await parse(filePath, parseOptions)
      if (strict && !content) {
        throw new Error(`Failed to read content metadata: ${filePath}`)
      }
      return content
    }
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
  } catch (error) {
    if (strict) throw error
    return defaultRes
  }
}
