'use client' // Error boundaries must be Client Components
import NextError from 'next/error'
import { useTranslations } from 'next-intl'
import { useEffect } from 'react'

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function ServerError({ error }: ErrorProps) {
  const t = useTranslations('errorConfig.error')

  useEffect(() => {
    console.log(error)
  }, [error])

  return <NextError statusCode={500} title={t('title')} />
}
