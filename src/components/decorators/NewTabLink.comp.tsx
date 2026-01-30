import Link from 'next/link'
import type { FC } from 'react'

import { cn } from '@/lib/utils'

interface NewTabLinkProps {
    href: string
    value?: string
    className?: string
}
export const NewTabLink: FC<NewTabLinkProps> = ({ href, value, className }) => (
    <Link
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={e => e.stopPropagation()}
        className={cn('text-primary hover:text-primary/80 underline cursor-pointer', className)}
    >
        {value}
    </Link>
)
