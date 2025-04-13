'use server'

import { type Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { cache } from 'react'
import { getMetaCache } from '@/cache/meta-cache'
import { type MetaCacheItem } from '@/config/cache-config'
import {
  type ContentFolder,
  type GetListResponse,
  type ListFolder,
  categoryMapping,
  getPagination,
  pageSizeConfig,
} from '@/config/content-config'
import { defaultLocale } from '@/config/locale-config'
import {
  type DetailsPageParams,
  type ListPageParams,
} from '@/config/route-config'
import { sharedMetadata } from '@/config/site-config'
import { getContent } from './io'

const analyzeListParams = cache((params: ListPageParams) => {
  const isCategory = params.args.length === 2
  const category = isCategory ? params.args[0] : undefined
  const page = +(isCategory ? params.args[1] : params.args[0])

  return {
    category,
    page,
  }
})

export const getList = cache(
  async (folder: ListFolder, params: ListPageParams) => {
    const { category, page } = analyzeListParams(params)

    const allCache = await getMetaCache(folder, params.locale)
    const pageSize = pageSizeConfig[folder]

    const cache = allCache.filter((i) =>
      category ? i.metadata.categories?.includes(category) : true,
    )

    const pagination = getPagination(cache, page, pageSize)

    return {
      ...pagination,
      page,
      pageSize,
      category,
    } satisfies GetListResponse<MetaCacheItem>
  },
)

export const getListMetadata = cache(
  async (folder: ListFolder, params: ListPageParams): Promise<Metadata> => {
    const t = await getTranslations({
      locale: params.locale,
      namespace: 'basicConfig.pagination',
    })

    const { category, page } = analyzeListParams(params)
    const cateItem = category ? categoryMapping[category] : undefined

    const prefix = t(`prefix.${folder}`)
    const cateName = cateItem ? cateItem.label[params.locale] : ''
    const pageNumber = page > 1 ? ` - ${t('pageNumber', { page })}` : ''
    const title = `${cateName}${prefix}${pageNumber}`

    return {
      ...sharedMetadata,
      title,
    }
  },
)

export const getDetails = cache(
  async (folder: ContentFolder, params: DetailsPageParams) => {
    // Try to get the requested language content first
    const content = await getContent({ folder, ...params })
    if (content) return content

    // If not found and the current language is not the default,
    // try to get the default language content
    if (params.locale !== defaultLocale) {
      const fallbackContent = await getContent({
        folder,
        slug: params.slug,
        locale: defaultLocale,
      })
      return fallbackContent
    }

    // If there is no default language, return null,
    // then the page needs to respond with a 404 status code
    return null
  },
)

export const getDetailsMetadata = cache(
  async (
    folder: ContentFolder,
    params: DetailsPageParams,
  ): Promise<Metadata> => {
    // Get the content (the fallback mechanism will be automatically applied)
    const res = await getDetails(folder, params)
    if (!res) return {}

    const { title, keywords, desc: description, cover } = res.metadata

    // If the content is falling back to the default language,
    // we should keep the language setting requested by the user
    // This ensures that the language tag of the page is correct
    const locale = params.locale

    return {
      ...sharedMetadata,
      title,
      keywords,
      description,
      openGraph: {
        title,
        description,
        images: [
          {
            url: cover,
            width: 500,
            height: 400,
            alt: title,
          },
        ],
        locale,
        type: 'website',
      },
    }
  },
)
