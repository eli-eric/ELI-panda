import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import { IntlProvider } from 'react-intl'

const patchItemMock = jest.fn().mockResolvedValue(undefined)

jest.mock('../../../hooks/mutations/useCatalogueItemPatch', () => ({
    useCatalogueItemPatch: () => ({
        patchItem: patchItemMock,
        patchDetail: jest.fn(),
        isPending: false,
    }),
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
            onBlur={e => onSave(e.target.value || null)}
        />
    ),
    InlineFieldModalSelect: ({ label, value, onSave, disabled }: any) => (
        <button
            data-testid={`inline-modal-${label}`}
            disabled={disabled}
            onClick={() => onSave('new-cat-uid', 'New Category')}
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
    lastUpdateTime: '2026-04-21T10:00:00Z',
    catalogueCategory: { uid: 'cat-1', name: 'Cat One' },
    supplier: { uid: 'sup-1', name: 'Sup One' },
}

const wrap = (ui: React.ReactElement) => (
    <IntlProvider locale="en" messages={{}}>
        <QueryClientProvider client={new QueryClient()}>{ui}</QueryClientProvider>
    </IntlProvider>
)

describe('CatalogueItemDetailTab (PATCH REST)', () => {
    beforeEach(() => patchItemMock.mockClear())

    it('scalar save sends PATCH with lastUpdateTime + field', () => {
        render(wrap(<CatalogueItemDetailTabContainer item={item as any} canEdit />))
        const input = screen.getByTestId('inline-input-Name')
        fireEvent.change(input, { target: { value: 'Renamed' } })
        fireEvent.blur(input)
        expect(patchItemMock).toHaveBeenCalledWith({
            lastUpdateTime: '2026-04-21T10:00:00Z',
            name: 'Renamed',
        })
    })

    it('nullable scalar (description) sends null when cleared', () => {
        render(wrap(<CatalogueItemDetailTabContainer item={item as any} canEdit />))
        const input = screen.getByTestId('inline-textarea-Description')
        fireEvent.change(input, { target: { value: '' } })
        fireEvent.blur(input)
        expect(patchItemMock).toHaveBeenCalledWith({
            lastUpdateTime: '2026-04-21T10:00:00Z',
            description: null,
        })
    })

    it('category relation sends {uid, name} in category key', () => {
        render(wrap(<CatalogueItemDetailTabContainer item={item as any} canEdit />))
        fireEvent.click(screen.getByTestId('inline-modal-Category'))
        expect(patchItemMock).toHaveBeenCalledWith({
            lastUpdateTime: '2026-04-21T10:00:00Z',
            category: { uid: 'new-cat-uid', name: 'New Category' },
        })
    })

    it('supplier cleared sends supplier: null', () => {
        render(wrap(<CatalogueItemDetailTabContainer item={item as any} canEdit />))
        const input = screen.getByTestId('inline-combobox-Supplier')
        fireEvent.change(input, { target: { value: '' } })
        fireEvent.blur(input)
        expect(patchItemMock).toHaveBeenCalledWith({
            lastUpdateTime: '2026-04-21T10:00:00Z',
            supplier: null,
        })
    })

    it('renders inputs as disabled when canEdit is false', () => {
        render(wrap(<CatalogueItemDetailTabContainer item={item as any} canEdit={false} />))
        expect(screen.getByTestId('inline-input-Name')).toBeDisabled()
        expect(screen.getByTestId('inline-modal-Category')).toBeDisabled()
    })
})
