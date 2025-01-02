import React from 'react'
import { Heading, Separator } from 'blackwork'

export interface PropsWithControllable {
  titleClassName?: string
  separatorVisible?: boolean
}

interface SidebarBlockProps extends PropsWithControllable {
  title: string
  children: React.ReactNode
}

export const SidebarBlock: React.FC<SidebarBlockProps> = ({
  title,
  titleClassName,
  separatorVisible = true,
  children,
}) => {
  return (
    <section className="flex flex-col w-full gap-4">
      {title && (
        <>
          <Heading level={4} className={titleClassName}>
            {title}
          </Heading>

          {separatorVisible && <Separator />}
        </>
      )}

      {children}
    </section>
  )
}
