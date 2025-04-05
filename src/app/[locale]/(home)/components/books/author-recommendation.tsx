import React from 'react'
import { type BookPurchaseInfo } from '@/config/book-config'
import { ContentFolder } from '@/config/content-config'
import { type PropsWithLocale } from '@/config/route-config'
import { getDetails } from '@/core/dispatcher'

type AuthorRecommendationProps = Pick<
  BookPurchaseInfo,
  'authorRecommendationSlug'
> &
  PropsWithLocale

export const AuthorRecommendation = async ({
  locale,
  authorRecommendationSlug,
}: AuthorRecommendationProps) => {
  const res = await getDetails(ContentFolder.Fragment, {
    slug: authorRecommendationSlug,
    locale,
  })

  if (!res) return null

  const content = res.jsxElement

  return (
    <div className="prose prose-neutral dark:prose-invert text-base">
      {content}
    </div>
  )
}
