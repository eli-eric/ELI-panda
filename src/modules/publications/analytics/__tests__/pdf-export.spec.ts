import type { ReportDocument } from '../utils/report-rows'

const mockDoc = {
    addFileToVFS: jest.fn(),
    addFont: jest.fn(),
    setFont: jest.fn(),
    setFontSize: jest.fn(),
    text: jest.fn(),
    splitTextToSize: jest.fn((text: string) => [text]),
    internal: { pageSize: { getWidth: () => 842 } },
    output: jest.fn(() => new Blob(['%PDF-1.3'])),
}

jest.mock('jspdf', () => ({ jsPDF: jest.fn(() => mockDoc) }))
jest.mock('jspdf-autotable', () => ({ __esModule: true, default: jest.fn() }))

const REPORT: ReportDocument = {
    title: 'Publication report',
    subtitle: '2025',
    meta: [],
    tables: [],
}

const fontResponse = (status: number) =>
    ({
        ok: status >= 200 && status < 300,
        status,
        arrayBuffer: async () => new Uint8Array([0, 1, 0, 0]).buffer,
    }) as unknown as Response

// The fonts are cached in module state, so every test loads a fresh copy.
const loadBuildReportPdf = async () => (await import('../utils/pdf-export')).buildReportPdf

beforeEach(() => {
    jest.resetModules()
    jest.clearAllMocks()
    global.fetch = jest.fn() as unknown as typeof fetch
})

describe('buildReportPdf fonts', () => {
    it('rejects a font the server did not deliver and downloads it again next time', async () => {
        const fetchMock = global.fetch as jest.Mock
        const buildReportPdf = await loadBuildReportPdf()

        // An error page is not a font; caching it would break every later export.
        fetchMock.mockResolvedValue(fontResponse(404))
        await expect(buildReportPdf(REPORT)).rejects.toThrow('404')
        expect(mockDoc.addFileToVFS).not.toHaveBeenCalled()

        fetchMock.mockResolvedValue(fontResponse(200))
        await expect(buildReportPdf(REPORT)).resolves.toBeInstanceOf(Blob)
        expect(fetchMock).toHaveBeenCalledTimes(4)
        expect(mockDoc.addFileToVFS).toHaveBeenCalledTimes(2)
    })

    it('downloads the fonts once per page load', async () => {
        const fetchMock = global.fetch as jest.Mock
        fetchMock.mockResolvedValue(fontResponse(200))
        const buildReportPdf = await loadBuildReportPdf()

        await buildReportPdf(REPORT)
        await buildReportPdf(REPORT)

        expect(fetchMock).toHaveBeenCalledTimes(2)
    })
})
