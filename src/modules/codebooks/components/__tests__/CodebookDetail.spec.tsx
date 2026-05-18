import { act, screen, waitFor } from '@testing-library/react'

import { renderWithProviders } from '@/testutils/wrappers/renderWithProviders'

import { CodebookDetail } from '../CodebookDetail'

jest.mock('@/components/Tooltip', () => ({
    Tooltip: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}))

let lastTableProps: any = null
jest.mock('../CodebookValueTable', () => ({
    CodebookValueTable: (props: any) => {
        lastTableProps = props
        return <div data-testid="value-table" />
    },
}))

beforeEach(() => {
    lastTableProps = null
})

describe('CodebookDetail', () => {
    it('renders codebook code as heading', () => {
        renderWithProviders(
            <CodebookDetail
                codebookCode="LOCATION"
                data={[]}
                isLoading={false}
                onAdd={jest.fn()}
                onUpdate={jest.fn()}
                onDelete={jest.fn()}
            />,
        )
        expect(screen.getByRole('heading', { name: 'LOCATION' })).toBeInTheDocument()
    })

    it('passes data, isLoading, onAdd, onDelete through to CodebookValueTable', () => {
        const onAdd = jest.fn()
        const onDelete = jest.fn()
        renderWithProviders(
            <CodebookDetail
                codebookCode="X"
                data={[{ uid: '1', name: 'A' } as any]}
                isLoading={true}
                onAdd={onAdd}
                onUpdate={jest.fn()}
                onDelete={onDelete}
            />,
        )
        expect(lastTableProps.data).toHaveLength(1)
        expect(lastTableProps.isLoading).toBe(true)
        expect(lastTableProps.onAdd).toBe(onAdd)
        expect(lastTableProps.onDelete).toBe(onDelete)
    })

    it('handleUpdate sets updatingUid while onUpdate runs and clears it after', async () => {
        let resolveUpdate: () => void
        const onUpdate = jest.fn(
            () =>
                new Promise<void>(resolve => {
                    resolveUpdate = resolve
                }),
        )
        renderWithProviders(
            <CodebookDetail
                codebookCode="X"
                data={[]}
                isLoading={false}
                onAdd={jest.fn()}
                onUpdate={onUpdate}
                onDelete={jest.fn()}
            />,
        )
        // Invoke the wrapped update via the prop
        const tableUpdate = lastTableProps.onUpdate as (d: any) => Promise<void>
        let promise!: Promise<void>
        await act(async () => {
            promise = tableUpdate({ uid: 'u1', name: 'N' })
        })
        await waitFor(() => expect(lastTableProps.updatingUid).toBe('u1'))
        await act(async () => {
            resolveUpdate!()
            await promise
        })
        await waitFor(() => expect(lastTableProps.updatingUid).toBeUndefined())
        expect(onUpdate).toHaveBeenCalledWith({ uid: 'u1', name: 'N' })
    })

    it('handleUpdate clears updatingUid even when onUpdate rejects', async () => {
        const onUpdate = jest.fn().mockRejectedValue(new Error('boom'))
        renderWithProviders(
            <CodebookDetail
                codebookCode="X"
                data={[]}
                isLoading={false}
                onAdd={jest.fn()}
                onUpdate={onUpdate}
                onDelete={jest.fn()}
            />,
        )
        const tableUpdate = lastTableProps.onUpdate as (d: any) => Promise<void>
        await act(async () => {
            await expect(tableUpdate({ uid: 'u', name: 'X' })).rejects.toThrow('boom')
        })
        await waitFor(() => expect(lastTableProps.updatingUid).toBeUndefined())
    })
})
