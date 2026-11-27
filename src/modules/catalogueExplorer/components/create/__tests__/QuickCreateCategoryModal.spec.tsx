import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import React from 'react'
import { IntlProvider } from 'react-intl'

const createCategoryMock = jest.fn()

jest.mock('../../../hooks/mutations/useCatalogueCategoryCreate', () => ({
    useCatalogueCategoryCreate: () => ({ createCategory: createCategoryMock, isPending: false }),
}))

import { QuickCreateCategoryModal } from '../QuickCreateCategoryModal.comp'

const renderModal = (props: Partial<React.ComponentProps<typeof QuickCreateCategoryModal>> = {}) =>
    render(
        <IntlProvider locale="en" messages={{}}>
            <QueryClientProvider client={new QueryClient()}>
                <QuickCreateCategoryModal
                    onClose={props.onClose ?? jest.fn()}
                    onCreated={props.onCreated ?? jest.fn()}
                    parentUid={props.parentUid ?? null}
                />
            </QueryClientProvider>
        </IntlProvider>,
    )

describe('QuickCreateCategoryModal', () => {
    beforeEach(() => {
        createCategoryMock.mockReset()
    })

    it('submits name with auto-derived code (lowercase + hyphens) and parentUid', async () => {
        createCategoryMock.mockResolvedValue({
            uid: 'new-uid',
            name: 'Laser Modules',
            code: 'laser-modules',
        })
        const onCreated = jest.fn()
        const onClose = jest.fn()

        renderModal({ parentUid: 'parent-1', onCreated, onClose })

        fireEvent.change(screen.getByTestId('quick-create-category-name'), {
            target: { value: 'Laser Modules' },
        })
        fireEvent.submit(screen.getByTestId('quick-create-category-form'))

        await waitFor(() =>
            expect(createCategoryMock).toHaveBeenCalledWith({
                name: 'Laser Modules',
                code: 'laser-modules',
                parentUid: 'parent-1',
            }),
        )
        await waitFor(() => expect(onCreated).toHaveBeenCalledWith('new-uid'))
        expect(onClose).toHaveBeenCalled()
    })

    it('code field is read-only (disabled)', () => {
        renderModal()
        expect(screen.getByTestId('quick-create-category-code')).toBeDisabled()
    })

    it('blocks submit when name is empty', async () => {
        renderModal()
        fireEvent.submit(screen.getByTestId('quick-create-category-form'))
        await waitFor(() => expect(createCategoryMock).not.toHaveBeenCalled())
    })
})
