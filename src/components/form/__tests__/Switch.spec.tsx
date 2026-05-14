import { act, fireEvent, render, renderHook, screen } from '@testing-library/react'

import { FormWrapper } from '@/testutils'

import { Switch, Toggle, useToggle } from '../Switch'

describe('Toggle (uncontrolled wrapper)', () => {
    it('reflects enabled prop', () => {
        const { container } = render(<Toggle enabled={true} />)
        const sw = container.querySelector('button[role="switch"]')!
        expect(sw).toHaveAttribute('data-state', 'checked')
    })

    it('fires onChange when toggled', () => {
        const onChange = jest.fn()
        const { container } = render(<Toggle enabled={false} onChange={onChange} />)
        const sw = container.querySelector('button[role="switch"]')!
        fireEvent.click(sw)
        expect(onChange).toHaveBeenCalledWith(true)
    })
})

describe('useToggle', () => {
    it('toggles boolean state', () => {
        const { result } = renderHook(() => useToggle(false))
        expect(result.current.enabled).toBe(false)
        act(() => result.current.toggle())
        expect(result.current.enabled).toBe(true)
        act(() => result.current.toggle())
        expect(result.current.enabled).toBe(false)
    })

    it('starts from initialState=true', () => {
        const { result } = renderHook(() => useToggle(true))
        expect(result.current.enabled).toBe(true)
    })
})

describe('Switch (RHF controller)', () => {
    it('renders label when provided', () => {
        render(
            <FormWrapper>
                <Switch name="t" label="My toggle" />
            </FormWrapper>,
        )
        expect(screen.getByText('My toggle')).toBeInTheDocument()
    })

    it('fires onChange + updates field state on click', () => {
        const onChange = jest.fn()
        const { container } = render(
            <FormWrapper>
                <Switch name="t" defaultValue={false} onChange={onChange} />
            </FormWrapper>,
        )
        const sw = container.querySelector('button[role="switch"]')!
        fireEvent.click(sw)
        expect(onChange).toHaveBeenCalledWith(true)
    })

    it('omits label heading when label prop missing', () => {
        const { container } = render(
            <FormWrapper>
                <Switch name="t" />
            </FormWrapper>,
        )
        // No <span> with text-sm font-medium label class
        expect(container.querySelector('span.text-sm.font-medium')).toBeNull()
    })
})
