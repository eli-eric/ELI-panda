export interface InlineFieldBaseProps {
    label: string
    disabled?: boolean
    className?: string
}

export interface InlineFieldValueProps {
    value: string | null
    placeholder?: string // Default: "None entered"
}

export interface InlineFieldEditableProps<T = string>
    extends InlineFieldBaseProps,
        InlineFieldValueProps {
    onSave: (value: T) => Promise<void>
    isPending?: boolean
}

export interface SelectOption {
    value: string
    label: string
}

export interface CodebookItem {
    uid: string
    name: string
    code?: string | null
}

export interface ListItem {
    uid: string
    name: string
    [key: string]: unknown
}
