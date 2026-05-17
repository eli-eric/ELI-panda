import { render, screen } from '@testing-library/react'

import { CatalogueSelectFilterSheet } from '../CatalogueSelectFilterSheet'

let lastFormProps: any = null
jest.mock('../CatalogueSelectFilterForm', () => ({
    CatalogueSelectFilterForm: (props: any) => {
        lastFormProps = props
        return <div data-testid="filter-form" />
    },
}))

let lastFooterProps: any = null
jest.mock('../CatalogueSelectFilterFooter', () => ({
    CatalogueSelectFilterFooter: (props: any) => {
        lastFooterProps = props
        return <div data-testid="filter-footer" />
    },
}))

jest.mock('@/components/form/Form', () => ({
    Form: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}))

jest.mock('@/hooks/form/useFormFilters', () => ({
    useFormFilter: jest.fn(() => ({ reset: jest.fn() })),
}))

beforeEach(() => {
    jest.clearAllMocks()
    lastFormProps = null
    lastFooterProps = null
})

describe('CatalogueSelectFilterSheet', () => {
    it('renders form + footer with same tableId', () => {
        render(<CatalogueSelectFilterSheet tableId="cat-1" />)
        expect(screen.getByTestId('filter-form')).toBeInTheDocument()
        expect(screen.getByTestId('filter-footer')).toBeInTheDocument()
        expect(lastFormProps.tableId).toBe('cat-1')
        expect(lastFooterProps.tableId).toBe('cat-1')
    })

    it('passes catalogueCategoryProperties to form', () => {
        const props = [{ property: { uid: 'p1' } }] as any
        render(
            <CatalogueSelectFilterSheet
                tableId="t1"
                catalogueCategoryProperties={props}
            />,
        )
        expect(lastFormProps.catalogueCategoryProperties).toBe(props)
    })

    it('defaultFormValues contain expected keys', () => {
        render(<CatalogueSelectFilterSheet tableId="t1" />)
        expect(Object.keys(lastFooterProps.defaultFormValues).sort()).toEqual(
            [
                'catalogueNumber',
                'category',
                'description',
                'manufacturerUrl',
                'name',
                'supplier',
            ].sort(),
        )
    })
})
