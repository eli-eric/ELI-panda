import type { FC } from 'react'
import { useIntl } from 'react-intl'

import Combobox from '@/components/form/Combobox'
import { Input } from '@/components/form/inputs'
import { message } from '@/i18n/src/messages'
import { CODEBOOK } from '@/types/constants/codebook'

interface Props {
    disabled?: boolean
}

export const ResearcherFormFields: FC<Props> = ({ disabled = false }) => {
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
