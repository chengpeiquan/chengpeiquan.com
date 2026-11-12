import { type MetadataRoute } from 'next'
import { getMetaCache } from '@/cache/meta-cache'
import {
  categoryMapping,
  listFolderMapping,
  listFolders,
  pageSizeConfig,
} from '@/config/content-config'
import { locales } from '@/config/locale-config'
import { getPageUrl } from '@/config/site-config'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages: MetadataRoute.Sitemap = locales.flatMap((locale) =>
    ['/', '/about', '/projects', '/tattoos'].map((path) => ({
      url: getPageUrl(path, locale),
    })),
  )

  for (const locale of locales) {
    for (const folder of listFolders) {
      // The cache contains only content available in this language.
      // Do not advertise translated URLs backed by fallback content.
      const items = (await getMetaCache(folder, locale)).filter(
        (item) => !item.metadata.isDraft,
      )
      pages.push(
        ...items.map((item) => ({
          url: getPageUrl(`/${folder}/${item.slug}`, locale),
        })),
      )

      const group = listFolderMapping[folder]
      const categories = Object.values(categoryMapping).filter(
        (category) => category.group === group,
      )
      for (const category of ['', ...categories.map((item) => item.slug)]) {
        const total = items.filter((item) =>
          category ? item.metadata.categories?.includes(category) : true,
        ).length
        const lastPage = Math.ceil(total / pageSizeConfig[folder])
        for (let page = 1; page <= lastPage; page++) {
          pages.push({
            url: getPageUrl(
              `/${group}/${category ? `${category}/` : ''}${page}`,
              locale,
            ),
          })
        }
      }
    }
  }

  // No lastModified is emitted: publication dates and build times do not
  // reliably describe when the content was last meaningfully updated.
  return pages
}
