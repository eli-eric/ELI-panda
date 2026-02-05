import type { FC, PropsWithChildren } from 'react'

import { cn } from '@/lib/utils'

interface Props {
    className?: string
    title?: string
}

export const LinkDecorator: FC<PropsWithChildren<Props>> = ({ children, className, title }) => (
    <span title={title} className={cn('link', className)}>
        {children}
    </span>
)
