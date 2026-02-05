import { Loader2, Trash2, Wand2 } from 'lucide-react'
import { memo } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'

import { Tooltip } from '@/components/Tooltip'
import { Button } from '@/components/ui/button'
import { useSystemStore } from '@/modules/shared/system/device-info-overlay/store/useShowDeviceStore'
import { useSystemCodeClear } from '@/modules/systemItem/hooks/useSystemCodeClear'
import { useSystemCodeGenerate } from '@/modules/systemItem/hooks/useSystemCodeGenerate'

export const SystemCodeActions = memo(() => {
    const { loading, getSystemCode, disabled } = useSystemCodeGenerate()
    const { clearSystemCode, loading: clearLoading } = useSystemCodeClear()
    const { uid } = useSystemStore()
    const { control } = useFormContext()

    const systemCode = useWatch({ control, name: 'systemCode' })

    const handleGenerate = () => {
        getSystemCode()
    }

    const handleClear = () => {
        if (!uid) return
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
                    disabled={disabled || isLoading}
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
                        disabled={!uid || isLoading}
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
