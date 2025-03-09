'use client'

import {
  type GeneratedPageItem,
  GeneratedPageType,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  Pagination as PaginationRoot,
  generatePages,
} from 'blackwork'
import React from 'react'
import { type PropsWithDevice } from '@/config/route-config'
import { Link } from '@/navigation'

interface PaginationProps extends PropsWithDevice {
  slug: string
  category?: string
  currentPage: number
  totalPages: number
}

interface PaginationButtonProps extends PaginationProps {
  item: GeneratedPageItem
}

const PaginationButton: React.FC<PaginationButtonProps> = ({
  slug,
  category,
  currentPage,
  totalPages,
  item,
}) => {
  const { type, page } = item

  const href = useMemo(
    () => (category ? `/${slug}/${category}/${page}` : `/${slug}/${page}`),
    [category, page, slug],
  )

  const content = useMemo(() => {
    switch (type) {
      case GeneratedPageType.Ellipsis: {
        return <PaginationEllipsis />
      }

      case GeneratedPageType.Previous: {
        const disabled = currentPage <= 1
        return <PaginationPrevious as={Link} disabled={disabled} href={href} />
      }

      case GeneratedPageType.Next: {
        const disabled = currentPage >= totalPages
        return <PaginationNext as={Link} disabled={disabled} href={href} />
      }

      default: {
        return (
          <PaginationLink as={Link} href={href} isActive={currentPage === page}>
            {page}
          </PaginationLink>
        )
      }
    }
  }, [currentPage, href, page, totalPages, type])

  return <PaginationItem>{content}</PaginationItem>
}

export const Pagination: React.FC<PaginationProps> = (props) => {
  const [delta, setDelta] = useState(2)

  useEffect(() => {
    if (props?.isMobile) {
      setDelta(1)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const pages = useMemo(() => {
    return generatePages({
      currentPage: props.currentPage,
      totalPages: props.totalPages,
      delta,
    })
  }, [delta, props.currentPage, props.totalPages])

  return (
    <PaginationRoot suppressHydrationWarning>
      <PaginationContent>
        {pages.map((i, idx) => (
          <PaginationButton key={i.type + idx} {...props} item={i} />
        ))}
      </PaginationContent>
    </PaginationRoot>
  )
}
