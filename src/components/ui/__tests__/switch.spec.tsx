import { fireEvent, render, screen } from '@testing-library/react'

import { Switch } from '../switch'

describe('ui/Switch', () => {
    it('renders with data-slot="switch"', () => {
        const { container } = render(<Switch />)
        expect(container.querySelector('[data-slot="switch"]')).not.toBeNull()
    })

    it('thumb element rendered with data-slot="switch-thumb"', () => {
        const { container } = render(<Switch />)
        expect(container.querySelector('[data-slot="switch-thumb"]')).not.toBeNull()
    })

    it('toggle invokes onCheckedChange', () => {
        const onCheckedChange = jest.fn()
        render(<Switch onCheckedChange={onCheckedChange} />)
        fireEvent.click(screen.getByRole('switch'))
        expect(onCheckedChange).toHaveBeenCalledWith(true)
    })

    it('starts in unchecked state by default', () => {
        render(<Switch />)
        expect(screen.getByRole('switch').getAttribute('data-state')).toBe('unchecked')
    })

    it('controlled checked=true sets data-state=checked', () => {
        render(<Switch checked={true} onCheckedChange={jest.fn()} />)
        expect(screen.getByRole('switch').getAttribute('data-state')).toBe('checked')
    })
})
