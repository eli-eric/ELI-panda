import { act } from '@testing-library/react'

import { useGlobalSearchStore } from '../store/useGlobalSearchStore'

const reset = () =>
    act(() => {
        useGlobalSearchStore.setState({ searchValue: '', open: false })
    })

describe('useGlobalSearchStore', () => {
    beforeEach(reset)

    it('starts with default state', () => {
        expect(useGlobalSearchStore.getState().searchValue).toBe('')
        expect(useGlobalSearchStore.getState().open).toBe(false)
    })

    it('setSearchValue updates the query', () => {
        act(() => useGlobalSearchStore.getState().setSearchValue('panda'))
        expect(useGlobalSearchStore.getState().searchValue).toBe('panda')
    })

    it('setOpen sets the modal open state', () => {
        act(() => useGlobalSearchStore.getState().setOpen(true))
        expect(useGlobalSearchStore.getState().open).toBe(true)
        act(() => useGlobalSearchStore.getState().setOpen(false))
        expect(useGlobalSearchStore.getState().open).toBe(false)
    })

    it('clearSearch resets the query, leaves open untouched', () => {
        act(() => {
            useGlobalSearchStore.getState().setSearchValue('term')
            useGlobalSearchStore.getState().setOpen(true)
        })
        act(() => useGlobalSearchStore.getState().clearSearch())
        expect(useGlobalSearchStore.getState().searchValue).toBe('')
        expect(useGlobalSearchStore.getState().open).toBe(true)
    })

    it('toggleOpen flips the open flag', () => {
        act(() => useGlobalSearchStore.getState().toggleOpen())
        expect(useGlobalSearchStore.getState().open).toBe(true)
        act(() => useGlobalSearchStore.getState().toggleOpen())
        expect(useGlobalSearchStore.getState().open).toBe(false)
    })
})
