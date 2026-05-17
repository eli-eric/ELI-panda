import { fireEvent, screen } from '@testing-library/react'

import { renderWithProviders } from '@/testutils/wrappers/renderWithProviders'

import { ImageUploadZone } from '../ImageUploadZone'

describe('ImageUploadZone', () => {
    it('returns null when user lacks edit role', () => {
        const { container } = renderWithProviders(
            <ImageUploadZone isDragActive={false} hasEditRole={false} hasImages={false} />,
        )
        expect(container).toBeEmptyDOMElement()
    })

    it('renders compact upload button when images already exist', () => {
        renderWithProviders(
            <ImageUploadZone isDragActive={false} hasEditRole hasImages />,
        )
        expect(screen.getByRole('button')).toBeInTheDocument()
    })

    it('compact upload button click invokes onUploadClick', () => {
        const onUploadClick = jest.fn()
        renderWithProviders(
            <ImageUploadZone
                isDragActive={false}
                hasEditRole
                hasImages
                onUploadClick={onUploadClick}
            />,
        )
        fireEvent.click(screen.getByRole('button'))
        expect(onUploadClick).toHaveBeenCalled()
    })

    it('empty state mode uses dashed border drop zone', () => {
        const { container } = renderWithProviders(
            <ImageUploadZone isDragActive={false} hasEditRole hasImages={false} />,
        )
        expect(container.firstChild).toHaveClass('border-dashed')
    })

    it('empty state click triggers onUploadClick', () => {
        const onUploadClick = jest.fn()
        const { container } = renderWithProviders(
            <ImageUploadZone
                isDragActive={false}
                hasEditRole
                hasImages={false}
                onUploadClick={onUploadClick}
            />,
        )
        fireEvent.click(container.firstChild as Element)
        expect(onUploadClick).toHaveBeenCalled()
    })

    it('isDragActive adds border-primary highlight', () => {
        const { container } = renderWithProviders(
            <ImageUploadZone isDragActive hasEditRole hasImages={false} />,
        )
        expect(container.firstChild as Element).toHaveClass('border-primary')
    })
})
