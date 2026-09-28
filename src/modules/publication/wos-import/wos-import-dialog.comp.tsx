import { ExternalLink, TriangleAlert } from 'lucide-react'
import { useIntl } from 'react-intl'

import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { DialogFooter } from '@/components/ui/dialog'
import { Skeleton } from '@/components/ui/skeleton'
import { message } from '@/i18n/src/messages'
import type { SelectedResearcher } from '@/modules/shared/form/researcherSelect'
import { PATH } from '@/types/constants/paths'

import type { ExistingPublicationSummary } from '../types/wos-import'
import { WosAuthorRowComponent } from './components/wos-author-row.comp'
import { WosFieldRowComponent } from './components/wos-field-row.comp'
import type { WosAuthorSelections } from './hooks/useWosAuthorSelections'
import type { WosFieldRow } from './hooks/useWosFieldRows'
import type { WosImportableField, WosLookupAuthor } from './types/wos-preview.types'

const wosMessages = message.publication.wos
const SKELETON_ROWS = 6

const DialogActions = ({
    importCount,
    canImport,
    onCancel,
    onImport,
}: {
    importCount: number
    canImport: boolean
    onCancel: () => void
    onImport?: () => void
}) => {
    const { formatMessage: fm } = useIntl()
    return (
        <DialogFooter className="sticky bottom-0 z-20 border-t bg-background pt-2 pb-2">
            <Button type="button" variant="outline" onClick={onCancel}>
                {fm({ id: message.common.buttons.cancel })}
            </Button>
            <Button
                type="button"
                onClick={onImport}
                disabled={!onImport || !canImport || importCount === 0}
            >
                {fm({ id: wosMessages.import }, { count: importCount })}
            </Button>
        </DialogFooter>
    )
}

/** Shown the moment the button is pressed, so the wait is visible and cancellable. */
export const WosImportDialogSkeleton = ({ onCancel }: { onCancel: () => void }) => {
    const { formatMessage: fm } = useIntl()
    return (
        <div className="space-y-4" aria-busy="true" data-testid="wos-import-dialog-loading">
            <p className="text-sm text-muted-foreground" role="status">
                {fm({ id: wosMessages.loading })}
            </p>
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <div className="space-y-2 pt-2">
                {Array.from({ length: SKELETON_ROWS }, (_, index) => (
                    <Skeleton key={index} className="h-6 w-full" />
                ))}
            </div>
            <DialogActions importCount={0} canImport={false} onCancel={onCancel} />
        </div>
    )
}

export interface WosRecordHeader {
    title?: string
    /** Journal, year and volume, already formatted. */
    citation: string
    wosUid?: string
    recordUrl?: string
}

interface Props {
    header: WosRecordHeader
    existingPublication?: ExistingPublicationSummary
    fieldLabel: (field: string) => string
    fieldRows: WosFieldRow[]
    selectedFields: ReadonlySet<WosImportableField>
    onToggleField: (field: WosImportableField, checked: boolean) => void
    onSelectAll: () => void
    onSelectOnlyEmpty: () => void
    onSelectNone: () => void
    authors: WosLookupAuthor[]
    authorSelections: WosAuthorSelections
    matchedAuthorCount: number
    onToggleAuthor: (sourceIndex: number, checked: boolean) => void
    onChooseAuthor: (sourceIndex: number, researcher: SelectedResearcher) => void
    onOpenAuthorPicker: (author: WosLookupAuthor) => void
    onToggleRemember: (sourceIndex: number, checked: boolean) => void
    handEntryFields: string[]
    importCount: number
    canImport: boolean
    onImport: () => void
    onCancel: () => void
}

export const WosImportDialog = ({
    header,
    existingPublication,
    fieldLabel,
    fieldRows,
    selectedFields,
    onToggleField,
    onSelectAll,
    onSelectOnlyEmpty,
    onSelectNone,
    authors,
    authorSelections,
    matchedAuthorCount,
    onToggleAuthor,
    onChooseAuthor,
    onOpenAuthorPicker,
    onToggleRemember,
    handEntryFields,
    importCount,
    canImport,
    onImport,
    onCancel,
}: Props) => {
    const { formatMessage: fm } = useIntl()
    const disabled = !canImport

    return (
        <div className="space-y-5" data-testid="wos-import-dialog">
            <header className="space-y-1">
                {header.title && <p className="font-medium">{header.title}</p>}
                <p className="flex flex-wrap items-center gap-x-3 text-sm text-muted-foreground">
                    {header.citation && <span>{header.citation}</span>}
                    {header.wosUid && header.recordUrl && (
                        <a
                            href={header.recordUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 underline-offset-2 hover:underline"
                            aria-label={fm(
                                { id: wosMessages.openInWos },
                                { wosUid: header.wosUid },
                            )}
                        >
                            {header.wosUid}
                            <ExternalLink className="size-3" aria-hidden="true" />
                        </a>
                    )}
                </p>
            </header>

            {existingPublication && (
                <Alert className="border-amber-600" data-testid="wos-import-existing">
                    <TriangleAlert aria-hidden="true" />
                    <AlertDescription className="flex flex-wrap items-center justify-between gap-2">
                        <span>
                            {fm({ id: wosMessages.existing }, { code: existingPublication.code })}
                        </span>
                        <Button asChild size="sm" variant="outline">
                            <a
                                href={`${PATH.PUBLICATION}/${existingPublication.uid}`}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {fm({ id: wosMessages.openExisting })}
                            </a>
                        </Button>
                    </AlertDescription>
                </Alert>
            )}

            <section className="space-y-2" aria-labelledby="wos-import-fields-heading">
                <div className="flex flex-wrap items-center gap-2">
                    <h3
                        id="wos-import-fields-heading"
                        className="mr-auto text-sm font-semibold uppercase"
                    >
                        {fm({ id: wosMessages.fieldsTitle })}
                    </h3>
                    <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        onClick={onSelectAll}
                        disabled={disabled}
                    >
                        {fm({ id: wosMessages.selectAll })}
                    </Button>
                    <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        onClick={onSelectOnlyEmpty}
                        disabled={disabled}
                    >
                        {fm({ id: wosMessages.selectOnlyEmpty })}
                    </Button>
                    <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        onClick={onSelectNone}
                        disabled={disabled}
                    >
                        {fm({ id: wosMessages.selectNone })}
                    </Button>
                </div>
                <ul className="divide-y">
                    {fieldRows.map(row => (
                        <WosFieldRowComponent
                            key={row.field}
                            row={row}
                            label={fieldLabel(row.field)}
                            checked={selectedFields.has(row.field)}
                            disabled={disabled}
                            onToggle={checked => onToggleField(row.field, checked)}
                        />
                    ))}
                </ul>
            </section>

            <section className="space-y-2" aria-labelledby="wos-import-authors-heading">
                <h3 id="wos-import-authors-heading" className="text-sm font-semibold uppercase">
                    {fm(
                        { id: wosMessages.authorsTitle },
                        { found: authors.length, matched: matchedAuthorCount },
                    )}
                </h3>
                {authors.length === 0 ? (
                    <p className="text-sm text-muted-foreground">
                        {fm({ id: wosMessages.noAuthors })}
                    </p>
                ) : (
                    <ul className="divide-y">
                        {authors.map(author => (
                            <WosAuthorRowComponent
                                key={author.sourceIndex}
                                author={author}
                                selection={authorSelections[author.sourceIndex]}
                                disabled={disabled}
                                onToggle={checked => onToggleAuthor(author.sourceIndex, checked)}
                                onChoose={researcher =>
                                    onChooseAuthor(author.sourceIndex, researcher)
                                }
                                onOpenPicker={() => onOpenAuthorPicker(author)}
                                onToggleRemember={checked =>
                                    onToggleRemember(author.sourceIndex, checked)
                                }
                            />
                        ))}
                    </ul>
                )}
            </section>

            {/* Always rendered: it is how the editor learns what the import cannot do. */}
            <section className="space-y-1" aria-labelledby="wos-import-unavailable-heading">
                <h3 id="wos-import-unavailable-heading" className="text-sm font-semibold uppercase">
                    {fm({ id: wosMessages.unavailableTitle }, { count: handEntryFields.length })}
                </h3>
                <p className="text-sm text-muted-foreground" data-testid="wos-import-unavailable">
                    {handEntryFields.length > 0
                        ? handEntryFields.map(fieldLabel).join(' · ')
                        : fm({ id: wosMessages.unavailableEmpty })}
                </p>
            </section>

            {!canImport && (
                <p className="text-sm text-muted-foreground">
                    {fm({ id: wosMessages.importRequiresEdit })}
                </p>
            )}

            <DialogActions
                importCount={importCount}
                canImport={canImport}
                onCancel={onCancel}
                onImport={onImport}
            />
        </div>
    )
}
