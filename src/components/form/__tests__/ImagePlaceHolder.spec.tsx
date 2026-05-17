import { screen } from '@testing-library/react'

import { renderWithProviders } from '@/testutils/wrappers/renderWithProviders'

import ImagePlaceHolder from '../ImagePlaceHolder'

jest.mock('../../SvgIcons', () => ({
    ImageIcon: () => <span data-testid="img-icon" />,
}))

describe('ImagePlaceHolder', () => {
    it('renders dropzone label with image icon + hidden input', () => {
        const getRootProps = jest.fn(p => p)
        const getInputProps = jest.fn(() => ({ type: 'file' }))
        const { container } = renderWithProviders(
            <ImagePlaceHolder
                getRootProps={getRootProps as any}
                getInputProps={getInputProps as any}
            />,
        )
        expect(getRootProps).toHaveBeenCalled()
        expect(getInputProps).toHaveBeenCalled()
        expect(screen.getByTestId('img-icon')).toBeInTheDocument()
        expect(container.querySelector('input[type="file"]')).toBeInTheDocument()
    })

    it('forwards getRootProps onto label element', () => {
        const onClick = jest.fn()
        const getRootProps = jest.fn(() => ({ onClick }))
        const getInputProps = jest.fn(() => ({}))
        const { container } = renderWithProviders(
            <ImagePlaceHolder
                getRootProps={getRootProps as any}
                getInputProps={getInputProps as any}
            />,
        )
        const label = container.querySelector('label')!
        label.click()
        expect(onClick).toHaveBeenCalled()
    })
})
