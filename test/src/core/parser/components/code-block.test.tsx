import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { expect, test, vi } from 'vitest'
import { CodeBlock } from '@/core/parser/components/code-block'

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}))

test('code block wrapper uses light tokens, dark neutral overrides, and a plain language label', () => {
  const html = renderToStaticMarkup(
    <CodeBlock
      fileName="docs/.vitepress/config.ts"
      language="ts"
      rawCode="const foo = 1"
    >
      <code>const foo = 1</code>
    </CodeBlock>,
  )

  expect(html).toContain('border-border')
  expect(html).toContain('bg-card')
  expect(html).toContain('bg-muted/40')
  expect(html).toContain('dark:border-zinc-800')
  expect(html).toContain('dark:bg-zinc-950')
  expect(html).toContain('dark:bg-zinc-950/80')
  expect(html).toContain('>TypeScript</span>')
  expect(html).toContain('text-[10px]')
  expect(html).toContain('text-muted-foreground/80')
  expect(html).not.toContain(
    'rounded-md border border-border bg-background px-2 py-1 font-mono text-[11px] text-muted-foreground',
  )
})

test('markdown code blocks wrap long lines without forcing all code blocks to wrap', () => {
  const markdownHtml = renderToStaticMarkup(
    <CodeBlock
      language="markdown"
      rawCode={'# ' + 'very-long-line '.repeat(20)}
    >
      <code># test</code>
    </CodeBlock>,
  )

  const typescriptHtml = renderToStaticMarkup(
    <CodeBlock language="ts" rawCode={'const value = "' + 'x'.repeat(80) + '"'}>
      <code>const value = &quot;test&quot;</code>
    </CodeBlock>,
  )

  expect(markdownHtml).toContain('overflow-x-hidden')
  expect(markdownHtml).toContain('whitespace-pre-wrap')
  expect(markdownHtml).toContain('[&amp;_code]:whitespace-pre-wrap')
  expect(typescriptHtml).toContain('overflow-x-auto')
  expect(typescriptHtml).not.toContain('whitespace-pre-wrap')
})
