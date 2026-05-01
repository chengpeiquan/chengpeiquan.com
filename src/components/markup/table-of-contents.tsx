'use client'

import { DefaultDocsToc, MobileDocsToc } from '@blackwork/docs/theme'
import React from 'react'
import { type HeadingItem } from '@/config/content-config'
import { toDocsTocHeadings } from './toc-utils'

interface TableOfContentsProps {
  headings: HeadingItem[]
  openLabel?: string
  title: string
}

export const DesktopToc: React.FC<TableOfContentsProps> = ({
  headings,
  title,
}) => {
  return (
    <DefaultDocsToc
      className="xl:right-8"
      collapseDirection="right"
      collapseEnabled
      dock="fixed"
      headings={toDocsTocHeadings(headings)}
      minHeadings={2}
      title={title}
    />
  )
}

export const MobileToc: React.FC<TableOfContentsProps> = ({
  headings,
  title,
  openLabel,
}) => {
  return (
    <MobileDocsToc
      headings={toDocsTocHeadings(headings)}
      minHeadings={2}
      openLabel={openLabel}
      title={title}
    />
  )
}
