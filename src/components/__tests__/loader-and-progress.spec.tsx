import { render } from '@testing-library/react'

import LoaderComponent from '../loader.comp'
import ProgressBarComponent from '../progress-bar.comp'

describe('LoaderComponent', () => {
    it('renders 7 eli-logo dots inside .app-loader > .eli-logo', () => {
        const { container } = render(<LoaderComponent />)
        expect(container.querySelector('.app-loader')).toBeInTheDocument()
        expect(container.querySelector('.eli-logo')).toBeInTheDocument()
        const dots = container.querySelectorAll('.eli-logo-p')
        expect(dots.length).toBe(7)
        ;[1, 2, 3, 4, 5, 6, 7].forEach(n => {
            expect(container.querySelector(`.eli-logo-p${n}`)).toBeInTheDocument()
        })
    })
})

describe('ProgressBarComponent', () => {
    it('renders animated progress bar scaffold', () => {
        const { container } = render(<ProgressBarComponent />)
        expect(container.querySelector('.animate-progressBar')).toBeInTheDocument()
        // Container has orange track
        expect(container.querySelector('.bg-orange-100')).toBeInTheDocument()
    })
})
