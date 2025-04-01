import React from 'react'
import { cn } from '@/utils'

interface SectionTitleProps {
  title: string
  description: string
  gradient?: boolean
  className?: string
}

export const SectionTitle: React.FC<SectionTitleProps> = ({
  title,
  description,
  className,
}) => {
  return (
    <div
      className={cn(
        'mb-12 flex w-full flex-col gap-4 sm:mb-16 md:mb-24',
        className,
      )}
    >
      <h2 className="text-foreground text-4xl font-bold sm:text-5xl lg:text-6xl xl:text-7xl">
        {title}
      </h2>
      <p className="text-muted-foreground ml-[2.5em] text-base sm:text-xl md:text-2xl">
        {description}
      </p>
    </div>
  )
}

interface SectionContainerProps extends React.PropsWithChildren {
  fullscreen?: boolean
  className?: string
}

export const SectionContainer: React.FC<SectionContainerProps> = ({
  fullscreen,
  className,
  children,
}) => {
  return (
    <div
      className={cn(
        'relative py-16 md:py-20 lg:py-28',
        fullscreen ? 'w-screen' : 'container',
        className,
      )}
    >
      {children}
    </div>
  )
}
