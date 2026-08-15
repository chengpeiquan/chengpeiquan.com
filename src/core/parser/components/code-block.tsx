'use client'

import {
  CodeBlock as MachineCodeBlock,
  type CodeBlockProps as MachineCodeBlockProps,
} from '@blackwork/machine'
import { useTranslations } from 'next-intl'
import React from 'react'

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
      className={className}
      copyLabel={copyLabel ?? t('copy')}
      copiedLabel={copiedLabel ?? t('copied')}
      {...props}
    />
  )
}
