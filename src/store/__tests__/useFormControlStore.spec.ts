import { act } from '@testing-library/react'

import { useFormControlStore } from '../useFormControlStore'

const reset = () =>
    act(() =>
        useFormControlStore.setState({
            fieldIdToSync: new Set(),
            customFieldIdToSync: new Set(),
            deleteCustom: false,
        }),
    )

describe('useFormControlStore', () => {
    beforeEach(reset)

    it('starts with empty sets and deleteCustom=false', () => {
        const s = useFormControlStore.getState()
        expect(s.fieldIdToSync.size).toBe(0)
        expect(s.customFieldIdToSync.size).toBe(0)
        expect(s.deleteCustom).toBe(false)
    })

    it('toggleDeleteCustom flips the boolean', () => {
        act(() => useFormControlStore.getState().toggleDeleteCustom())
        expect(useFormControlStore.getState().deleteCustom).toBe(true)
        act(() => useFormControlStore.getState().toggleDeleteCustom())
        expect(useFormControlStore.getState().deleteCustom).toBe(false)
    })

    it('addFieldIdToSync accumulates unique ids', () => {
        act(() => {
            useFormControlStore.getState().addFieldIdToSync('a')
            useFormControlStore.getState().addFieldIdToSync('b')
            useFormControlStore.getState().addFieldIdToSync('a')
        })
        expect(Array.from(useFormControlStore.getState().fieldIdToSync).sort()).toEqual(['a', 'b'])
    })

    it('addCustomFieldIdToSync accumulates, addCustomFieldIdsToSync replaces', () => {
        act(() => useFormControlStore.getState().addCustomFieldIdToSync('a'))
        act(() => useFormControlStore.getState().addCustomFieldIdToSync('b'))
        expect(useFormControlStore.getState().customFieldIdToSync.size).toBe(2)

        act(() => useFormControlStore.getState().addCustomFieldIdsToSync(['x', 'y']))
        expect(Array.from(useFormControlStore.getState().customFieldIdToSync).sort()).toEqual([
            'x',
            'y',
        ])
    })

    it('clearFieldToSync wipes the standard set only', () => {
        act(() => {
            useFormControlStore.getState().addFieldIdToSync('a')
            useFormControlStore.getState().addCustomFieldIdToSync('c')
        })
        act(() => useFormControlStore.getState().clearFieldToSync())
        expect(useFormControlStore.getState().fieldIdToSync.size).toBe(0)
        expect(useFormControlStore.getState().customFieldIdToSync.size).toBe(1)
    })

    it('clearCustomFieldToSync wipes custom set and resets deleteCustom', () => {
        act(() => {
            useFormControlStore.getState().addCustomFieldIdToSync('c')
            useFormControlStore.getState().toggleDeleteCustom()
        })
        act(() => useFormControlStore.getState().clearCustomFieldToSync())
        expect(useFormControlStore.getState().customFieldIdToSync.size).toBe(0)
        expect(useFormControlStore.getState().deleteCustom).toBe(false)
    })
})
