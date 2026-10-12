import { act, fireEvent, render, screen } from '@testing-library/react'
import { useFormContext } from 'react-hook-form'

import { FormWrapper } from '@/testutils'
import { renderWithProviders } from '@/testutils/wrappers/renderWithProviders'

import { RangeInput } from '../RangeInput'

const RESET_RANGE_LABEL = 'Reset range'

const ResetRange = ({ value }: { value?: { min: string | number; max: string | number } }) => {
    const { reset } = useFormContext()
    return <button onClick={() => reset({ range: value })}>{RESET_RANGE_LABEL}</button>
}

afterEach(() => jest.useRealTimers())

describe('RangeInput', () => {
    it('renders label + two number inputs with Min/Max placeholders', () => {
        const { container } = render(
            <FormWrapper>
                <RangeInput name="range" label="Range" />
            </FormWrapper>,
        )
        expect(screen.getByText('Range')).toBeInTheDocument()
        const inputs = container.querySelectorAll('input')
        expect(inputs.length).toBe(2)
        expect(inputs[0].placeholder).toBe('Min')
        expect(inputs[1].placeholder).toBe('Max')
    })

    it('honors custom placeholders', () => {
        const { container } = render(
            <FormWrapper>
                <RangeInput name="range" placeholder={{ min: 'Value', max: '+/-' }} />
            </FormWrapper>,
        )
        const inputs = container.querySelectorAll('input')
        expect(inputs[0].placeholder).toBe('Value')
        expect(inputs[1].placeholder).toBe('+/-')
    })

    it('disabled applies disabled attribute to both inputs', () => {
        const { container } = render(
            <FormWrapper>
                <RangeInput name="range" disabled />
            </FormWrapper>,
        )
        const inputs = container.querySelectorAll('input')
        inputs.forEach(i => expect(i).toBeDisabled())
    })

    it('typing min/max updates input values', () => {
        const { container } = render(
            <FormWrapper>
                <RangeInput name="range" />
            </FormWrapper>,
        )
        const [min, max] = container.querySelectorAll('input') as any
        fireEvent.change(min, { target: { value: '5' } })
        fireEvent.change(max, { target: { value: '10' } })
        expect((min as HTMLInputElement).value).toBe('5')
        expect((max as HTMLInputElement).value).toBe('10')
    })

    it('debounced onChange fires with {min, max} after 500ms', () => {
        jest.useFakeTimers()
        const onChange = jest.fn()
        const { container } = render(
            <FormWrapper>
                <RangeInput name="range" onChange={onChange} />
            </FormWrapper>,
        )
        const [min, max] = container.querySelectorAll('input') as any
        fireEvent.change(min, { target: { value: '3' } })
        fireEvent.change(max, { target: { value: '7' } })

        act(() => {
            jest.advanceTimersByTime(500)
        })

        expect(onChange).toHaveBeenCalled()
        const last = onChange.mock.calls[onChange.mock.calls.length - 1][0]
        expect(last).toEqual(expect.objectContaining({ max: 7 }))
        jest.useRealTimers()
    })

    it.each([
        { type: 'number' as const, min: 1, max: 5, nextMin: 2, nextMax: 6 },
        {
            type: 'date' as const,
            min: '2024-01-01',
            max: '2024-12-31',
            nextMin: '2025-01-01',
            nextMax: '2025-12-31',
        },
    ])('does not emit seeded or reset $type ranges', ({ type, min, max, nextMin, nextMax }) => {
        jest.useFakeTimers()
        const onChange = jest.fn()
        renderWithProviders(
            <>
                <RangeInput name="range" type={type} onChange={onChange} />
                <ResetRange value={{ min: nextMin, max: nextMax }} />
            </>,
            { withForm: true, formProps: { defaultValues: { range: { min, max } } } },
        )
        act(() => jest.advanceTimersByTime(500))
        expect(onChange).not.toHaveBeenCalled()

        fireEvent.click(screen.getByRole('button', { name: 'Reset range' }))
        act(() => jest.advanceTimersByTime(500))
        expect(onChange).not.toHaveBeenCalled()
        expect(screen.getByTestId('minrange')).toHaveValue(nextMin)
        expect(screen.getByTestId('maxrange')).toHaveValue(nextMax)
    })

    it('emits a user-edited date range and normalizes its cleared bounds', () => {
        jest.useFakeTimers()
        const onChange = jest.fn()
        render(
            <FormWrapper>
                <RangeInput name="range" type="date" onChange={onChange} />
            </FormWrapper>,
        )
        fireEvent.change(screen.getByTestId('minrange'), { target: { value: '2024-01-01' } })
        act(() => jest.advanceTimersByTime(500))
        expect(onChange).toHaveBeenLastCalledWith({ min: '2024-01-01', max: null })

        fireEvent.change(screen.getByTestId('minrange'), { target: { value: '' } })
        act(() => jest.advanceTimersByTime(500))
        expect(onChange).toHaveBeenLastCalledWith({ min: null, max: null })
    })

    it('cancels a pending user edit when the form resets', () => {
        jest.useFakeTimers()
        const onChange = jest.fn()
        renderWithProviders(
            <>
                <RangeInput name="range" onChange={onChange} />
                <ResetRange />
            </>,
            { withForm: true },
        )
        fireEvent.change(screen.getByTestId('minrange'), { target: { value: '3' } })
        fireEvent.click(screen.getByRole('button', { name: 'Reset range' }))
        act(() => jest.advanceTimersByTime(500))
        expect(onChange).not.toHaveBeenCalled()
    })
})
