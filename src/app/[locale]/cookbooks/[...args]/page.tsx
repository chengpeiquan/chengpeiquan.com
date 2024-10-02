import React from 'react'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { Heading, LayoutMain } from 'blackwork'
import { type LocalePageParams } from '@/config/locale-config'
import {
  type ContentDetailsLink,
  type ContentMetadata,
  type ListFolder,
  categoryGroupTitleConfig,
  cookbookCategories,
} from '@/config/content-config'
import { isMobileDevice } from '@/config/middleware-config'
import { type ListPageProps, getList, getListMetadata } from '@/contents'
import { Pagination } from '@/components/layouts/pagination'
import { CategoryLinks } from '@/components/layouts/category-links'
import { TimeDisplay } from '@/components/shared/time-display'
import { Link } from '@/navigation'

const folder: ListFolder = 'cookbook'

export const generateMetadata = async ({ params }: ListPageProps) =>
  getListMetadata(folder, params)

const ArticleCard: React.FC<{
  slug: string
  metadata: ContentMetadata
}> = ({ slug, metadata }) => {
  const { title, cover, date } = metadata
  const link = `/cookbook/${slug}` satisfies ContentDetailsLink

  return (
    <li className="flex flex-col gap-2 w-full">
      {cover && (
        <Link href={link}>
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

      <Link href={link}>
        <Heading
          level={3}
          className="text-base font-normal line-clamp-2 break-all"
        >
          {title}
        </Heading>
      </Link>

      <TimeDisplay value={date} />
    </li>
  )
}

interface CookbooksPageParams extends LocalePageParams {
  args: string[] // [page] | [slug, page]
}

interface CookbooksPageProps {
  params: CookbooksPageParams
}

export default async function CookbooksPage({ params }: CookbooksPageProps) {
  if (params.args.length > 2) {
    notFound()
  }

  const isMobile = isMobileDevice()

  const { items, page, lastPage, category } = await getList(folder, params)

  return (
    <LayoutMain className="gap-8">
      <CategoryLinks
        className="gap-6 mb-0"
        locale={params.locale}
        group="cookbooks"
        category={category}
        categories={cookbookCategories}
        collapsible
        collapsibleTitle={categoryGroupTitleConfig.cookbooks[params.locale]}
      />

      <ul className="grid md:grid-cols-5 grid-cols-1 col-auto row-auto gap-8 mb-4 md:mb-12">
        {items.map((i) => (
          <ArticleCard
            key={i.metadata.title}
            slug={i.slug}
            metadata={i.metadata}
          />
        ))}
      </ul>

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
