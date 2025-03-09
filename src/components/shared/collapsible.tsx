'use client'

import {
  Button,
  CollapsibleClosed,
  CollapsibleContent,
  CollapsibleOpened,
  Collapsible as CollapsibleRoot,
  CollapsibleTrigger,
  Heading,
} from 'blackwork'
import React from 'react'
import { useClientLocale } from '@/hooks'
import { cn } from '@/utils'

interface CollapsibleProps extends React.PropsWithChildren {
  title: string
  className?: string
}

export const Collapsible: React.FC<CollapsibleProps> = ({
  title,
  className,
  children,
}) => {
  const { isChinese } = useClientLocale()

  const [isOpen, setIsOpen] = useState(false)

  const tips = useMemo(() => {
    if (isChinese) return isOpen ? '收起' : '展开'
    return isOpen ? 'Close' : 'Open'
  }, [isChinese, isOpen])

  const CollapsibleIcon = useMemo(() => {
    return isOpen ? CollapsibleOpened : CollapsibleClosed
  }, [isOpen])

  const cls = cn('w-full gap-y-2', className)

  const headerCls = cn('flex items-center justify-between gap-x-4', {
    'mb-4': isOpen,
  })

  return (
    <CollapsibleRoot open={isOpen} onOpenChange={setIsOpen} className={cls}>
      <div className={headerCls}>
        <Heading level={4} className="text-base">
          {title}
        </Heading>

        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="sm" className="w-9 p-0">
            <CollapsibleIcon className="size-4" />
            <span className="sr-only">{tips}</span>
          </Button>
        </CollapsibleTrigger>
      </div>

      <CollapsibleContent>{children}</CollapsibleContent>
    </CollapsibleRoot>
  )
}
