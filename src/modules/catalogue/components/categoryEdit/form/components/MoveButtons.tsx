import { ChevronDown, ChevronUp } from 'lucide-react'

import { Button } from '@/components/ui/button'

interface Props {
    index: number
    lenght: number
    moveDown: (index: number) => void
    moveUp: (index: number) => void
}

const MoveButtons = ({ index, lenght, moveDown, moveUp }: Props) => (
    <div className="flex flex-col gap-1">
        <Button
            type="button"
            disabled={index === 0}
            variant="outline"
            size="sm"
            onClick={() => {
                moveUp(index)
            }}
            className="h-8 w-8 p-0"
        >
            <ChevronUp className="h-3 w-3" />
        </Button>
        <Button
            type="button"
            disabled={index === lenght - 1}
            variant="outline"
            size="sm"
            onClick={() => {
                moveDown(index)
            }}
            className="h-8 w-8 p-0"
        >
            <ChevronDown className="h-3 w-3" />
        </Button>
    </div>
)

export default MoveButtons
