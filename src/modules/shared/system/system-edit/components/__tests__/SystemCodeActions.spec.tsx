import { fireEvent, render, screen } from '@testing-library/react'
import { FormProvider, useForm } from 'react-hook-form'

import { useSystemStore } from '@/modules/shared/system/device-info-overlay/store/useShowDeviceStore'
import { useSystemCodeClear } from '@/modules/systemItem/hooks/useSystemCodeClear'
import { useSystemCodeGenerate } from '@/modules/systemItem/hooks/useSystemCodeGenerate'

import { SystemCodeActions } from '../SystemCodeActions'

jest.mock('@/components/Tooltip', () => ({
    Tooltip: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}))

jest.mock('@/modules/shared/system/device-info-overlay/store/useShowDeviceStore', () => ({
    useSystemStore: jest.fn(),
}))

jest.mock('@/modules/systemItem/hooks/useSystemCodeClear', () => ({
    useSystemCodeClear: jest.fn(),
}))

jest.mock('@/modules/systemItem/hooks/useSystemCodeGenerate', () => ({
    useSystemCodeGenerate: jest.fn(),
}))

const mockUseSystemStore = useSystemStore as unknown as jest.Mock
const mockUseSystemCodeClear = useSystemCodeClear as jest.Mock
const mockUseSystemCodeGenerate = useSystemCodeGenerate as jest.Mock

let getSystemCode: jest.Mock
let clearSystemCode: jest.Mock

const Harness = ({ defaultSystemCode = '' }: { defaultSystemCode?: string }) => {
    const methods = useForm({ defaultValues: { systemCode: defaultSystemCode } })
    return (
        <FormProvider {...methods}>
            <SystemCodeActions />
        </FormProvider>
    )
}

beforeEach(() => {
    jest.clearAllMocks()
    getSystemCode = jest.fn()
    clearSystemCode = jest.fn()
    mockUseSystemStore.mockReturnValue({ uid: 'sys-1' })
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

    it('release click invokes clearSystemCode with uid', () => {
        render(<Harness defaultSystemCode="ABC" />)
        fireEvent.click(screen.getByLabelText('Release system code'))
        expect(clearSystemCode).toHaveBeenCalledWith({
            where: { uid: 'sys-1' },
            update: { systemCode: null },
        })
    })

    it('release click does nothing when uid missing', () => {
        mockUseSystemStore.mockReturnValue({ uid: undefined })
        render(<Harness defaultSystemCode="ABC" />)
        fireEvent.click(screen.getByLabelText('Release system code'))
        expect(clearSystemCode).not.toHaveBeenCalled()
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
