import { Heading, HolyGrailContent, LayoutMain } from 'blackwork'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import React from 'react'
import { CategoryLinks } from '@/components/layouts/category-links'
import { Empty } from '@/components/layouts/empty'
import { Pagination } from '@/components/layouts/pagination'
import { TimeDisplay } from '@/components/shared/time-display'
import { ArticleSidebar } from '@/components/sidebar'
import {
  type ContentDetailsLink,
  ContentFolder,
  type ContentMetadata,
  articleCategories,
} from '@/config/content-config'
import { isMobileDevice } from '@/config/middleware-config'
import { type ListPageProps } from '@/config/route-config'
import { getList, getListMetadata } from '@/core/dispatcher'
import { Link } from '@/navigation'
import { cn } from '@/utils'

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
    <li className="flex w-full flex-col gap-4">
      <Link href={link} className="inline-block w-fit">
        <Heading
          level={3}
          className={cn(`
            line-clamp-2 text-lg break-all
            md:text-2xl
          `)}
        >
          {title}
        </Heading>
      </Link>

      <div
        className="
          flex flex-col gap-4
          xs:flex-row
        "
      >
        {cover && (
          <Link href={link} variant="image">
            <div
              className={cn(
                `
                  relative flex aspect-500/400 w-full shrink-0 overflow-hidden
                  rounded-lg
                  xs:w-[160px]
                  md:w-[240px]
                `,
              )}
            >
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
          <p
            className={cn(
              `
                mb-0 line-clamp-2 h-0 text-sm text-muted-foreground
                xs:mb-4 xs:line-clamp-3 xs:h-auto xs:text-base
              `,
            )}
          >
            {desc}
          </p>

          <TimeDisplay value={date} className="xs:text-sm" />
        </div>
      </div>
    </li>
  )
}

export default async function ArticlesPage({
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
    <LayoutMain
      className="
        justify-between gap-16
        sm:flex-row
      "
    >
      <HolyGrailContent>
        <CategoryLinks
          locale={locale}
          group="articles"
          category={category}
          categories={articleCategories}
        />

        {isEmpty ? (
          <Empty locale={locale} />
        ) : (
          <ul className="mb-12 flex w-full flex-col gap-12">
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

      <ArticleSidebar />
    </LayoutMain>
  )
}
