import { ArrowLeft, Save } from 'lucide-react'
import { useRouter } from 'next/router'
import { useRef } from 'react'

import { Button } from '@/components/ui/button'
import { SidebarTrigger } from '@/components/ui/sidebar'
import usePermission from '@/hooks/usePermission'
import { message } from '@/i18n/src/messages'
import type { ROLE } from '@/types/constants/roles'

interface Props {
  loading?: boolean
  onSubmit?: () => void
  onSubmitAndExit?: () => void
  editRole: ROLE
  customElement?: React.ReactNode
  isFormInvalid?: boolean
  title?: string
}
const messages = message.common.buttons

export const HeaderWithButtons = ({
  loading,
  onSubmit,
  onSubmitAndExit,
  editRole,
  customElement,
  isFormInvalid = false,
  title
}: Props) => {
  const disabledEdit = usePermission([editRole])
  const { back } = useRouter()
  const DEBOUNCE_TIME = 1500
  const lastSubmitTimeRef = useRef<number>(0)

  const onBack = () => {
    if (loading) return
    const now = Date.now()
    if (now - lastSubmitTimeRef.current < DEBOUNCE_TIME) return
    lastSubmitTimeRef.current = now
    back()
  }

  const handleSubmit = () => {
    if (!onSubmit) return
    const now = Date.now()
    if (now - lastSubmitTimeRef.current < DEBOUNCE_TIME) return
    lastSubmitTimeRef.current = now
    onSubmit?.()
  }

  const handleSubmitAndExit = () => {
    if (!onSubmitAndExit) return
    const now = Date.now()
    if (now - lastSubmitTimeRef.current < DEBOUNCE_TIME) return
    lastSubmitTimeRef.current = now
    onSubmitAndExit?.()
  }

  return (
    <div className="border-b bg-background sticky top-0 z-10">
      <div className="w-full px-4 py-2">
        {/* Desktop header - with title */}
        <div className="hidden sm:flex items-center gap-4">
          <SidebarTrigger />
          <div className="flex items-center gap-2 min-w-0 flex-1">
            {title && (
              <h1 className="text-lg sm:text-xl font-semibold truncate">
                {title}
              </h1>
            )}
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <Button
              variant="outline"
              size="sm"
              onClick={onBack}
              disabled={loading}
              className="flex items-center gap-1.5"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="hidden lg:inline">Back</span>
            </Button>
            {customElement && (
              <>
                <div className="h-4 w-px bg-border" />
                {customElement}
                <div className="h-4 w-px bg-border" />
              </>
            )}
            {disabledEdit && (
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleSubmit}
                  disabled={loading || isFormInvalid}
                >
                  Save
                </Button>
                <Button
                  size="sm"
                  onClick={handleSubmitAndExit}
                  disabled={loading || isFormInvalid}
                >
                  Save and Exit
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile header - only buttons */}
        <div className="flex sm:hidden items-center justify-between">
          <div className="flex items-center gap-2">
            <SidebarTrigger />
            <Button variant="outline" size="sm" onClick={onBack} disabled={loading}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex items-center gap-2">
            {customElement}
            {disabledEdit && (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleSubmit}
                  disabled={loading || isFormInvalid}
                  title="Save"
                >
                  <Save className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  onClick={handleSubmitAndExit}
                  disabled={loading || isFormInvalid}
                  title="Save and Exit"
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
