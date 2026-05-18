import { act } from '@testing-library/react'

import useTableStateStore from '../useTableStateStore'

const TID = 'orders-table'

const reset = () => act(() => useTableStateStore.setState({ instances: {} }))

describe('useTableStateStore', () => {
    beforeEach(reset)

    it('starts with empty instances map', () => {
        expect(useTableStateStore.getState().instances).toEqual({})
    })

    it('setSortBy stores sort config under tableId', () => {
        const sortBy = [{ id: 'name', desc: false }]
        act(() => useTableStateStore.getState().setSortBy(TID, sortBy))
        expect(useTableStateStore.getState().instances[TID].sortBy).toEqual(sortBy)
    })

    it('setSearch + setSearchValue keep separate fields per instance', () => {
        act(() => {
            useTableStateStore.getState().setSearch(TID, 'live')
            useTableStateStore.getState().setSearchValue(TID, 'live-typed')
        })
        const inst = useTableStateStore.getState().instances[TID]
        expect(inst.search).toBe('live')
        expect(inst.searchBarValue).toBe('live-typed')
    })

    it('setPaginationState mirrors to legacy pagination string', () => {
        const paginationState = { page: 2, pageSize: 25 }
        act(() => useTableStateStore.getState().setPaginationState(TID, paginationState))
        const inst = useTableStateStore.getState().instances[TID]
        expect(inst.paginationState).toEqual(paginationState)
        expect(typeof inst.pagination).toBe('string')
    })

    it('isolates instances between table ids', () => {
        act(() => {
            useTableStateStore.getState().setSearch('a', 'foo')
            useTableStateStore.getState().setSearch('b', 'bar')
        })
        expect(useTableStateStore.getState().instances.a.search).toBe('foo')
        expect(useTableStateStore.getState().instances.b.search).toBe('bar')
    })

    it('reset clears all keys for the given tableId', () => {
        act(() => {
            useTableStateStore.getState().setSearch(TID, 'foo')
            useTableStateStore.getState().setSortBy(TID, [{ id: 'a', desc: false }])
            useTableStateStore.getState().setVisibility(TID, { a: false })
        })
        act(() => useTableStateStore.getState().reset(TID))
        const inst = useTableStateStore.getState().instances[TID]
        expect(inst.search).toBeUndefined()
        expect(inst.sortBy).toBeUndefined()
        expect(inst.columnVisibility).toBeUndefined()
    })

    it('setColumnFilter / setVisibility / setOrder / setExpand store values', () => {
        act(() => {
            useTableStateStore
                .getState()
                .setColumnFilter(TID, [{ id: 'status', value: 'open' }] as any)
            useTableStateStore.getState().setVisibility(TID, { id: true })
            useTableStateStore.getState().setOrder(TID, ['id', 'name'])
            useTableStateStore.getState().setExpand(TID, { '0': true })
        })
        const inst = useTableStateStore.getState().instances[TID]
        expect(inst.columnFilter).toEqual([{ id: 'status', value: 'open' }])
        expect(inst.columnVisibility).toEqual({ id: true })
        expect(inst.columnOrder).toEqual(['id', 'name'])
        expect(inst.expanded).toEqual({ '0': true })
    })
})
