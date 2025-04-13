import { existsSync } from 'node:fs'
import { mkdir } from 'node:fs/promises'
import { resolve } from 'node:path'
import { type ContentFolder } from '@/config/content-config'
import { type Locale } from '@/config/locale-config'
import { getContents } from '@/core/io'
import { ContentProcessorMode } from '@/core/types'

const cwd = process.cwd()

export const publicDirs = {
  source: resolve(cwd, './public'),
  target: resolve(cwd, './.next/standalone/public'),
} as const

export const checkTargetDirExists = async (dir = publicDirs.target) => {
  const isExist = existsSync(dir)
  if (!isExist) {
    await mkdir(dir, { recursive: true })
  }
}

export const getPosts = async (
  folder: ContentFolder,
  locale: Locale = 'zh',
  mode: ContentProcessorMode = ContentProcessorMode.HtmlOnly,
) => {
  return getContents(folder, {
    locale,
    page: 1,
    pageSize: 1000,
    ignoreDetails: false,
    mode,
  })
}
