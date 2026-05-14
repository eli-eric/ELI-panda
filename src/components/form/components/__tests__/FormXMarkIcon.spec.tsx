import { fireEvent, render, screen } from '@testing-library/react'

import { FormXMarkIcon } from '../FormXMarkIcon'

describe('FormXMarkIcon', () => {
    it('renders an X icon', () => {
        const { container } = render(<FormXMarkIcon onClick={jest.fn()} />)
        expect(container.querySelector('svg')).toBeInTheDocument()
    })

    it('click triggers onClick', () => {
        const onClick = jest.fn()
        const { container } = render(<FormXMarkIcon onClick={onClick} />)
        const wrapper = container.firstChild as HTMLElement
        fireEvent.click(wrapper)
        expect(onClick).toHaveBeenCalled()
    })

    it('icon is aria-hidden', () => {
        const { container } = render(<FormXMarkIcon onClick={jest.fn()} />)
        expect(container.querySelector('svg')?.getAttribute('aria-hidden')).toBe('true')
    })
})
