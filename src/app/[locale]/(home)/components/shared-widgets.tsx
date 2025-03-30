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
    <div className="mb-24 flex w-full flex-col gap-4">
      <h2 className="text-foreground text-4xl font-bold sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl">
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
  return <div className="container relative py-28">{children}</div>
}
