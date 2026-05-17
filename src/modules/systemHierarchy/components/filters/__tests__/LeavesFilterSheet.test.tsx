import { render, screen } from '@testing-library/react'
import React from 'react'
import { IntlProvider } from 'react-intl'

import { LeavesFilterSheet } from '../LeavesFilterSheet.cont'

jest.mock('@/hooks/form/useFormFilters', () => ({
    useFormFilter: () => ({
        register: jest.fn(),
        watch: jest.fn(() => null),
        reset: jest.fn(),
        handleSubmit: jest.fn(),
        formState: { errors: {} },
        control: {},
        setValue: jest.fn(),
        getValues: jest.fn(),
    }),
    useFormFilterState: () => ({
        setFilter: jest.fn(() => jest.fn()),
        setColumnFilters: jest.fn(),
        storeFilters: [],
    }),
}))

jest.mock('@/store/useFormControlStore', () => ({
    useFormControlStore: () => ({
        toggleDeleteCustom: jest.fn(),
        addFieldIdToSync: jest.fn(),
    }),
}))

jest.mock('@/modules/systems/hooks/useMinMaxPrice', () => ({
    useMinMaxPrice: () => ({ minMaxPrice: { min: 0, max: 10000 } }),
}))

jest.mock('../form/LeavesFilter.form', () => ({
    LeavesFilterForm: () => <div data-testid="leaves-filter-form" />,
}))

jest.mock('../LeavesFilterFooter.comp', () => ({
    LeavesFilterFooter: () => <div data-testid="leaves-filter-footer" />,
}))

jest.mock('@/components/form/Form', () => ({
    Form: ({ children }: { children: React.ReactNode }) => (
        <form data-testid="filter-form">{children}</form>
    ),
}))

const msgs: Record<string, string> = {}

describe('LeavesFilterSheet', () => {
    it('renders form with filter form and footer', () => {
        render(
            <IntlProvider locale="en" messages={msgs}>
                <LeavesFilterSheet tableId="systemLeaves" enableQueryURL={true} />
            </IntlProvider>,
        )

        expect(screen.getByTestId('filter-form')).toBeInTheDocument()
        expect(screen.getByTestId('leaves-filter-form')).toBeInTheDocument()
        expect(screen.getByTestId('leaves-filter-footer')).toBeInTheDocument()
    })
})
