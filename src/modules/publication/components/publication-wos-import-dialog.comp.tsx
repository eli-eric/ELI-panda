import { LoaderCircle } from 'lucide-react'
import { useMemo, useState } from 'react'
import { useIntl } from 'react-intl'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/simple-table'
import { message } from '@/i18n/src/messages'

import type {
    PublicationWosAuthorMatchKind,
    PublicationWosImportField,
    PublicationWosImportSelection,
    PublicationWosPreviewResponse,
} from '../types/wos-import'
import {
    buildDefaultWosAuthorSelections,
    buildWosComparisonValues,
    buildWosFieldRows,
    getWosIsbnTargetField,
    type PublicationWosAuthorSelections,
} from '../utils/wos-import'

const wosMessages = message.publication.wosImport
const formMessages = message.publication.form

// The wire uses kebab-case match kinds; message ids stay camelCase per the
// dictionary convention enforced by i18n/src/__tests__/messages.spec.ts.
const matchLabelIds: Record<PublicationWosAuthorMatchKind, string> = {
    'researcher-id': wosMessages.match.researcherId,
    name: wosMessages.match.name,
    none: wosMessages.match.none,
    ambiguous: wosMessages.match.ambiguous,
}

const fieldLabelIds: Record<string, string> = {
    abstract: formMessages.abstract.label,
    allAuthors: formMessages.allAuthors.label,
    allAuthorsCount: formMessages.allAuthorsCount.label,
    authorsDepartments: formMessages.department.label,
    citeAs: formMessages.citeAs.label,
    code: formMessages.code.label,
    dateOfPublication: formMessages.dateOfPublication.label,
    doi: formMessages.doi.label,
    eissn: formMessages.eissn.label,
    eliPublication: formMessages.eliPublication.label,
    experimentalSystemCb: formMessages.experimentalSystemCb.label,
    grants: formMessages.grants.label,
    impactFactor: formMessages.impactFactor.label,
    isbn: formMessages.isbn.label,
    issue: formMessages.issue.label,
    keywords: formMessages.keywords.label,
    longJournalTitle: formMessages.longJournalTitle.label,
    mediaTypeCb: formMessages.mediaTypeCb.label,
    note: formMessages.note.label,
    oecdFord: formMessages.oecdFord.label,
    openAccessType: formMessages.openAccessType.label,
    pages: formMessages.pages.label,
    pagesCount: formMessages.pagesCount.label,
    publishingCountry: formMessages.publishingCountry.label,
    quartil: formMessages.quartil.label,
    quartilBasis: formMessages.quartilBasis.label,
    title: formMessages.title.label,
    userCall: formMessages.userCall.label,
    userExperimentCb: formMessages.userExperimentCb.label,
    volume: formMessages.volume.label,
    webLink: formMessages.webLink.label,
    wosNumber: formMessages.wosNumber.label,
    yearOfPublication: formMessages.yearOfPublication.label,
}

type FoundPreview = Extract<PublicationWosPreviewResponse, { status: 'found' }>

interface Props {
    preview: FoundPreview
    currentValues: Record<string, unknown>
    onSubmit: (selection: PublicationWosImportSelection) => void | Promise<void>
    onClose: () => void
}

interface DuplicateProps {
    preview: Extract<PublicationWosPreviewResponse, { status: 'already-exists' }>
    onOpenExisting: () => void | Promise<void>
    onClose: () => void
}

const displayValue = (value: unknown, emptyLabel: string): string => {
    if (value === undefined || value === null || value === '') return emptyLabel
    if (typeof value === 'object' && value !== null && 'name' in value) {
        return String(value.name)
    }
    return String(value)
}

export const PublicationWosImportDialog = ({
    preview,
    currentValues,
    onSubmit,
    onClose,
}: Props) => {
    const { formatMessage: fm } = useIntl()
    const initialRows = useMemo(() => {
        const baseRows = buildWosFieldRows(currentValues, preview.values)
        const initiallySelected = baseRows
            .filter(row => row.selectedByDefault)
            .map(row => row.field)
        const comparisonValues = buildWosComparisonValues(
            currentValues,
            preview.values,
            initiallySelected,
        )
        return buildWosFieldRows(comparisonValues, preview.values)
    }, [currentValues, preview.values])
    const [selectedFields, setSelectedFields] = useState<Set<PublicationWosImportField>>(
        () => new Set(initialRows.filter(row => row.selectedByDefault).map(row => row.field)),
    )
    const [authorSelections, setAuthorSelections] = useState<PublicationWosAuthorSelections>(() =>
        buildDefaultWosAuthorSelections(preview.authors),
    )
    const [isSubmitting, setIsSubmitting] = useState(false)
    const selectedFieldList = useMemo(() => Array.from(selectedFields), [selectedFields])
    const isbnTarget = getWosIsbnTargetField(currentValues, preview.values, selectedFieldList)
    const rows = useMemo(
        () =>
            buildWosFieldRows(
                buildWosComparisonValues(currentValues, preview.values, selectedFieldList),
                preview.values,
            ),
        [currentValues, preview.values, selectedFieldList],
    )

    const fieldLabel = (field: string): string => {
        if (field === 'isbn' && isbnTarget === 'proceedingsIsbn') {
            return fm({ id: formMessages.proceedingsIsbn.label })
        }
        const id = fieldLabelIds[field]
        return id ? fm({ id }) : field
    }

    const toggleField = (field: PublicationWosImportField, checked: boolean) => {
        setSelectedFields(current => {
            const next = new Set(current)
            if (checked) next.add(field)
            else next.delete(field)
            return next
        })
    }

    const selectAuthor = (sourceIndex: number, researcherUid: string) => {
        setAuthorSelections(current => {
            const next = { ...current }
            if (researcherUid === 'none') delete next[sourceIndex]
            else next[sourceIndex] = researcherUid
            return next
        })
    }

    const handleSubmit = async () => {
        const authors = preview.authors.flatMap(author => {
            const selectedUid = authorSelections[author.sourceIndex]
            const researcher = author.match.candidates.find(
                candidate => candidate.uid === selectedUid,
            )
            return researcher ? [{ sourceIndex: author.sourceIndex, researcher }] : []
        })

        setIsSubmitting(true)
        try {
            await onSubmit({
                fields: Array.from(selectedFields),
                authors,
            })
        } finally {
            setIsSubmitting(false)
        }
    }

    const emptyLabel = fm({ id: wosMessages.empty })

    return (
        <div className="space-y-5" data-testid="publication-wos-import-dialog">
            <div className="rounded-md border bg-muted/30 p-3">
                <p className="font-semibold">{preview.values.title}</p>
                <p className="text-sm text-muted-foreground">
                    {preview.values.longJournalTitle || preview.doi}
                </p>
            </div>

            <section className="space-y-2" aria-labelledby="wos-fields-heading">
                <h3 id="wos-fields-heading" className="font-semibold">
                    {fm({ id: wosMessages.fieldsTitle })}
                </h3>
                <TableContainer className="max-h-[38vh] overflow-auto">
                    <Table>
                        <TableHeader className="sticky top-0 z-10">
                            <TableRow>
                                <TableHead className="w-12">
                                    <span className="sr-only">
                                        {fm({ id: wosMessages.importColumn })}
                                    </span>
                                </TableHead>
                                <TableHead>{fm({ id: wosMessages.fieldColumn })}</TableHead>
                                <TableHead>{fm({ id: wosMessages.currentColumn })}</TableHead>
                                <TableHead>{fm({ id: wosMessages.incomingColumn })}</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {rows.map(row => {
                                const label = fieldLabel(row.field)
                                const checkboxId = `wos-import-field-${row.field}`
                                return (
                                    <TableRow key={row.field}>
                                        <TableCell>
                                            <Checkbox
                                                id={checkboxId}
                                                aria-label={fm(
                                                    { id: wosMessages.importField },
                                                    { field: label },
                                                )}
                                                checked={selectedFields.has(row.field)}
                                                disabled={row.status === 'same'}
                                                onCheckedChange={checked =>
                                                    toggleField(row.field, checked === true)
                                                }
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <Label htmlFor={checkboxId}>{label}</Label>
                                            {row.status === 'same' && (
                                                <Badge variant="outline" className="ml-2">
                                                    {fm({ id: wosMessages.same })}
                                                </Badge>
                                            )}
                                        </TableCell>
                                        <TableCell className="max-w-72 whitespace-normal break-words">
                                            {displayValue(row.currentValue, emptyLabel)}
                                        </TableCell>
                                        <TableCell className="max-w-72 whitespace-normal break-words">
                                            {displayValue(row.incomingValue, emptyLabel)}
                                        </TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </section>

            <section className="space-y-3" aria-labelledby="wos-authors-heading">
                <h3 id="wos-authors-heading" className="font-semibold">
                    {fm({ id: wosMessages.authorsTitle })}
                </h3>
                {preview.authors.length === 0 ? (
                    <p className="text-sm text-muted-foreground">
                        {fm({ id: wosMessages.noAuthors })}
                    </p>
                ) : (
                    preview.authors.map(author => {
                        const selection = authorSelections[author.sourceIndex] ?? 'none'
                        return (
                            <div key={author.sourceIndex} className="rounded-md border p-3">
                                <div className="mb-2 flex flex-wrap items-center gap-2">
                                    <span className="font-medium">{author.displayName}</span>
                                    <Badge variant="secondary">
                                        {fm({ id: matchLabelIds[author.match.kind] })}
                                    </Badge>
                                    {author.researcherId && (
                                        <code className="text-xs text-muted-foreground">
                                            {author.researcherId}
                                        </code>
                                    )}
                                </div>
                                {author.match.candidates.length === 0 ? (
                                    <p className="text-sm text-muted-foreground">
                                        {fm({ id: wosMessages.noResearcherMatch })}
                                    </p>
                                ) : (
                                    <RadioGroup
                                        value={selection}
                                        onValueChange={value =>
                                            selectAuthor(author.sourceIndex, value)
                                        }
                                        className="gap-2"
                                        aria-label={fm(
                                            { id: wosMessages.selectResearcher },
                                            { author: author.displayName },
                                        )}
                                    >
                                        <div className="flex items-center gap-2">
                                            <RadioGroupItem
                                                value="none"
                                                id={`wos-author-${author.sourceIndex}-none`}
                                            />
                                            <Label
                                                htmlFor={`wos-author-${author.sourceIndex}-none`}
                                            >
                                                {fm({ id: wosMessages.doNotMatch })}
                                            </Label>
                                        </div>
                                        {author.match.candidates.map(candidate => {
                                            const id = `wos-author-${author.sourceIndex}-${candidate.uid}`
                                            return (
                                                <div
                                                    key={candidate.uid}
                                                    className="flex items-center gap-2"
                                                >
                                                    <RadioGroupItem value={candidate.uid} id={id} />
                                                    <Label htmlFor={id}>
                                                        {candidate.lastName}, {candidate.firstName}
                                                    </Label>
                                                </div>
                                            )
                                        })}
                                    </RadioGroup>
                                )}
                            </div>
                        )
                    })
                )}
            </section>

            {preview.missingImportableFields.length > 0 && (
                <Alert>
                    <AlertTitle>{fm({ id: wosMessages.missingTitle })}</AlertTitle>
                    <AlertDescription>
                        {preview.missingImportableFields.map(fieldLabel).join(', ')}
                    </AlertDescription>
                </Alert>
            )}

            <Alert>
                <AlertTitle>{fm({ id: wosMessages.unavailableTitle })}</AlertTitle>
                <AlertDescription>
                    {preview.unavailableFields.length > 0
                        ? preview.unavailableFields.map(fieldLabel).join(', ')
                        : fm({ id: wosMessages.noneUnavailable })}
                </AlertDescription>
            </Alert>

            <div className="flex justify-end gap-2 border-t pt-4">
                <Button type="button" variant="outline" onClick={onClose} disabled={isSubmitting}>
                    {fm({ id: wosMessages.cancel })}
                </Button>
                <Button type="button" onClick={handleSubmit} disabled={isSubmitting}>
                    {isSubmitting && <LoaderCircle className="animate-spin" aria-hidden="true" />}
                    {fm({ id: wosMessages.apply })}
                </Button>
            </div>
        </div>
    )
}

export const PublicationWosDuplicateDialog = ({
    preview,
    onOpenExisting,
    onClose,
}: DuplicateProps) => {
    const { formatMessage: fm } = useIntl()
    const { existingPublication } = preview

    return (
        <div className="space-y-4" data-testid="publication-wos-duplicate-dialog">
            <Alert>
                <AlertTitle>{existingPublication.title}</AlertTitle>
                <AlertDescription>
                    {fm(
                        { id: wosMessages.duplicate.description },
                        { code: existingPublication.code, doi: preview.doi },
                    )}
                </AlertDescription>
            </Alert>
            <div className="flex justify-end gap-2 border-t pt-4">
                <Button type="button" variant="outline" onClick={onClose}>
                    {fm({ id: wosMessages.cancel })}
                </Button>
                <Button type="button" onClick={onOpenExisting}>
                    {fm({ id: wosMessages.duplicate.open })}
                </Button>
            </div>
        </div>
    )
}
