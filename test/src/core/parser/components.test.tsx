import { type Element, type RootContent } from 'hast'
import React from 'react'
import { expect, test, vi } from 'vitest'
import { pre } from '@/core/parser/components'

vi.mock('@/navigation', () => ({
  Link: () => null,
}))

const createText = (value: string): RootContent =>
  ({ type: 'text', value }) as RootContent

const createElement = (
  tagName: string,
  children: RootContent[] = [],
  properties: Record<string, unknown> = {},
): Element => ({
  type: 'element',
  tagName,
  properties,
  children,
})

test('pre extracts title, language, and raw code for the code block component', async () => {
  const node = createElement(
    'pre',
    [
      createElement(
        'code',
        [
          createElement('span', [createText('const foo = 1')], {
            class: 'line',
          }),
          createElement('span', [createText('console.log(foo)')], {
            class: 'line',
          }),
        ],
        { class: ['language-ts'] },
      ),
    ],
    { 'data-title': 'docs/.vitepress/config.ts' },
  )

  const element = await pre({
    children: null,
    className: 'shiki',
    node,
  })

  expect(React.isValidElement(element)).toBe(true)
  expect(element.props.fileName).toBe('docs/.vitepress/config.ts')
  expect(element.props.language).toBe('ts')
  expect(element.props.rawCode).toBe('const foo = 1\nconsole.log(foo)')
})
