import { type Element, type ElementContent, type Properties } from 'hast'
import React from 'react'
import { expect, test, vi } from 'vitest'
import { pre } from '@/core/parser/components'

vi.mock('@/navigation', () => ({
  Link: () => null,
  ExternalLink: () => null,
}))

type PreComponent = (props: {
  children: React.ReactNode
  className?: string
  node?: Element
}) => React.ReactNode | Promise<React.ReactNode>

const createText = (value: string): ElementContent => ({ type: 'text', value })

const createElement = (
  tagName: string,
  children: ElementContent[] = [],
  properties: Properties = {},
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

  const renderPre = pre as PreComponent
  const element = await renderPre({
    children: null,
    className: 'shiki',
    node,
  })

  expect(React.isValidElement(element)).toBe(true)
  const codeBlockElement = element as React.ReactElement<{
    fileName: string
    language: string
    rawCode: string
  }>
  expect(codeBlockElement.props.fileName).toBe('docs/.vitepress/config.ts')
  expect(codeBlockElement.props.language).toBe('ts')
  expect(codeBlockElement.props.rawCode).toBe('const foo = 1\nconsole.log(foo)')
})
