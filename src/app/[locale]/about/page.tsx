import React from 'react'
import { notFound } from 'next/navigation'
import { LayoutMain } from 'blackwork'
import { ContentFolder } from '@/config/content-config'
import { type DetailsPageProps } from '@/config/locale-config'
import { getDetails, getDetailsMetadata } from '@/core/dispatcher'
import { MarkupRenderer } from '@/components/markup/renderer'

const folder = ContentFolder.About
const slug = folder

export const generateMetadata = async ({
  params: promiseParams,
}: DetailsPageProps) => {
  const params = await promiseParams
  return getDetailsMetadata(folder, { ...params, slug })
}

export default async function AboutPage({
  params: promiseParams,
}: DetailsPageProps) {
  const params = await promiseParams
  const res = await getDetails(folder, { ...params, slug })

  if (!res) {
    notFound()
  }

  return (
    <LayoutMain>
      <MarkupRenderer
        locale={params.locale}
        metadata={res.metadata}
        jsxElement={res.jsxElement}
      />
    </LayoutMain>
  )
}
