import { type HeadingItem } from '@/config/content-config'

export interface DocsTocHeading {
  depth: number
  id: string
  title: string
}

export const flattenHeadings = (
  headings: HeadingItem[],
): Omit<HeadingItem, 'children'>[] => {
  const result: Omit<HeadingItem, 'children'>[] = []

  const flatten = (items: HeadingItem[]) => {
    for (const item of items) {
      const { children, ...rest } = item
      result.push(rest)
      if (children) {
        flatten(children)
      }
    }
  }

  flatten(headings)
  return result
}

export const toDocsTocHeadings = (headings: HeadingItem[]): DocsTocHeading[] =>
  flattenHeadings(headings).map(({ depth, id, value }) => ({
    depth,
    id,
    title: value,
  }))
