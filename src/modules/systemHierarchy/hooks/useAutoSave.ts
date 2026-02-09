import { useCallback, useRef, useState } from 'react'
import { toast } from 'sonner'

interface UseAutoSaveOptions {
    uid: string
    fieldName: string
    initialValue: string | null
    onSave: (uid: string, fieldName: string, value: unknown) => Promise<unknown>
}

export const useAutoSave = ({ uid, fieldName, initialValue, onSave }: UseAutoSaveOptions) => {
    const [value, setValue] = useState(initialValue ?? '')
    const [isPending, setIsPending] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const previousValueRef = useRef(initialValue ?? '')

    const save = useCallback(async () => {
        if (value === previousValueRef.current) return

        setIsPending(true)
        setError(null)

        try {
            await onSave(uid, fieldName, value)
            previousValueRef.current = value
        } catch (e) {
            const errorMessage = e instanceof Error ? e.message : 'Save failed'
            setError(errorMessage)
            setValue(previousValueRef.current)
            toast.error(errorMessage)
        } finally {
            setIsPending(false)
        }
    }, [uid, fieldName, value, onSave])

    return {
        value,
        setValue,
        save,
        isPending,
        error,
    }
}
