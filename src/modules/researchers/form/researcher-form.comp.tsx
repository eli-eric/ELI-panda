import type { FC } from 'react'
import { useIntl } from 'react-intl'

import Combobox from '@/components/form/Combobox'
import { Input } from '@/components/form/inputs'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { message } from '@/i18n/src/messages'
import { CODEBOOK } from '@/types/constants/codebook'

interface Props {
    disabled?: boolean
    /** ResearcherIDs on file other than the current one, newest not implied by order. */
    otherResearcherIds?: string[]
    /** Promotes one of them to current. Omit to render the list read-only. */
    onMakeCurrent?: (researcherId: string) => void
}

export const ResearcherFormFields: FC<Props> = ({
    disabled = false,
    otherResearcherIds = [],
    onMakeCurrent,
}) => {
    const { formatMessage: fm } = useIntl()
    const labels = message.researchersPage.form

    return (
        <div className="flex flex-col gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
                <Input
                    name="firstName"
                    label={fm({ id: labels.firstName.label })}
                    placeholder={fm({ id: labels.firstName.placeholder })}
                    disabled={disabled}
                    required
                />
                <Input
                    name="lastName"
                    label={fm({ id: labels.lastName.label })}
                    placeholder={fm({ id: labels.lastName.placeholder })}
                    disabled={disabled}
                    required
                />
            </div>

            <Input
                name="identificationNumber"
                label={fm({ id: labels.identificationNumber.label })}
                placeholder={fm({ id: labels.identificationNumber.placeholder })}
                disabled={disabled}
            />

            <div className="border-t pt-4 mt-2">
                <p className="text-sm text-muted-foreground mb-4">
                    {fm({ id: labels.identifiersHint })}
                </p>

                <div className="flex flex-col gap-4">
                    <Input
                        name="orcid"
                        label={fm({ id: labels.orcid.label })}
                        placeholder={fm({ id: labels.orcid.placeholder })}
                        disabled={disabled}
                    />

                    <Input
                        name="scopusId"
                        label={fm({ id: labels.scopusId.label })}
                        placeholder={fm({ id: labels.scopusId.placeholder })}
                        disabled={disabled}
                    />

                    <Input
                        name="researcherId"
                        label={fm({ id: labels.researcherId.label })}
                        placeholder={fm({ id: labels.researcherId.placeholder })}
                        disabled={disabled}
                    />
                </div>

                {otherResearcherIds.length > 0 && (
                    <div className="mt-4" data-testid="other-researcher-ids">
                        <p className="text-sm font-medium">
                            {fm({ id: labels.otherResearcherIds.label })}
                        </p>
                        <p className="text-xs text-muted-foreground">
                            {fm({ id: labels.otherResearcherIds.hint })}
                        </p>
                        <ul className="mt-2 flex flex-col gap-2">
                            {otherResearcherIds.map(researcherId => (
                                <li key={researcherId} className="flex items-center gap-2">
                                    <Badge variant="outline">
                                        <code>{researcherId}</code>
                                    </Badge>
                                    {!disabled && onMakeCurrent && (
                                        <Button
                                            type="button"
                                            size="sm"
                                            variant="ghost"
                                            onClick={() => onMakeCurrent(researcherId)}
                                        >
                                            {fm({ id: labels.otherResearcherIds.makeCurrent })}
                                        </Button>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>

            <div className="border-t pt-4 mt-2">
                <Combobox
                    name="citizenship"
                    label={fm({ id: labels.citizenship.label })}
                    codebook={CODEBOOK.COUNTRY}
                    placeholder={fm({ id: labels.citizenship.placeholder })}
                    disabled={disabled}
                />
            </div>
        </div>
    )
}
