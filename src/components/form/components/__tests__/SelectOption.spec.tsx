import { render, screen } from '@testing-library/react'

import { SelectOption } from '../SelectOption'

jest.mock('@/components/Tooltip', () => ({
    Tooltip: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}))

describe('SelectOption', () => {
    it('renders name without check when not selected', () => {
        render(<SelectOption item={{ uid: '1', name: 'A' } as any} selected={false} active={false} />)
        expect(screen.getByText('A')).toBeInTheDocument()
        // no check icon
        const { container } = render(
            <SelectOption item={{ uid: '1', name: 'A' } as any} selected={false} active={false} />,
        )
        expect(container.querySelectorAll('svg').length).toBe(0)
    })

    it('renders check icon when selected', () => {
        const { container } = render(
            <SelectOption item={{ uid: '1', name: 'A' } as any} selected active={false} />,
        )
        expect(container.querySelector('svg')).toBeInTheDocument()
    })

    it('applies font-semibold on selected', () => {
        render(<SelectOption item={{ uid: '1', name: 'A' } as any} selected active={false} />)
        expect(screen.getByText('A').className).toContain('font-semibold')
    })

    it('check icon text-white when active+selected, text-orange otherwise', () => {
        const { container, rerender } = render(
            <SelectOption item={{ uid: '1', name: 'A' } as any} selected active={false} />,
        )
        const checkSpan = container.querySelector('span[class*="absolute"]')!
        expect(checkSpan.className).toContain('text-orange-500')

        rerender(<SelectOption item={{ uid: '1', name: 'A' } as any} selected active />)
        const checkSpan2 = container.querySelector('span[class*="absolute"]')!
        expect(checkSpan2.className).toContain('text-white')
    })
})
