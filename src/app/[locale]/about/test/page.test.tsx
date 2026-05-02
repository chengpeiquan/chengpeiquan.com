import React from 'react'
import { expect, test, vi } from 'vitest'
import { ContentFolder } from '@/config/content-config'

const mocks = vi.hoisted(() => ({
  detailsMain: vi.fn(() => null),
  getDetails: vi.fn(),
  notFound: vi.fn(),
}))

vi.mock('@/components/layouts/details-main', () => ({
  DetailsMain: mocks.detailsMain,
}))

vi.mock('@/components/markup/renderer', () => ({
  MarkupRenderer: vi.fn(() => null),
}))

vi.mock('@/core/dispatcher', () => ({
  getDetails: mocks.getDetails,
  getDetailsMetadata: vi.fn(),
}))

vi.mock('blackwork', () => ({
  LayoutMain: vi.fn(() => null),
}))

vi.mock('next/navigation', () => ({
  notFound: mocks.notFound,
}))

test('about page renders markdown through the details content layout', async () => {
  const content = {
    metadata: {
      title: 'About',
      desc: 'About me',
      keywords: 'about',
      date: '2026/4/30 00:00:00',
      timestamp: 1777478400000,
      cover: 'https://example.com/cover.jpg',
    },
    headings: [{ depth: 2, id: 'intro', value: 'Intro' }],
    jsxElement: null,
  }
  mocks.getDetails.mockResolvedValue(content)

  const { default: AboutPage } = await import('@/app/[locale]/about/page')

  const element = await AboutPage({
    params: Promise.resolve({ locale: 'zh' }),
  })

  expect(mocks.getDetails).toHaveBeenCalledWith(ContentFolder.About, {
    locale: 'zh',
    slug: ContentFolder.About,
  })
  expect(React.isValidElement(element)).toBe(true)
  expect((element as React.ReactElement).type).toBe(mocks.detailsMain)
  expect((element as React.ReactElement).props).toEqual({
    locale: 'zh',
    metadata: content.metadata,
    headings: content.headings,
    jsxElement: content.jsxElement,
  })
})
