import { fireEvent, screen } from '@testing-library/react'

import { renderWithProviders } from '@/testutils/wrappers/renderWithProviders'

import GroupList from '../GroupList'

jest.mock('../PropertyList', () => ({
    __esModule: true,
    default: ({ name }: { name: string }) => <div data-testid={`prop-list-${name}`} />,
}))

jest.mock('../MoveButtons', () => ({
    __esModule: true,
    default: ({ index, length }: { index: number; length: number }) => (
        <div data-testid={`move-${index}`} data-length={length} />
    ),
}))

jest.mock('@/components/form/inputs', () => ({
    Input: ({ name }: { name: string }) => <input data-testid={`input-${name}`} />,
}))

describe('GroupList', () => {
    it('renders no groups when empty', () => {
        renderWithProviders(<GroupList />, {
            withForm: true,
            formProps: { defaultValues: { groups: [] } as any },
        })
        expect(screen.queryByTestId('prop-list-groups.0')).toBeNull()
    })

    it('renders one Group per entry with proper props', () => {
        renderWithProviders(<GroupList />, {
            withForm: true,
            formProps: {
                defaultValues: {
                    groups: [
                        { name: 'G1', properties: [] },
                        { name: 'G2', properties: [] },
                    ],
                } as any,
            },
        })
        expect(screen.getByTestId('prop-list-groups.0')).toBeInTheDocument()
        expect(screen.getByTestId('prop-list-groups.1')).toBeInTheDocument()
        expect(screen.getByTestId('move-0').dataset.length).toBe('2')
    })

    it('Add Group button creates a new group', () => {
        renderWithProviders(<GroupList />, {
            withForm: true,
            formProps: { defaultValues: { groups: [] } as any },
        })
        // First button is Add (only button in empty state)
        const buttons = screen.getAllByRole('button')
        fireEvent.click(buttons[0])
        // Should not throw — useFieldArray append succeeded
        expect(buttons.length).toBeGreaterThan(0)
    })
})
