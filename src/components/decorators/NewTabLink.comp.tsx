import Link from 'next/link'
import type { FC } from 'react'

import { LinkDecorator } from './LinkDecorator.comp'

interface NewTabLinkProps {
  href: string
  value?: string
  className?: string
}
export const NewTabLink: FC<NewTabLinkProps> = ({ href, value, className }) => (
  <Link href={href} target="_blank">
    <LinkDecorator className={className}>
      <span>{value}</span>
    </LinkDecorator>
  </Link>
)
