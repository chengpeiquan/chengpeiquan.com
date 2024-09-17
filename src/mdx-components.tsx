import type { MDXComponents } from 'mdx/types'

export const useMDXComponents = (components: MDXComponents): MDXComponents => {
  return {
    ...components,
  }
}
