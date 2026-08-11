import type { FC } from 'react'

import { Tooltip as TP, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

type Props = {
    content?: string
    children: React.ReactNode
    className?: string
    maxWidth?: string
    /**
     * Gap between trigger and content. Defaults to 0, which places the content — and
     * the arrow, which is nudged further out still — flush against the trigger. With
     * `disableHoverableContent` the content closes the tooltip as soon as the pointer
     * reaches it, so on a small trigger that overlap becomes an open/close loop. Give
     * such triggers a few pixels of clearance.
     */
    sideOffset?: number
}

// eslint-disable-next-line react/prop-types
export const Tooltip: FC<Props> = ({
    children,
    content,
    className,
    maxWidth = 'max-w-xs',
    sideOffset,
}) =>
    content ? (
        <TP disableHoverableContent>
            <TooltipTrigger asChild>{children}</TooltipTrigger>
            <TooltipContent className={`${maxWidth} ${className || ''}`} sideOffset={sideOffset}>
                <p className="whitespace-pre-line break-words">{content}</p>
            </TooltipContent>
        </TP>
    ) : (
        children
    )
