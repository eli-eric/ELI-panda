import { render, screen } from '@testing-library/react'

import { DetailPropertiesList } from '../detail-properties.list'

jest.mock('@/modules/catalogueItem/components/form/GroupProperty', () => ({
    __esModule: true,
    default: ({ detail, disabled }: { detail: any; disabled?: boolean }) => (
        <div
            data-testid={`prop-${detail.property.uid}`}
            data-disabled={String(!!disabled)}
        />
    ),
}))

jest.mock('@/components/layout/Heading', () => ({
    Heading: ({ customText }: { customText: string }) => (
        <h2 data-testid={`heading-${customText}`}>{customText}</h2>
    ),
}))

describe('DetailPropertiesList', () => {
    it('returns null when groupMap empty', () => {
        const { container } = render(<DetailPropertiesList groupMap={new Map()} />)
        expect(container.firstChild).toBeNull()
    })

    it('renders one Heading + GroupProperty per group entry', () => {
        const groupMap = new Map<string, any[]>([
            ['Group A', [{ property: { uid: 'a' } }, { property: { uid: 'b' } }]],
            ['Group B', [{ property: { uid: 'c' } }]],
        ])
        render(<DetailPropertiesList groupMap={groupMap} />)
        expect(screen.getByTestId('heading-Group A')).toBeInTheDocument()
        expect(screen.getByTestId('heading-Group B')).toBeInTheDocument()
        expect(screen.getByTestId('prop-a')).toBeInTheDocument()
        expect(screen.getByTestId('prop-b')).toBeInTheDocument()
        expect(screen.getByTestId('prop-c')).toBeInTheDocument()
    })

    it('propagates disabled to GroupProperty', () => {
        const groupMap = new Map<string, any[]>([['G', [{ property: { uid: 'a' } }]]])
        render(<DetailPropertiesList groupMap={groupMap} disabled />)
        expect(screen.getByTestId('prop-a').dataset.disabled).toBe('true')
    })
})
