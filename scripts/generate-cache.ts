import { join } from 'node:path'
import { writeFile } from 'node:fs/promises'
import { fs } from '@bassist/node-utils'
import { type ContentFolder } from '@/config/content-config'
import { type Locale, locales } from '@/config/locale-config'
import { getPosts } from './shared'
import { cacheRootFolder, metaCacheRootFolder } from '@/config/cache-config'

const cacheRootPath = join(process.cwd(), 'src', cacheRootFolder)

const metaCacheRootPath = join(cacheRootPath, metaCacheRootFolder)

const getMetaCachePath = async (folder: ContentFolder, locale: Locale) => {
  return {
    rootPath: metaCacheRootPath,
    filePath: join(metaCacheRootPath, `${folder}-${locale}.json`),
  }
}

const listFolders: Exclude<ContentFolder, 'about'>[] = ['article', 'cookbook']

const genCache = async (
  folder: Exclude<ContentFolder, 'about'>,
  locale: Locale,
) => {
  const { items } = await getPosts(folder, locale)
  if (!items.length) return

  const metaItems = items.map(({ slug, metadata }) => ({ slug, metadata }))
  const { rootPath, filePath } = await getMetaCachePath(folder, locale)

  const isExist = await fs.exists(rootPath)
  if (!isExist) {
    await fs.mkdirp(rootPath)
  }

  await writeFile(filePath, JSON.stringify(metaItems, null, 2))
}

const run = async () => {
  listFolders.forEach((folder) => {
    locales.forEach((locale) => genCache(folder, locale))
  })
}

run().catch((e) => {
  console.log(e)
})
