import Link from 'next/link'
import type { FC } from 'react'

import { LinkDecorator } from './LinkDecorator.comp'

interface NewTabLinkProps {
  href: string
  value?: string
}
export const NewTabLink: FC<NewTabLinkProps> = ({ href, value }) => (
  <Link href={href} target="_blank">
    <LinkDecorator>
      <span>{value}</span>
    </LinkDecorator>
  </Link>
)
