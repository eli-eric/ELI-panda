import { render } from '@testing-library/react'

import { Progress } from '../progress'

describe('ui/Progress', () => {
    it('renders root with data-slot="progress" and indicator with data-slot="progress-indicator"', () => {
        const { container } = render(<Progress value={50} />)
        expect(container.querySelector('[data-slot="progress"]')).not.toBeNull()
        const indicator = container.querySelector('[data-slot="progress-indicator"]') as
            | HTMLElement
            | null
        expect(indicator).not.toBeNull()
        expect(indicator?.style.transform).toBe('translateX(-50%)')
    })

    it('value=0 translates fully off-screen', () => {
        const { container } = render(<Progress value={0} />)
        const indicator = container.querySelector(
            '[data-slot="progress-indicator"]',
        ) as HTMLElement
        expect(indicator.style.transform).toBe('translateX(-100%)')
    })

    it('value=100 translates back to origin', () => {
        const { container } = render(<Progress value={100} />)
        const indicator = container.querySelector(
            '[data-slot="progress-indicator"]',
        ) as HTMLElement
        expect(indicator.style.transform).toBe('translateX(-0%)')
    })

    it('undefined value defaults to 0', () => {
        const { container } = render(<Progress />)
        const indicator = container.querySelector(
            '[data-slot="progress-indicator"]',
        ) as HTMLElement
        expect(indicator.style.transform).toBe('translateX(-100%)')
    })

    it('appends custom className', () => {
        const { container } = render(<Progress className="my-bar" />)
        expect(container.querySelector('[data-slot="progress"]')?.className).toContain('my-bar')
    })
})
