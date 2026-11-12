import { beforeEach, expect, test, vi } from 'vitest'
import { run } from '../generate-cache'

const mocks = vi.hoisted(() => ({
  readDirectory: vi.fn(),
  stat: vi.fn(),
  parse: vi.fn(),
  writeFile: vi.fn(),
}))
vi.mock('node:fs', async (original) => ({
  ...(await original<typeof import('node:fs')>()),
  readdirSync: mocks.readDirectory,
  statSync: mocks.stat,
}))
vi.mock('node:fs/promises', async (original) => ({
  ...(await original<typeof import('node:fs/promises')>()),
  writeFile: mocks.writeFile,
}))
vi.mock('@/core/parser', () => ({ parse: mocks.parse }))
vi.mock('../shared', () => ({ fse: { ensureDir: vi.fn() } }))

beforeEach(() => {
  vi.resetAllMocks()
  mocks.readDirectory.mockReturnValue([])
  mocks.stat.mockReturnValue({ isDirectory: () => true })
})

test('writes empty indices when collections are actually empty', async () => {
  await run()
  expect(mocks.writeFile).toHaveBeenCalledTimes(4)
  for (const [, data] of mocks.writeFile.mock.calls) expect(data).toBe('[]')
})

test.each(['EACCES', 'EIO', 'ENOENT'])(
  'does not overwrite any index on a source directory failure (%s)',
  async (code) => {
    mocks.readDirectory.mockImplementation((path: string) => {
      if (path.endsWith('/article/zh'))
        throw Object.assign(new Error('source unavailable'), { code })
      return []
    })
    await expect(run()).rejects.toThrow('source unavailable')
    expect(mocks.writeFile).not.toHaveBeenCalled()
  },
)

test('allows a missing translation directory when its collection exists', async () => {
  mocks.readDirectory.mockImplementation((path: string) => {
    if (path.endsWith('/cookbook/en'))
      throw Object.assign(new Error('no translation'), { code: 'ENOENT' })
    return []
  })
  await run()
  expect(mocks.writeFile).toHaveBeenCalledTimes(4)
})

test('rejects unreadable or malformed content before writing', async () => {
  mocks.readDirectory.mockImplementation((path: string) =>
    path.endsWith('/article/zh') ? ['broken.md'] : [],
  )
  mocks.parse.mockResolvedValue(null)
  await expect(run()).rejects.toThrow('Failed to read content metadata')
  expect(mocks.writeFile).not.toHaveBeenCalled()
})

test('propagates write failures to the build entry point', async () => {
  mocks.writeFile.mockRejectedValue(new Error('disk full'))
  await expect(run()).rejects.toThrow('disk full')
})

test('writes published metadata while excluding drafts', async () => {
  mocks.readDirectory.mockImplementation((path: string) =>
    path.endsWith('/article/zh') ? ['published.md', 'draft.md'] : [],
  )
  mocks.parse.mockImplementation(async (path: string) => ({
    slug: path.endsWith('draft.md') ? 'draft' : 'published',
    metadata: {
      title: 'Example',
      timestamp: 1,
      isDraft: path.endsWith('draft.md'),
    },
  }))
  await run()
  const write = mocks.writeFile.mock.calls.find(([path]) =>
    String(path).endsWith('article-zh.json'),
  )
  expect(JSON.parse(String(write?.[1]))).toEqual([
    {
      slug: 'published',
      metadata: { title: 'Example', timestamp: 1, isDraft: false },
    },
  ])
  expect(mocks.parse).toHaveBeenCalledWith(expect.any(String), {
    ignoreDetails: true,
  })
})
