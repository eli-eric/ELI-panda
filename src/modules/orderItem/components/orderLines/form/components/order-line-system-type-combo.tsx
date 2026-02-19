import { useCallback } from 'react'
import { useIntl } from 'react-intl'

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { message } from '@/i18n/src/messages'
import type { CodebookType } from '@/types/responses/codebook'

import { useEmptySystemSelectionModal } from '../hooks/useEmptySystemSelectionModal'

interface OrderLineSystemTypeComboProps {
    value: 'new' | 'existing'
    onChange: (
        value: 'new' | 'existing',
        selectedSystem?: CodebookType,
        selectedSystemParent?: CodebookType,
    ) => void
    disabled?: boolean
}

export const OrderLineSystemTypeCombo = ({
    value,
    onChange,
    disabled,
}: OrderLineSystemTypeComboProps) => {
    const { formatMessage: fm } = useIntl()
    const labels = message.ordersPage.orderLines.systemTypeCombo
    const { openEmptySystemModal } = useEmptySystemSelectionModal()

    const handleValueChange = useCallback(
        (newValue: string) => {
            if (newValue === 'existing') {
                // Open modal to select system and its parent
                openEmptySystemModal(
                    (system: CodebookType | null, parent?: CodebookType | null) => {
                        if (system) {
                            onChange('existing', system, parent || undefined)
                        }
                    },
                )
            } else {
                onChange('new')
            }
        },
        [onChange, openEmptySystemModal],
    )

    return (
        <Select value={value} onValueChange={handleValueChange} disabled={disabled}>
            <SelectTrigger className="w-full">
                <SelectValue placeholder={fm({ id: labels.placeholder })} />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="new">{fm({ id: labels.newSystem })}</SelectItem>
                <SelectItem value="existing">{fm({ id: labels.existingSystem })}</SelectItem>
            </SelectContent>
        </Select>
    )
}
