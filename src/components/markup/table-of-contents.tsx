'use client'

import React from 'react'
import { useTranslations } from 'next-intl'
import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  HolyGrailAside,
  ScrollArea,
  Separator,
} from 'blackwork'
import { Toc as TocIcon } from 'blackwork/icons'
import { isBrowser } from '@bassist/utils'
import { cn } from '@/utils'
import {
  type HeadingDepth,
  type HeadingItem,
  headingDepths,
} from '@/config/content-config'

/**
 * Flatten headings to reduce HTML tag nesting
 */
const flattenHeadings = (
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

const isElementInViewport = (id: string) => {
  if (!isBrowser) return false

  const el = document.getElementById(id)
  if (!el) return false

  const rect = el.getBoundingClientRect()
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  )
}

interface TocProps {
  items: Omit<HeadingItem, 'children'>[]
  activeId: string
  setActiveId: (id: string) => void
}

const Toc: React.FC<TocProps> = ({ items, activeId, setActiveId }) => {
  return (
    <ul>
      {items.map(({ id, value: title, depth }) => {
        const isActive = activeId === id

        const itemCls = cn('relative my-2 scroll-my-6 scroll-py-6', {
          'dark:text-white': isActive,
        })

        const anchorCls = cn(
          {
            2: '',
            3: 'pl-4',
            4: 'pl-8',
            5: 'pl-12',
            6: 'pl-16',
          }[depth],
          'inline-block w-full break-words text-sm no-underline break-all',
          'transition-color',
          'contrast-more:text-zinc-900 contrast-more:underline contrast-more:dark:text-zinc-50',
          isActive
            ? 'font-semibold text-primary-600 subpixel-antialiased contrast-more:!text-primary-600'
            : 'text-zinc-500 dark:text-zinc-700 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-300',
        )

        return (
          <li key={id} onClick={() => setActiveId(id)} className={itemCls}>
            <a className={anchorCls} href={`#${id}`}>
              {title}
            </a>
          </li>
        )
      })}
    </ul>
  )
}

interface TableOfContentsProps {
  headings: HeadingItem[]
  maxDepth?: HeadingDepth
}

const useTableOfContents = ({
  headings,
  maxDepth = 4,
}: TableOfContentsProps) => {
  const items = useMemo(() => {
    return flattenHeadings(headings).filter((heading) => {
      return headingDepths.includes(heading.depth) && heading.depth <= maxDepth
    })
  }, [maxDepth, headings])

  const elementIds = useMemo(() => items.map(({ id }) => id), [items])

  const [activeId, setActiveId] = useState(items.length > 0 ? items[0].id : '')

  const handleScroll = () => {
    if (!isBrowser) return
    const visibleHeadings = elementIds.filter(isElementInViewport)
    if (visibleHeadings.length > 0) {
      setActiveId(visibleHeadings[0] ?? '')
    }
  }

  useEffect(() => {
    if (!isBrowser) return
    document.addEventListener('scroll', handleScroll)

    return () => {
      document.removeEventListener('scroll', handleScroll)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const tocProps = useMemo(
    () => ({ items, activeId, setActiveId }),
    [activeId, items],
  )

  return {
    items,
    tocProps,
  }
}

export const DesktopToc: React.FC<TableOfContentsProps> = (props) => {
  const t = useTranslations('basicConfig')
  const { items, tocProps } = useTableOfContents(props)

  const tocCls = cn(
    'sticky top-32 w-full',
    // Reduce top and bottom padding, header height
    'max-h-[calc(100vh-64px-64px-64px)]',
  )

  if (!items.length) return null
  return (
    <HolyGrailAside smaller>
      <div className={tocCls}>
        <p className="min-h-7 font-semibold tracking-tight">
          {t('outline.title')}
        </p>

        <Separator className="mt-4 mb-2" />

        <ScrollArea className="h-[calc(100%-50px)] pr-4 -mr-4">
          <Toc {...tocProps} />
        </ScrollArea>
      </div>
    </HolyGrailAside>
  )
}

export const MobileToc: React.FC<TableOfContentsProps> = (props) => {
  const t = useTranslations('basicConfig')
  const { items, tocProps } = useTableOfContents(props)

  if (!items.length) return null
  return (
    <Dialog modal={false}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="fixed right-5 bottom-20 w-10 h-10 select-none z-10"
        >
          <TocIcon className="w-5 h-5" />
        </Button>
      </DialogTrigger>

      <DialogContent className="w-3/4 rounded-xl">
        <DialogHeader>
          <DialogTitle>{t('outline.title')}</DialogTitle>
        </DialogHeader>

        <ScrollArea className="max-h-[60vh] pr-4 -mr-4">
          <Toc {...tocProps} />
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
