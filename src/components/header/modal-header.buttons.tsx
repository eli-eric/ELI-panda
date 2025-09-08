
import { Button } from '@/components/ui/button'

interface Props {
  isFormInvalid?: boolean
  onExit?: () => void
  isFetching?: boolean
}

export const ModalHeaderButtons = ({
  onExit,
  isFormInvalid = false,
  isFetching
}: Props) => {

  return (
    <div className="flex sticky top-0 z-10 items-end justify-end mb-2">
      <div className="flex gap-2 pb-2">
        <Button size="sm" type="submit" disabled={isFetching || isFormInvalid}>
          Save
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={onExit}
          disabled={isFetching || isFormInvalid}
        >
          Exit
        </Button>
      </div>
    </div>
  )
}
