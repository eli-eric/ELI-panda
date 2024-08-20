import Link from 'next/link'
import type { FC, PropsWithChildren } from 'react'

export const LinkDecorator: FC<PropsWithChildren> = ({ children }) => (
  <div className={'link'}>{children}</div>
)

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
