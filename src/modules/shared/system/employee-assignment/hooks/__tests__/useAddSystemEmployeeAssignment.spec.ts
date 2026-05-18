import { renderHook } from '@testing-library/react'

import { useGraphQLMutation } from '@/hooks/fetch/useGraphQL'

import type { EmployeeAssignmentType } from '../../types'
import { useAddSystemEmployeeAssignment } from '../useAddSystemEmployeeAssignment'

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

const EMPLOYEE_TYPE = 'operators' as EmployeeAssignmentType

describe('useAddSystemEmployeeAssignment', () => {
    it('returns addEmployee + isAdding flag', () => {
        mockUseGraphQLMutation.mockReturnValue({ mutateAsync: jest.fn(), isPending: true })
        const { result } = renderHook(() =>
            useAddSystemEmployeeAssignment('sys-1', EMPLOYEE_TYPE),
        )
        expect(typeof result.current.addEmployee).toBe('function')
        expect(result.current.isAdding).toBe(true)
    })

    it('fires error toast when systemUid is missing', async () => {
        const { result } = renderHook(() =>
            useAddSystemEmployeeAssignment(undefined, EMPLOYEE_TYPE),
        )
        await result.current.addEmployee('emp-1')
        expect(mockToast.error).toHaveBeenCalled()
    })

    it('calls mutateAsync with connect payload + wires toast.promise', async () => {
        const mutateAsync = jest.fn().mockResolvedValue('ok')
        mockUseGraphQLMutation.mockReturnValue({ mutateAsync, isPending: false })

        const onSuccess = jest.fn()
        const { result } = renderHook(() =>
            useAddSystemEmployeeAssignment('sys-1', EMPLOYEE_TYPE, { onSuccess }),
        )
        await result.current.addEmployee('emp-1')

        expect(mutateAsync).toHaveBeenCalledWith({
            where: { uid: 'sys-1' },
            update: {
                [EMPLOYEE_TYPE]: [
                    { connect: [{ where: { node: { uid: 'emp-1' } } }] },
                ],
            },
        })
        expect(mockToast.promise).toHaveBeenCalledTimes(1)

        // Call success callback to verify onSuccess is invoked
        const opts = mockToast.promise.mock.calls[0][1]
        opts.success()
        expect(onSuccess).toHaveBeenCalled()
    })
})
