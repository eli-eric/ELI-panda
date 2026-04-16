import { act, renderHook, waitFor } from '@testing-library/react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import useFormNotification from '../useFormNotification'

jest.mock('sonner', () => ({
    toast: {
        error: jest.fn(),
    },
}))

describe('useFormNotification', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    it('does not show toast when no errors', () => {
        renderHook(() => {
            const { control } = useForm()
            useFormNotification({ control })
        })
        expect(toast.error).not.toHaveBeenCalled()
    })

    it('shows single toast with error count after submit', async () => {
        const { result } = renderHook(() => {
            const form = useForm({
                defaultValues: { name: '', email: '' },
            })
            useFormNotification({ control: form.control })
            return form
        })

        await act(async () => {
            result.current.setError('name', { message: 'Name is required' })
            result.current.setError('email', { message: 'Email is required' })
            await result.current.handleSubmit(
                () => {},
                () => {},
            )()
        })

        await waitFor(() => {
            expect(toast.error).toHaveBeenCalledTimes(1)
            expect(toast.error).toHaveBeenCalledWith('Please fix 2 invalid fields', {
                duration: 4000,
            })
        })
    })

    it('shows singular form for single error', async () => {
        const { result } = renderHook(() => {
            const form = useForm({
                defaultValues: { name: '' },
            })
            useFormNotification({ control: form.control })
            return form
        })

        await act(async () => {
            result.current.setError('name', { message: 'Name is required' })
            await result.current.handleSubmit(
                () => {},
                () => {},
            )()
        })

        await waitFor(() => {
            expect(toast.error).toHaveBeenCalledWith('Please fix 1 invalid field', {
                duration: 4000,
            })
        })
    })

    it('does not spam toast when errors change after failed submit', async () => {
        const { result } = renderHook(() => {
            const form = useForm({
                defaultValues: { name: '', email: '' },
            })
            useFormNotification({ control: form.control })
            return form
        })

        // First failed submit
        await act(async () => {
            result.current.setError('name', { message: 'Name is required' })
            result.current.setError('email', { message: 'Email is required' })
            await result.current.handleSubmit(
                () => {},
                () => {},
            )()
        })

        await waitFor(() => {
            expect(toast.error).toHaveBeenCalledTimes(1)
        })

        // Clear one error (simulates user fixing a field) — should NOT fire another toast
        await act(async () => {
            result.current.clearErrors('name')
        })

        // Still only 1 toast call total
        expect(toast.error).toHaveBeenCalledTimes(1)
    })
})
