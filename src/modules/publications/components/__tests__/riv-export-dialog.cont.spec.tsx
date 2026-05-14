import { render } from '@testing-library/react'

import { useCodebook } from '@/hooks/fetch/useCodebook'

import { useRivExport } from '../../hooks/useRivExport'
import { useRivValidate } from '../../hooks/useRivValidate'
import { RivExportDialogContainer } from '../riv-export-dialog.cont'

jest.mock('@/hooks/fetch/useCodebook', () => ({
    useCodebook: jest.fn(),
}))

jest.mock('../../hooks/useRivExport', () => ({
    useRivExport: jest.fn(),
}))

jest.mock('../../hooks/useRivValidate', () => ({
    useRivValidate: jest.fn(),
}))

let lastProps: any = null
jest.mock('../riv-export-dialog.comp', () => ({
    RivExportDialogComponent: (props: any) => {
        lastProps = props
        return <div data-testid="comp" />
    },
}))

const mockUseCodebook = useCodebook as jest.Mock
const mockUseRivValidate = useRivValidate as jest.Mock
const mockUseRivExport = useRivExport as jest.Mock

beforeEach(() => {
    jest.clearAllMocks()
    lastProps = null
    mockUseCodebook.mockReturnValue({ data: { data: [] } })
    mockUseRivValidate.mockReturnValue({ data: undefined, isLoading: false })
    mockUseRivExport.mockReturnValue({ downloadXml: jest.fn(), isDownloading: false })
})

describe('RivExportDialogContainer', () => {
    it('provides 5 year options (current ± 2)', () => {
        jest.spyOn(globalThis, 'Date').mockImplementation((() => ({
            getFullYear: () => 2026,
        })) as any)
        render(<RivExportDialogContainer />)
        expect(lastProps.yearOptions).toEqual(['2024', '2025', '2026', '2027', '2028'])
        ;(globalThis.Date as any).mockRestore()
    })

    it('initial year is current year', () => {
        jest.spyOn(globalThis, 'Date').mockImplementation((() => ({
            getFullYear: () => 2030,
        })) as any)
        render(<RivExportDialogContainer />)
        expect(lastProps.year).toBe('2030')
        ;(globalThis.Date as any).mockRestore()
    })

    it('filters grant groups: excludes code===OTHER and empty code', () => {
        mockUseCodebook.mockReturnValue({
            data: {
                data: [
                    { uid: 'a', code: 'GA', name: 'Grant Agency' },
                    { uid: 'b', code: 'OTHER', name: 'Other' },
                    { uid: 'c', code: undefined, name: 'NoCode' },
                ],
            },
        })
        render(<RivExportDialogContainer />)
        expect(lastProps.providerOptions).toEqual([{ code: 'GA', name: 'Grant Agency' }])
    })

    it('useRivValidate enabled only when year + provider both set', () => {
        // Initially provider='' → 3rd arg false
        render(<RivExportDialogContainer />)
        const initialCall = mockUseRivValidate.mock.calls[mockUseRivValidate.mock.calls.length - 1]
        expect(initialCall[2]).toBe(false)
    })

    it('passes downloadXml + isDownloading from useRivExport', () => {
        const downloadXml = jest.fn()
        mockUseRivExport.mockReturnValue({ downloadXml, isDownloading: true })
        render(<RivExportDialogContainer />)
        expect(lastProps.onDownload).toBe(downloadXml)
    })
})
