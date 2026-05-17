import { fireEvent, render, screen } from '@testing-library/react'
import { useForm } from 'react-hook-form'

import { renderWithProviders } from '@/testutils/wrappers/renderWithProviders'

import { FormModal, FormModalContent } from '../FormModal'

jest.mock('../Form', () => ({
    Form: ({ children, onSubmit }: { children: React.ReactNode; onSubmit: any }) => (
        <form
            data-testid="form"
            onSubmit={e => {
                e.preventDefault()
                onSubmit({})
            }}
        >
            {children}
        </form>
    ),
}))

jest.mock('@/components/error/ErrorPage', () => ({
    __esModule: true,
    default: () => <div data-testid="error-page" />,
}))

const Wrapper = (props: any) => {
    const methods = useForm({ defaultValues: { name: '' } })
    return <FormModalContent {...props} formMethods={methods} />
}

const ModalWrapper = (props: any) => {
    const methods = useForm({ defaultValues: { name: '' } })
    return <FormModal {...props} formMethods={methods} />
}

describe('FormModalContent', () => {
    it('renders renderOutsideForm', () => {
        renderWithProviders(
            <Wrapper
                onSubmit={jest.fn()}
                renderOutsideForm={<div data-testid="outside" />}
            >
                <input data-testid="inner" />
            </Wrapper>,
        )
        expect(screen.getByTestId('outside')).toBeInTheDocument()
        expect(screen.getByTestId('inner')).toBeInTheDocument()
    })

    it('Close button calls onClose + reset', () => {
        const onClose = jest.fn()
        renderWithProviders(<Wrapper onSubmit={jest.fn()} onClose={onClose} />)
        const buttons = screen.getAllByRole('button')
        fireEvent.click(buttons[0])
        expect(onClose).toHaveBeenCalled()
    })

    it('Save button disabled when loading=true', () => {
        renderWithProviders(<Wrapper onSubmit={jest.fn()} loading />)
        const save = screen.getAllByRole('button').slice(-1)[0]
        expect(save).toBeDisabled()
    })

    it('Save button disabled when disableSubmit', () => {
        renderWithProviders(<Wrapper onSubmit={jest.fn()} disableSubmit />)
        const save = screen.getAllByRole('button').slice(-1)[0]
        expect(save).toBeDisabled()
    })

    it('renders ErrorPage when error=true', () => {
        renderWithProviders(<Wrapper onSubmit={jest.fn()} error />)
        expect(screen.getByTestId('error-page')).toBeInTheDocument()
    })
})

describe('FormModal', () => {
    it('returns null when open=false', () => {
        const { container } = renderWithProviders(
            <ModalWrapper onSubmit={jest.fn()} open={false} setOpen={jest.fn()} />,
        )
        expect(container.firstChild).toBeNull()
    })

    it('renders FormModalContent when open=true', () => {
        renderWithProviders(
            <ModalWrapper onSubmit={jest.fn()} open setOpen={jest.fn()}>
                <input data-testid="inner" />
            </ModalWrapper>,
        )
        expect(screen.getByTestId('inner')).toBeInTheDocument()
    })

    it('Close button calls setOpen(false)', () => {
        const setOpen = jest.fn()
        renderWithProviders(
            <ModalWrapper onSubmit={jest.fn()} open setOpen={setOpen} />,
        )
        const buttons = screen.getAllByRole('button')
        fireEvent.click(buttons[0])
        expect(setOpen).toHaveBeenCalledWith(false)
    })
})
