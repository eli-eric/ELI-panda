import { useIntl } from 'react-intl'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
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

import type { PublicationWosFieldRow, PublicationWosImportField } from '../types/wos-import'
import { displayWosValue } from '../utils/wos-import'

interface Props {
    visibleRows: PublicationWosFieldRow[]
    selectedFields: Set<PublicationWosImportField>
    selectedCount: number
    actionableCount: number
    unchangedCount: number
    isSubmitting: boolean
    differencesOnly: boolean
    showUnchanged: boolean
    fieldLabel: (field: string) => string
    toggleField: (field: PublicationWosImportField, checked: boolean) => void
    selectAllFields: () => void
    selectNone: () => void
    toggleDifferencesOnly: () => void
    toggleUnchanged: () => void
}

export const WosImportFieldsTable = ({
    visibleRows,
    selectedFields,
    selectedCount,
    actionableCount,
    unchangedCount,
    isSubmitting,
    differencesOnly,
    showUnchanged,
    fieldLabel,
    toggleField,
    selectAllFields,
    selectNone,
    toggleDifferencesOnly,
    toggleUnchanged,
}: Props) => {
    const { formatMessage: fm } = useIntl()
    const wosMessages = message.publication.wosImport
    const emptyLabel = fm({ id: wosMessages.empty })

    return (
        <section className="space-y-2" aria-labelledby="wos-fields-heading">
            <h3 id="wos-fields-heading" className="font-semibold">
                {fm({ id: wosMessages.fieldsTitle })}
            </h3>
            <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm text-muted-foreground" role="status">
                    {fm(
                        { id: wosMessages.selectionSummary },
                        {
                            selected: selectedCount,
                            total: actionableCount,
                        },
                    )}
                </span>
                <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={selectAllFields}
                    disabled={isSubmitting || actionableCount === 0}
                >
                    {fm({ id: wosMessages.selectAll })}
                </Button>
                <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={selectNone}
                    disabled={isSubmitting || selectedFields.size === 0}
                >
                    {fm({ id: wosMessages.selectNone })}
                </Button>
                <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    aria-pressed={differencesOnly}
                    onClick={toggleDifferencesOnly}
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
                        onClick={toggleUnchanged}
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
    )
}
