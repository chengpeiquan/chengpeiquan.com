import React from 'react'
import { Button, ExternalLink, type ExternalLinkProps } from 'blackwork'
import { type IconProps } from 'blackwork/icons'

export interface LinkIconButtonProps
  extends Pick<ExternalLinkProps, 'href' | 'title'> {
  ariaLabel: string
  icon: React.FC<IconProps>
}

export const LinkIconButton: React.FC<LinkIconButtonProps> = ({
  ariaLabel,
  href,
  title,
  icon: ButtonIcon,
}) => {
  return (
    <Button
      className="shrink-0"
      variant="ghost"
      size="icon"
      aria-label={ariaLabel}
    >
      <ExternalLink
        className="flex items-center justify-center w-full h-full"
        href={href}
        title={title}
      >
        <ButtonIcon className="size-5" />
      </ExternalLink>
    </Button>
  )
}
