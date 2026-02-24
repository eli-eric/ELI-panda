import type { FC } from 'react'
import { useState } from 'react'

import { useCreateRelationship } from '../../hooks/mutations/useCreateRelationship'
import type { RelationshipGraphNode } from '../../types/graph'
import { CreateRelationshipModalComponent } from './CreateRelationshipModal.comp'

interface CreateRelationshipModalContainerProps {
    sourceNode: RelationshipGraphNode
    targetNode: RelationshipGraphNode
    onClose: () => void
}

export const CreateRelationshipModalContainer: FC<CreateRelationshipModalContainerProps> = ({
    sourceNode,
    targetNode,
    onClose,
}) => {
    const [relationshipType, setRelationshipType] = useState('')
    const [description, setDescription] = useState('')
    const { createRelationship, isCreating } = useCreateRelationship()

    const handleSubmit = () => {
        createRelationship({
            sourceUid: sourceNode.uid,
            targetUid: targetNode.uid,
            relationshipType,
            description: description || undefined,
        })
        onClose()
    }

    return (
        <CreateRelationshipModalComponent
            sourceName={sourceNode.name}
            targetName={targetNode.name}
            relationshipType={relationshipType}
            description={description}
            onRelationshipTypeChange={setRelationshipType}
            onDescriptionChange={setDescription}
            onSubmit={handleSubmit}
            onCancel={onClose}
            isSubmitting={isCreating}
        />
    )
}
