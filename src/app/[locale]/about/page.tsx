import { notFound } from 'next/navigation'
import { DetailsMain } from '@/components/layouts/details-main'
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
    <DetailsMain
      locale={params.locale}
      metadata={res.metadata}
      headings={res.headings}
      jsxElement={res.jsxElement}
    />
  )
}
