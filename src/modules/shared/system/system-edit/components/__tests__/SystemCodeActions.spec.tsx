import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { FormProvider, useForm } from 'react-hook-form'
import { IntlProvider } from 'react-intl'

import { guardSystemEdit } from '@/modules/shared/system/edit-permission'
import { useSystemCodeClear } from '@/modules/systemItem/hooks/useSystemCodeClear'
import { useSystemCodeGenerate } from '@/modules/systemItem/hooks/useSystemCodeGenerate'

import { SystemCodeActions } from '../SystemCodeActions'

jest.mock('@/components/Tooltip', () => ({
    Tooltip: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}))

jest.mock('@/modules/shared/system/edit-permission', () => ({
    guardSystemEdit: jest.fn(),
}))

jest.mock('@/modules/systemItem/hooks/useSystemCodeClear', () => ({
    useSystemCodeClear: jest.fn(),
}))

jest.mock('@/modules/systemItem/hooks/useSystemCodeGenerate', () => ({
    useSystemCodeGenerate: jest.fn(),
}))

const mockGuardSystemEdit = guardSystemEdit as jest.Mock
const mockUseSystemCodeClear = useSystemCodeClear as jest.Mock
const mockUseSystemCodeGenerate = useSystemCodeGenerate as jest.Mock

let getSystemCode: jest.Mock
let clearSystemCode: jest.Mock

const Harness = ({
    defaultSystemCode = '',
    uid = 'sys-1',
    canEdit = true,
}: {
    defaultSystemCode?: string
    uid?: string
    canEdit?: boolean
}) => {
    const methods = useForm({ defaultValues: { systemCode: defaultSystemCode } })
    return (
        <QueryClientProvider client={new QueryClient()}>
            <IntlProvider locale="en" messages={{}}>
                <FormProvider {...methods}>
                    <SystemCodeActions uid={uid} canEdit={canEdit} />
                </FormProvider>
            </IntlProvider>
        </QueryClientProvider>
    )
}

beforeEach(() => {
    jest.clearAllMocks()
    getSystemCode = jest.fn()
    clearSystemCode = jest.fn()
    mockGuardSystemEdit.mockResolvedValue(true)
    mockUseSystemCodeGenerate.mockReturnValue({
        loading: false,
        getSystemCode,
        disabled: false,
    })
    mockUseSystemCodeClear.mockReturnValue({ clearSystemCode, loading: false })
})

describe('SystemCodeActions', () => {
    it('always renders the generate button', () => {
        render(<Harness />)
        expect(screen.getByLabelText('Generate system code')).toBeInTheDocument()
    })

    it('hides clear/release button when systemCode is empty', () => {
        render(<Harness defaultSystemCode="" />)
        expect(screen.queryByLabelText('Release system code')).toBeNull()
    })

    it('shows clear/release button when systemCode is set', () => {
        render(<Harness defaultSystemCode="ABC" />)
        expect(screen.getByLabelText('Release system code')).toBeInTheDocument()
    })

    it('generate click invokes getSystemCode', () => {
        render(<Harness />)
        fireEvent.click(screen.getByLabelText('Generate system code'))
        expect(getSystemCode).toHaveBeenCalled()
    })

    it('generate button disabled when generate hook reports disabled', () => {
        mockUseSystemCodeGenerate.mockReturnValue({
            loading: false,
            getSystemCode,
            disabled: true,
        })
        render(<Harness />)
        expect(screen.getByLabelText('Generate system code')).toBeDisabled()
    })

    it('release click guards then invokes clearSystemCode with uid', async () => {
        render(<Harness defaultSystemCode="ABC" />)
        fireEvent.click(screen.getByLabelText('Release system code'))
        await waitFor(() =>
            expect(clearSystemCode).toHaveBeenCalledWith({
                where: { uid: 'sys-1' },
                update: { systemCode: null },
            }),
        )
        expect(mockGuardSystemEdit).toHaveBeenCalledWith(expect.anything(), 'sys-1', expect.any(Function))
    })

    it('release does nothing when the guard denies', async () => {
        mockGuardSystemEdit.mockResolvedValue(false)
        render(<Harness defaultSystemCode="ABC" />)
        fireEvent.click(screen.getByLabelText('Release system code'))
        await waitFor(() => expect(mockGuardSystemEdit).toHaveBeenCalled())
        expect(clearSystemCode).not.toHaveBeenCalled()
    })

    it('release click does nothing when uid missing', () => {
        render(<Harness defaultSystemCode="ABC" uid="" />)
        fireEvent.click(screen.getByLabelText('Release system code'))
        expect(mockGuardSystemEdit).not.toHaveBeenCalled()
        expect(clearSystemCode).not.toHaveBeenCalled()
    })

    it('both buttons disabled when canEdit is false', () => {
        render(<Harness defaultSystemCode="X" canEdit={false} />)
        expect(screen.getByLabelText('Generate system code')).toBeDisabled()
        expect(screen.getByLabelText('Release system code')).toBeDisabled()
    })

    it('both buttons disabled while any loading flag is on', () => {
        mockUseSystemCodeGenerate.mockReturnValue({
            loading: true,
            getSystemCode,
            disabled: false,
        })
        render(<Harness defaultSystemCode="X" />)
        expect(screen.getByLabelText('Generate system code')).toBeDisabled()
        expect(screen.getByLabelText('Release system code')).toBeDisabled()
    })
})
