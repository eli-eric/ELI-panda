import { useMutation } from '@tanstack/react-query'
import { renderHook } from '@testing-library/react'

import { useCreateSystemCodes } from '../useCreateSystemCodes'

jest.mock('@tanstack/react-query', () => ({
    useMutation: jest.fn(),
}))

jest.mock('react-intl', () => ({
    useIntl: () => ({ formatMessage: ({ id }: { id: string }) => id }),
}))

jest.mock('@/utils/fetcher', () => ({
    queryMutate: jest.fn(() => jest.fn()),
}))

jest.mock('sonner', () => ({
    toast: { promise: jest.fn() },
}))

import { toast } from 'sonner'

const mockUseMutation = useMutation as jest.Mock
const mockToast = toast as unknown as { promise: jest.Mock }

beforeEach(() => {
    jest.clearAllMocks()
})

describe('useCreateSystemCodes', () => {
    it('returns create + isPending from the mutation', () => {
        const mutateAsync = jest.fn().mockResolvedValue('ok')
        mockUseMutation.mockReturnValue({ mutateAsync, isPending: true })

        const { result } = renderHook(() => useCreateSystemCodes())
        expect(typeof result.current.create).toBe('function')
        expect(result.current.isPending).toBe(true)
    })

    it('create calls mutateAsync and wires toast.promise', async () => {
        const promise = Promise.resolve(['x'])
        const mutateAsync = jest.fn().mockReturnValue(promise)
        mockUseMutation.mockReturnValue({ mutateAsync, isPending: false })

        const { result } = renderHook(() => useCreateSystemCodes())
        const payload = { zone: { uid: 'z', name: 'Z' }, systemType: { uid: 's', name: 'S' }, batch: 3 } as any
        const out = await result.current.create(payload)

        expect(mutateAsync).toHaveBeenCalledWith(payload)
        expect(out).toEqual(['x'])
        expect(mockToast.promise).toHaveBeenCalledTimes(1)
        const [arg, opts] = mockToast.promise.mock.calls[0]
        expect(arg).toBe(promise)
        expect(opts).toEqual(
            expect.objectContaining({
                loading: expect.any(String),
                success: expect.any(String),
                error: expect.any(String),
            }),
        )
    })
})
