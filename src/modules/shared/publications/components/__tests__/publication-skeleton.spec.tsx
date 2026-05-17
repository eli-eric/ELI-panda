import { render } from '@testing-library/react'

import PublicationSkeleton from '../publication-skeleton.comp'

jest.mock('@/components/form/shared/field-form.skeleton', () => ({
    FormFieldSkeleton: ({ className }: { className?: string }) => (
        <div data-testid="field-skel" data-classname={className ?? ''} />
    ),
}))

jest.mock('@/components/ui/skeleton', () => ({
    Skeleton: ({ className }: { className?: string }) => (
        <div data-testid="skel" data-classname={className ?? ''} />
    ),
}))

describe('PublicationSkeleton', () => {
    it('renders 2 top action skeleton placeholders + 11 field skeletons', () => {
        const { getAllByTestId } = render(<PublicationSkeleton />)
        expect(getAllByTestId('skel').length).toBe(2)
        expect(getAllByTestId('field-skel').length).toBe(11)
    })

    it('one of the field skeletons applies h-20 (abstract size)', () => {
        const { getAllByTestId } = render(<PublicationSkeleton />)
        const classes = getAllByTestId('field-skel').map(el => el.dataset.classname)
        expect(classes).toContain('h-20')
    })
})
