'use client'

import {
  CodeBlock as MachineCodeBlock,
  type CodeBlockProps as MachineCodeBlockProps,
} from '@blackwork/machine'
import { useTranslations } from 'next-intl'
import React from 'react'
import { cn } from '@/utils'

export type CodeBlockProps = MachineCodeBlockProps

export const CodeBlock: React.FC<React.PropsWithChildren<CodeBlockProps>> = ({
  className,
  copyLabel,
  copiedLabel,
  ...props
}) => {
  const t = useTranslations('basicConfig.codeBlock')

  return (
    <MachineCodeBlock
      className={cn(
        'max-w-full',
        'wrap-break-word whitespace-pre-wrap',
        `
          [&_.line]:block [&_.line]:wrap-break-word
          [&_.line]:whitespace-pre-wrap
        `,
        '[&_code]:block [&_code]:w-full [&_code]:min-w-0',
        '[&_code]:wrap-break-word [&_code]:whitespace-pre-wrap',
        'sm:whitespace-pre',
        'sm:[&_.line]:break-normal sm:[&_.line]:whitespace-pre',
        'sm:[&_code]:w-max sm:[&_code]:min-w-full',
        'sm:[&_code]:break-normal sm:[&_code]:whitespace-pre',
        className,
      )}
      copyLabel={copyLabel ?? t('copy')}
      copiedLabel={copiedLabel ?? t('copied')}
      {...props}
    />
  )
}
