import { Heading, LayoutMain } from 'blackwork'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import React from 'react'
import { CategoryLinks } from '@/components/layouts/category-links'
import { Empty } from '@/components/layouts/empty'
import { Pagination } from '@/components/layouts/pagination'
import { TimeDisplay } from '@/components/shared/time-display'
import {
  type ContentDetailsLink,
  ContentFolder,
  type ContentMetadata,
  categoryGroupTitleConfig,
  cookbookCategories,
} from '@/config/content-config'
import { isMobileDevice } from '@/config/middleware-config'
import { type ListPageProps } from '@/config/route-config'
import { getList, getListMetadata } from '@/core/dispatcher'
import { Link } from '@/navigation'

const folder = ContentFolder.Cookbook

export const generateMetadata = async ({
  params: promiseParams,
}: ListPageProps) => {
  const params = await promiseParams
  return getListMetadata(folder, params)
}

const CookbookCard: React.FC<{
  slug: string
  metadata: ContentMetadata
}> = ({ slug, metadata }) => {
  const { title, cover, date } = metadata
  const link = `/${ContentFolder.Cookbook}/${slug}` satisfies ContentDetailsLink

  return (
    <li className="flex w-full flex-col gap-2">
      {cover && (
        <Link href={link} variant="image">
          <div className="relative flex aspect-[500/400] w-full shrink-0 overflow-hidden rounded-lg">
            <Image
              src={cover}
              alt={title}
              fill
              sizes="(max-width: 480px) 100%, 300px"
              style={{ objectFit: 'cover' }}
            />
          </div>
        </Link>
      )}

      <Heading
        level={3}
        className="line-clamp-2 break-all text-base font-normal"
      >
        <Link href={link}>{title}</Link>
      </Heading>

      <TimeDisplay value={date} />
    </li>
  )
}

export default async function CookbooksPage({
  params: promiseParams,
}: ListPageProps) {
  const params = await promiseParams
  const { locale, args } = params

  if (args.length > 2) {
    notFound()
  }

  const isMobile = await isMobileDevice()

  const { items, page, lastPage, category, isEmpty } = await getList(
    folder,
    params,
  )

  return (
    <LayoutMain className="gap-8">
      <CategoryLinks
        className="mb-0 gap-6"
        locale={locale}
        group="cookbooks"
        category={category}
        categories={cookbookCategories}
        collapsible
        collapsibleTitle={categoryGroupTitleConfig.cookbooks[locale]}
      />

      {isEmpty ? (
        <Empty locale={locale} />
      ) : (
        <ul className="col-auto row-auto mb-4 grid grid-cols-1 gap-8 md:mb-12 md:grid-cols-5">
          {items.map((i) => (
            <CookbookCard
              key={i.metadata.title}
              slug={i.slug}
              metadata={i.metadata}
            />
          ))}
        </ul>
      )}

      <Pagination
        slug="cookbooks"
        category={category}
        currentPage={page}
        totalPages={lastPage}
        isMobile={isMobile}
      />
    </LayoutMain>
  )
}
