import { fireEvent, screen } from '@testing-library/react'

import { renderWithProviders } from '@/testutils/wrappers/renderWithProviders'

import { TagModalContent } from '../FileTable.columns'

describe('TagModalContent', () => {
    it('Continue disabled until tag is typed', () => {
        renderWithProviders(<TagModalContent onAddTag={jest.fn()} />)
        const buttons = screen.getAllByRole('button')
        const continueBtn = buttons[buttons.length - 1]
        expect(continueBtn).toBeDisabled()
    })

    it('Cancel button calls onClose', () => {
        const onClose = jest.fn()
        renderWithProviders(<TagModalContent onAddTag={jest.fn()} onClose={onClose} />)
        const buttons = screen.getAllByRole('button')
        fireEvent.click(buttons[0])
        expect(onClose).toHaveBeenCalled()
    })

    it('typing enables Continue + click invokes onAddTag', () => {
        const onAddTag = jest.fn()
        const onClose = jest.fn()
        renderWithProviders(
            <TagModalContent onAddTag={onAddTag} onClose={onClose} />,
        )
        const input = screen.getByLabelText(/tag/i, { exact: false })
        fireEvent.change(input, { target: { value: 'newTag' } })
        const buttons = screen.getAllByRole('button')
        const continueBtn = buttons[buttons.length - 1]
        expect(continueBtn).not.toBeDisabled()
        fireEvent.click(continueBtn)
        expect(onAddTag).toHaveBeenCalledWith('newTag')
        expect(onClose).toHaveBeenCalled()
    })
})
