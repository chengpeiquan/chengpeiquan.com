import { renderToStaticMarkup } from 'react-dom/server'
import { expect, test, vi } from 'vitest'

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => `i18n:${key}`,
}))

vi.mock('@blackwork/machine', () => ({
  CodeBlock: ({
    className,
    copyLabel,
    copiedLabel,
    language,
  }: {
    className?: string
    copyLabel?: string
    copiedLabel?: string
    language?: string
  }) => (
    <div
      className={className}
      data-machine="true"
      data-copy-label={copyLabel}
      data-copied-label={copiedLabel}
      data-language={language}
    />
  ),
}))

import { CodeBlock } from '@/core/parser/components/code-block'

test('blog code block delegates to machine with translated labels', () => {
  const html = renderToStaticMarkup(
    <CodeBlock language="ts" rawCode="const foo = 1">
      <code>const foo = 1</code>
    </CodeBlock>,
  )

  expect(html).toContain('data-machine="true"')
  expect(html).toContain('data-copy-label="i18n:copy"')
  expect(html).toContain('data-copied-label="i18n:copied"')
  expect(html).toContain('data-language="ts"')
  expect(html).toContain('max-w-full')
  expect(html).toContain('whitespace-pre-wrap')
  expect(html).toContain('[&amp;_code]:min-w-0')
  expect(html).toContain('sm:[&amp;_code]:min-w-full')
})
