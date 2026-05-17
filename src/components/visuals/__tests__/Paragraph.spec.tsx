import { renderWithProviders } from '@/testutils/wrappers/renderWithProviders'

import { Paragraph } from '../Paragraph'

describe('Paragraph', () => {
    it('renders <p> with prose styling + localized FormattedMessage', () => {
        const { container } = renderWithProviders(
            <Paragraph message="common.errors.somethingWentWrong" />,
        )
        const p = container.querySelector('p')!
        expect(p).toBeInTheDocument()
        expect(p).toHaveClass('prose-sm', 'text-gray-600')
        expect(p.textContent?.length).toBeGreaterThan(0)
    })
})
