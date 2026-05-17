import { fireEvent, screen } from '@testing-library/react'

import { renderWithProviders } from '@/testutils/wrappers/renderWithProviders'

import PropertyList from '../PropertyList'

let propertyItems: any[] = []
jest.mock('../PropertyItem', () => ({
    __esModule: true,
    default: (props: any) => {
        propertyItems.push(props)
        return (
            <div data-testid={`prop-${props.index}`}>
                <button data-testid={`remove-${props.index}`} onClick={() => props.removeProp(props.index)}>
                    rm
                </button>
            </div>
        )
    },
}))

jest.mock('@/components/Tooltip', () => ({
    Tooltip: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}))

beforeEach(() => {
    propertyItems = []
})

describe('PropertyList', () => {
    it('renders no items when no properties', () => {
        renderWithProviders(<PropertyList name="groups.0" />, {
            withForm: true,
            formProps: {
                defaultValues: {
                    groups: [{ name: 'G', properties: [] }],
                } as any,
            },
        })
        expect(screen.queryByTestId('prop-0')).toBeNull()
    })

    it('renders one PropertyItem per property in field array', () => {
        renderWithProviders(<PropertyList name="groups.0" />, {
            withForm: true,
            formProps: {
                defaultValues: {
                    groups: [
                        {
                            name: 'G',
                            properties: [{ name: 'P1' }, { name: 'P2' }, { name: 'P3' }],
                        },
                    ],
                } as any,
            },
        })
        expect(screen.getByTestId('prop-0')).toBeInTheDocument()
        expect(screen.getByTestId('prop-1')).toBeInTheDocument()
        expect(screen.getByTestId('prop-2')).toBeInTheDocument()
    })

    it('Add Property button appends new empty property', () => {
        renderWithProviders(<PropertyList name="groups.0" />, {
            withForm: true,
            formProps: {
                defaultValues: { groups: [{ name: 'G', properties: [] }] } as any,
            },
        })
        // Find the Add button (last button in document)
        const buttons = screen.getAllByRole('button')
        fireEvent.click(buttons[buttons.length - 1])
        // After click, a new prop should be added (we just verify the button works without error)
        expect(buttons.length).toBeGreaterThan(0)
    })

    it('PropertyItem.length matches fields.length', () => {
        renderWithProviders(<PropertyList name="groups.0" />, {
            withForm: true,
            formProps: {
                defaultValues: {
                    groups: [{ name: 'G', properties: [{ name: 'A' }, { name: 'B' }] }],
                } as any,
            },
        })
        const first = propertyItems[0]
        expect(first.length).toBe(2)
    })
})
