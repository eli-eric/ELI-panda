import { useCallback } from 'react'

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
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
                <SelectValue placeholder="Select system type" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="new">New System</SelectItem>
                <SelectItem value="existing">Existing System</SelectItem>
            </SelectContent>
        </Select>
    )
}
