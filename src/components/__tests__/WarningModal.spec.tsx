import { act, fireEvent, screen } from '@testing-library/react'
import { useWarningModalStore } from 'src/store/useWarningModalStore'

import { renderWithProviders } from '@/testutils/wrappers/renderWithProviders'

import { WarningModal } from '../WarningModal'

beforeEach(() => {
    act(() => useWarningModalStore.getState().closeModal())
})

describe('WarningModal', () => {
    it('does not render dialog content when isOpen=false', () => {
        renderWithProviders(<WarningModal />)
        expect(screen.queryByText(/cancel/i)).toBeNull()
    })

    it('opens via store and shows message + action buttons', () => {
        act(() => useWarningModalStore.getState().openModal('Are you sure?', jest.fn()))
        renderWithProviders(<WarningModal />)
        expect(screen.getByText('Are you sure?')).toBeInTheDocument()
    })

    it('Continue button calls confirmModal which invokes pending callback', () => {
        const cb = jest.fn()
        act(() =>
            useWarningModalStore.getState().openModal('msg', cb, ['arg1']),
        )
        renderWithProviders(<WarningModal />)
        const continueBtn = screen.getAllByRole('button').find(b => /continue/i.test(b.textContent ?? ''))
        fireEvent.click(continueBtn!)
        expect(cb).toHaveBeenCalledWith('arg1')
    })

    it('Cancel button closes modal without firing callback', () => {
        const cb = jest.fn()
        act(() => useWarningModalStore.getState().openModal('msg', cb))
        renderWithProviders(<WarningModal />)
        const cancelBtn = screen.getAllByRole('button').find(b => /cancel/i.test(b.textContent ?? ''))
        fireEvent.click(cancelBtn!)
        expect(cb).not.toHaveBeenCalled()
        expect(useWarningModalStore.getState().params.isOpen).toBe(false)
    })
})
