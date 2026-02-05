import type { FC } from 'react'

import { truncateString } from '@/utils'

import { Tooltip } from '../Tooltip'

type Props = {
    value?: string
    numberOfChars?: number
}

export const ShortCell: FC<Props> = ({ value, numberOfChars }) => {
    if (!value) return null

    const shortValue = truncateString(value, numberOfChars)

    return (
        <Tooltip content={value}>
            <div>{shortValue}</div>
        </Tooltip>
    )
}
