import type { FC } from 'react'
import { useIntl } from 'react-intl'

import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { message } from '@/i18n/src/messages'

import type { RelationshipType } from '../../types/graph'
import { RELATIONSHIP_TYPE_LABELS, RELATIONSHIP_TYPES } from '../../types/graph'

interface CreateRelationshipModalProps {
    sourceName: string
    targetName: string
    relationshipType: string
    description: string
    onRelationshipTypeChange: (value: string) => void
    onDescriptionChange: (value: string) => void
    onSubmit: () => void
    onCancel: () => void
    isSubmitting: boolean
}

export const CreateRelationshipModalComponent: FC<CreateRelationshipModalProps> = ({
    sourceName,
    targetName,
    relationshipType,
    description,
    onRelationshipTypeChange,
    onDescriptionChange,
    onSubmit,
    onCancel,
    isSubmitting,
}) => {
    const { formatMessage: fm } = useIntl()
    const isValid = !!relationshipType

    return (
        <div className="space-y-4 p-4" data-testid="create-relationship-modal">
            <div className="space-y-2">
                <Label>{fm({ id: message.systemHierarchy.graph.createRelationship.source })}</Label>
                <div className="text-sm font-medium bg-muted px-3 py-2 rounded">{sourceName}</div>
            </div>

            <div className="space-y-2">
                <Label>{fm({ id: message.systemHierarchy.graph.createRelationship.target })}</Label>
                <div className="text-sm font-medium bg-muted px-3 py-2 rounded">{targetName}</div>
            </div>

            <div className="space-y-2">
                <Label>{fm({ id: message.systemHierarchy.graph.createRelationship.type })}</Label>
                <Select value={relationshipType} onValueChange={onRelationshipTypeChange}>
                    <SelectTrigger>
                        <SelectValue
                            placeholder={fm({
                                id: message.systemHierarchy.graph.createRelationship.type,
                            })}
                        />
                    </SelectTrigger>
                    <SelectContent>
                        {Object.entries(RELATIONSHIP_TYPES).map(([key, value]) => (
                            <SelectItem key={key} value={value}>
                                {RELATIONSHIP_TYPE_LABELS[value as RelationshipType]}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <div className="space-y-2">
                <Label>
                    {fm({ id: message.systemHierarchy.graph.createRelationship.description })}
                </Label>
                <Textarea
                    value={description}
                    onChange={e => onDescriptionChange(e.target.value)}
                    placeholder={fm({
                        id: message.systemHierarchy.graph.createRelationship.descriptionPlaceholder,
                    })}
                    rows={3}
                />
            </div>

            <div className="flex justify-end gap-2 pt-2">
                <Button variant="outline" onClick={onCancel}>
                    {fm({ id: message.systemHierarchy.graph.createRelationship.cancel })}
                </Button>
                <Button onClick={onSubmit} disabled={!isValid || isSubmitting}>
                    {fm({ id: message.systemHierarchy.graph.createRelationship.submit })}
                </Button>
            </div>
        </div>
    )
}
