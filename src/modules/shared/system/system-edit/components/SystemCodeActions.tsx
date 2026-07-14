import { useQueryClient } from '@tanstack/react-query'
import { Loader2, Trash2, Wand2 } from 'lucide-react'
import { memo } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'
import { useIntl } from 'react-intl'

import { Tooltip } from '@/components/Tooltip'
import { Button } from '@/components/ui/button'
import { guardSystemEdit } from '@/modules/shared/system/edit-permission'
import { useSystemCodeClear } from '@/modules/systemItem/hooks/useSystemCodeClear'
import { useSystemCodeGenerate } from '@/modules/systemItem/hooks/useSystemCodeGenerate'

interface SystemCodeActionsProps {
    // The edited system's uid (from the sheet), used for the release guard/where —
    // prop rather than the global device store so it always matches the open sheet.
    uid?: string
    canEdit?: boolean
}

export const SystemCodeActions = memo(({ uid, canEdit = true }: SystemCodeActionsProps) => {
    const { loading, getSystemCode, disabled } = useSystemCodeGenerate()
    const { clearSystemCode, loading: clearLoading } = useSystemCodeClear()
    const { control } = useFormContext()
    const { formatMessage: fm } = useIntl()
    const queryClient = useQueryClient()

    const systemCode = useWatch({ control, name: 'systemCode' })

    const handleGenerate = () => {
        getSystemCode()
    }

    const handleClear = async () => {
        if (!uid) return
        // Release fires a direct GraphQL updateSystems, so it must pass the same
        // per-system guard as the sheet save — otherwise it's an unguarded patch path.
        if (!(await guardSystemEdit(queryClient, uid, fm))) return
        clearSystemCode({
            where: {
                uid: uid,
            },
            update: {
                systemCode: null,
            },
        })
    }

    const isLoading = loading || clearLoading
    const hasSystemCode = Boolean(systemCode)

    return (
        <div className="flex items-center gap-1">
            <Tooltip content="Generate system code">
                <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    disabled={disabled || isLoading || !canEdit}
                    onClick={handleGenerate}
                    className="h-6 w-6 p-0 hover:bg-primary/10"
                    aria-label="Generate system code"
                >
                    {loading ? (
                        <Loader2 className="size-3 animate-spin" />
                    ) : (
                        <Wand2 className="size-3 text-primary hover:text-primary/80" />
                    )}
                </Button>
            </Tooltip>

            {hasSystemCode && (
                <Tooltip content="Release system code">
                    <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        disabled={!uid || isLoading || !canEdit}
                        onClick={handleClear}
                        className="h-6 w-6 p-0 hover:bg-destructive/10"
                        aria-label="Release system code"
                    >
                        {clearLoading ? (
                            <Loader2 className="size-3 animate-spin" />
                        ) : (
                            <Trash2 className="size-3 text-destructive hover:text-destructive/80" />
                        )}
                    </Button>
                </Tooltip>
            )}
        </div>
    )
})

SystemCodeActions.displayName = 'SystemCodeActions'
