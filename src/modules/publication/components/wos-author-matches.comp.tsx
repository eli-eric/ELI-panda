import { useIntl } from 'react-intl'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { message } from '@/i18n/src/messages'

import { type PublicationWosAuthor, WOS_MATCH_LABEL_IDS } from '../types/wos-import'
import type { PublicationWosAuthorSelections } from '../utils/wos-import'

interface Props {
    visibleAuthors: PublicationWosAuthor[]
    authorSelections: PublicationWosAuthorSelections
    totalAuthors: number
    authorPage: number
    authorPageCount: number
    isSubmitting: boolean
    selectAuthor: (sourceIndex: number, researcherUid: string) => void
    previousPage: () => void
    nextPage: () => void
}

export const WosAuthorMatches = ({
    visibleAuthors,
    authorSelections,
    totalAuthors,
    authorPage,
    authorPageCount,
    isSubmitting,
    selectAuthor,
    previousPage,
    nextPage,
}: Props) => {
    const { formatMessage: fm } = useIntl()
    const wosMessages = message.publication.wosImport

    return (
        <>
            <section className="space-y-3" aria-labelledby="wos-authors-heading">
                <h3 id="wos-authors-heading" className="font-semibold">
                    {fm({ id: wosMessages.authorsTitle })}
                </h3>
                {totalAuthors === 0 ? (
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
                        onClick={previousPage}
                    >
                        {fm({ id: wosMessages.previousAuthors })}
                    </Button>
                    <span className="text-sm text-muted-foreground" role="status">
                        {fm(
                            { id: wosMessages.authorPage },
                            {
                                page: authorPage + 1,
                                pages: authorPageCount,
                                total: totalAuthors,
                            },
                        )}
                    </span>
                    <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        disabled={authorPage + 1 === authorPageCount}
                        onClick={nextPage}
                    >
                        {fm({ id: wosMessages.nextAuthors })}
                    </Button>
                </nav>
            )}
        </>
    )
}
