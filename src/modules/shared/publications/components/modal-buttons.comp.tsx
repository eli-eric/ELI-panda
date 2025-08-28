import { Save } from 'lucide-react'
import { useRef } from 'react'

import { Button } from '@/components/ui/button'
import { SidebarTrigger } from '@/components/ui/sidebar'
import usePermission from '@/hooks/usePermission'
import type { ROLE } from '@/types/constants/roles'

interface Props {
  onSubmit?: () => void
  onExit?: () => void
  title?: string
  editRole: ROLE
  loading?: boolean
  isFormInvalid?: boolean
  customElement?: React.ReactNode
}

export const ModalHeaderWithButtons = ({
  onSubmit,
  onExit,
  editRole,
  loading
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
      <div className="w-full px-4 py-2">
        {/* Desktop header*/}
        <div className="hidden sm:flex items-center gap-4">
          <SidebarTrigger />
          <div className="flex items-center gap-2 min-w-0 flex-1">
            <h1 className="text-lg sm:text-xl font-semibold truncate"></h1>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            {disabledEdit && (
              <div className="flex gap-2">
                <Button size="sm" onClick={handleSubmit} disabled={loading}>
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

        {/* Mobile header*/}
        <div className="flex sm:hidden items-center justify-between">
          <div className="flex items-center gap-2">
            <SidebarTrigger />
          </div>
          <div className="flex items-center gap-2">
            {disabledEdit && (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleSubmit}
                  disabled={loading}
                  title="Save"
                >
                  <Save className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  onClick={handleExit}
                  disabled={loading}
                  title="Exit"
                >
                  <Save className="h-4 w-4" />
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
