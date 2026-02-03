export interface AutoSaveFieldProps {
    uid: string
    fieldName: string
    label: string
    value: string | null
    disabled?: boolean
    onSave: (uid: string, fieldName: string, value: unknown) => Promise<unknown>
}
