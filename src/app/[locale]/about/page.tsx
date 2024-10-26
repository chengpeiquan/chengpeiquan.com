import React from 'react'
import { notFound } from 'next/navigation'
import { LayoutMain } from 'blackwork'
import { ContentFolder } from '@/config/content-config'
import {
  type DetailsPageProps,
  getDetails,
  getDetailsMetadata,
} from '@/core/dispatcher'
import { MarkupRenderer } from '@/components/markup/renderer'

const folder = ContentFolder.About
const slug = folder

export const generateMetadata = async ({ params }: DetailsPageProps) =>
  getDetailsMetadata(folder, { ...params, slug })

export default async function AboutPage({ params }: DetailsPageProps) {
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
