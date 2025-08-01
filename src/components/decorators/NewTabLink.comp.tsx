import Link from 'next/link'
import type { FC } from 'react'

import { cn } from '@/lib/utils'

import { Button } from '../ui/button'

interface NewTabLinkProps {
  href: string
  value?: string
  className?: string
}
export const NewTabLink: FC<NewTabLinkProps> = ({ href, value, className }) => (
  <Link href={href} target="_blank">
    <Button variant={'link'} className={cn('cursor-pointer', className)}>
      <span>{value}</span>
    </Button>
  </Link>
)
