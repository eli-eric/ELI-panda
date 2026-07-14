import type { QueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { ensureSystemCanEdit } from '../../hooks/useSystemCanEdit'
import { guardSystemEdit } from '../guardSystemEdit'

jest.mock('../../hooks/useSystemCanEdit', () => ({
    ensureSystemCanEdit: jest.fn(),
}))
jest.mock('sonner', () => ({ toast: { error: jest.fn() } }))

const mockEnsure = ensureSystemCanEdit as jest.Mock
const mockToastError = toast.error as jest.Mock

// Echoes the message id + interpolated values so assertions can inspect them.
const fm = (({ id }: { id: string }, values?: Record<string, unknown>) =>
    [id, values?.names].filter(v => v != null).join('|')) as never

const qc = {} as QueryClient

beforeEach(() => jest.clearAllMocks())

describe('guardSystemEdit', () => {
    it('returns true and stays silent when the user is permitted', async () => {
        mockEnsure.mockResolvedValue({ result: true, responsibles: [] })
        await expect(guardSystemEdit(qc, 's1', fm)).resolves.toBe(true)
        expect(mockToastError).not.toHaveBeenCalled()
    })

    it('returns false and toasts the responsibles when denied', async () => {
        mockEnsure.mockResolvedValue({
            result: false,
            responsibles: [
                { uid: 'u1', firstName: 'Ann', lastName: 'Lee', username: 'alee', email: null },
            ],
        })
        await expect(guardSystemEdit(qc, 's1', fm)).resolves.toBe(false)
        expect(mockToastError).toHaveBeenCalledWith(
            'systemPermission.blockedToast|Ann Lee',
        )
    })

    it('uses the no-responsibles message when the list is empty', async () => {
        mockEnsure.mockResolvedValue({ result: false, responsibles: [] })
        await expect(guardSystemEdit(qc, 's1', fm)).resolves.toBe(false)
        expect(mockToastError).toHaveBeenCalledWith(
            'systemPermission.blockedToastNoResponsibles',
        )
    })

    it('fails closed (returns false) when the permission check throws', async () => {
        mockEnsure.mockRejectedValue(new Error('network'))
        await expect(guardSystemEdit(qc, 's1', fm)).resolves.toBe(false)
        expect(mockToastError).toHaveBeenCalledWith('systemPermission.errorTitle')
    })
})
