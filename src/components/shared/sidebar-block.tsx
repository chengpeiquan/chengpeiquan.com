import React from 'react'
import { Heading, Separator } from 'blackwork'

interface SidebarBlockProps {
  title: string
  titleClassName?: string
  children: React.ReactNode
}

export const SidebarBlock: React.FC<SidebarBlockProps> = ({
  title,
  titleClassName,
  children,
}) => {
  return (
    <section className="flex flex-col w-full gap-4">
      <Heading level={4} className={titleClassName}>
        {title}
      </Heading>

      <Separator />

      {children}
    </section>
  )
}
