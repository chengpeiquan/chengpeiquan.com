'use server'

import { type Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { cache } from 'react'
import { getMetaCache } from '@/cache/meta-cache'
import { type MetaCacheItem } from '@/config/cache-config'
import {
  ContentFolder,
  type GetListResponse,
  type ListFolder,
  articleCategories,
  cookbookCategories,
  getPagination,
  pageSizeConfig,
} from '@/config/content-config'
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

    const isCookbook = folder === ContentFolder.Cookbook
    const cateConfig = isCookbook ? cookbookCategories : articleCategories
    const cateItem = cateConfig.find((i) => i.slug === category)

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
  async (folder: ContentFolder, params: DetailsPageParams) =>
    getContent({ folder, ...params }),
)

export const getDetailsMetadata = cache(
  async (
    folder: ContentFolder,
    params: DetailsPageParams,
  ): Promise<Metadata> => {
    const res = await getDetails(folder, params)
    if (!res) return {}
    const { title, keywords, desc: description, cover } = res.metadata
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
        locale: params.locale,
        type: 'website',
      },
    }
  },
)
