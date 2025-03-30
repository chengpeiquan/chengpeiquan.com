import React from 'react'

interface SectionTitleProps {
  title: string
  description: string
  gradient?: boolean
}

export const SectionTitle: React.FC<SectionTitleProps> = ({
  title,
  description,
}) => {
  return (
    <div className="mb-12 flex w-full flex-col gap-4 sm:mb-16 md:mb-24">
      <h2 className="text-foreground text-4xl font-bold sm:text-5xl lg:text-6xl xl:text-7xl">
        {title}
      </h2>
      <p className="text-muted-foreground ml-[2.5em] text-base sm:text-xl md:text-2xl">
        {description}
      </p>
    </div>
  )
}

export const SectionContainer: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  return (
    <div className="container relative py-16 md:py-20 lg:py-28">{children}</div>
  )
}
