import type { ReportDocument } from './report-rows'

/**
 * Builds the Word report from the already-assembled tables.
 *
 * `docx` is imported dynamically: it is only needed when someone actually asks
 * for a download, and pulling it into the main bundle would cost every visitor
 * to the dashboard.
 */
export const buildReportDocx = async (document: ReportDocument): Promise<Blob> => {
    const {
        AlignmentType,
        Document,
        HeadingLevel,
        Packer,
        Paragraph,
        Table,
        TableCell,
        TableRow,
        TextRun,
        WidthType,
    } = await import('docx')

    const cell = (text: string, bold = false) =>
        new TableCell({
            children: [new Paragraph({ children: [new TextRun({ text, bold, size: 18 })] })],
        })

    // docx sections accept paragraphs and tables in one ordered list; the union
    // is wider than either constructor's own type.
    const children: (InstanceType<typeof Paragraph> | InstanceType<typeof Table>)[] = [
        new Paragraph({ text: document.title, heading: HeadingLevel.HEADING_1 }),
        new Paragraph({ text: document.subtitle, heading: HeadingLevel.HEADING_2 }),
        ...document.meta.map(
            line =>
                new Paragraph({
                    children: [new TextRun({ text: line, size: 16, italics: true })],
                }),
        ),
    ]

    document.tables.forEach(table => {
        children.push(new Paragraph({ text: '' }))
        children.push(new Paragraph({ text: table.title, heading: HeadingLevel.HEADING_2 }))
        children.push(
            new Table({
                width: { size: 100, type: WidthType.PERCENTAGE },
                rows: [
                    // The heading row repeats on every page so a long table stays
                    // readable once it breaks.
                    new TableRow({
                        tableHeader: true,
                        children: table.head.map(heading => cell(heading, true)),
                    }),
                    ...table.rows.map(
                        row => new TableRow({ children: row.map(value => cell(value)) }),
                    ),
                ],
            }),
        )
        if (table.note) {
            children.push(
                new Paragraph({
                    alignment: AlignmentType.LEFT,
                    children: [new TextRun({ text: table.note, size: 16, italics: true })],
                }),
            )
        }
    })

    const file = new Document({ sections: [{ children }] })
    return Packer.toBlob(file)
}
