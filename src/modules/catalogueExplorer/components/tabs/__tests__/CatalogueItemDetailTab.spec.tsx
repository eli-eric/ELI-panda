import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import { IntlProvider } from 'react-intl'

const updateFieldMock = jest.fn().mockResolvedValue(undefined)

jest.mock('../../../hooks/mutations/useCatalogueItemFieldUpdate', () => ({
    useCatalogueItemFieldUpdate: () => ({ updateField: updateFieldMock, isPending: false }),
}))

jest.mock('@/modules/shared/form/systemType/hooks/useSystemTypeSelectionModal', () => ({
    useSystemTypeSelectionModal: () => ({ openSystemTypeModal: jest.fn() }),
}))

jest.mock('@/components/form/shared/hooks/useCodebookTreeModal', () => ({
    useCodebookTreeModal: () => ({ openCodebookTreeModal: jest.fn() }),
}))

jest.mock('@/components/ui/inline-field', () => ({
    InlineFieldInput: ({ label, value, onSave, disabled }: any) => (
        <div>
            <span>{label}</span>
            <input
                data-testid={`inline-input-${label}`}
                defaultValue={value ?? ''}
                disabled={disabled}
                onBlur={e => onSave(e.target.value)}
            />
        </div>
    ),
    InlineFieldTextArea: ({ label, value, onSave, disabled }: any) => (
        <textarea
            data-testid={`inline-textarea-${label}`}
            defaultValue={value ?? ''}
            disabled={disabled}
            onBlur={e => onSave(e.target.value)}
        />
    ),
    InlineFieldCombobox: ({ label, value, onSave, disabled }: any) => (
        <input
            data-testid={`inline-combobox-${label}`}
            defaultValue={value ?? ''}
            disabled={disabled}
            onBlur={e => onSave(e.target.value)}
        />
    ),
    InlineFieldModalSelect: ({ label, value, onSave, disabled }: any) => (
        <button
            data-testid={`inline-modal-${label}`}
            disabled={disabled}
            onClick={() => onSave('new-cat-uid')}
        >
            {value ?? 'none'}
        </button>
    ),
}))

import { CatalogueItemDetailTabContainer } from '../CatalogueItemDetailTab.cont'

const item = {
    uid: 'item-1',
    name: 'Widget',
    catalogueNumber: 'WID-001',
    description: 'desc',
    manufacturerUrl: null,
    catalogueCategory: { uid: 'cat-1', name: 'Cat One' },
    supplier: null,
}

const wrap = (ui: React.ReactElement) => (
    <IntlProvider locale="en" messages={{}}>
        <QueryClientProvider client={new QueryClient()}>{ui}</QueryClientProvider>
    </IntlProvider>
)

describe('CatalogueItemDetailTab', () => {
    beforeEach(() => updateFieldMock.mockClear())

    it('dispatches scalar field save with field name', () => {
        render(wrap(<CatalogueItemDetailTabContainer item={item as any} canEdit />))
        const input = screen.getByTestId('inline-input-Name')
        fireEvent.change(input, { target: { value: 'Renamed' } })
        fireEvent.blur(input)
        expect(updateFieldMock).toHaveBeenCalledWith('item-1', 'name', 'Renamed', {
            previousValue: 'Widget',
        })
    })

    it('dispatches relationship save with categoryUid', () => {
        render(wrap(<CatalogueItemDetailTabContainer item={item as any} canEdit />))
        fireEvent.click(screen.getByTestId('inline-modal-Category'))
        expect(updateFieldMock).toHaveBeenCalledWith('item-1', 'categoryUid', 'new-cat-uid', {
            displayName: undefined,
        })
    })

    it('renders inputs as disabled when canEdit is false', () => {
        render(wrap(<CatalogueItemDetailTabContainer item={item as any} canEdit={false} />))
        expect(screen.getByTestId('inline-input-Name')).toBeDisabled()
        expect(screen.getByTestId('inline-modal-Category')).toBeDisabled()
    })
})
