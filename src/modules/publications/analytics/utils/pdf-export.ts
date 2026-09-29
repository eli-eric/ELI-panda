import type { ReportDocument } from './report-rows'

const FONT_REGULAR = '/fonts/DejaVuSans.ttf'
const FONT_BOLD = '/fonts/DejaVuSans-Bold.ttf'
const FONT_FAMILY = 'DejaVuSans'

const toBase64 = (buffer: ArrayBuffer) => {
    const bytes = new Uint8Array(buffer)
    let binary = ''
    // Chunked so a large font file cannot blow the argument limit of
    // String.fromCharCode when spread in one call.
    const chunk = 0x8000
    for (let index = 0; index < bytes.length; index += chunk) {
        binary += String.fromCharCode(...bytes.subarray(index, index + chunk))
    }
    return btoa(binary)
}

/**
 * Registers DejaVu with jsPDF.
 *
 * jsPDF's built-in fonts are Latin-1 only, which mangles Czech diacritics — the
 * report is full of researcher names, so an unregistered font would produce a
 * file nobody here could use.
 */
let cachedFonts: { regular: string; bold: string } | undefined

/**
 * fetch resolves on HTTP errors too, and an error page cached as the font
 * would break every export until the page is reloaded.
 */
const fetchFont = async (url: string) => {
    const response = await fetch(url)
    if (!response.ok) throw new Error(`Could not load ${url} (HTTP ${response.status})`)
    return response.arrayBuffer()
}

/**
 * Fetches and base64-encodes the fonts once per page load. Encoding 1.5 MB of
 * font on the main thread is noticeable, and doing it again on every export
 * would make each subsequent download feel slower than the first.
 */
const loadFontData = async () => {
    if (cachedFonts) return cachedFonts
    const [regular, bold] = await Promise.all([fetchFont(FONT_REGULAR), fetchFont(FONT_BOLD)])
    cachedFonts = { regular: toBase64(regular), bold: toBase64(bold) }
    return cachedFonts
}

const registerCzechFont = async (doc: {
    addFileToVFS: (name: string, data: string) => void
    addFont: (file: string, name: string, style: string) => void
    setFont: (name: string, style?: string) => void
}) => {
    const fonts = await loadFontData()

    doc.addFileToVFS('DejaVuSans.ttf', fonts.regular)
    doc.addFont('DejaVuSans.ttf', FONT_FAMILY, 'normal')
    doc.addFileToVFS('DejaVuSans-Bold.ttf', fonts.bold)
    doc.addFont('DejaVuSans-Bold.ttf', FONT_FAMILY, 'bold')
    doc.setFont(FONT_FAMILY, 'normal')
}

/** jsPDF and AutoTable are imported on demand, for the same reason as docx. */
export const buildReportPdf = async (document: ReportDocument): Promise<Blob> => {
    const { jsPDF } = await import('jspdf')
    const { default: autoTable } = await import('jspdf-autotable')

    const doc = new jsPDF({ orientation: 'landscape', unit: 'pt', format: 'a4' })
    await registerCzechFont(doc as never)

    const margin = 32
    let cursor = margin + 8

    doc.setFont(FONT_FAMILY, 'bold')
    doc.setFontSize(16)
    doc.text(document.title, margin, cursor)
    cursor += 18

    doc.setFont(FONT_FAMILY, 'normal')
    doc.setFontSize(11)
    doc.text(document.subtitle, margin, cursor)
    cursor += 16

    doc.setFontSize(8)
    document.meta.forEach(line => {
        const wrapped = doc.splitTextToSize(line, doc.internal.pageSize.getWidth() - margin * 2)
        doc.text(wrapped, margin, cursor)
        cursor += 10 * wrapped.length
    })

    document.tables.forEach(table => {
        autoTable(doc, {
            startY: cursor + 10,
            head: [table.head],
            body: table.rows,
            margin: { left: margin, right: margin },
            styles: { font: FONT_FAMILY, fontSize: 7, cellPadding: 3 },
            headStyles: { font: FONT_FAMILY, fontStyle: 'bold', fillColor: [42, 120, 214] },
            // Repeat the heading on every page a table spills onto.
            showHead: 'everyPage',
        })

        const lastTable = (doc as unknown as { lastAutoTable?: { finalY: number } }).lastAutoTable
        cursor = (lastTable?.finalY ?? cursor) + 8

        if (table.note) {
            doc.setFont(FONT_FAMILY, 'normal')
            doc.setFontSize(7)
            const wrapped = doc.splitTextToSize(
                table.note,
                doc.internal.pageSize.getWidth() - margin * 2,
            )
            doc.text(wrapped, margin, cursor)
            cursor += 9 * wrapped.length
        }
    })

    return doc.output('blob')
}
