import type React from 'react'

import type { CodebookType } from './responses/codebook'

export type ModalButtons = {
    noButtons?: boolean
    goBack?: Button
    goNext?: Button
    alternative?: Button
}

export type Button = {
    text: string
    loading?: boolean
    disabled?: boolean
    type?: 'button' | 'submit' | 'reset' | undefined
    onClick?: () => void
    testid?: string
    hidden?: boolean
}

export interface FieldProps {
    name: string
    required?: boolean
    codebookResponse?: CodebookType[]
    placeholder?: string
    disabled?: boolean
    rounded?: 'rounded-l-md' | 'rounded-t-md' | 'rounded-r-md' | 'rounded-b-md' | 'rounded-md'
    label?: string
    customLabel?: string
    isFilter?: boolean
    type?: string
}

export type Option = {
    value: string | number | readonly string[] | undefined
    disabled?: boolean | undefined
    name?: string | undefined
    children?: React.ReactElement
}
