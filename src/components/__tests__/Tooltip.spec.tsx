import { render, screen } from '@testing-library/react'

import { Tooltip } from '../Tooltip'

describe('Tooltip', () => {
    it('renders children as-is when no content prop', () => {
        const { container } = render(
            <Tooltip>
                <span>bare</span>
            </Tooltip>,
        )
        expect(screen.getByText('bare')).toBeInTheDocument()
        expect(container.querySelectorAll('[role="tooltip"]').length).toBe(0)
    })

    it('wraps children with TooltipTrigger when content provided', () => {
        render(
            <Tooltip content="Hint">
                <button>hoverable</button>
            </Tooltip>,
        )
        expect(screen.getByRole('button', { name: 'hoverable' })).toBeInTheDocument()
    })
})
