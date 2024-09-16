'use client'

import React from 'react'
import NextError from 'next/error'
import { useTranslations } from 'next-intl'

export default function NotFound() {
  const t = useTranslations('basicConfig')

  return (
    <html lang={t('lang')}>
      <body>
        <NextError statusCode={404} title={t('notFound.title')} />
      </body>
    </html>
  )
}
