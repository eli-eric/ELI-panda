import { render } from '@testing-library/react'

import { SystemEditSkeleton } from '../system-edit.skeleton'

jest.mock('@/components/ui/skeleton', () => ({
    Skeleton: ({ className }: { className?: string }) => (
        <div data-testid="skel" data-cls={className ?? ''} />
    ),
}))

describe('SystemEditSkeleton', () => {
    it('renders 7 skeleton bars (1 large header + 6 field rows)', () => {
        const { getAllByTestId } = render(<SystemEditSkeleton />)
        expect(getAllByTestId('skel').length).toBe(7)
    })

    it('first bar uses h-30 (large header)', () => {
        const { getAllByTestId } = render(<SystemEditSkeleton />)
        expect(getAllByTestId('skel')[0].dataset.cls).toContain('h-30')
    })

    it('rest of the bars use h-4', () => {
        const { getAllByTestId } = render(<SystemEditSkeleton />)
        const rest = getAllByTestId('skel').slice(1)
        for (const node of rest) {
            expect(node.dataset.cls).toContain('h-4')
        }
    })
})
