import { ArrowRight, CornerDownRight } from 'lucide-react'
import { useIntl } from 'react-intl'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { message } from '@/i18n/src/messages'
import type { SelectedResearcher } from '@/modules/shared/form/researcherSelect'

import { canRememberResearcherId, type WosAuthorSelection } from '../hooks/useWosAuthorSelections'
import {
    WOS_MATCH_CONFIDENCE,
    type WosLookupAuthor,
    type WosMatchConfidence,
} from '../types/wos-preview.types'

const wosMessages = message.publication.wos

const CONFIDENCE_CHIPS: Record<
    Exclude<WosMatchConfidence, 'NONE'>,
    { labelId: string; className: string }
> = {
    [WOS_MATCH_CONFIDENCE.EXACT_ID]: {
        labelId: wosMessages.confidence.exactId,
        className: 'border-emerald-600 text-emerald-800 dark:text-emerald-300',
    },
    [WOS_MATCH_CONFIDENCE.NAME]: {
        labelId: wosMessages.confidence.name,
        className: 'border-amber-600 text-amber-800 dark:text-amber-300',
    },
    [WOS_MATCH_CONFIDENCE.AMBIGUOUS]: {
        labelId: wosMessages.confidence.ambiguous,
        className: 'border-orange-600 text-orange-800 dark:text-orange-300',
    },
}

const fullName = (researcher: SelectedResearcher) =>
    `${researcher.firstName} ${researcher.lastName}`

interface Props {
    author: WosLookupAuthor
    selection: WosAuthorSelection
    disabled: boolean
    onToggle: (checked: boolean) => void
    onChoose: (researcher: SelectedResearcher) => void
    onOpenPicker: () => void
    onToggleRemember: (checked: boolean) => void
}

export const WosAuthorRowComponent = ({
    author,
    selection,
    disabled,
    onToggle,
    onChoose,
    onOpenPicker,
    onToggleRemember,
}: Props) => {
    const { formatMessage: fm } = useIntl()
    const { confidence, candidates } = author.match
    const rowId = `wos-import-author-${author.sourceIndex}`

    if (confidence === WOS_MATCH_CONFIDENCE.NONE) {
        return (
            <li className="flex items-center gap-3 py-1.5 pl-7 text-sm" data-testid={rowId}>
                <span className="font-medium">{author.displayName}</span>
                <span className="text-muted-foreground">
                    {fm({ id: wosMessages.externalAuthor })}
                </span>
            </li>
        )
    }

    const chip = CONFIDENCE_CHIPS[confidence]
    const isAmbiguous = confidence === WOS_MATCH_CONFIDENCE.AMBIGUOUS
    const { researcher } = selection

    return (
        <li className="space-y-1 py-1.5 text-sm" data-testid={rowId}>
            <div className="flex flex-wrap items-center gap-3">
                <Checkbox
                    id={rowId}
                    aria-label={fm(
                        { id: wosMessages.importAuthor },
                        { author: author.displayName },
                    )}
                    checked={selection.checked}
                    // Nothing to import until someone is chosen for an ambiguous match.
                    disabled={disabled || !researcher}
                    onCheckedChange={value => onToggle(value === true)}
                />
                <Label htmlFor={rowId} className="font-medium">
                    {author.displayName}
                </Label>
                <Badge variant="outline" className={chip.className}>
                    {fm({ id: chip.labelId })}
                </Badge>
                <ArrowRight className="size-4 text-muted-foreground" aria-hidden="true" />
                <span>
                    {researcher
                        ? fullName(researcher)
                        : fm({ id: wosMessages.candidates }, { count: candidates.length })}
                </span>
                <Button
                    type="button"
                    size="sm"
                    variant="ghost"
                    className="h-6 px-2"
                    disabled={disabled}
                    onClick={onOpenPicker}
                >
                    {fm({ id: isAmbiguous ? wosMessages.choose : wosMessages.change })}
                </Button>
            </div>
            {isAmbiguous && candidates.length > 0 && (
                <RadioGroup
                    className="ml-7 gap-1"
                    disabled={disabled}
                    value={researcher?.uid ?? ''}
                    aria-label={fm(
                        { id: wosMessages.candidateList },
                        { author: author.displayName },
                    )}
                    onValueChange={uid => {
                        const candidate = candidates.find(item => item.uid === uid)
                        if (candidate) onChoose(candidate)
                    }}
                >
                    {candidates.map(candidate => {
                        const candidateId = `${rowId}-${candidate.uid}`
                        return (
                            <div key={candidate.uid} className="flex items-center gap-2">
                                <RadioGroupItem value={candidate.uid} id={candidateId} />
                                <Label htmlFor={candidateId}>
                                    {candidate.lastName}, {candidate.firstName}
                                </Label>
                            </div>
                        )
                    })}
                </RadioGroup>
            )}
            {canRememberResearcherId(author) && researcher && (
                <div className="ml-7 flex items-center gap-2 text-muted-foreground">
                    <CornerDownRight className="size-4" aria-hidden="true" />
                    <Checkbox
                        id={`${rowId}-remember`}
                        checked={selection.remember}
                        disabled={disabled || !selection.checked}
                        onCheckedChange={value => onToggleRemember(value === true)}
                    />
                    <Label htmlFor={`${rowId}-remember`}>
                        {fm(
                            { id: wosMessages.rememberResearcherId },
                            { researcherId: author.researcherId, name: fullName(researcher) },
                        )}
                    </Label>
                </div>
            )}
        </li>
    )
}
