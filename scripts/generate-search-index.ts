import { indexRecords, type SearchIndexRecord } from '@blackwork/search'
import { type ContentMetadata, listFolders } from '@/config/content-config'
import { locales } from '@/config/locale-config'
import { ContentProcessorMode } from '@/core/types'
import { getPosts } from './shared'
import { runTasks } from './task-runner'

const searchIndexOutputPath = 'public/pagefind'

const toSearchContent = (metadata: ContentMetadata, content: string) => {
  return [metadata.title, metadata.desc, metadata.keywords, content]
    .filter(Boolean)
    .join('\n\n')
}

export const run = async () => {
  const records: SearchIndexRecord[] = []

  const tasks = listFolders.flatMap((folder) =>
    locales.map((locale) => async () => {
      const { items } = await getPosts(
        folder,
        locale,
        ContentProcessorMode.TextOnly,
      )

      items.forEach(({ slug, metadata, html }) => {
        records.push({
          id: `${folder}-${locale}-${slug}`,
          title: metadata.title,
          summary: metadata.desc,
          content: toSearchContent(metadata, html),
          url: `/${locale}/${folder}/${slug}`,
          locale,
          filters: {
            folder,
            locale,
          },
          metadata: {
            slug,
            folder,
            title: metadata.title,
            desc: metadata.desc,
            cover: metadata.cover,
          },
        })
      })
    }),
  )

  await runTasks(tasks)

  await indexRecords({
    records,
    output: {
      path: searchIndexOutputPath,
    },
  })
}

if (import.meta.main) {
  run().catch(console.error)
}
