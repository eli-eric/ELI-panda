import { ArrowLeft } from 'lucide-react'
import type { FC } from 'react'

import { Button } from '@/components/ui/button'

interface Props {
    name: string
    code: string
    onBack: () => void
}

export const CategoryDetailHeader: FC<Props> = ({ name, code, onBack }) => {
    return (
        <div className="flex items-center justify-between px-4 py-2 border-b border-border gap-2">
            <div className="flex items-center gap-2 min-w-0">
                <Button variant="ghost" size="icon" onClick={onBack} aria-label="back">
                    <ArrowLeft className="size-4" />
                </Button>
                <div className="min-w-0">
                    <h2 className="text-sm font-semibold truncate">{name}</h2>
                    <code className="text-xs text-muted-foreground">{code}</code>
                </div>
            </div>
        </div>
    )
}
