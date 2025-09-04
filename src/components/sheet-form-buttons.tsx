import { useRef } from 'react'

import { Button } from '@/components/ui/button'
import usePermission from '@/hooks/usePermission'
import type { ROLE } from '@/types/constants/roles'

interface Props {
  onSubmit?: () => void
  onExit?: () => void
  editRole: ROLE
  loading?: boolean
  isFormDirty?: boolean
  customElement?: React.ReactNode
}

export const SheetFormButtons = ({
  onSubmit,
  onExit,
  editRole,
  loading,
  isFormDirty
}: Props) => {
  const disabledEdit = usePermission([editRole])
  const DEBOUNCE_TIME = 1500
  const lastSubmitTimeRef = useRef<number>(0)

  const handleSubmit = () => {
    if (!onSubmit) return
    const now = Date.now()
    if (now - lastSubmitTimeRef.current < DEBOUNCE_TIME) return
    lastSubmitTimeRef.current = now
    onSubmit?.()
  }

  const handleExit = () => {
    if (!onExit) return
    const now = Date.now()
    if (now - lastSubmitTimeRef.current < DEBOUNCE_TIME) return
    lastSubmitTimeRef.current = now
    onExit?.()
  }

  return (
    <div className="border-b bg-background sticky top-0 z-10">
      <div className="flex justify-between items-center py-2">
        <div>
          {isFormDirty && (
            <span className="text-muted-foreground text-sm">
              You have unsaved changes
            </span>
          )}
        </div>
        {disabledEdit && (
          <div className="flex gap-2">
            <Button
              size="sm"
              onClick={handleSubmit}
              disabled={loading || !isFormDirty}
            >
              Save
            </Button>
            <Button
              size="sm"
              onClick={handleExit}
              disabled={loading}
              variant="outline"
            >
              Exit
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}