'use client'

import React from 'react'
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
import { Link } from '@/navigation'
import { type PropsWithDevice } from '@/types'

interface PaginationProps extends PropsWithDevice {
  slug: string
  currentPage: number
  totalPages: number
}

interface PaginationButtonProps extends PaginationProps {
  item: GeneratedPageItem
}

const PaginationButton: React.FC<PaginationButtonProps> = ({
  slug,
  currentPage,
  totalPages,
  item,
}) => {
  const { type, page } = item

  const content = useMemo(() => {
    switch (type) {
      case GeneratedPageType.Ellipsis: {
        return <PaginationEllipsis />
      }

      case GeneratedPageType.Previous: {
        const disabled = currentPage <= 1
        return (
          <PaginationPrevious
            as={Link}
            disabled={disabled}
            href={`/${slug}/${page}`}
          />
        )
      }

      case GeneratedPageType.Next: {
        const disabled = currentPage >= totalPages
        return (
          <PaginationNext
            as={Link}
            disabled={disabled}
            href={`/${slug}/${page}`}
          />
        )
      }

      default: {
        return (
          <PaginationLink
            as={Link}
            href={`/${slug}/${page}`}
            isActive={currentPage === page}
          >
            {page}
          </PaginationLink>
        )
      }
    }
  }, [currentPage, page, slug, totalPages, type])

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
