import { screen } from '@testing-library/react'

import { renderWithProviders } from '@/testutils/wrappers/renderWithProviders'
import { PATH } from '@/types/constants/paths'

import { SystemItemCard } from '../SystemItem.card'

jest.mock('../PhysicalItem.form', () => ({
    PhysicalItemForm: ({ uid }: { uid: string }) => (
        <div data-testid="physical-item-form" data-uid={uid} />
    ),
}))

jest.mock('@/modules/shared/form/itemAssign/item-assign.button', () => ({
    ItemAssignButton: () => <button data-testid="assign-btn">assign</button>,
}))

jest.mock('@/modules/shared/form/itemMoving/item-move.button', () => ({
    ItemMoveButton: () => <button data-testid="move-btn">move</button>,
}))

describe('SystemItemCard', () => {
    it('shows "No item" heading + ItemAssignButton when no physicalItem', () => {
        renderWithProviders(<SystemItemCard />, {
            withForm: true,
            formProps: { defaultValues: { physicalItem: null } },
        })
        expect(screen.getByText(/ITEM: No item/)).toBeInTheDocument()
        expect(screen.getByTestId('assign-btn')).toBeInTheDocument()
        expect(screen.queryByTestId('move-btn')).toBeNull()
        expect(screen.queryByTestId('physical-item-form')).toBeNull()
    })

    it('shows ItemMoveButton + PhysicalItemForm when physicalItem present', () => {
        renderWithProviders(<SystemItemCard />, {
            withForm: true,
            formProps: {
                defaultValues: {
                    physicalItem: { uid: 'pi-1', catalogueItem: { uid: 'ci-1', name: 'X' } },
                },
            },
        })
        expect(screen.getByText(/ITEM: X/)).toBeInTheDocument()
        expect(screen.getByTestId('move-btn')).toBeInTheDocument()
        expect(screen.queryByTestId('assign-btn')).toBeNull()
        expect(screen.getByTestId('physical-item-form').dataset.uid).toBe('pi-1')
    })

    it('renders link to catalogue item when catalogueItem.uid present', () => {
        renderWithProviders(<SystemItemCard />, {
            withForm: true,
            formProps: {
                defaultValues: {
                    physicalItem: { uid: 'pi-1', catalogueItem: { uid: 'ci-99', name: 'Y' } },
                },
            },
        })
        const link = screen.getByRole('link')
        expect(link).toHaveAttribute('href', `${PATH.CATALOGUE_ITEM}/ci-99`)
        expect(link).toHaveAttribute('target', '_blank')
    })

    it('does not render link when catalogueItem.uid missing', () => {
        renderWithProviders(<SystemItemCard />, {
            withForm: true,
            formProps: {
                defaultValues: { physicalItem: { uid: 'pi-1', catalogueItem: null } },
            },
        })
        expect(screen.queryByRole('link')).toBeNull()
    })
})
