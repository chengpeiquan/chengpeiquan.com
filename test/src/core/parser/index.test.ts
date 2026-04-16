import { mkdtemp, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { afterEach, expect, test, vi } from 'vitest'
import { parse } from '@/core/parser/index'
import { ContentProcessorMode } from '@/core/types'

vi.mock('@/navigation', () => ({
  Link: () => null,
}))

const tempDirs: string[] = []

afterEach(async () => {
  await Promise.all(
    tempDirs.splice(0).map((dir) => rm(dir, { recursive: true, force: true })),
  )
})

test('parse keeps timestamp when gray-matter returns a Date', async () => {
  const dir = await mkdtemp(join(tmpdir(), 'parser-date-'))
  tempDirs.push(dir)

  const filePath = join(dir, 'fixture.md')
  await writeFile(
    filePath,
    `---
title: Test title
desc: Test description
keywords: test
date: 2026-04-07 00:00:00
cover: https://example.com/cover.jpg
---

Hello world
`,
  )

  const result = await parse(filePath, { ignoreDetails: true })

  expect(result?.metadata.timestamp).toBe(
    new Date('2026-04-07T00:00:00+08:00').getTime(),
  )
  expect(result?.metadata.date).toBe('2026/4/7 00:00:00')
})

test('parse exposes code block language classes and title metadata in html output', async () => {
  const dir = await mkdtemp(join(tmpdir(), 'parser-code-'))
  tempDirs.push(dir)

  const filePath = join(dir, 'fixture.md')
  await writeFile(
    filePath,
    `---
title: Test title
desc: Test description
keywords: test
date: 2026-04-07 00:00:00
cover: https://example.com/cover.jpg
---

\`\`\`ts title="docs/.vitepress/config.ts"
const foo = 1
console.log(foo)
\`\`\`
`,
  )

  const result = await parse(filePath, {
    mode: ContentProcessorMode.HtmlOnly,
  })

  expect(result?.html).toContain('class="language-ts"')
  expect(result?.html).toContain('data-title="docs/.vitepress/config.ts"')
})
