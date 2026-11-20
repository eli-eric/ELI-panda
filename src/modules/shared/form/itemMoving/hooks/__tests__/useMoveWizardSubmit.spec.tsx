import { useMutation } from '@tanstack/react-query'
import { renderHook } from '@testing-library/react'
import { toast } from 'sonner'

import { useWizardStore } from '../../../wizard/store/useWizardStore'
import { useModalWizardStore } from '../../store/useModalWizardStore'
import { MOVE_TYPE } from '../../types/constants'
import { useMoveWizardSubmit } from '../useMoveWizardSubmit'
import { useWizardContextSystem } from '../useWizardContextSystem'

jest.mock('next/router', () => ({
    useRouter: () => ({ query: {}, push: jest.fn(), reload: jest.fn() }),
}))

jest.mock('sonner', () => ({
    toast: { error: jest.fn(), success: jest.fn() },
}))

jest.mock('@tanstack/react-query', () => ({
    useMutation: jest.fn(),
}))

jest.mock('@/modules/systemItem/hooks/useSystemsReload', () => ({
    useSystemsReload: () => [jest.fn(), false],
}))

jest.mock('@/store/useDynamicModalStore', () => ({
    useDynamicModalStore: () => ({ closeModal: jest.fn() }),
}))

jest.mock('@/utils/fetcher', () => ({
    queryMutate: jest.fn(() => jest.fn()),
}))

jest.mock('../useWizardContextSystem', () => ({
    useWizardContextSystem: jest.fn(),
}))

jest.mock('../../../wizard/store/useWizardStore', () => ({
    useWizardStore: jest.fn(),
}))

jest.mock('../../store/useModalWizardStore', () => ({
    useModalWizardStore: jest.fn(),
}))

const mockUseMutation = useMutation as jest.Mock
const mockUseWizardContextSystem = useWizardContextSystem as jest.Mock
const mockUseWizardStore = useWizardStore as unknown as jest.Mock
const mockUseModalWizardStore = useModalWizardStore as unknown as jest.Mock

let moveMutate: jest.Mock
let replaceMutate: jest.Mock

beforeEach(() => {
    jest.clearAllMocks()
    moveMutate = jest.fn()
    replaceMutate = jest.fn()
    mockUseMutation
        .mockReturnValueOnce({ mutate: moveMutate, isPending: false })
        .mockReturnValueOnce({ mutate: replaceMutate, isPending: false })
    mockUseWizardStore.mockReturnValue({
        formData: {
            system: { uid: 'dst-1' },
            name: 'New name',
            location: { uid: 'loc-1', name: 'Lobby' },
            itemUsage: { uid: 'u-1', name: 'Spare Part' },
            conditionStatus: { uid: 'c-1', name: 'New' },
        },
        goBack: jest.fn(),
        resetWizard: jest.fn(),
        updateFormData: jest.fn(),
    })
    mockUseModalWizardStore.mockReturnValue({
        isMovingToNewSystem: false,
        setSelectedSystem: jest.fn(),
        moveType: MOVE_TYPE.DESTINATION_SYSTEM,
        oldItemParentSystem: null,
        selectedSystem: null,
    })
    mockUseWizardContextSystem.mockReturnValue({
        systemDetail: { uid: 'src-1', name: 'Source' },
        physicalItem: null,
        catalogueItem: null,
    })
})

describe('useMoveWizardSubmit › submitWizard', () => {
    it('fails fast with a toast when the context system is not resolved', () => {
        mockUseWizardContextSystem.mockReturnValue({
            systemDetail: null,
            physicalItem: null,
            catalogueItem: null,
        })

        const { result } = renderHook(() => useMoveWizardSubmit())
        result.current.submitWizard()

        expect(toast.error).toHaveBeenCalled()
        expect(moveMutate).not.toHaveBeenCalled()
        expect(replaceMutate).not.toHaveBeenCalled()
    })

    it('sends the context system uid as sourceSystemUid', () => {
        const { result } = renderHook(() => useMoveWizardSubmit())
        result.current.submitWizard()

        expect(moveMutate).toHaveBeenCalledWith(
            expect.objectContaining({
                sourceSystemUid: 'src-1',
                destinationSystemUid: 'dst-1',
            }),
        )
    })
})
