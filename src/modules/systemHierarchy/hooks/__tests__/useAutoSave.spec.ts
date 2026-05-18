import { act, renderHook, waitFor } from '@testing-library/react'

import { useAutoSave } from '../useAutoSave'

jest.mock('sonner', () => ({
    toast: { error: jest.fn() },
}))

const { toast } = jest.requireMock('sonner')

beforeEach(() => {
    jest.clearAllMocks()
})

describe('useAutoSave', () => {
    it('uses initialValue as starting state and empty string when null', () => {
        const { result } = renderHook(() =>
            useAutoSave({
                uid: 'u',
                fieldName: 'f',
                initialValue: null,
                onSave: jest.fn(),
            }),
        )
        expect(result.current.value).toBe('')
    })

    it('save() does nothing when value unchanged', async () => {
        const onSave = jest.fn()
        const { result } = renderHook(() =>
            useAutoSave({
                uid: 'u',
                fieldName: 'f',
                initialValue: 'a',
                onSave,
            }),
        )
        await act(async () => {
            await result.current.save()
        })
        expect(onSave).not.toHaveBeenCalled()
    })

    it('save() calls onSave with (uid, fieldName, value) and updates previousValueRef', async () => {
        const onSave = jest.fn().mockResolvedValue(undefined)
        const { result } = renderHook(() =>
            useAutoSave({
                uid: 'u',
                fieldName: 'desc',
                initialValue: 'old',
                onSave,
            }),
        )
        act(() => result.current.setValue('new'))
        await act(async () => {
            await result.current.save()
        })
        expect(onSave).toHaveBeenCalledWith('u', 'desc', 'new')
        // Subsequent save with same value is a no-op now
        await act(async () => {
            await result.current.save()
        })
        expect(onSave).toHaveBeenCalledTimes(1)
    })

    it('save() rolls back value + toasts on error', async () => {
        const err = new Error('boom')
        const onSave = jest.fn().mockRejectedValue(err)
        const { result } = renderHook(() =>
            useAutoSave({
                uid: 'u',
                fieldName: 'f',
                initialValue: 'old',
                onSave,
            }),
        )
        act(() => result.current.setValue('new'))
        await act(async () => {
            await result.current.save()
        })
        expect(result.current.value).toBe('old')
        expect(result.current.error).toBe('boom')
        expect(toast.error).toHaveBeenCalledWith('boom')
    })

    it('save() toasts default "Save failed" on non-Error throw', async () => {
        const onSave = jest.fn().mockRejectedValue('not-an-error')
        const { result } = renderHook(() =>
            useAutoSave({
                uid: 'u',
                fieldName: 'f',
                initialValue: 'old',
                onSave,
            }),
        )
        act(() => result.current.setValue('new'))
        await act(async () => {
            await result.current.save()
        })
        expect(toast.error).toHaveBeenCalledWith('Save failed')
    })

    it('isPending true during await, false afterward', async () => {
        let resolveSave: () => void
        const onSave = jest.fn(
            () =>
                new Promise<void>(resolve => {
                    resolveSave = resolve
                }),
        )
        const { result } = renderHook(() =>
            useAutoSave({
                uid: 'u',
                fieldName: 'f',
                initialValue: 'old',
                onSave,
            }),
        )
        act(() => result.current.setValue('new'))
        act(() => {
            void result.current.save()
        })
        await waitFor(() => expect(result.current.isPending).toBe(true))
        await act(async () => {
            resolveSave!()
        })
        await waitFor(() => expect(result.current.isPending).toBe(false))
    })
})
