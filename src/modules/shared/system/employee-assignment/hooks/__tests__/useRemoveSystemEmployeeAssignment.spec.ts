import { renderHook } from '@testing-library/react'

import { useGraphQLMutation } from '@/hooks/fetch/useGraphQL'

import type { EmployeeAssignmentType } from '../../types'
import { useRemoveSystemEmployeeAssignment } from '../useRemoveSystemEmployeeAssignment'

jest.mock('@/hooks/fetch/useGraphQL', () => ({
    useGraphQLMutation: jest.fn(),
}))

jest.mock('react-intl', () => ({
    useIntl: () => ({ formatMessage: ({ id }: { id: string }) => id }),
}))

jest.mock('sonner', () => ({
    toast: { error: jest.fn(), promise: jest.fn() },
}))

import { toast } from 'sonner'

const mockUseGraphQLMutation = useGraphQLMutation as jest.Mock
const mockToast = toast as unknown as { error: jest.Mock; promise: jest.Mock }

beforeEach(() => {
    jest.clearAllMocks()
    mockUseGraphQLMutation.mockReturnValue({
        mutateAsync: jest.fn().mockResolvedValue('ok'),
        isPending: false,
    })
})

const EMPLOYEE_TYPE = 'maintainedBy' as EmployeeAssignmentType

describe('useRemoveSystemEmployeeAssignment', () => {
    it('returns removeEmployee + isRemoving flag', () => {
        mockUseGraphQLMutation.mockReturnValue({ mutateAsync: jest.fn(), isPending: true })
        const { result } = renderHook(() =>
            useRemoveSystemEmployeeAssignment('sys-1', EMPLOYEE_TYPE),
        )
        expect(typeof result.current.removeEmployee).toBe('function')
        expect(result.current.isRemoving).toBe(true)
    })

    it('error toast when systemUid is missing', async () => {
        const { result } = renderHook(() =>
            useRemoveSystemEmployeeAssignment(undefined, EMPLOYEE_TYPE),
        )
        await result.current.removeEmployee('emp-1')
        expect(mockToast.error).toHaveBeenCalled()
    })

    it('mutateAsync called with disconnect payload', async () => {
        const mutateAsync = jest.fn().mockResolvedValue('ok')
        mockUseGraphQLMutation.mockReturnValue({ mutateAsync, isPending: false })

        const onSuccess = jest.fn()
        const { result } = renderHook(() =>
            useRemoveSystemEmployeeAssignment('sys-1', EMPLOYEE_TYPE, { onSuccess }),
        )
        await result.current.removeEmployee('emp-1')

        expect(mutateAsync).toHaveBeenCalledWith({
            where: { uid: 'sys-1' },
            update: {
                [EMPLOYEE_TYPE]: [
                    { disconnect: [{ where: { node: { uid: 'emp-1' } } }] },
                ],
            },
        })

        const opts = mockToast.promise.mock.calls[0][1]
        opts.success()
        expect(onSuccess).toHaveBeenCalled()
    })
})
