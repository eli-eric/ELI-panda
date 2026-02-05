import { Plus, X } from 'lucide-react'
import { useEffect } from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { FormattedMessage, useIntl } from 'react-intl'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { useAccessControl } from '@/hooks/useAccessControl'
import { message } from '@/i18n/src/messages'
import {
    type SelectedResearcher,
    useResearcherSelectionModal,
} from '@/modules/shared/form/researcherSelect'
import { ROLE } from '@/types/constants/roles'

const { eliAuthorsList: eliAuthorsMessages } = message.publication.form

/**
 * Component for selecting ELI Authors (researchers) in publication form.
 *
 * Features:
 * - Displays selected researchers as removable badges
 * - "Add Eli Author" button opens selection modal
 * - Auto-updates eliAuthorsCount when selection changes
 * - Respects user permissions (PUBLICATIONS_EDIT role)
 */
export const EliAuthorsSelectComponent = () => {
    const { formatMessage: fm } = useIntl()
    const { fields, replace, remove } = useFieldArray<{
        eliResearchers: SelectedResearcher[]
    }>({
        name: 'eliResearchers',
    })

    const { setValue } = useFormContext()
    const disabled = !useAccessControl(ROLE.PUBLICATIONS_EDIT)()
    const { openResearcherModal } = useResearcherSelectionModal()

    // Auto-update eliAuthorsCount when researchers change
    useEffect(() => {
        setValue('eliAuthorsCount', fields.length)
    }, [fields.length, setValue])

    const handleOpenModal = () => {
        openResearcherModal(selected => {
            replace(selected)
        }, fields as SelectedResearcher[])
    }

    const handleRemove = (index: number) => {
        remove(index)
    }

    return (
        <div className="space-y-2">
            <Label>
                <FormattedMessage id={eliAuthorsMessages.label} />
                <span className="ml-2 text-muted-foreground">({fields.length})</span>
            </Label>

            {/* Selected researchers as badges */}
            <div className="flex flex-wrap gap-2 min-h-[32px]">
                {fields.length === 0 ? (
                    <span className="text-sm text-muted-foreground">
                        <FormattedMessage id={eliAuthorsMessages.noSelection} />
                    </span>
                ) : (
                    fields.map((field, index) => (
                        <Badge
                            key={field.id}
                            variant="secondary"
                            className="flex items-center gap-1 pr-1"
                        >
                            <span>
                                {field.lastName}, {field.firstName}
                            </span>
                            {!disabled && (
                                <button
                                    type="button"
                                    onClick={() => handleRemove(index)}
                                    className="ml-1 rounded-full hover:bg-muted p-0.5"
                                    aria-label={fm(
                                        { id: 'common.remove' },
                                        { name: `${field.firstName} ${field.lastName}` },
                                    )}
                                >
                                    <X className="h-3 w-3" />
                                </button>
                            )}
                        </Badge>
                    ))
                )}
            </div>

            {/* Add button */}
            {!disabled && (
                <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleOpenModal}
                    className="mt-2"
                >
                    <Plus className="h-4 w-4 mr-1" />
                    <FormattedMessage id={eliAuthorsMessages.addButton} />
                </Button>
            )}
        </div>
    )
}
