import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import { IntlProvider } from 'react-intl'

import { PROPERTY_TYPE } from '@/types/catalogue/constants'

const patchDetailMock = jest.fn().mockResolvedValue(undefined)
const mockItemData: { item?: unknown } = { item: undefined }
const mockCategoryProperties: { data?: unknown[] } = { data: undefined }

jest.mock('@/modules/catalogueItem/hooks/useItem', () => ({
    useCatalogueItem: () => ({ item: mockItemData.item, error: null }),
}))

jest.mock('@/modules/systems/hooks/useCategoryProperties', () => ({
    useCategoryProperties: () => ({ catalogueCategoryProperties: mockCategoryProperties.data }),
}))

jest.mock('../../../hooks/mutations/useCatalogueItemPatch', () => ({
    useCatalogueItemPatch: () => ({
        patchDetail: patchDetailMock,
        patchItem: jest.fn(),
        isPending: false,
    }),
}))

jest.mock('@/components/ui/inline-field', () => ({
    InlineFieldInput: ({ label, value, onSave, disabled, type }: any) => (
        <input
            data-testid={`inline-input-${label}`}
            data-type={type ?? 'text'}
            defaultValue={value ?? ''}
            disabled={disabled}
            onBlur={e => onSave(e.target.value)}
        />
    ),
    InlineFieldSelect: ({ label, value, onSave, options, disabled }: any) => (
        <select
            data-testid={`inline-select-${label}`}
            defaultValue={value ?? ''}
            disabled={disabled}
            onChange={e => onSave(e.target.value)}
        >
            <option value=""></option>
            {options.map((o: any) => (
                <option key={o.value} value={o.value}>
                    {o.label}
                </option>
            ))}
        </select>
    ),
}))

import { CatalogueItemParametersTab } from '../CatalogueItemParametersTab.cont'

const textProp = {
    property: {
        uid: 'prop-text',
        name: 'Voltage',
        type: { uid: PROPERTY_TYPE.TEXT, name: 'Text', code: 'text' },
        unit: null,
    },
    propertyGroup: 'Specs',
    value: '220V',
}

const listProp = {
    property: {
        uid: 'prop-list',
        name: 'Mode',
        type: { uid: PROPERTY_TYPE.LIST, name: 'List', code: 'list' },
        unit: null,
        listOfValues: ['A', 'B'],
    },
    propertyGroup: 'Specs',
    value: 'A',
}

const rangeProp = {
    property: {
        uid: 'prop-range',
        name: 'Temperature',
        type: { uid: PROPERTY_TYPE.RANGE, name: 'Range', code: 'range' },
        unit: { uid: 'u1', name: '°C' },
    },
    propertyGroup: 'Operating',
    value: JSON.stringify({ from: '10', to: '20' }),
}

const wrap = (ui: React.ReactElement) => (
    <IntlProvider locale="en" messages={{}}>
        <QueryClientProvider client={new QueryClient()}>{ui}</QueryClientProvider>
    </IntlProvider>
)

describe('CatalogueItemParametersTab', () => {
    beforeEach(() => {
        patchDetailMock.mockClear()
        mockItemData.item = {
            uid: 'item-1',
            category: { uid: 'cat-1' },
            details: [textProp, listProp, rangeProp],
        }
        mockCategoryProperties.data = [textProp, listProp, rangeProp]
    })

    it('renders properties grouped by propertyGroup', () => {
        render(wrap(<CatalogueItemParametersTab itemUid="item-1" canEdit />))
        expect(screen.getByText('Specs')).toBeInTheDocument()
        expect(screen.getByText('Operating')).toBeInTheDocument()
    })

    it('patches TEXT property on blur with uid + group + value', () => {
        render(wrap(<CatalogueItemParametersTab itemUid="item-1" canEdit />))
        const input = screen.getByTestId('inline-input-Voltage')
        fireEvent.change(input, { target: { value: '240V' } })
        fireEvent.blur(input)
        expect(patchDetailMock).toHaveBeenCalledWith(
            expect.objectContaining({
                property: expect.objectContaining({ uid: 'prop-text' }),
                propertyGroup: 'Specs',
                value: '240V',
            }),
        )
    })

    it('patches LIST property on change', () => {
        render(wrap(<CatalogueItemParametersTab itemUid="item-1" canEdit />))
        const select = screen.getByTestId('inline-select-Mode')
        fireEvent.change(select, { target: { value: 'B' } })
        expect(patchDetailMock).toHaveBeenCalledWith(
            expect.objectContaining({
                property: expect.objectContaining({ uid: 'prop-list' }),
                propertyGroup: 'Specs',
                value: 'B',
            }),
        )
    })

    it('patches RANGE property with JSON {from,to}', () => {
        render(wrap(<CatalogueItemParametersTab itemUid="item-1" canEdit />))
        const from = screen.getByTestId('inline-input-Temperature (from)')
        fireEvent.change(from, { target: { value: '15' } })
        fireEvent.blur(from)

        const lastCall = patchDetailMock.mock.calls[patchDetailMock.mock.calls.length - 1][0]
        expect(lastCall.property.uid).toBe('prop-range')
        expect(JSON.parse(lastCall.value)).toEqual({ from: '15', to: '20' })
    })

    it('disables fields when canEdit is false', () => {
        render(wrap(<CatalogueItemParametersTab itemUid="item-1" canEdit={false} />))
        expect(screen.getByTestId('inline-input-Voltage')).toBeDisabled()
        expect(screen.getByTestId('inline-select-Mode')).toBeDisabled()
    })
})
