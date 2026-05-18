import { act, fireEvent, screen, waitFor } from '@testing-library/react'

import { mockDynamicModalStore, mockUsePermission, renderWithProviders } from '@/testutils'

const modalMock = mockDynamicModalStore()

jest.mock('@/hooks/usePermission', () => mockUsePermission())
jest.mock('@/store/useDynamicModalStore', () => modalMock)

// Stub out heavy child components — they have their own tests.
jest.mock('../components/Main', () => ({
    __esModule: true,
    default: () => <div data-testid="main-stub" />,
}))
jest.mock('../components/GroupList', () => ({
    __esModule: true,
    default: () => <div data-testid="grouplist-stub" />,
}))
jest.mock('../components/PhysicalItemProperties', () => ({
    __esModule: true,
    PhysicalItemProperties: () => <div data-testid="phys-stub" />,
}))

// eslint-disable-next-line @typescript-eslint/no-require-imports
const CategoryEditForm = require('../CategoryEdit.form').default

describe('CategoryEditForm', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    it('renders section stubs', () => {
        renderWithProviders(
            <CategoryEditForm
                uid="c-1"
                onSubmit={jest.fn()}
                categoryDetail={{ uid: 'c-1', name: 'Cat', code: 'cat' }}
                modalId="m-1"
            />,
        )
        expect(screen.getByTestId('main-stub')).toBeInTheDocument()
        expect(screen.getByTestId('grouplist-stub')).toBeInTheDocument()
        expect(screen.getByTestId('phys-stub')).toBeInTheDocument()
    })

    it('calls closeModal with modalId on exit', () => {
        renderWithProviders(
            <CategoryEditForm
                uid="c-1"
                onSubmit={jest.fn()}
                categoryDetail={{ uid: 'c-1', name: 'Cat', code: 'cat' }}
                modalId="modal-abc"
            />,
        )
        const cancelBtn = screen.getAllByRole('button').find(b => /exit/i.test(b.textContent ?? ''))
        if (!cancelBtn) throw new Error('exit button not found')
        fireEvent.click(cancelBtn)
        expect(modalMock.__modalHandles.closeModal).toHaveBeenCalledWith('modal-abc')
    })

    it('submits with categoryDetail values when valid', async () => {
        const onSubmit = jest.fn()
        renderWithProviders(
            <CategoryEditForm
                uid="c-1"
                onSubmit={onSubmit}
                categoryDetail={{
                    uid: 'c-1',
                    name: 'ValidName',
                    code: 'valid-code',
                    groups: [],
                    physicalItemProperties: [],
                }}
                modalId="m-1"
            />,
        )
        const saveBtn = screen.getAllByRole('button').find(b => /save/i.test(b.textContent ?? ''))
        if (!saveBtn) throw new Error('save button not found')
        fireEvent.click(saveBtn)
        await waitFor(() => expect(onSubmit).toHaveBeenCalled())
        const data = onSubmit.mock.calls[0][0]
        expect(data.name).toBe('ValidName')
        expect(data.code).toBe('valid-code')
    })

    it('does not submit when required fields missing (no uid, no categoryDetail)', async () => {
        const onSubmit = jest.fn()
        renderWithProviders(
            <CategoryEditForm onSubmit={onSubmit} categoryDetail={{} as never} modalId="m-1" />,
        )
        const saveBtn = screen.getAllByRole('button').find(b => /save/i.test(b.textContent ?? ''))
        if (!saveBtn) throw new Error('save button not found')
        await act(async () => {
            fireEvent.click(saveBtn)
            await new Promise(r => setTimeout(r, 50))
        })
        expect(onSubmit).not.toHaveBeenCalled()
    })
})
