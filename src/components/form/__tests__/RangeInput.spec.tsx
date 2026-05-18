import { act, fireEvent, render, screen } from '@testing-library/react'

import { FormWrapper } from '@/testutils'

import { RangeInput } from '../RangeInput'

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
})
