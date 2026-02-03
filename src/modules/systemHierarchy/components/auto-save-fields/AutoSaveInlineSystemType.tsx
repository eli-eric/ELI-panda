import type { FC } from 'react'

import { CODEBOOK } from '@/types/constants/codebook'
import type { CodebookType } from '@/types/responses/codebook'

import { AutoSaveInlineCombobox } from './AutoSaveInlineCombobox'

interface AutoSaveInlineSystemTypeProps {
    uid: string
    fieldName: string
    label: string
    value: CodebookType | null
    disabled?: boolean
    onSave: (uid: string, fieldName: string, value: unknown) => Promise<unknown>
}

export const AutoSaveInlineSystemType: FC<AutoSaveInlineSystemTypeProps> = (props) => {
    return <AutoSaveInlineCombobox {...props} codebook={CODEBOOK.SYSTEM_TYPE} />
}
