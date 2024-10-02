'use client' // Error boundaries must be Client Components

import React from 'react'
import NextError from 'next/error'
import { useTranslations } from 'next-intl'

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function ServerError({ error }: ErrorProps) {
  const t = useTranslations('errorConfig.error')

  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log(error)
  }, [error])

  return <NextError statusCode={500} title={t('title')} />
}
