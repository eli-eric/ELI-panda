import { render, screen } from '@testing-library/react'

import { useFormFilter } from '@/hooks/form/useFormFilters'

import { useMinMaxPrice } from '../../../../systems/hooks/useMinMaxPrice'
import { LeavesFilterSheet } from '../LeavesFilterSheet.cont'

jest.mock('@/hooks/form/useFormFilters', () => ({
    useFormFilter: jest.fn(),
}))

jest.mock('../../../../systems/hooks/useMinMaxPrice', () => ({
    useMinMaxPrice: jest.fn(),
}))

jest.mock('@/store/useFormControlStore', () => ({
    useFormControlStore: () => ({ toggleDeleteCustom: jest.fn() }),
}))

let lastFormProps: any = null
jest.mock('../form/LeavesFilter.form', () => ({
    LeavesFilterForm: (props: any) => {
        lastFormProps = props
        return <div data-testid="form" />
    },
}))

let lastFooterProps: any = null
jest.mock('../LeavesFilterFooter.comp', () => ({
    LeavesFilterFooter: (props: any) => {
        lastFooterProps = props
        return <div data-testid="footer" />
    },
}))

jest.mock('@/components/form/Form', () => ({
    Form: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}))

const mockUseFormFilter = useFormFilter as jest.Mock
const mockUseMinMaxPrice = useMinMaxPrice as jest.Mock

beforeEach(() => {
    jest.clearAllMocks()
    mockUseFormFilter.mockReturnValue({ watch: () => null, reset: jest.fn() })
    mockUseMinMaxPrice.mockReturnValue({ minMaxPrice: { min: 0, max: 100 } })
    lastFormProps = null
    lastFooterProps = null
})

describe('LeavesFilterSheet', () => {
    it('passes tableId + enableQueryURL to form + footer', () => {
        render(<LeavesFilterSheet tableId="t1" enableQueryURL />)
        expect(screen.getByTestId('form')).toBeInTheDocument()
        expect(screen.getByTestId('footer')).toBeInTheDocument()
        expect(lastFormProps.tableId).toBe('t1')
        expect(lastFooterProps.tableId).toBe('t1')
        expect(lastFooterProps.enableQueryURL).toBe(true)
    })

    it('default values seed price from useMinMaxPrice', () => {
        render(<LeavesFilterSheet tableId="t1" enableQueryURL={false} />)
        expect(lastFooterProps.defaultFormValues.price).toEqual([0, 100])
    })

    it('default values contain all expected keys', () => {
        render(<LeavesFilterSheet tableId="t1" enableQueryURL={false} />)
        expect(Object.keys(lastFooterProps.defaultFormValues).sort()).toEqual(
            [
                'catalogueDescription',
                'catalogueName',
                'catalogueNumber',
                'category',
                'description',
                'eun',
                'importance',
                'itemUsage',
                'location',
                'name',
                'price',
                'responsible',
                'serialNumber',
                'supplier',
                'systemCode',
                'systemLevel',
                'systemType',
                'zone',
            ].sort(),
        )
    })
})
