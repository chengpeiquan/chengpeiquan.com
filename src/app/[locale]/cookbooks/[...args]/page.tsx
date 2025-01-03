import React from 'react'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { Heading, LayoutMain } from 'blackwork'
import { type ListPageProps } from '@/config/route-config'
import {
  type ContentDetailsLink,
  ContentFolder,
  type ContentMetadata,
  categoryGroupTitleConfig,
  cookbookCategories,
} from '@/config/content-config'
import { isMobileDevice } from '@/config/middleware-config'
import { getList, getListMetadata } from '@/core/dispatcher'
import { Empty } from '@/components/layouts/empty'
import { Pagination } from '@/components/layouts/pagination'
import { CategoryLinks } from '@/components/layouts/category-links'
import { TimeDisplay } from '@/components/shared/time-display'
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
    <li className="flex flex-col gap-2 w-full">
      {cover && (
        <Link href={link} variant="image">
          <div className="relative flex flex-shrink-0 w-full aspect-[500/400] rounded-lg overflow-hidden">
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
        className="text-base font-normal line-clamp-2 break-all"
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
        className="gap-6 mb-0"
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
        <ul className="grid md:grid-cols-5 grid-cols-1 col-auto row-auto gap-8 mb-4 md:mb-12">
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
