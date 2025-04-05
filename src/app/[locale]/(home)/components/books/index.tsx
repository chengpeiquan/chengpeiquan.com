'use server'

import { Card, Heading } from 'blackwork'
import Image from 'next/image'
import { getTranslations } from 'next-intl/server'
import React from 'react'
import { learningVue3 } from '@/config/book-config'
import { LocaleIs } from '@/config/locale-config'
import { type PropsWithLocale } from '@/config/route-config'
import { SectionContainer, SectionTitle } from '../shared-widgets'
import { AuthorRecommendation } from './author-recommendation'
import { BookIntroduce } from './introduce'
import { PurchaseLinks } from './purchase-links'

type BooksProps = PropsWithLocale

export const Books = async ({ locale }: BooksProps) => {
  if (LocaleIs.isEN(locale)) return null

  const t = await getTranslations({
    locale,
    namespace: 'homeConfig.books',
  })

  const book = learningVue3[locale]

  return (
    <SectionContainer>
      <SectionTitle title={t('title')} description={t('description')} />

      <Card className="mx-auto flex max-w-screen-lg flex-col gap-6 p-6 md:flex-row">
        <div className="relative flex aspect-[500/740] w-full shrink-0 md:w-[280px] lg:w-[340px]">
          <Image
            src={book.cover}
            alt={book.title}
            fill
            className="rounded-lg object-cover"
          />
        </div>

        <div className="flex flex-1 flex-col gap-4 overflow-hidden">
          <Heading level={3} className="xl:text-4xl">
            {book.title}
          </Heading>

          <div className="text-muted-foreground flex items-center gap-4 text-sm">
            <span>
              {t('author')}
              {book.author}
            </span>
            <span>
              {t('publisher')}
              {book.publisher}
            </span>
          </div>

          <BookIntroduce
            purchaseLinks={book.purchaseLinks}
            locale={locale}
            introSlug={book.introSlug}
          />

          <AuthorRecommendation
            locale={locale}
            authorRecommendationSlug={book.authorRecommendationSlug}
          />

          <PurchaseLinks
            className="flex flex-1 flex-col items-start justify-end gap-3 overflow-hidden text-sm sm:flex-row sm:items-end"
            labelClassName="h-10 items-center"
            purchaseLinks={book.purchaseLinks}
            locale={locale}
          />
        </div>
      </Card>
    </SectionContainer>
  )
}
