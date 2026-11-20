import { renderHook } from '@testing-library/react'
import { useRouter } from 'next/router'

import { useSystemDetail } from '@/modules/systemHierarchy/hooks/queries/useSystemDetail'

import { useModalWizardStore } from '../../store/useModalWizardStore'
import { useWizardContextSystem } from '../useWizardContextSystem'

jest.mock('next/router', () => ({
    useRouter: jest.fn(),
}))

jest.mock('@/modules/systemHierarchy/hooks/queries/useSystemDetail', () => ({
    useSystemDetail: jest.fn(),
}))

const mockUseRouter = useRouter as jest.Mock
const mockUseSystemDetail = useSystemDetail as jest.Mock

const contextSystem = {
    uid: 'ctx-1',
    name: 'Context System',
    location: { uid: 'loc-1', name: 'Lobby' },
    physicalItem: {
        uid: 'pi-1',
        name: 'Item name',
        serialNumber: 'SN-1',
        eun: 'EUN-1',
        catalogueNumber: 'CAT-1',
        itemUsage: { uid: 'u-1', name: 'Spare Part' },
        conditionStatus: { uid: 'c-1', name: 'New' },
    },
}

describe('useWizardContextSystem', () => {
    beforeEach(() => {
        jest.clearAllMocks()
        useModalWizardStore.setState({ contextSystem: null })
        mockUseRouter.mockReturnValue({ query: {} })
        mockUseSystemDetail.mockReturnValue({
            system: { uid: 'fetched-1' },
            physicalItem: { uid: 'pi-f' },
            catalogueItem: { uid: 'ci-f' },
            isLoading: false,
        })
    })

    it('returns the snapshot passed to the open function without fetching', () => {
        useModalWizardStore.setState({ contextSystem })
        mockUseRouter.mockReturnValue({ query: { uid: 'route-1' } })

        const { result } = renderHook(() => useWizardContextSystem())

        expect(mockUseSystemDetail).toHaveBeenCalledWith(null)
        expect(result.current.systemDetail).toEqual(contextSystem)
        expect(result.current.physicalItem).toEqual(contextSystem.physicalItem)
        expect(result.current.isLoading).toBe(false)
    })

    it('derives catalogue info from flat physicalItem fields (detail panel shape)', () => {
        useModalWizardStore.setState({ contextSystem })

        const { result } = renderHook(() => useWizardContextSystem())

        expect(result.current.catalogueItem).toEqual({
            name: 'Item name',
            catalogueNumber: 'CAT-1',
        })
    })

    it('derives catalogue info from nested catalogueItem (leaves list shape)', () => {
        useModalWizardStore.setState({
            contextSystem: {
                ...contextSystem,
                physicalItem: {
                    uid: 'pi-1',
                    catalogueItem: { uid: 'ci-1', name: 'Cat name', catalogueNumber: 'CAT-9' },
                },
            },
        })

        const { result } = renderHook(() => useWizardContextSystem())

        expect(result.current.catalogueItem).toEqual({
            name: 'Cat name',
            catalogueNumber: 'CAT-9',
        })
    })

    it('falls back to fetching by router.query.uid (legacy /system/[uid] view)', () => {
        mockUseRouter.mockReturnValue({ query: { uid: 'route-1' } })

        const { result } = renderHook(() => useWizardContextSystem())

        expect(mockUseSystemDetail).toHaveBeenCalledWith('route-1')
        expect(result.current.systemDetail).toEqual({ uid: 'fetched-1' })
        expect(result.current.physicalItem).toEqual({ uid: 'pi-f' })
        expect(result.current.catalogueItem).toEqual({ uid: 'ci-f' })
    })

    it('passes null to the fetch when no uid is available', () => {
        renderHook(() => useWizardContextSystem())

        expect(mockUseSystemDetail).toHaveBeenCalledWith(null)
    })
})
