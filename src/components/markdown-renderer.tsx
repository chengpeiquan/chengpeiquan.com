import React from 'react'
import { Heading, Paragraph } from 'blackwork'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { type ContentMetadata } from '@/config/content-config'

export interface MarkdownRendererProps {
  metadata: ContentMetadata
  content: string
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({
  metadata,
  content,
}) => {
  return (
    <article className="prose prose-neutral dark:prose-invert max-w-full mx-auto">
      <Heading level={1}>{metadata.title}</Heading>
      <Paragraph>{metadata.desc}</Paragraph>
      <MDXRemote source={content} />
    </article>
  )
}
