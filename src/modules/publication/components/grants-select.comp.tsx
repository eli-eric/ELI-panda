import { Plus, X } from 'lucide-react'
import { useFieldArray, useFormContext } from 'react-hook-form'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import { useAccessControl } from '@/hooks/useAccessControl'
import { type SelectedGrant, useGrantSelectionModal } from '@/modules/shared/form/grantSelect'
import { ROLE } from '@/types/constants/roles'

/**
 * Component for selecting Grants in publication form.
 *
 * Features:
 * - Displays selected grants as removable badges
 * - "Add Grant" button opens selection modal
 * - Respects user permissions (PUBLICATIONS_EDIT role)
 */
export const GrantsSelectComponent = () => {
    const { fields, replace, remove } = useFieldArray<{
        grants: SelectedGrant[]
    }>({
        name: 'grants',
    })

    const {
        formState: { errors },
    } = useFormContext()
    const error = errors.grants
    const disabled = !useAccessControl(ROLE.PUBLICATIONS_EDIT)()
    const { openGrantModal } = useGrantSelectionModal()

    const handleOpenModal = () => {
        openGrantModal(selected => {
            replace(selected)
        }, fields as SelectedGrant[])
    }

    const handleRemove = (index: number) => {
        remove(index)
    }

    return (
        <div className="space-y-2">
            <Label>Grants</Label>

            {/* Selected grants as badges */}
            <div
                className={cn(
                    'flex flex-wrap gap-2 min-h-[32px] rounded-md border p-2',
                    error && 'border-destructive',
                )}
                aria-invalid={error ? 'true' : 'false'}
            >
                {fields.length === 0 ? (
                    <span className="text-sm text-muted-foreground">No grants selected</span>
                ) : (
                    fields.map((field, index) => (
                        <Badge
                            key={field.id}
                            variant="secondary"
                            className="flex items-center gap-1 pr-1"
                        >
                            <span>{field.name}</span>
                            {!disabled && (
                                <button
                                    type="button"
                                    onClick={() => handleRemove(index)}
                                    className="ml-1 rounded-full hover:bg-muted p-0.5"
                                    aria-label={`Remove ${field.name}`}
                                >
                                    <X className="h-3 w-3" />
                                </button>
                            )}
                        </Badge>
                    ))
                )}
            </div>
            {error && (
                <p className="text-sm text-destructive">
                    {(error.message || error.root?.message) as string}
                </p>
            )}

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
                    Add Grant
                </Button>
            )}
        </div>
    )
}
