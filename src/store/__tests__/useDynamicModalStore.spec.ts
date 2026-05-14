import { act } from '@testing-library/react'

import { useDynamicModalStore } from '../useDynamicModalStore'

const DummyComponent = () => null

const resetStore = () =>
    act(() =>
        useDynamicModalStore.setState({ modals: {}, modalOrder: [], baseZIndex: 50 }),
    )

describe('useDynamicModalStore', () => {
    beforeEach(() => {
        jest.spyOn(console, 'warn').mockImplementation(() => undefined)
        resetStore()
    })

    afterEach(() => {
        ;(console.warn as jest.Mock).mockRestore?.()
    })

    it('openModal registers modal with auto-generated id and base z-index', () => {
        let id = ''
        act(() => {
            id = useDynamicModalStore
                .getState()
                .openModal('dialog', { component: DummyComponent })
        })
        const modal = useDynamicModalStore.getState().modals[id]
        expect(modal).toBeDefined()
        expect(modal.zIndex).toBe(50)
        expect(modal.type).toBe('dialog')
        expect(useDynamicModalStore.getState().modalOrder).toEqual([id])
    })

    it('openModal stacks z-indices in steps of 2', () => {
        const ids: string[] = []
        act(() => {
            ids.push(
                useDynamicModalStore.getState().openModal('dialog', { component: DummyComponent }),
            )
            ids.push(
                useDynamicModalStore.getState().openModal('sheet', { component: DummyComponent }),
            )
            ids.push(
                useDynamicModalStore.getState().openModal('dialog', { component: DummyComponent }),
            )
        })
        const modals = useDynamicModalStore.getState().modals
        expect(modals[ids[0]].zIndex).toBe(50)
        expect(modals[ids[1]].zIndex).toBe(52)
        expect(modals[ids[2]].zIndex).toBe(54)
    })

    it('openModal with duplicate id brings existing to front instead of duplicating', () => {
        act(() => {
            useDynamicModalStore.getState().openModal('dialog', {
                id: 'fixed',
                component: DummyComponent,
            })
            useDynamicModalStore.getState().openModal('dialog', { component: DummyComponent })
            useDynamicModalStore.getState().openModal('dialog', {
                id: 'fixed',
                component: DummyComponent,
            })
        })
        const state = useDynamicModalStore.getState()
        expect(Object.keys(state.modals).length).toBe(2)
        // fixed should now be on top (last in order)
        expect(state.modalOrder[1]).toBe('fixed')
        expect(state.modals.fixed.zIndex).toBe(52)
    })

    it('closeModal invokes onClose, removes the entry, and recalculates remaining z-indices', () => {
        const ids: string[] = []
        const onClose = jest.fn()
        act(() => {
            ids.push(
                useDynamicModalStore.getState().openModal('dialog', { component: DummyComponent }),
            )
            ids.push(
                useDynamicModalStore
                    .getState()
                    .openModal('dialog', { component: DummyComponent, onClose }),
            )
            ids.push(
                useDynamicModalStore.getState().openModal('dialog', { component: DummyComponent }),
            )
        })
        act(() => useDynamicModalStore.getState().closeModal(ids[1]))

        expect(onClose).toHaveBeenCalledTimes(1)
        const state = useDynamicModalStore.getState()
        expect(state.modals[ids[1]]).toBeUndefined()
        expect(state.modalOrder).toEqual([ids[0], ids[2]])
        expect(state.modals[ids[0]].zIndex).toBe(50)
        expect(state.modals[ids[2]].zIndex).toBe(52)
    })

    it('closeModal on unknown id warns without throwing', () => {
        expect(() =>
            act(() => useDynamicModalStore.getState().closeModal('missing')),
        ).not.toThrow()
        expect(console.warn).toHaveBeenCalledWith(expect.stringContaining('missing'))
    })

    it('closeAllModals fires onClose for every modal and clears state', () => {
        const onCloseA = jest.fn()
        const onCloseB = jest.fn()
        act(() => {
            useDynamicModalStore
                .getState()
                .openModal('dialog', { component: DummyComponent, onClose: onCloseA })
            useDynamicModalStore
                .getState()
                .openModal('dialog', { component: DummyComponent, onClose: onCloseB })
        })
        act(() => useDynamicModalStore.getState().closeAllModals())
        expect(onCloseA).toHaveBeenCalled()
        expect(onCloseB).toHaveBeenCalled()
        expect(useDynamicModalStore.getState().modals).toEqual({})
        expect(useDynamicModalStore.getState().modalOrder).toEqual([])
    })

    it('bringToFront moves modal to end and updates z-indices', () => {
        const ids: string[] = []
        act(() => {
            ids.push(
                useDynamicModalStore.getState().openModal('dialog', { component: DummyComponent }),
            )
            ids.push(
                useDynamicModalStore.getState().openModal('dialog', { component: DummyComponent }),
            )
            ids.push(
                useDynamicModalStore.getState().openModal('dialog', { component: DummyComponent }),
            )
        })
        act(() => useDynamicModalStore.getState().bringToFront(ids[0]))
        const state = useDynamicModalStore.getState()
        expect(state.modalOrder).toEqual([ids[1], ids[2], ids[0]])
        expect(state.modals[ids[0]].zIndex).toBe(54)
        expect(state.modals[ids[1]].zIndex).toBe(50)
        expect(state.modals[ids[2]].zIndex).toBe(52)
    })

    it('getModalById returns the modal instance', () => {
        let id = ''
        act(() => {
            id = useDynamicModalStore
                .getState()
                .openModal('sheet', { component: DummyComponent })
        })
        const modal = useDynamicModalStore.getState().getModalById(id)
        expect(modal?.type).toBe('sheet')
        expect(useDynamicModalStore.getState().getModalById('missing')).toBeUndefined()
    })
})
