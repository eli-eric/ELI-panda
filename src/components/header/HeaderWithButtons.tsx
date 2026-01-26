import { ArrowLeft, Loader2, Save } from 'lucide-react'
import { useRouter } from 'next/router'
import { useRef } from 'react'
import { useIntl } from 'react-intl'

import { Button } from '@/components/ui/button'
import usePermission from '@/hooks/usePermission'
import { message } from '@/i18n/src/messages'
import type { ROLE } from '@/types/constants/roles'

import { HeaderWrapper } from './HeaderWrapper'

interface Props {
  loading?: boolean
  onSubmit?: () => void
  onSubmitAndExit?: () => void
  disableSubmit?: boolean
  disableSubmitAndExit?: boolean
  editRole: ROLE
  customElement?: React.ReactNode
  isFormInvalid?: boolean
  title?: string
  isFormDirty?: boolean
  loadingText?: string
}

export const HeaderWithButtons = ({
  loading,
  onSubmit,
  onSubmitAndExit,
  disableSubmit,
  disableSubmitAndExit,
  editRole,
  customElement,
  isFormInvalid = false,
  title,
  isFormDirty,
  loadingText
}: Props) => {
  const disabledEdit = usePermission([editRole])
  const { back } = useRouter()
  const { formatMessage: fm } = useIntl()
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

  const currentLoadingText = loadingText || (loading ? 'Processing...' : '')

  const disabledSubmit =
    disableSubmit || loading || !disabledEdit || isFormInvalid
  const disabledSubmitAndExit =
    disableSubmitAndExit || loading || !disabledEdit || isFormInvalid

  return (
    <HeaderWrapper>
      {/* Desktop header */}
      <div className="hidden sm:flex items-center gap-4 flex-1">
        <div className="flex items-center gap-2 min-w-0 flex-1">
          {title && (
            <h1 className="text-lg sm:text-xl font-semibold truncate">
              {title}
            </h1>
          )}
          {loading && currentLoadingText && (
            <span className="text-muted-foreground text-sm flex items-center gap-2 ml-4">
              <Loader2 className="size-3 animate-spin" />
              {currentLoadingText}
            </span>
          )}
          {!loading && isFormDirty && (
            <span
              className="text-muted-foreground text-sm ml-4"
              aria-live="polite"
            >
              {fm({ id: message.common.form.unsavedChanges })}
            </span>
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
            <span className="hidden lg:inline">
              {fm({ id: message.common.buttons.back })}
            </span>
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
                disabled={disabledSubmit}
              >
                {loading && <Loader2 className="size-3 animate-spin mr-2" />}
                {fm({ id: message.common.buttons.save })}
              </Button>
              <Button
                size="sm"
                onClick={handleSubmitAndExit}
                disabled={disabledSubmitAndExit}
              >
                {loading && <Loader2 className="size-3 animate-spin mr-2" />}
                {fm({ id: message.common.buttons.saveAndExit })}
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile header */}
      <div className="flex sm:hidden items-center justify-between flex-1">
        <Button
          variant="outline"
          size="sm"
          onClick={onBack}
          disabled={loading}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
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
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Save className="h-4 w-4" />
                )}
              </Button>
              <Button
                size="sm"
                onClick={handleSubmitAndExit}
                disabled={loading || isFormInvalid}
                title="Save and Exit"
              >
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Save className="h-4 w-4" />
                )}
              </Button>
            </>
          )}
        </div>
      </div>
    </HeaderWrapper>
  )
}
