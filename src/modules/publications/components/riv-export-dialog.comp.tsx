import type { FC } from 'react'
import { FormattedMessage } from 'react-intl'

import { Button } from '@/components/ui/button'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { message } from '@/i18n/src/messages'

import type { RivValidationResponse } from '../hooks/useRivValidate'

const riv = message.publication.riv

interface ProviderOption {
    code: string
    name: string
}

interface Props {
    year: string
    yearOptions: string[]
    onYearChange: (year: string) => void
    provider: string
    providerOptions: ProviderOption[]
    onProviderChange: (provider: string) => void
    validation?: RivValidationResponse
    isValidating: boolean
    onDownload: () => void
    isDownloading: boolean
    canExport: boolean
}

export const RivExportDialogComponent: FC<Props> = ({
    year,
    yearOptions,
    onYearChange,
    provider,
    providerOptions,
    onProviderChange,
    validation,
    isValidating,
    onDownload,
    isDownloading,
    canExport,
}) => {
    return (
        <div className="flex flex-col gap-4 p-4">
            <div className="flex items-end gap-4">
                <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium">
                        <FormattedMessage id={riv.yearLabel} />
                    </label>
                    <Select value={year} onValueChange={onYearChange}>
                        <SelectTrigger className="w-32">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            {yearOptions.map(y => (
                                <SelectItem key={y} value={y}>
                                    {y}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium">
                        <FormattedMessage id={riv.providerLabel} />
                    </label>
                    <Select value={provider || undefined} onValueChange={onProviderChange}>
                        <SelectTrigger className="w-64">
                            <SelectValue placeholder="Select provider" />
                        </SelectTrigger>
                        <SelectContent>
                            {providerOptions.map(p => {
                                const label = `${p.code} — ${p.name}`
                                return (
                                    <SelectItem key={p.code} value={p.code}>
                                        {label}
                                    </SelectItem>
                                )
                            })}
                        </SelectContent>
                    </Select>
                </div>
                <Button onClick={onDownload} disabled={isDownloading || isValidating || !canExport}>
                    <FormattedMessage id={riv.downloadButton} />
                </Button>
            </div>

            {isValidating && (
                <p className="text-sm text-muted-foreground">
                    <FormattedMessage id={riv.validating} />
                </p>
            )}

            {validation && !isValidating && (
                <div className="flex flex-col gap-3">
                    <div className="flex gap-4 text-sm">
                        <span>
                            <FormattedMessage id={riv.totalPublications} />
                            {': '}
                            <strong>{validation.totalPublications}</strong>
                        </span>
                        <span>
                            <FormattedMessage id={riv.validPublications} />
                            {': '}
                            <strong>{validation.validPublications}</strong>
                        </span>
                    </div>

                    {validation.warnings.length > 0 && (
                        <div className="max-h-80 overflow-auto rounded border">
                            <table className="w-full text-sm">
                                <thead className="sticky top-0 bg-muted">
                                    <tr>
                                        <th className="px-3 py-2 text-left font-medium">
                                            <FormattedMessage id={riv.validationTableCode} />
                                        </th>
                                        <th className="px-3 py-2 text-left font-medium">
                                            <FormattedMessage id={riv.validationTableMessage} />
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {validation.warnings.map((w, i) => (
                                        <tr key={i} className="border-t">
                                            <td className="px-3 py-2 font-mono text-xs">
                                                {w.publicationCode}
                                            </td>
                                            <td className="px-3 py-2">{w.message}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {validation.warnings.length === 0 && (
                        <p className="text-sm text-muted-foreground">
                            <FormattedMessage id={riv.noWarnings} />
                        </p>
                    )}
                </div>
            )}
        </div>
    )
}
