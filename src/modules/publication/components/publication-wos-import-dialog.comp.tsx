import { Loader2 } from 'lucide-react'
import { useMemo, useState } from 'react'
import { useIntl } from 'react-intl'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { DialogFooter } from '@/components/ui/dialog'
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

import { WOS_AUTHORS_PAGE_SIZE,WOS_MATCH_LABEL_IDS } from '../constants/wos-import'
import type {
    PublicationWosImportField,
    PublicationWosImportSelection,
    PublicationWosPreviewResponse,
} from '../types/wos-import'
import {
    buildDefaultWosAuthorSelections,
    buildWosComparisonValues,
    buildWosFieldRows,
    displayWosValue,
    getWosIsbnTargetField,
    type PublicationWosAuthorSelections,
} from '../utils/wos-import'
import { getWosFieldLabelId } from '../utils/wos-presentation'

const wosMessages = message.publication.wosImport

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
    const [showUnchanged, setShowUnchanged] = useState(false)
    const [differencesOnly, setDifferencesOnly] = useState(false)
    const [authorPage, setAuthorPage] = useState(0)
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

    const actionableRows = rows.filter(row => row.status !== 'same')
    const selectedActionableFields = actionableRows
        .filter(row => selectedFields.has(row.field))
        .map(row => row.field)
    const unchangedCount = rows.length - actionableRows.length
    const visibleRows = rows
        .filter(row =>
            differencesOnly ? row.status === 'different' : showUnchanged || row.status !== 'same',
        )
        .sort((a, b) => Number(a.status === 'same') - Number(b.status === 'same'))
    const authorPageCount = Math.ceil(preview.authors.length / WOS_AUTHORS_PAGE_SIZE)
    const visibleAuthors = preview.authors.slice(
        authorPage * WOS_AUTHORS_PAGE_SIZE,
        (authorPage + 1) * WOS_AUTHORS_PAGE_SIZE,
    )

    const fieldLabel = (field: string): string => {
        const id = getWosFieldLabelId(field, isbnTarget)
        return id ? fm({ id }) : field
    }

    const toggleField = (field: PublicationWosImportField, checked: boolean) => {
        setSelectedFields(current => {
            const next = new Set(current)
            if (checked) next.add(field)
            else next.delete(field)
            // A media-type change can move ISBN to a populated destination. Require
            // a fresh choice rather than silently retaining a previously safe selection.
            if (
                field === 'mediaTypeCb' &&
                getWosIsbnTargetField(currentValues, preview.values, Array.from(current)) !==
                    getWosIsbnTargetField(currentValues, preview.values, Array.from(next))
            )
                next.delete('isbn')
            return next
        })
    }

    const selectAllFields = () => {
        const allFields = rows.map(row => row.field)
        const comparison = buildWosComparisonValues(currentValues, preview.values, allFields)
        setSelectedFields(
            new Set(
                buildWosFieldRows(comparison, preview.values)
                    .filter(row => row.status !== 'same')
                    .map(row => row.field),
            ),
        )
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
                fields: selectedActionableFields,
                authors,
            })
        } finally {
            setIsSubmitting(false)
        }
    }

    const emptyLabel = fm({ id: wosMessages.empty })

    return (
        <div className="shrink-0 space-y-5" data-testid="publication-wos-import-dialog">
            <section className="space-y-2" aria-labelledby="wos-fields-heading">
                <h3 id="wos-fields-heading" className="font-semibold">
                    {fm({ id: wosMessages.fieldsTitle })}
                </h3>
                <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm text-muted-foreground" role="status">
                        {fm(
                            { id: wosMessages.selectionSummary },
                            {
                                selected: selectedActionableFields.length,
                                total: actionableRows.length,
                            },
                        )}
                    </span>
                    <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        onClick={selectAllFields}
                        disabled={isSubmitting || actionableRows.length === 0}
                    >
                        {fm({ id: wosMessages.selectAll })}
                    </Button>
                    <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        onClick={() => setSelectedFields(new Set())}
                        disabled={isSubmitting || selectedFields.size === 0}
                    >
                        {fm({ id: wosMessages.selectNone })}
                    </Button>
                    <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        aria-pressed={differencesOnly}
                        onClick={() => setDifferencesOnly(value => !value)}
                    >
                        {fm({ id: wosMessages.differencesOnly })}
                    </Button>
                    {unchangedCount > 0 && (
                        <Button
                            type="button"
                            size="sm"
                            variant="ghost"
                            aria-expanded={showUnchanged}
                            disabled={differencesOnly}
                            onClick={() => setShowUnchanged(value => !value)}
                        >
                            {fm({ id: wosMessages.unchangedFields }, { count: unchangedCount })}
                        </Button>
                    )}
                </div>
                <TableContainer className="overflow-visible">
                    <Table>
                        <TableHeader className="sticky top-0 z-10 bg-muted">
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
                            {visibleRows.map(row => {
                                const label = fieldLabel(row.field)
                                const checkboxId = `wos-import-field-${row.field}`
                                return (
                                    <TableRow
                                        key={row.field}
                                        className={
                                            row.status === 'different'
                                                ? 'bg-amber-50 dark:bg-amber-950/30'
                                                : row.status === 'same'
                                                  ? 'text-muted-foreground'
                                                  : undefined
                                        }
                                    >
                                        <TableCell>
                                            <Checkbox
                                                id={checkboxId}
                                                aria-label={fm(
                                                    { id: wosMessages.importField },
                                                    { field: label },
                                                )}
                                                checked={
                                                    row.status !== 'same' &&
                                                    selectedFields.has(row.field)
                                                }
                                                disabled={isSubmitting || row.status === 'same'}
                                                onCheckedChange={checked =>
                                                    toggleField(row.field, checked === true)
                                                }
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <Label htmlFor={checkboxId}>{label}</Label>
                                            {row.status === 'different' && (
                                                <Badge
                                                    variant="outline"
                                                    className="ml-2 border-amber-600 text-amber-800 dark:text-amber-300"
                                                >
                                                    {fm({ id: wosMessages.overwrites })}
                                                </Badge>
                                            )}
                                            {row.status === 'same' && (
                                                <Badge variant="outline" className="ml-2">
                                                    {fm({ id: wosMessages.same })}
                                                </Badge>
                                            )}
                                        </TableCell>
                                        <TableCell className="max-w-72 whitespace-normal break-words">
                                            {displayWosValue(row.currentValue, emptyLabel)}
                                        </TableCell>
                                        <TableCell className="max-w-72 whitespace-normal break-words">
                                            {displayWosValue(row.incomingValue, emptyLabel)}
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
                    visibleAuthors.map(author => {
                        const selection = authorSelections[author.sourceIndex] ?? 'none'
                        return (
                            <div key={author.sourceIndex} className="rounded-md border p-3">
                                <div className="mb-2 flex flex-wrap items-center gap-2">
                                    <span className="font-medium">{author.displayName}</span>
                                    <Badge variant="secondary">
                                        {fm({ id: WOS_MATCH_LABEL_IDS[author.match.kind] })}
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
                                        disabled={isSubmitting}
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

            {authorPageCount > 1 && (
                <nav
                    className="flex flex-wrap items-center gap-2"
                    aria-label={fm({ id: wosMessages.authorPages })}
                >
                    <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        disabled={authorPage === 0}
                        onClick={() => setAuthorPage(page => page - 1)}
                    >
                        {fm({ id: wosMessages.previousAuthors })}
                    </Button>
                    <span className="text-sm text-muted-foreground" role="status">
                        {fm(
                            { id: wosMessages.authorPage },
                            {
                                page: authorPage + 1,
                                pages: authorPageCount,
                                total: preview.authors.length,
                            },
                        )}
                    </span>
                    <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        disabled={authorPage + 1 === authorPageCount}
                        onClick={() => setAuthorPage(page => page + 1)}
                    >
                        {fm({ id: wosMessages.nextAuthors })}
                    </Button>
                </nav>
            )}

            {(preview.missingImportableFields.length > 0 ||
                preview.unavailableFields.length > 0) && (
                <p className="text-xs text-muted-foreground">
                    {[
                        preview.missingImportableFields.length > 0
                            ? `${fm({
                                  id: wosMessages.missingTitle,
                              })}: ${preview.missingImportableFields.map(fieldLabel).join(', ')}`
                            : '',
                        preview.unavailableFields.length > 0
                            ? `${fm({
                                  id: wosMessages.unavailableTitle,
                              })}: ${preview.unavailableFields.map(fieldLabel).join(', ')}`
                            : '',
                    ]
                        .filter(Boolean)
                        .join(' · ')}
                </p>
            )}

            <DialogFooter className="sticky bottom-0 z-20 border-t bg-background pt-2 pb-2">
                <Button type="button" variant="outline" onClick={onClose} disabled={isSubmitting}>
                    {fm({ id: message.common.buttons.cancel })}
                </Button>
                <Button type="button" onClick={handleSubmit} disabled={isSubmitting}>
                    {isSubmitting && (
                        <Loader2 className="mr-2 size-4 animate-spin" aria-hidden="true" />
                    )}
                    {fm({ id: wosMessages.apply })}
                </Button>
            </DialogFooter>
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
            <DialogFooter className="border-t pt-2">
                <Button type="button" variant="outline" onClick={onClose}>
                    {fm({ id: message.common.buttons.cancel })}
                </Button>
                <Button type="button" onClick={onOpenExisting}>
                    {fm({ id: wosMessages.duplicate.open })}
                </Button>
            </DialogFooter>
        </div>
    )
}
