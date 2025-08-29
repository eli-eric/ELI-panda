import { useRef } from 'react'

import { Button } from '@/components/ui/button'

interface Props {
  onSubmit?: () => void
  isFormInvalid?: boolean
  onExit?: () => void
  isFetching?: boolean
}

export const ModalHeaderButtons = ({
  onSubmit,
  onExit,
  isFormInvalid = false,
  isFetching
}: Props) => {
  const DEBOUNCE_TIME = 500
  const lastSubmitTimeRef = useRef<number>(0)

  const handleSubmit = () => {
    if (!onSubmit) return
    const now = Date.now()
    if (now - lastSubmitTimeRef.current < DEBOUNCE_TIME) return
    lastSubmitTimeRef.current = now
    onSubmit?.()
  }

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
