'use client' // Error boundaries must be Client Components

import React from 'react'
import NextError from 'next/error'
import { useTranslations } from 'next-intl'

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function ServerError({ error }: ErrorProps) {
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log(error)
  }, [error])

  const t = useTranslations('basicConfig')

  return (
    <html lang={t('lang')}>
      <body>
        <NextError statusCode={500} title={t('error.title')} />
      </body>
    </html>
  )
}
