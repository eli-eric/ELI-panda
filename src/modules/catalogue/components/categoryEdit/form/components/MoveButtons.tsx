import {
  ArrowSmallDownIcon,
  ArrowSmallUpIcon
} from '@heroicons/react/24/outline'

import { Button } from '@/components/Buttons'

interface Props {
  index: number
  lenght: number
  moveDown: (index: number) => void

  moveUp: (index: number) => void
}

const MoveButtons = ({ index, lenght, moveDown, moveUp }: Props) => (
  <div className="flex flex-col">
    <Button
      type="button"
      disabled={index === 0}
      rounded="rounded-tl-md"
      onClick={() => {
        moveUp(index)
      }}
      buttonSize="small"
    >
      <ArrowSmallUpIcon className="h-[9px] w-[9px]" aria-hidden="true" />
    </Button>
    <Button
      type="button"
      disabled={index === lenght - 1}
      rounded="rounded-bl-md"
      onClick={() => {
        moveDown(index)
      }}
      buttonSize="small"
    >
      <ArrowSmallDownIcon className="h-[9px] w-[9px]" aria-hidden="true" />
    </Button>
  </div>
)

export default MoveButtons
