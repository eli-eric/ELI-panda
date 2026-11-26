'use client'

import { Loader2, Wand2 } from 'lucide-react'
import type { FC } from 'react'
import { useCallback } from 'react'
import { useIntl } from 'react-intl'

import { Tooltip } from '@/components/Tooltip'
import { Button } from '@/components/ui/button'
import useWarningModal from '@/hooks/useWarningModal'
import { message } from '@/i18n/src/messages'

import { useGenerateSystemCode } from '../hooks/mutations/useGenerateSystemCode'
import { useSystemPatch } from '../hooks/mutations/useSystemPatch'
import type { SystemDetail } from '../types'

interface SystemCodeActionsProps {
    system: Pick<SystemDetail, 'uid' | 'systemCode' | 'systemType'>
    disabled?: boolean
}

// Failures and declined soft locks are already surfaced by the write hooks' toasts.
const ignoreRejection = () => undefined

export const SystemCodeActions: FC<SystemCodeActionsProps> = ({ system, disabled }) => {
    const { formatMessage: fm } = useIntl()
    const { generateCode, isGenerating } = useGenerateSystemCode(system.uid)
    const { patchSystem, isPending: isReleasing } = useSystemPatch(system.uid)

    const hasCode = !!system.systemCode
    const hasSystemType = !!system.systemType?.uid
    const isPending = isGenerating || isReleasing

    const withWarningModal = useWarningModal(
        fm(
            { id: message.systemHierarchy.systemCode.confirmReplaceDescription },
            { currentCode: system.systemCode || '' },
        ),
    )

    const runGenerate = useCallback(() => {
        generateCode().catch(ignoreRejection)
    }, [generateCode])

    const handleGenerate = useCallback(() => {
        if (hasCode) withWarningModal(runGenerate)()
        else runGenerate()
    }, [hasCode, runGenerate, withWarningModal])

    const handleRelease = useCallback(() => {
        patchSystem({ systemCode: null }).catch(ignoreRejection)
    }, [patchSystem])

    return (
        <div className="flex gap-2">
            <Tooltip
                content={
                    hasSystemType
                        ? undefined
                        : fm({ id: message.systemHierarchy.systemCode.generateDisabledTooltip })
                }
            >
                <div>
                    <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={handleGenerate}
                        disabled={disabled || !hasSystemType || isPending}
                        className="shrink-0"
                        data-testid="system-code-generate"
                    >
                        {isGenerating ? (
                            <Loader2 className="size-4 mr-1 animate-spin" />
                        ) : (
                            <Wand2 className="size-4 mr-1" />
                        )}
                        {fm({ id: message.common.buttons.generate })}
                    </Button>
                </div>
            </Tooltip>
            <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleRelease}
                disabled={disabled || !hasCode || isPending}
                className="shrink-0"
                data-testid="system-code-release"
            >
                {isReleasing && <Loader2 className="size-4 mr-1 animate-spin" />}
                {fm({ id: message.common.systemItem.release })}
            </Button>
        </div>
    )
}
