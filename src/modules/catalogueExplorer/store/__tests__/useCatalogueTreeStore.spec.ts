import { act } from '@testing-library/react'

import { useCatalogueTreeStore } from '../useCatalogueTreeStore'

const resetStore = () => {
    act(() => {
        useCatalogueTreeStore.setState({
            expandedNodes: [],
        })
    })
}

describe('useCatalogueTreeStore', () => {
    beforeEach(resetStore)

    it('toggleNode adds a missing uid', () => {
        act(() => useCatalogueTreeStore.getState().toggleNode('a'))
        expect(useCatalogueTreeStore.getState().expandedNodes).toEqual(['a'])
    })

    it('toggleNode removes an existing uid', () => {
        act(() => useCatalogueTreeStore.getState().toggleNode('a'))
        act(() => useCatalogueTreeStore.getState().toggleNode('a'))
        expect(useCatalogueTreeStore.getState().expandedNodes).toEqual([])
    })

    it('expandNodes only appends missing uids', () => {
        act(() => useCatalogueTreeStore.getState().expandNodes(['a', 'b']))
        act(() => useCatalogueTreeStore.getState().expandNodes(['b', 'c']))
        expect(useCatalogueTreeStore.getState().expandedNodes.sort()).toEqual(['a', 'b', 'c'])
    })

    it('collapseAll clears expandedNodes', () => {
        act(() => useCatalogueTreeStore.getState().expandNodes(['a', 'b']))
        act(() => useCatalogueTreeStore.getState().collapseAll())
        expect(useCatalogueTreeStore.getState().expandedNodes).toEqual([])
    })
})
