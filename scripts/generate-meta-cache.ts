import { fs } from '@bassist/node-utils'
import { getMetaCachePath } from '@/contents/io'
import { type ContentFolder } from '@/config/content-config'
import { type Locale, locales } from '@/config/locale-config'
import { writeFile } from 'node:fs/promises'
import { getPosts } from './shared'

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
