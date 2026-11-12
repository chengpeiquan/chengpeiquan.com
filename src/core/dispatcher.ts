'use server'

import { type Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getTranslations } from 'next-intl/server'
import { cache } from 'react'
import { getMetaCache } from '@/cache/meta-cache'
import { type MetaCacheItem } from '@/config/cache-config'
import {
  ContentFolder,
  type GetListResponse,
  type ListFolder,
  categoryMapping,
  getPagination,
  listFolderMapping,
  pageSizeConfig,
} from '@/config/content-config'
import { defaultLocale } from '@/config/locale-config'
import {
  type DetailsPageParams,
  type ListPageParams,
} from '@/config/route-config'
import { getPageMetadata, sharedMetadata } from '@/config/site-config'
import { getContent } from './io'

const analyzeListParams = cache((params: ListPageParams) => {
  if (params.args.length < 1 || params.args.length > 2) notFound()

  const isCategory = params.args.length === 2
  const category = isCategory ? params.args[0] : undefined
  const rawPage = isCategory ? params.args[1] : params.args[0]
  const page = Number(rawPage)

  if (!/^[1-9]\d*$/u.test(rawPage) || !Number.isSafeInteger(page)) notFound()

  return {
    category,
    page,
  }
})

export const getList = cache(
  async (folder: ListFolder, params: ListPageParams) => {
    const { category, page } = analyzeListParams(params)

    if (
      category !== undefined &&
      (!Object.hasOwn(categoryMapping, category) ||
        categoryMapping[category].group !== listFolderMapping[folder])
    ) {
      notFound()
    }

    const allCache = await getMetaCache(folder, params.locale)
    const pageSize = pageSizeConfig[folder]

    const cache = allCache.filter((i) =>
      category ? i.metadata.categories?.includes(category) : true,
    )

    const pagination = getPagination(cache, page, pageSize)

    // Empty collections may render page one, but must not create endless URLs.
    if (page > Math.max(1, pagination.lastPage)) notFound()

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

    const { category, page } = await getList(folder, params)
    const cateItem = category ? categoryMapping[category] : undefined

    const prefix = t(`prefix.${folder}`)
    const cateName = cateItem ? cateItem.label[params.locale] : ''
    const pageNumber = page > 1 ? ` - ${t('pageNumber', { page })}` : ''
    const title = `${cateName}${prefix}${pageNumber}`

    return {
      ...sharedMetadata,
      ...getPageMetadata(
        `/${listFolderMapping[folder]}/${category ? `${category}/` : ''}${page}`,
        params.locale,
      ),
      title,
    }
  },
)

export const getDetails = cache(
  async (folder: ContentFolder, params: DetailsPageParams) => {
    // Try to get the requested language content first
    const content = await getContent({ folder, ...params })
    if (content) return { ...content, contentLocale: params.locale }

    // If not found and the current language is not the default,
    // try to get the default language content
    if (params.locale !== defaultLocale) {
      const fallbackContent = await getContent({
        folder,
        slug: params.slug,
        locale: defaultLocale,
      })
      return fallbackContent
        ? { ...fallbackContent, contentLocale: defaultLocale }
        : null
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

    // Canonical identity follows the actual content, even when the UI uses
    // the requested language around an untranslated article.
    const locale = res.contentLocale

    const pageMetadata = getPageMetadata(
      folder === ContentFolder.About ? '/about' : `/${folder}/${params.slug}`,
      locale,
    )

    return {
      ...sharedMetadata,
      ...pageMetadata,
      title,
      keywords,
      description,
      openGraph: {
        ...pageMetadata.openGraph,
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
