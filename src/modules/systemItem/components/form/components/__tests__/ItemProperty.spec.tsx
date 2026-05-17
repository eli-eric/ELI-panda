import { render, screen } from '@testing-library/react'
import { FormProvider, useForm } from 'react-hook-form'

import usePermission from '@/hooks/usePermission'
import { PROPERTY_TYPE } from '@/types/catalogue/constants'

import { ItemProperty } from '../ItemProperty'

jest.mock('@/hooks/usePermission', () => ({
    __esModule: true,
    default: jest.fn(),
}))

jest.mock('@/components/form/inputs', () => ({
    Input: ({ name, type, label }: { name: string; type?: string; label?: string }) => (
        <div data-testid="input" data-name={name} data-type={type ?? ''} data-label={label} />
    ),
}))

jest.mock('@/components/form/Listbox', () => ({
    __esModule: true,
    default: ({ name, customLabel }: { name: string; customLabel?: string }) => (
        <div data-testid="listbox" data-name={name} data-label={customLabel ?? ''} />
    ),
}))

jest.mock('@/components/form/RangeInput', () => ({
    RangeInput: ({ name, label }: { name: string; label: string }) => (
        <div data-testid="range" data-name={name} data-label={label} />
    ),
}))

const Wrapper = ({ children }: { children: React.ReactNode }) => {
    const methods = useForm()
    return <FormProvider {...methods}>{children}</FormProvider>
}

const makeDetail = (typeUid: string, overrides: Record<string, unknown> = {}) =>
    ({
        property: {
            type: { uid: typeUid },
            name: 'P-1',
            unit: { name: 'kg' },
            defaultValue: 'd',
            listOfValues: ['a', 'b'],
            ...overrides,
        },
        value: 'v',
    }) as any

beforeEach(() => {
    jest.clearAllMocks()
    ;(usePermission as jest.Mock).mockReturnValue(true)
})

describe('ItemProperty', () => {
    it('renders text Input for TEXT type', () => {
        render(
            <Wrapper>
                <ItemProperty detail={makeDetail(PROPERTY_TYPE.TEXT)} index={0} />
            </Wrapper>,
        )
        const input = screen.getByTestId('input')
        expect(input.dataset.name).toBe('physicalItem.properties.0.value')
        expect(input.dataset.type).toBe('')
    })

    it('renders number Input for NUMBER type', () => {
        render(
            <Wrapper>
                <ItemProperty detail={makeDetail(PROPERTY_TYPE.NUMBER)} index={1} />
            </Wrapper>,
        )
        expect(screen.getByTestId('input').dataset.type).toBe('number')
    })

    it('renders Listbox for BOOLEAN type', () => {
        render(
            <Wrapper>
                <ItemProperty detail={makeDetail(PROPERTY_TYPE.BOOLEAN)} index={2} />
            </Wrapper>,
        )
        expect(screen.getByTestId('listbox').dataset.name).toBe(
            'physicalItem.properties.2.value',
        )
    })

    it('renders Listbox for LIST type', () => {
        render(
            <Wrapper>
                <ItemProperty detail={makeDetail(PROPERTY_TYPE.LIST)} index={3} />
            </Wrapper>,
        )
        expect(screen.getByTestId('listbox').dataset.name).toBe(
            'physicalItem.properties.3.value',
        )
    })

    it('renders RangeInput with bracketed unit label for RANGE type', () => {
        render(
            <Wrapper>
                <ItemProperty detail={makeDetail(PROPERTY_TYPE.RANGE)} index={4} />
            </Wrapper>,
        )
        expect(screen.getByTestId('range').dataset.label).toBe('P-1 [kg]')
    })

    it('renders RangeInput with bare label when unit name absent', () => {
        const detail = makeDetail(PROPERTY_TYPE.RANGE, { unit: undefined })
        render(
            <Wrapper>
                <ItemProperty detail={detail} index={5} />
            </Wrapper>,
        )
        expect(screen.getByTestId('range').dataset.label).toBe('P-1')
    })

    it('falls back to Input for unknown type', () => {
        render(
            <Wrapper>
                <ItemProperty detail={makeDetail('unknown-type')} index={6} />
            </Wrapper>,
        )
        expect(screen.getByTestId('input').dataset.label).toBe('P-1')
    })
})
