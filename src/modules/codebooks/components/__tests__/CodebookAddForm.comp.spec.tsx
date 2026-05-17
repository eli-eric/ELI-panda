import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { useForm } from 'react-hook-form'

import { renderWithProviders } from '@/testutils/wrappers/renderWithProviders'

import type { CodebookValueSchema } from '../../schemas/codebook-value.schema'
import { CodebookAddFormComponent } from '../CodebookAddForm.comp'

jest.mock('@/components/ui/dialog', () => ({
    DialogFooter: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}))

const Wrapper = ({
    isPending,
    onSubmit,
    onCancel,
    defaultName = '',
}: {
    isPending?: boolean
    onSubmit?: (d: any) => void
    onCancel?: () => void
    defaultName?: string
}) => {
    const form = useForm<CodebookValueSchema>({ defaultValues: { name: defaultName } as any })
    return (
        <CodebookAddFormComponent
            form={form}
            isPending={!!isPending}
            onSubmit={onSubmit ?? jest.fn()}
            onCancel={onCancel ?? jest.fn()}
        />
    )
}

describe('CodebookAddFormComponent', () => {
    it('renders name input and Cancel/Save buttons', () => {
        renderWithProviders(<Wrapper />)
        expect(screen.getByRole('textbox')).toBeInTheDocument()
        expect(screen.getAllByRole('button')).toHaveLength(2)
    })

    it('Cancel click invokes onCancel without submit', () => {
        const onCancel = jest.fn()
        const onSubmit = jest.fn()
        renderWithProviders(<Wrapper onCancel={onCancel} onSubmit={onSubmit} />)
        fireEvent.click(screen.getAllByRole('button')[0])
        expect(onCancel).toHaveBeenCalled()
        expect(onSubmit).not.toHaveBeenCalled()
    })

    it('Cancel + Save disabled when isPending=true', () => {
        renderWithProviders(<Wrapper isPending />)
        const [cancel, save] = screen.getAllByRole('button')
        expect(cancel).toBeDisabled()
        expect(save).toBeDisabled()
    })

    it('isPending=true shows "Loading" label on Save instead of Save text', () => {
        renderWithProviders(<Wrapper isPending />)
        const [, save] = screen.getAllByRole('button')
        // Translated key: common.ui.loading; default en is "Loading..."
        expect(save.textContent).toMatch(/loading/i)
    })

    it('submit calls onSubmit with form value', async () => {
        const onSubmit = jest.fn()
        renderWithProviders(<Wrapper onSubmit={onSubmit} defaultName="X" />)
        fireEvent.input(screen.getByRole('textbox'), { target: { value: 'New' } })
        fireEvent.click(screen.getAllByRole('button')[1])
        await waitFor(() =>
            expect(onSubmit).toHaveBeenCalledWith(
                expect.objectContaining({ name: 'New' }),
                expect.anything(),
            ),
        )
    })
})
