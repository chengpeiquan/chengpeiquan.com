import { writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { fs } from '@bassist/node-utils'
import {
  CacheFolder,
  type MetaCacheItem,
  cacheRootFolder,
} from '@/config/cache-config'
import {
  type ContentItem,
  type ListFolder,
  listFolders,
} from '@/config/content-config'
import { type Locale, locales } from '@/config/locale-config'
import { ContentProcessorMode } from '@/core/types'
import { getPosts } from './shared'

const cacheRootPath = join(process.cwd(), 'src', cacheRootFolder)
const metaCacheRootPath = join(cacheRootPath, CacheFolder.MetaCache)

interface GenerateOptions {
  folder: ListFolder
  locale: Locale
}

interface TaskOptions extends GenerateOptions {
  items: ContentItem[]
}

class CacheTask {
  constructor(private opts: TaskOptions) {}

  public async run() {
    const metaItems = this.opts.items.map<MetaCacheItem>(
      ({ slug, metadata }) => ({ slug, metadata }),
    )

    const data = JSON.stringify(metaItems, null, 2)
    await this.writeCache(metaCacheRootPath, data)
  }

  private async writeCache(rootPath: string, data: string) {
    const fileName = `${this.opts.folder}-${this.opts.locale}.json`
    const filePath = join(rootPath, fileName)

    const isExist = await fs.exists(rootPath)
    if (!isExist) {
      await fs.mkdirp(rootPath)
    }

    await writeFile(filePath, data)
  }
}

const generateCache = async (opts: GenerateOptions) => {
  const { items } = await getPosts(
    opts.folder,
    opts.locale,
    ContentProcessorMode.TextOnly,
  )
  if (!items.length) return

  const options: TaskOptions = { ...opts, items }
  const task = new CacheTask(options)
  await task.run()
}

const run = async () => {
  listFolders.forEach((folder) => {
    locales.forEach((locale) => generateCache({ folder, locale }))
  })
}

run().catch(console.error)
