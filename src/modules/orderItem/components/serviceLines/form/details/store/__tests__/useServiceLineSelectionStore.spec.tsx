import { act, render, renderHook } from '@testing-library/react'
import type { FC, PropsWithChildren } from 'react'

import {
    ServiceLineSelectionProvider,
    useServiceLineSelectionStore,
} from '../useServiceLineSelectionStore'

const Wrapper: FC<PropsWithChildren> = ({ children }) => (
    <ServiceLineSelectionProvider>{children}</ServiceLineSelectionProvider>
)
Wrapper.displayName = 'ProviderWrapper'

describe('useServiceLineSelectionStore', () => {
    it('throws when used outside provider', () => {
        const err = jest.spyOn(console, 'error').mockImplementation(() => {})
        expect(() => renderHook(() => useServiceLineSelectionStore())).toThrow(
            /ServiceLineSelectionProvider/,
        )
        err.mockRestore()
    })

    it('exposes empty selectedProperties initially', () => {
        const { result } = renderHook(() => useServiceLineSelectionStore(), { wrapper: Wrapper })
        expect(result.current.selectedProperties).toEqual([])
    })

    it('setSelectedProperties replaces the array', () => {
        const { result } = renderHook(() => useServiceLineSelectionStore(), { wrapper: Wrapper })
        act(() => result.current.setSelectedProperties(['a', 'b']))
        expect(result.current.selectedProperties).toEqual(['a', 'b'])
    })

    it('toggleProperty adds when absent, removes when present', () => {
        const { result } = renderHook(() => useServiceLineSelectionStore(), { wrapper: Wrapper })
        act(() => result.current.toggleProperty('x'))
        expect(result.current.selectedProperties).toEqual(['x'])
        act(() => result.current.toggleProperty('x'))
        expect(result.current.selectedProperties).toEqual([])
    })

    it('isPropertySelected reflects current membership', () => {
        const { result } = renderHook(() => useServiceLineSelectionStore(), { wrapper: Wrapper })
        act(() => result.current.setSelectedProperties(['p-1']))
        expect(result.current.isPropertySelected('p-1')).toBe(true)
        expect(result.current.isPropertySelected('p-2')).toBe(false)
    })

    it('clearSelections resets to empty', () => {
        const { result } = renderHook(() => useServiceLineSelectionStore(), { wrapper: Wrapper })
        act(() => result.current.setSelectedProperties(['a', 'b', 'c']))
        act(() => result.current.clearSelections())
        expect(result.current.selectedProperties).toEqual([])
    })

    it('two providers have independent stores (per-instance isolation)', () => {
        let storeA: ReturnType<typeof useServiceLineSelectionStore> | undefined
        let storeB: ReturnType<typeof useServiceLineSelectionStore> | undefined

        const ConsumerA: FC = () => {
            storeA = useServiceLineSelectionStore()
            return null
        }
        const ConsumerB: FC = () => {
            storeB = useServiceLineSelectionStore()
            return null
        }

        render(
            <>
                <ServiceLineSelectionProvider>
                    <ConsumerA />
                </ServiceLineSelectionProvider>
                <ServiceLineSelectionProvider>
                    <ConsumerB />
                </ServiceLineSelectionProvider>
            </>,
        )

        act(() => storeA?.setSelectedProperties(['x']))
        // storeB should NOT see storeA's selection
        expect(storeA?.selectedProperties).toEqual(['x'])
        expect(storeB?.selectedProperties).toEqual([])
    })
})
