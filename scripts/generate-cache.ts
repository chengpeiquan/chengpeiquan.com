import { writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import process from 'node:process'
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
import { getContents } from '@/core/io'
import { fse } from './shared'
import { runTasks } from './task-runner'

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
    await fse.ensureDir(rootPath)
    await writeFile(filePath, data)
  }
}

const prepareCache = async (opts: GenerateOptions) => {
  const { items } = await getContents(opts.folder, {
    locale: opts.locale,
    page: 1,
    pageSize: Number.MAX_SAFE_INTEGER,
    ignoreDetails: true,
    strict: true,
  })
  // Validate every collection before overwriting any existing index.
  return new CacheTask({ ...opts, items })
}

export const run = async () => {
  const tasks = await Promise.all(
    listFolders.flatMap((folder) =>
      locales.map((locale) => prepareCache({ folder, locale })),
    ),
  )
  await runTasks(tasks.map((task) => () => task.run()))
}

if (import.meta.main) {
  run().catch((error) => {
    console.error(error)
    process.exitCode = 1
  })
}
