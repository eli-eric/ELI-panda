import { render } from '@testing-library/react'

import { ImagePlaceHolder } from '../ImagePlaceHolder'

describe('ImagePlaceHolder', () => {
    it('renders skeleton scaffold', () => {
        const { container } = render(<ImagePlaceHolder />)
        expect(container.firstChild).toHaveClass('w-full', 'border', 'rounded-md')
    })

    it('appends extra className', () => {
        const { container } = render(<ImagePlaceHolder className="extra-class" />)
        expect(container.firstChild).toHaveClass('extra-class')
    })
})
