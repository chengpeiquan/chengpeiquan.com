import { Button, ExternalLink, type ExternalLinkProps } from 'blackwork'
import { type IconProps } from 'blackwork/icons'
import React from 'react'

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
        className="flex size-full items-center justify-center"
        href={href}
        title={title}
      >
        <ButtonIcon className="size-5" />
      </ExternalLink>
    </Button>
  )
}
