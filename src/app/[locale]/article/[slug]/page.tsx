import React from 'react'
import { notFound } from 'next/navigation'
import { ContentFolder } from '@/config/content-config'
import { type DetailsPageProps } from '@/config/route-config'
import { getDetails, getDetailsMetadata } from '@/core/dispatcher'
import { DetailsMain } from '@/components/layouts/details-main'
import { ArticleSidebar } from '@/components/sidebar'

const folder = ContentFolder.Article

export const generateMetadata = async ({
  params: promiseParams,
}: DetailsPageProps) => {
  const params = await promiseParams
  return getDetailsMetadata(folder, params)
}

export default async function ArticlePage({
  params: promiseParams,
}: DetailsPageProps) {
  const params = await promiseParams
  const res = await getDetails(folder, params)

  if (!res) {
    notFound()
  }

  return (
    <DetailsMain
      locale={params.locale}
      metadata={res.metadata}
      headings={res.headings}
      jsxElement={res.jsxElement}
      aside={<ArticleSidebar />}
    />
  )
}
