'use client'

import { Loader2, Wand2 } from 'lucide-react'
import type { FC } from 'react'
import { useCallback } from 'react'
import { useIntl } from 'react-intl'

import { Tooltip } from '@/components/Tooltip'
import { Button } from '@/components/ui/button'
import useWarningModal from '@/hooks/useWarningModal'
import { message } from '@/i18n/src/messages'
import { useSystemCodeClear, useSystemCodeGenerate } from '@/modules/systemHierarchy/hooks'
import type { SystemLeaf } from '@/modules/systemHierarchy/types'

interface SystemCodeActionsProps {
    system: SystemLeaf
    disabled?: boolean
}

export const SystemCodeActions: FC<SystemCodeActionsProps> = ({ system, disabled }) => {
    const { formatMessage: fm } = useIntl()
    const { generateCode, isGenerating, disabled: generateDisabled } = useSystemCodeGenerate(system)
    const { clearCode, isClearing } = useSystemCodeClear(system)

    const isPending = isGenerating || isClearing
    const hasCode = !!system.systemCode

    // Warning modal for replacing existing code
    const withWarningModal = useWarningModal(
        fm(
            { id: message.systemHierarchy.systemCode.confirmReplaceDescription },
            { currentCode: system.systemCode || '' },
        ),
    )

    const handleGenerateClick = useCallback(() => {
        if (hasCode) {
            // Show confirmation dialog if code exists
            withWarningModal(generateCode)()
        } else {
            // Generate directly if no code exists
            generateCode()
        }
    }, [hasCode, generateCode, withWarningModal])

    const isGenerateDisabled = disabled || generateDisabled || isPending
    const tooltipContent = generateDisabled
        ? fm({ id: message.systemHierarchy.systemCode.generateDisabledTooltip })
        : undefined

    return (
        <div className="flex gap-2">
            <Tooltip content={tooltipContent}>
                <div>
                    <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={handleGenerateClick}
                        disabled={isGenerateDisabled}
                        className="shrink-0"
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
                onClick={clearCode}
                disabled={disabled || !hasCode || isPending}
                className="shrink-0"
            >
                {isClearing && <Loader2 className="size-4 mr-1 animate-spin" />}
                {fm({ id: message.common.systemItem.release })}
            </Button>
        </div>
    )
}
