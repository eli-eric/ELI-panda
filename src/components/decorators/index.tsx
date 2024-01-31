import Link from 'next/link'
import type { FC, PropsWithChildren } from 'react'

export const LinkDecorator: FC<PropsWithChildren> = ({ children }) => (
  <div className={'text-blue-700 dark:text-blue-600 text-sm cursor-pointer hover:underline'}>{children}</div>
)

interface NewTabLinkProps {
  href: string
  value?: string
}
export const NewTabLink: FC<NewTabLinkProps> = ({ href, value }) => (
  <Link href={href} legacyBehavior>
    <a target={'_blank'}>
      <LinkDecorator>
        <span>{value}</span>
      </LinkDecorator>
    </a>
  </Link>
)
