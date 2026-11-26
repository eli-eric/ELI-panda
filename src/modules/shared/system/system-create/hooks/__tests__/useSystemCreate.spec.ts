import { act, renderHook } from '@testing-library/react'
import { toast } from 'sonner'

import { useCreateSystem } from '@/modules/shared/system/system-detail/hooks/mutations/useCreateSystem'
import { makeSystemDetail } from '@/testutils/factories/systemDetail'

import type { SystemCreateFormData } from '../../schema'
import { useSystemCreateParentStore } from '../../store/useSystemCreateParentStore'
import { buildCreateSystemBody, useSystemCreate } from '../useSystemCreate'

const mockCloseModal = jest.fn()

jest.mock('@/modules/shared/system/system-detail/hooks/mutations/useCreateSystem', () => ({
    useCreateSystem: jest.fn(),
}))
jest.mock('@/store/useDynamicModalStore', () => ({
    useDynamicModalStore: () => ({ closeModal: mockCloseModal }),
}))
jest.mock('sonner', () => ({ toast: { promise: jest.fn(), warning: jest.fn() } }))
jest.mock('react-intl', () => ({
    useIntl: () => ({ formatMessage: ({ id }: { id: string }) => id }),
}))

const mockUseCreateSystem = useCreateSystem as jest.Mock
const mockConfirm = jest.fn()
const mockCreate = jest.fn()

const form: SystemCreateFormData = {
    name: '  New  ',
    systemLevel: 'KEY_SYSTEMS',
    systemType: { uid: 'st', name: 'Type' },
    location: null,
    zone: { uid: 'z', name: 'Zone' },
    systemCode: '',
    attribute: null,
    responsible: { uid: 'e', name: 'Emp' },
    description: '  ',
}

beforeEach(() => {
    jest.clearAllMocks()
    useSystemCreateParentStore.setState({ parentUid: 'parent-1' })
    mockConfirm.mockResolvedValue(true)
    mockCreate.mockResolvedValue(makeSystemDetail({ uid: 'new-1', name: 'New' }))
    mockUseCreateSystem.mockReturnValue({
        confirmCreate: mockConfirm,
        createSystem: mockCreate,
        isPending: false,
    })
})

describe('buildCreateSystemBody', () => {
    it('maps the form onto PATCH shapes: refs as {uid}, blanks as null, parent only when set', () => {
        expect(buildCreateSystemBody(form, 'parent-1')).toEqual({
            parentUid: 'parent-1',
            name: 'New',
            systemLevel: 'KEY_SYSTEMS',
            description: null,
            systemCode: null,
            systemType: { uid: 'st' },
            location: null,
            zone: { uid: 'z' },
            responsible: { uid: 'e' },
            attribute: null,
        })
        expect(buildCreateSystemBody(form, null)).not.toHaveProperty('parentUid')
    })
})

describe('useSystemCreate', () => {
    it('confirms against the parent, creates and closes the sheet (overview patched by the hook, no refetch)', async () => {
        const { result } = renderHook(() => useSystemCreate())
        await act(async () => {
            await result.current.createSystem(form)
        })
        expect(mockConfirm).toHaveBeenCalledWith('parent-1')
        expect(mockCreate).toHaveBeenCalledWith(expect.objectContaining({ parentUid: 'parent-1' }))
        expect(toast.promise).toHaveBeenCalled()
        expect(mockCloseModal).toHaveBeenCalledWith('system-create')
        expect(useSystemCreateParentStore.getState().parentUid).toBeNull()
    })

    it('does nothing (no toast, no request) when the soft-lock confirm is declined', async () => {
        mockConfirm.mockResolvedValue(false)
        const { result } = renderHook(() => useSystemCreate())
        await act(async () => {
            await result.current.createSystem(form)
        })
        expect(mockCreate).not.toHaveBeenCalled()
        expect(toast.promise).not.toHaveBeenCalled()
        expect(mockCloseModal).not.toHaveBeenCalled()
    })

    it('keeps the sheet open when the create fails', async () => {
        mockCreate.mockRejectedValue(new Error('boom'))
        const { result } = renderHook(() => useSystemCreate())
        await act(async () => {
            await result.current.createSystem(form)
        })
        expect(mockCloseModal).not.toHaveBeenCalled()
    })

    it('uploads gallery images under the new uid before closing', async () => {
        const submit = jest.fn((_uid: string, done: () => void) => done())
        const imageRef = { current: { submit } as never }
        const { result } = renderHook(() => useSystemCreate(imageRef))
        await act(async () => {
            await result.current.createSystem(form)
        })
        expect(submit).toHaveBeenCalledWith('new-1', expect.any(Function))
        expect(mockCloseModal).toHaveBeenCalled()
    })
})
