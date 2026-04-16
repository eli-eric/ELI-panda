import { useEffect, useRef } from 'react'
import { type Control, type FieldErrors, type FieldValues, useFormState } from 'react-hook-form'
import { toast } from 'sonner'

interface Props<T extends FieldValues> {
    control: Control<T, any>
}

const countErrors = (errors: FieldErrors): number => {
    let count = 0
    for (const key of Object.keys(errors)) {
        const error = errors[key]
        if (!error) continue
        if (error.message) {
            count++
        } else if (Array.isArray(error)) {
            error.forEach(item => {
                if (item) count += countErrors(item as FieldErrors)
            })
        } else if (typeof error === 'object' && !error.message) {
            count += countErrors(error as FieldErrors)
        }
    }
    return count
}

const scrollToFirstError = () => {
    setTimeout(() => {
        const firstInvalid = document.querySelector<HTMLElement>('[aria-invalid="true"]')
        if (firstInvalid) {
            firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' })
            firstInvalid.focus?.()
        }
    }, 100)
}

const useFormNotification = <T extends FieldValues>({ control }: Props<T>) => {
    const { submitCount, errors } = useFormState<T>({ control })
    const lastSubmitCount = useRef(0)

    useEffect(() => {
        if (submitCount === 0 || submitCount === lastSubmitCount.current) return
        lastSubmitCount.current = submitCount

        const errorCount = countErrors(errors as FieldErrors)
        if (errorCount > 0) {
            toast.error(`Please fix ${errorCount} invalid field${errorCount > 1 ? 's' : ''}`, {
                duration: 4000,
            })
            scrollToFirstError()
        }
    }, [submitCount, errors])
}

export default useFormNotification
