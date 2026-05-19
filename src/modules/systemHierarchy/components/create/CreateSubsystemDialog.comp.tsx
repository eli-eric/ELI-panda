import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2, Plus } from 'lucide-react'
import type { FC } from 'react'
import { useMemo } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useIntl } from 'react-intl'
import { toast } from 'sonner'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { message } from '@/i18n/src/messages'
import type { SystemLevel } from '@/types/gql/graphql'

import { useCreateSubsystem } from '../../hooks/mutations/useCreateSubsystem'
import { useSystemDetail } from '../../hooks/queries/useSystemDetail'
import { useHierarchyNavigation } from '../../hooks/useHierarchyNavigation'
import { getAllowedChildSystemLevels } from '../../utils/systemLevelRules'

interface CreateSubsystemDialogProps {
    parentUid: string
    parentName: string
    parentLevel: SystemLevel
    onClose?: () => void
}

interface FormValues {
    name: string
    systemLevel: SystemLevel
}

const buildSchema = (allowedLevels: SystemLevel[], nameRequired: string) =>
    z.object({
        name: z.string().trim().min(1, nameRequired),
        systemLevel: z.enum(allowedLevels as [SystemLevel, ...SystemLevel[]]),
    })

export const CreateSubsystemDialog: FC<CreateSubsystemDialogProps> = ({
    parentUid,
    parentName,
    parentLevel,
    onClose,
}) => {
    const { formatMessage: fm } = useIntl()
    const { system: parentSystem, isLoading: parentLoading } = useSystemDetail(parentUid)
    const { createSubsystem, isPending } = useCreateSubsystem()
    const { selectLeaf } = useHierarchyNavigation()

    const allowedLevels = useMemo(() => getAllowedChildSystemLevels(parentLevel), [parentLevel])
    const onlyOneLevel = allowedLevels.length === 1
    const schema = useMemo(
        () => buildSchema(allowedLevels, fm({ id: message.systemHierarchy.create.validation.nameRequired })),
        [allowedLevels, fm],
    )

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<FormValues>({
        resolver: zodResolver(schema),
        defaultValues: {
            name: '',
            systemLevel: allowedLevels[0],
        },
        mode: 'onSubmit',
    })

    const inheritedResponsible = parentSystem?.responsible
    const inheritedLocation = parentSystem?.location
    const inheritedZone = parentSystem?.zone
    const hasAnyInherited =
        !!inheritedResponsible || !!inheritedLocation || !!inheritedZone

    const onSubmit = handleSubmit(data => {
        const promise = createSubsystem({
            parentUid,
            name: data.name,
            systemLevel: data.systemLevel,
            inherit: {
                responsibleUid: inheritedResponsible?.uid,
                locationUid: inheritedLocation?.uid,
                zoneUid: inheritedZone?.uid,
            },
        })

        toast.promise(promise, {
            loading: fm({ id: message.systemHierarchy.create.creating }),
            success: result => {
                // No optimistic hint: the mutation hook already seeded the
                // system-detail cache with the full SystemDetail fragment.
                selectLeaf(result.uid)
                onClose?.()
                return fm({ id: message.systemHierarchy.create.created })
            },
            error: fm({ id: message.systemHierarchy.create.saveFailed }),
        })

        return promise.catch(() => undefined)
    })

    return (
        <form onSubmit={onSubmit} className="space-y-4" data-testid="create-subsystem-dialog">
            <div className="space-y-2">
                <Label htmlFor="create-subsystem-name">
                    {fm({ id: message.systemHierarchy.fields.name })}
                </Label>
                <Input
                    id="create-subsystem-name"
                    autoFocus
                    data-testid="create-subsystem-name"
                    aria-invalid={!!errors.name}
                    {...register('name')}
                />
                {errors.name && (
                    <p className="text-xs text-destructive" data-testid="create-subsystem-name-error">
                        {errors.name.message}
                    </p>
                )}
            </div>

            <div className="space-y-2">
                <Label htmlFor="create-subsystem-level">
                    {fm({ id: message.systemHierarchy.fields.systemLevel })}
                </Label>
                <Controller
                    control={control}
                    name="systemLevel"
                    render={({ field }) => (
                        <Select
                            value={field.value}
                            onValueChange={field.onChange}
                            disabled={onlyOneLevel}
                        >
                            <SelectTrigger
                                id="create-subsystem-level"
                                data-testid="create-subsystem-level"
                            >
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                {allowedLevels.map(level => (
                                    <SelectItem
                                        key={level}
                                        value={level}
                                        data-testid={`create-subsystem-level-option-${level}`}
                                    >
                                        {level}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    )}
                />
            </div>

            {hasAnyInherited && (
                <>
                    <Separator />
                    <div className="space-y-2" data-testid="create-subsystem-inherited">
                        <p className="text-sm font-medium text-muted-foreground">
                            {fm(
                                { id: message.systemHierarchy.create.inheritedFrom },
                                { parentName },
                            )}
                        </p>
                        <dl className="space-y-1 text-sm">
                            {inheritedResponsible && (
                                <div className="flex justify-between gap-4">
                                    <dt className="text-muted-foreground">
                                        {fm({ id: message.systemHierarchy.fields.responsible })}
                                    </dt>
                                    <dd>{inheritedResponsible.name}</dd>
                                </div>
                            )}
                            {inheritedLocation && (
                                <div className="flex justify-between gap-4">
                                    <dt className="text-muted-foreground">
                                        {fm({ id: message.systemHierarchy.fields.location })}
                                    </dt>
                                    <dd>{inheritedLocation.name}</dd>
                                </div>
                            )}
                            {inheritedZone && (
                                <div className="flex justify-between gap-4">
                                    <dt className="text-muted-foreground">
                                        {fm({ id: message.systemHierarchy.fields.zone })}
                                    </dt>
                                    <dd>{inheritedZone.name}</dd>
                                </div>
                            )}
                        </dl>
                    </div>
                </>
            )}

            <div className="flex justify-end gap-2 pt-2">
                <Button
                    type="button"
                    variant="outline"
                    onClick={onClose}
                    disabled={isPending}
                >
                    {fm({ id: message.systemHierarchy.create.cancel })}
                </Button>
                <Button
                    type="submit"
                    disabled={isPending || parentLoading}
                    data-testid="create-subsystem-submit"
                >
                    {isPending ? (
                        <Loader2 className="size-4 animate-spin mr-2" />
                    ) : (
                        <Plus className="size-4 mr-2" />
                    )}
                    {fm({ id: message.systemHierarchy.create.submit })}
                </Button>
            </div>
        </form>
    )
}
