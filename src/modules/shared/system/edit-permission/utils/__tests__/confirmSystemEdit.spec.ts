import type { QueryClient } from '@tanstack/react-query'

import { confirmWithWarningModal } from '@/store/useWarningModalStore'

import { ensureSystemCanEdit } from '../../hooks/useSystemCanEdit'
import { useSystemEditConfirmationStore } from '../../store/useSystemEditConfirmationStore'
import { confirmSystemEdit, getOutsideResponsibilityNote } from '../confirmSystemEdit'

jest.mock('../../hooks/useSystemCanEdit', () => ({ ensureSystemCanEdit: jest.fn() }))
jest.mock('@/store/useWarningModalStore', () => ({ confirmWithWarningModal: jest.fn() }))

const mockEnsure = ensureSystemCanEdit as jest.Mock
const mockConfirmModal = confirmWithWarningModal as jest.Mock

const queryClient = {} as QueryClient
const fm = (({ id }: { id: string }, values?: Record<string, unknown>) =>
    values?.names ? `${id}:${values.names}` : id) as never

const responsible = {
    uid: 'u-1',
    firstName: 'Ada',
    lastName: 'Lovelace',
    username: 'ada',
    email: 'ada@eli.eu',
}

beforeEach(() => {
    jest.clearAllMocks()
    useSystemEditConfirmationStore.getState().reset()
})

describe('confirmSystemEdit (soft lock)', () => {
    it('proceeds without a prompt when the user is responsible', async () => {
        mockEnsure.mockResolvedValue({ result: true, responsibles: [] })

        await expect(confirmSystemEdit(queryClient, 'sys-1', fm)).resolves.toBe(true)
        expect(mockConfirmModal).not.toHaveBeenCalled()
    })

    it('asks once per system and remembers the answer for the session', async () => {
        mockEnsure.mockResolvedValue({ result: false, responsibles: [responsible] })
        mockConfirmModal.mockResolvedValue(true)

        await expect(confirmSystemEdit(queryClient, 'sys-1', fm)).resolves.toBe(true)
        await expect(confirmSystemEdit(queryClient, 'sys-1', fm)).resolves.toBe(true)

        expect(mockConfirmModal).toHaveBeenCalledTimes(1)
        expect(mockConfirmModal.mock.calls[0][0]).toContain(
            'systemPermission.outsideNote:Ada Lovelace',
        )
    })

    it('confirming one system does not cover another (exact uid only)', async () => {
        mockEnsure.mockResolvedValue({ result: false, responsibles: [] })
        mockConfirmModal.mockResolvedValue(true)

        await confirmSystemEdit(queryClient, 'parent', fm)
        await confirmSystemEdit(queryClient, 'child', fm)

        expect(mockConfirmModal).toHaveBeenCalledTimes(2)
    })

    it('returns false and asks again next time when the user declines', async () => {
        mockEnsure.mockResolvedValue({ result: false, responsibles: [] })
        mockConfirmModal.mockResolvedValue(false)

        await expect(confirmSystemEdit(queryClient, 'sys-1', fm)).resolves.toBe(false)
        await confirmSystemEdit(queryClient, 'sys-1', fm)

        expect(mockConfirmModal).toHaveBeenCalledTimes(2)
    })

    // the API allows the write and records responsibility itself
    it('never blocks when responsibility cannot be verified', async () => {
        mockEnsure.mockRejectedValue(new Error('network'))

        await expect(confirmSystemEdit(queryClient, 'sys-1', fm)).resolves.toBe(true)
        expect(mockConfirmModal).not.toHaveBeenCalled()
    })
})

describe('getOutsideResponsibilityNote', () => {
    it('falls back to the no-responsibles wording', async () => {
        mockEnsure.mockResolvedValue({ result: false, responsibles: [] })

        await expect(getOutsideResponsibilityNote(queryClient, 'sys-1', fm)).resolves.toBe(
            'systemPermission.outsideNoteNoResponsibles',
        )
    })

    it('is null once the system was confirmed this session', async () => {
        useSystemEditConfirmationStore.getState().confirm('sys-1')

        await expect(getOutsideResponsibilityNote(queryClient, 'sys-1', fm)).resolves.toBeNull()
        expect(mockEnsure).not.toHaveBeenCalled()
    })
})
