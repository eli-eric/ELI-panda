import type { CellContext } from '@tanstack/react-table'
import Link from 'next/link'
import type { FC } from 'react'

import { Tooltip } from '@/components/Tooltip'

import type { Zone } from '../types/zone.types'

const URL_REGEX = /(https?:\/\/[^\s]+)/g
const isUrl = (str: string) => /^https?:\/\//.test(str)

export const NotesCell: FC<CellContext<Zone, unknown>> = ({ getValue }) => {
    const value = getValue<string>()
    if (!value || value === '—') return <span>{value}</span>

    const parts = value.split(URL_REGEX)

    return (
        <Tooltip content={value} maxWidth="max-w-lg">
            <div className="truncate">
                {parts.map((part, i) =>
                    isUrl(part) ? (
                        <Link
                            key={i}
                            href={part}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={e => e.stopPropagation()}
                            className="text-primary hover:text-primary/80 underline cursor-pointer"
                        >
                            {part}
                        </Link>
                    ) : (
                        <span key={i}>{part}</span>
                    ),
                )}
            </div>
        </Tooltip>
    )
}
