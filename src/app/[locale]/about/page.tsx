import { LayoutMain } from 'blackwork'
import { notFound } from 'next/navigation'
import React from 'react'
import { MarkupRenderer } from '@/components/markup/renderer'
import { ContentFolder } from '@/config/content-config'
import { type SinglePageProps } from '@/config/route-config'
import { getDetails, getDetailsMetadata } from '@/core/dispatcher'

const folder = ContentFolder.About
const slug = folder

export const generateMetadata = async ({
  params: promiseParams,
}: SinglePageProps) => {
  const params = await promiseParams
  return getDetailsMetadata(folder, { ...params, slug })
}

export default async function AboutPage({
  params: promiseParams,
}: SinglePageProps) {
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
