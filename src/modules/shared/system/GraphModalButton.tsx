import { Share } from 'lucide-react'
import type { FC } from 'react'

import { Button } from '@/components/ui/button'

import { openGraphModal } from './GraphModal'

interface Props {
    uid?: string
}

export const GraphModalButton: FC<Props> = ({ uid }) => {
    if (!uid) {
        return null
    }

    return (
        <Button variant="outline" size="sm" onClick={() => openGraphModal(uid)}>
            <Share className="h-4 w-4" />
        </Button>
    )
}

export const GraphModalTableButton: FC<Props> = ({ uid }) => {
    if (!uid) {
        return null
    }

    return (
        <Button
            variant="ghost"
            size="icon"
            className="ml-2 h-8 w-8 hover:text-orange-500"
            onClick={() => openGraphModal(uid)}
        >
            <Share className="h-4 w-4" />
        </Button>
    )
}
