import { fireEvent, render, screen } from '@testing-library/react'

import { Checkbox, CheckboxWithLabel } from '../checkbox'

describe('ui/Checkbox', () => {
    it('renders with data-slot="checkbox"', () => {
        const { container } = render(<Checkbox />)
        expect(container.querySelector('[data-slot="checkbox"]')).not.toBeNull()
    })

    it('starts in unchecked state', () => {
        render(<Checkbox />)
        expect(screen.getByRole('checkbox').getAttribute('data-state')).toBe('unchecked')
    })

    it('click invokes onCheckedChange', () => {
        const onCheckedChange = jest.fn()
        render(<Checkbox onCheckedChange={onCheckedChange} />)
        fireEvent.click(screen.getByRole('checkbox'))
        expect(onCheckedChange).toHaveBeenCalledWith(true)
    })

    it('appends custom className', () => {
        const { container } = render(<Checkbox className="my-checkbox" />)
        expect(container.querySelector('[data-slot="checkbox"]')?.className).toContain(
            'my-checkbox',
        )
    })
})

describe('ui/CheckboxWithLabel', () => {
    it('renders label text', () => {
        render(<CheckboxWithLabel id="t" label="Accept" />)
        expect(screen.getByText('Accept')).toBeInTheDocument()
    })

    it('label binds via htmlFor=id', () => {
        render(<CheckboxWithLabel id="agree" label="Agree" />)
        expect(screen.getByText('Agree').getAttribute('for')).toBe('agree')
    })

    it('no label rendered when label prop missing', () => {
        const { container } = render(<CheckboxWithLabel id="x" />)
        expect(container.querySelector('label')).toBeNull()
    })

    it('clicking checkbox invokes onChange with new state', () => {
        const onChange = jest.fn()
        render(<CheckboxWithLabel id="t" label="X" onChange={onChange} />)
        fireEvent.click(screen.getByRole('checkbox'))
        expect(onChange).toHaveBeenCalledWith(true)
    })
})
