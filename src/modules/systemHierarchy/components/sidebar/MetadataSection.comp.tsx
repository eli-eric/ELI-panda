import type { FC } from 'react'

import { cn } from '@/lib/utils'

interface MetadataItem {
    label: string
    value: string | number | null
    valueClassName?: string
}

interface MetadataSectionProps {
    title?: string
    items: MetadataItem[]
}

export const MetadataSection: FC<MetadataSectionProps> = ({ title, items }) => {
    return (
        <div className="space-y-2">
            {title && (
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    {title}
                </h3>
            )}
            <div className="space-y-1">
                {items.map((item, index) => (
                    <div key={index} className="flex justify-between items-center text-sm py-0.5">
                        <span className="text-muted-foreground text-xs">{item.label}</span>
                        <span
                            className={cn(
                                'text-xs font-medium truncate ml-2 max-w-[60%] text-right',
                                item.valueClassName,
                            )}
                        >
                            {item.value ?? 'N/A'}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    )
}
