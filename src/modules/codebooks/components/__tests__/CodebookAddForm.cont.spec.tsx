import { render, waitFor } from '@testing-library/react'

import { useCodebookValueMutations } from '../../hooks/useCodebookValueMutations'
import { CodebookAddFormContainer } from '../CodebookAddForm.cont'

jest.mock('../../hooks/useCodebookValueMutations', () => ({
    useCodebookValueMutations: jest.fn(),
}))

let lastFormProps: any = null
jest.mock('../CodebookAddForm.comp', () => ({
    CodebookAddFormComponent: (props: any) => {
        lastFormProps = props
        return <div data-testid="form-comp" />
    },
}))

const mockUseCodebookValueMutations = useCodebookValueMutations as jest.Mock

let create: jest.Mock

beforeEach(() => {
    jest.clearAllMocks()
    lastFormProps = null
    create = jest.fn().mockResolvedValue(undefined)
    mockUseCodebookValueMutations.mockReturnValue({ create, isPending: false })
})

describe('CodebookAddFormContainer', () => {
    it('wires codebookType + queryKey into useCodebookValueMutations', () => {
        const queryKey = ['codebook', 'X']
        render(
            <CodebookAddFormContainer
                codebookType={'LOC' as any}
                queryKey={queryKey}
                onSuccess={jest.fn()}
                onCancel={jest.fn()}
            />,
        )
        expect(mockUseCodebookValueMutations).toHaveBeenCalledWith({
            codebookType: 'LOC',
            queryKey,
        })
    })

    it('isPending propagated to AddForm', () => {
        mockUseCodebookValueMutations.mockReturnValue({ create, isPending: true })
        render(
            <CodebookAddFormContainer
                codebookType={'X' as any}
                queryKey={[]}
                onSuccess={jest.fn()}
                onCancel={jest.fn()}
            />,
        )
        expect(lastFormProps.isPending).toBe(true)
    })

    it('handleSubmit calls create then onSuccess', async () => {
        const onSuccess = jest.fn()
        render(
            <CodebookAddFormContainer
                codebookType={'X' as any}
                queryKey={[]}
                onSuccess={onSuccess}
                onCancel={jest.fn()}
            />,
        )
        await lastFormProps.onSubmit({ name: 'A' })
        expect(create).toHaveBeenCalledWith({ name: 'A' })
        await waitFor(() => expect(onSuccess).toHaveBeenCalled())
    })

    it('onSuccess not called when create rejects', async () => {
        create.mockRejectedValue(new Error('boom'))
        const onSuccess = jest.fn()
        render(
            <CodebookAddFormContainer
                codebookType={'X' as any}
                queryKey={[]}
                onSuccess={onSuccess}
                onCancel={jest.fn()}
            />,
        )
        await lastFormProps.onSubmit({ name: 'A' })
        expect(onSuccess).not.toHaveBeenCalled()
    })
})
