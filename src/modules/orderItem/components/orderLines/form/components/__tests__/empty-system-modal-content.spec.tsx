import { act, fireEvent, screen } from '@testing-library/react'

import { renderWithProviders } from '@/testutils/wrappers/renderWithProviders'

import { EmptySystemModalContent } from '../empty-system-modal-content'

let lastSystemSelectProps: any = null

jest.mock('@/modules/shared/form/systemSelect/SystemSelect', () => ({
    SystemSelect: (props: any) => {
        lastSystemSelectProps = props
        return <div data-testid="system-select" />
    },
}))

beforeEach(() => {
    lastSystemSelectProps = null
})

describe('EmptySystemModalContent', () => {
    it('renders SystemSelect with tableId=emptySystemSelect', () => {
        renderWithProviders(<EmptySystemModalContent onSelect={jest.fn()} />)
        expect(screen.getByTestId('system-select')).toBeInTheDocument()
        expect(lastSystemSelectProps.tableId).toBe('emptySystemSelect')
    })

    it('Continue is disabled until valid selection', () => {
        renderWithProviders(<EmptySystemModalContent onSelect={jest.fn()} />)
        const continueBtn = screen.getAllByRole('button').slice(-1)[0]
        expect(continueBtn).toBeDisabled()
    })

    it('Close calls onClose', () => {
        const onClose = jest.fn()
        renderWithProviders(
            <EmptySystemModalContent onSelect={jest.fn()} onClose={onClose} />,
        )
        fireEvent.click(screen.getAllByRole('button')[0])
        expect(onClose).toHaveBeenCalledTimes(1)
    })

    it('selecting a system without physicalItem then Confirm calls onSelect with parent', () => {
        const onSelect = jest.fn()
        const onClose = jest.fn()
        renderWithProviders(
            <EmptySystemModalContent onSelect={onSelect} onClose={onClose} />,
        )
        act(() => {
            lastSystemSelectProps.onSelect({
                uid: 's-1',
                name: 'Sys',
                physicalItem: null,
                parentPath: [{ uid: 'p-1', name: 'Parent' }],
            })
        })
        const continueBtn = screen.getAllByRole('button').slice(-1)[0]
        expect(continueBtn).not.toBeDisabled()
        fireEvent.click(continueBtn)
        expect(onSelect).toHaveBeenCalledWith(
            { name: 'Sys', uid: 's-1' },
            { uid: 'p-1', name: 'Parent' },
        )
        expect(onClose).toHaveBeenCalled()
    })

    it('selecting a system WITH physicalItem is ignored (Continue stays disabled)', () => {
        renderWithProviders(<EmptySystemModalContent onSelect={jest.fn()} />)
        act(() => {
            lastSystemSelectProps.onSelect({
                uid: 's-2',
                name: 'Sys2',
                physicalItem: { uid: 'p-x' },
            })
        })
        const continueBtn = screen.getAllByRole('button').slice(-1)[0]
        expect(continueBtn).toBeDisabled()
    })

    it('passes null parent when parentPath is empty', () => {
        const onSelect = jest.fn()
        renderWithProviders(<EmptySystemModalContent onSelect={onSelect} />)
        act(() => {
            lastSystemSelectProps.onSelect({
                uid: 's-1',
                name: 'Sys',
                physicalItem: null,
                parentPath: [],
            })
        })
        fireEvent.click(screen.getAllByRole('button').slice(-1)[0])
        expect(onSelect).toHaveBeenCalledWith({ name: 'Sys', uid: 's-1' }, null)
    })
})
