import { render, screen } from '@testing-library/react'

import { RadioGroup, RadioGroupItem } from '../radio-group'

describe('ui/RadioGroup', () => {
    it('renders root with data-slot="radio-group"', () => {
        const { container } = render(
            <RadioGroup defaultValue="a">
                <RadioGroupItem value="a" id="r-a" />
                <RadioGroupItem value="b" id="r-b" />
            </RadioGroup>,
        )
        expect(container.querySelector('[data-slot="radio-group"]')).not.toBeNull()
    })

    it('renders item buttons with data-slot="radio-group-item"', () => {
        const { container } = render(
            <RadioGroup>
                <RadioGroupItem value="a" id="r-a" />
                <RadioGroupItem value="b" id="r-b" />
            </RadioGroup>,
        )
        expect(container.querySelectorAll('[data-slot="radio-group-item"]').length).toBe(2)
    })

    it('defaultValue marks the matching item as checked', () => {
        render(
            <RadioGroup defaultValue="b">
                <RadioGroupItem value="a" id="r-a" />
                <RadioGroupItem value="b" id="r-b" />
            </RadioGroup>,
        )
        const items = screen.getAllByRole('radio')
        expect(items[0].getAttribute('data-state')).toBe('unchecked')
        expect(items[1].getAttribute('data-state')).toBe('checked')
    })

    it('appends className to root', () => {
        const { container } = render(
            <RadioGroup className="my-cls">
                <RadioGroupItem value="a" id="r-a" />
            </RadioGroup>,
        )
        expect(container.querySelector('[data-slot="radio-group"]')?.className).toContain(
            'my-cls',
        )
    })
})
