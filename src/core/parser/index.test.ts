import { afterEach, expect, test } from 'bun:test'
import { mkdtemp, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { parse } from './index'

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
