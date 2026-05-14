import { render } from '@testing-library/react'

import { FormFieldSkeleton } from '../field-form.skeleton'

jest.mock('@/components/ui/skeleton', () => ({
    Skeleton: ({ className }: { className?: string }) => (
        <div data-testid="skel" data-cls={className ?? ''} />
    ),
}))

describe('FormFieldSkeleton', () => {
    it('renders label + field skeleton bars', () => {
        const { getAllByTestId } = render(<FormFieldSkeleton />)
        const skels = getAllByTestId('skel')
        expect(skels.length).toBe(2)
        expect(skels[0].dataset.cls).toContain('h-4')
        expect(skels[1].dataset.cls).toContain('h-full')
    })

    it('appends custom className to the outer wrapper', () => {
        const { container } = render(<FormFieldSkeleton className="my-extra" />)
        expect(container.firstChild).toHaveClass('my-extra')
    })

    it('default wrapper has flex-col + h-12', () => {
        const { container } = render(<FormFieldSkeleton />)
        const node = container.firstChild as HTMLElement
        expect(node).toHaveClass('flex-col')
        expect(node).toHaveClass('h-12')
    })
})
