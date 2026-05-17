import { fireEvent, render, screen } from '@testing-library/react'

import { FormWrapper } from '@/testutils'

import { RadioSelect } from '../radio-select.comp'

const options = [
    { label: 'Apple', value: 'a' },
    { label: 'Banana', value: 'b' },
    { label: 'Disabled', value: 'd', disabled: true },
]

describe('RadioSelect', () => {
    it('renders all options as radio inputs with labels', () => {
        render(
            <FormWrapper>
                <RadioSelect name="fruit" options={options} defaultValue="a" />
            </FormWrapper>,
        )
        expect(screen.getByLabelText('Apple')).toBeInTheDocument()
        expect(screen.getByLabelText('Banana')).toBeInTheDocument()
        expect(screen.getByLabelText('Disabled')).toBeInTheDocument()
    })

    it('checks the option matching defaultValue', () => {
        render(
            <FormWrapper>
                <RadioSelect name="fruit" options={options} defaultValue="b" />
            </FormWrapper>,
        )
        expect(screen.getByLabelText('Banana')).toBeChecked()
        expect(screen.getByLabelText('Apple')).not.toBeChecked()
    })

    it('fires onChange with new value', () => {
        const onChange = jest.fn()
        render(
            <FormWrapper>
                <RadioSelect
                    name="fruit"
                    options={options}
                    defaultValue="a"
                    onChange={onChange}
                />
            </FormWrapper>,
        )
        fireEvent.click(screen.getByLabelText('Banana'))
        expect(onChange).toHaveBeenCalledWith('b')
    })

    it('individual option.disabled disables only that option', () => {
        render(
            <FormWrapper>
                <RadioSelect name="fruit" options={options} defaultValue="a" />
            </FormWrapper>,
        )
        expect(screen.getByLabelText('Disabled')).toBeDisabled()
        expect(screen.getByLabelText('Apple')).not.toBeDisabled()
    })

    it('global disabled prop disables every option', () => {
        render(
            <FormWrapper>
                <RadioSelect
                    name="fruit"
                    options={[options[0], options[1]]}
                    defaultValue="a"
                    disabled
                />
            </FormWrapper>,
        )
        expect(screen.getByLabelText('Apple')).toBeDisabled()
        expect(screen.getByLabelText('Banana')).toBeDisabled()
    })
})
