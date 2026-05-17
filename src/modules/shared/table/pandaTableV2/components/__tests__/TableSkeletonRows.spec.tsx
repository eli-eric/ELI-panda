import { render } from '@testing-library/react'

import { TableSkeletonRows } from '../TableSkeletonRows'

jest.mock('@/components/ui/skeleton', () => ({
    Skeleton: ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
        <div data-testid="skel" data-cls={className ?? ''} style={style} />
    ),
}))

const header = (size: number) =>
    ({
        column: { getSize: () => size },
    }) as any

const wrap = (children: React.ReactNode) => (
    <table>
        <tbody>{children}</tbody>
    </table>
)

describe('TableSkeletonRows', () => {
    it('renders rowCount rows with one cell per header', () => {
        const { container } = render(
            wrap(<TableSkeletonRows headers={[header(50), header(100)]} rowCount={3} />),
        )
        expect(container.querySelectorAll('tr').length).toBe(3)
        expect(container.querySelectorAll('td').length).toBe(6)
    })

    it('narrow column (<80) renders h-5 w-5 checkbox skeleton', () => {
        const { container } = render(
            wrap(<TableSkeletonRows headers={[header(50)]} rowCount={1} />),
        )
        const skel = container.querySelector('[data-testid="skel"]')
        expect(skel?.getAttribute('data-cls')).toContain('w-5')
    })

    it('medium column (80-150) renders rounded-full badge skeleton', () => {
        const { container } = render(
            wrap(<TableSkeletonRows headers={[header(100)]} rowCount={1} />),
        )
        const skel = container.querySelector('[data-testid="skel"]')
        expect(skel?.getAttribute('data-cls')).toContain('rounded-full')
    })

    it('wide column (>=150) renders text-content skeleton', () => {
        const { container } = render(
            wrap(<TableSkeletonRows headers={[header(200)]} rowCount={1} />),
        )
        const skel = container.querySelector('[data-testid="skel"]') as HTMLElement | null
        expect(skel?.style.width).toMatch(/px$/)
    })

    it('alternating row backgrounds (bg-background / bg-muted)', () => {
        const { container } = render(
            wrap(<TableSkeletonRows headers={[header(100)]} rowCount={4} />),
        )
        const rows = Array.from(container.querySelectorAll('tr'))
        expect(rows[0].className).toContain('bg-background')
        expect(rows[1].className).toContain('bg-muted')
    })
})
