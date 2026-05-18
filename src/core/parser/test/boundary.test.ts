import { readdir, readFile } from 'node:fs/promises'
import { join } from 'node:path'
import process from 'node:process'
import { expect, test } from 'vitest'

const collectParserFiles = async (dir: string): Promise<string[]> => {
  const entries = await readdir(dir, { withFileTypes: true })
  const nested = await Promise.all(
    entries.map(async (entry) => {
      const fullPath = join(dir, entry.name)

      if (entry.isDirectory()) {
        if (entry.name === 'test') {
          return []
        }

        return collectParserFiles(fullPath)
      }

      return /\.(ts|tsx)$/u.test(entry.name) ? [fullPath] : []
    }),
  )

  return nested.flat()
}

test('core parser does not depend on app component modules', async () => {
  const files = await collectParserFiles(join(process.cwd(), 'src/core/parser'))

  for (const file of files) {
    const source = await readFile(file, 'utf-8')
    expect(source, file).not.toContain("from '@/components/")
  }
})

test('core parser does not keep local plugin implementations', async () => {
  const files = await collectParserFiles(join(process.cwd(), 'src/core/parser'))

  expect(files.filter((file) => file.includes('/plugins/'))).toEqual([])
})
