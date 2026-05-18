import { renderHook } from '@testing-library/react'

import { AllProvidersWrapper } from '@/testutils/wrappers/AllProvidersWrapper'

import { useOrderColumns } from '../OrderColumns'

describe('useOrderColumns', () => {
    it('produces 13 columns', () => {
        const { result } = renderHook(() => useOrderColumns({ isReadOnly: false }), {
            wrapper: AllProvidersWrapper,
        })
        expect(result.current.length).toBe(13)
    })

    it('column ids match expected order', () => {
        const { result } = renderHook(() => useOrderColumns({ isReadOnly: false }), {
            wrapper: AllProvidersWrapper,
        })
        expect(result.current.map(c => c.id)).toEqual([
            'name',
            'orderNumber',
            'requestNumber',
            'contractNumber',
            'orderStatus',
            'deliveryStatus',
            'supplier',
            'procurementResponsible',
            'requestor',
            'notes',
            'lastUpdateTime',
            'lastUpdateBy',
            'orderDate',
        ])
    })

    it('name column is sticky + cannot be hidden', () => {
        const { result } = renderHook(() => useOrderColumns({ isReadOnly: false }), {
            wrapper: AllProvidersWrapper,
        })
        const name = result.current[0] as any
        expect(name.meta?.sticky).toBe(true)
        expect(name.enableHiding).toBe(false)
    })

    it('orderStatus uses accessorFn returning orderStatus.name', () => {
        const { result } = renderHook(() => useOrderColumns({ isReadOnly: false }), {
            wrapper: AllProvidersWrapper,
        })
        const orderStatus = result.current[4] as any
        expect(orderStatus.accessorFn({ orderStatus: { name: 'Open' } })).toBe('Open')
        expect(orderStatus.accessorFn({ orderStatus: null })).toBeUndefined()
    })
})
