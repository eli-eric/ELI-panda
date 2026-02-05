import { Loader2 } from 'lucide-react'
import { useRef } from 'react'
import { useIntl } from 'react-intl'

import { Button } from '@/components/ui/button'
import usePermission from '@/hooks/usePermission'
import { message } from '@/i18n/src/messages'
import type { ROLE } from '@/types/constants/roles'

interface Props {
    onSubmit?: () => void
    onExit?: () => void
    editRole: ROLE
    loading?: boolean
    isFormDirty?: boolean
    customElement?: React.ReactNode
    saveLabel?: string
    exitLabel?: string
    loadingText?: string
}

export const SheetFormButtons = ({
    onSubmit,
    onExit,
    editRole,
    loading,
    isFormDirty,
    saveLabel = 'Save',
    exitLabel = 'Exit',
    loadingText,
}: Props) => {
    const { formatMessage: fm } = useIntl()
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

    const currentLoadingText = loadingText || (loading ? 'Processing...' : '')

    return (
        <div className="border-b bg-background sticky top-0 z-10">
            <div className="flex justify-between items-center py-2">
                <div>
                    {loading && currentLoadingText && (
                        <span className="text-muted-foreground text-sm flex items-center gap-2">
                            <Loader2 className="size-3 animate-spin" />
                            {currentLoadingText}
                        </span>
                    )}
                    {!loading && isFormDirty && (
                        <span className="text-muted-foreground text-sm" aria-live="polite">
                            {fm({ id: message.common.form.unsavedChanges })}
                        </span>
                    )}
                </div>
                {disabledEdit && (
                    <div className="flex gap-2">
                        <Button type="button" size="sm" onClick={handleSubmit} disabled={loading}>
                            {loading && <Loader2 className="size-3 animate-spin mr-2" />}
                            {saveLabel}
                        </Button>
                        <Button
                            type="button"
                            size="sm"
                            onClick={handleExit}
                            disabled={loading}
                            variant="outline"
                        >
                            {loading && <Loader2 className="size-3 animate-spin mr-2" />}
                            {exitLabel}
                        </Button>
                    </div>
                )}
            </div>
        </div>
    )
}
