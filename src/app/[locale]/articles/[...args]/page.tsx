import React from 'react'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import {
  Heading,
  HolyGrailAside,
  HolyGrailContent,
  LayoutMain,
} from 'blackwork'
import {
  type ContentDetailsLink,
  ContentFolder,
  type ContentMetadata,
  articleCategories,
} from '@/config/content-config'
import { isMobileDevice } from '@/config/middleware-config'
import { type ListPageProps } from '@/config/locale-config'
import { getList, getListMetadata } from '@/core/dispatcher'
import { Empty } from '@/components/layouts/empty'
import { Pagination } from '@/components/layouts/pagination'
import { CategoryLinks } from '@/components/layouts/category-links'
import { PublishedBooks } from '@/components/sidebar/published-books'
import { CatHuffing } from '@/components/sidebar/cat-huffing'
import { FriendlyLinks } from '@/components/sidebar/friendly-links'
import { TimeDisplay } from '@/components/shared/time-display'
import { Link } from '@/navigation'

const folder = ContentFolder.Article

export const generateMetadata = async ({
  params: promiseParams,
}: ListPageProps) => {
  const params = await promiseParams
  return getListMetadata(folder, params)
}

const ArticleCard: React.FC<{
  slug: string
  metadata: ContentMetadata
}> = ({ slug, metadata }) => {
  const { title, desc, cover, date } = metadata
  const link = `/${ContentFolder.Article}/${slug}` satisfies ContentDetailsLink

  return (
    <li className="flex flex-col gap-4 w-full">
      <Link href={link}>
        <Heading
          level={3}
          className="text-lg md:text-2xl line-clamp-2 break-all"
        >
          {title}
        </Heading>
      </Link>

      <div className="flex flex-col md:flex-row gap-4">
        {cover && (
          <Link href={link}>
            <div className="relative flex flex-shrink-0 w-full xs:w-[160px] aspect-[500/400] rounded-lg overflow-hidden">
              <Image
                src={cover}
                alt={title}
                fill
                sizes="(max-width: 480px) 100%, 160px"
                style={{ objectFit: 'cover' }}
              />
            </div>
          </Link>
        )}

        <div className="flex flex-col justify-between">
          <p className="md:h-auto h-0 text-sm md:text-base text-gray-400 md:mb-4 mb-0 md:line-clamp-3 line-clamp-2">
            {desc}
          </p>

          <TimeDisplay value={date} className="md:text-sm" />
        </div>
      </div>
    </li>
  )
}

export default async function ArticlesPage({
  params: promiseParams,
}: ListPageProps) {
  const params = await promiseParams

  if (params.args.length > 2) {
    notFound()
  }

  const isMobile = await isMobileDevice()

  const { items, page, lastPage, category, isEmpty } = await getList(
    folder,
    params,
  )

  return (
    <LayoutMain className="sm:flex-row justify-between gap-16">
      <HolyGrailContent>
        <CategoryLinks
          locale={params.locale}
          group="articles"
          category={category}
          categories={articleCategories}
        />

        {isEmpty ? (
          <Empty locale={params.locale} />
        ) : (
          <ul className="flex flex-col gap-12 w-full mb-12">
            {items.map((i) => (
              <ArticleCard
                key={i.metadata.title}
                slug={i.slug}
                metadata={i.metadata}
              />
            ))}
          </ul>
        )}

        <Pagination
          slug="articles"
          category={category}
          currentPage={page}
          totalPages={lastPage}
          isMobile={isMobile}
        />
      </HolyGrailContent>

      <HolyGrailAside>
        <PublishedBooks />
        <CatHuffing />
        <FriendlyLinks />
      </HolyGrailAside>
    </LayoutMain>
  )
}
