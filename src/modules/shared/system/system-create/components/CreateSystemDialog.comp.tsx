import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2, Map, MapPin, Plus, User2 } from 'lucide-react'
import type { ComponentType, FC } from 'react'
import { useMemo } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useIntl } from 'react-intl'
import { toast } from 'sonner'
import { z } from 'zod'

import { Badge } from '@/components/ui/badge'
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
import { Skeleton } from '@/components/ui/skeleton'
import { message } from '@/i18n/src/messages'
import { cn } from '@/lib/utils'
// deep imports: the system-detail barrel pulls in section components that import back
// into the overview table (circular through SystemSelect)
import { useCreateSystem } from '@/modules/shared/system/system-detail/hooks/mutations/useCreateSystem'
import { useSystemDetail } from '@/modules/shared/system/system-detail/hooks/queries/useSystemDetail'
import type { SystemDetail } from '@/modules/shared/system/system-detail/types'
import { SystemLevel } from '@/types/constants/systemLevel'
import { getBadgeVariantBySystemLevel } from '@/utils/systemLevel'

import { getAllowedCreateLevels } from '../utils/systemLevelRules'

export interface CreateSystemParent {
    uid: string
    name: string
    level: SystemLevel | null
}

interface CreateSystemDialogProps {
    /** absent → a root system */
    parent?: CreateSystemParent | null
    /** the caller decides what follows (explorer selects it, overview opens the Edit sheet) */
    onCreated?: (created: SystemDetail) => void
    onClose?: () => void
}

interface FormValues {
    name: string
    systemLevel: SystemLevel
}

interface InheritedFieldDef {
    key: 'responsible' | 'location' | 'zone'
    icon: ComponentType<{ className?: string }>
    labelId: string
    value: string | null
}

const buildSchema = (allowedLevels: SystemLevel[], nameRequired: string) =>
    z.object({
        name: z.string().trim().min(1, nameRequired),
        systemLevel: z.enum(allowedLevels as [SystemLevel, ...SystemLevel[]]),
    })

/**
 * Quick create (name + level) shared by the explorer and the systems overview; every
 * other field is filled in the Edit System sheet afterwards. A child previews what the
 * server inherits from its parent.
 */
export const CreateSystemDialog: FC<CreateSystemDialogProps> = ({ parent, onCreated, onClose }) => {
    const { formatMessage: fm } = useIntl()
    const parentUid = parent?.uid ?? null
    const parentLevel = parent?.level ?? null
    const { system: parentSystem, isLoading: parentLoading } = useSystemDetail(parentUid)
    const { createSystem, isPending } = useCreateSystem()

    const allowedLevels = useMemo(() => getAllowedCreateLevels(parentLevel), [parentLevel])
    const onlyOneLevel = allowedLevels.length === 1
    const hasNoAllowedLevels = allowedLevels.length === 0
    const schema = useMemo(
        () =>
            hasNoAllowedLevels
                ? z.object({ name: z.string(), systemLevel: z.nativeEnum(SystemLevel) })
                : buildSchema(
                      allowedLevels,
                      fm({ id: message.systemHierarchy.create.validation.nameRequired }),
                  ),
        [allowedLevels, fm, hasNoAllowedLevels],
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

    const inheritedFields: InheritedFieldDef[] = [
        {
            key: 'responsible',
            icon: User2,
            labelId: message.systemHierarchy.fields.responsible,
            value: inheritedResponsible?.name ?? null,
        },
        {
            key: 'location',
            icon: MapPin,
            labelId: message.systemHierarchy.fields.location,
            value: inheritedLocation?.name ?? null,
        },
        {
            key: 'zone',
            icon: Map,
            labelId: message.systemHierarchy.fields.zone,
            value: inheritedZone?.name ?? null,
        },
    ]

    // The server inherits responsible / location / zone from the parent — the
    // block below only previews what the new system will get.
    const onSubmit = handleSubmit(data => {
        const promise = createSystem({
            ...(parentUid && { parentUid }),
            name: data.name.trim(),
            systemLevel: data.systemLevel,
        })

        toast.promise(promise, {
            loading: fm({ id: message.systemHierarchy.create.creating }),
            success: result => {
                onClose?.()
                onCreated?.(result)
                return fm({ id: message.systemHierarchy.create.created })
            },
            // the soft lock was already confirmed when the dialog opened
            error: fm({ id: message.systemHierarchy.create.saveFailed }),
        })

        return promise.catch(() => undefined)
    })

    if (hasNoAllowedLevels) {
        return (
            <div className="space-y-4" data-testid="create-system-empty">
                <p className="text-sm text-muted-foreground">
                    {fm({ id: message.systemHierarchy.create.noAllowedLevels })}
                </p>
                <div className="flex justify-end pt-2">
                    <Button type="button" variant="outline" onClick={onClose}>
                        {fm({ id: message.systemHierarchy.create.close })}
                    </Button>
                </div>
            </div>
        )
    }

    const onlyLevel = allowedLevels[0]
    const onlyLevelLabel = onlyOneLevel
        ? fm({ id: message.systemHierarchy.systemLevels[onlyLevel] })
        : null
    const parentLevelLabel = parentLevel
        ? fm({ id: message.systemHierarchy.systemLevels[parentLevel] })
        : null

    return (
        <form onSubmit={onSubmit} className="space-y-5" data-testid="create-system-dialog">
            <div className="space-y-2">
                <Label htmlFor="create-system-name">
                    {fm({ id: message.systemHierarchy.fields.name })}
                </Label>
                <Input
                    id="create-system-name"
                    autoFocus
                    placeholder={fm({ id: message.systemHierarchy.create.namePlaceholder })}
                    data-testid="create-system-name"
                    aria-invalid={!!errors.name}
                    {...register('name')}
                />
                {errors.name && (
                    <p className="text-xs text-destructive" data-testid="create-system-name-error">
                        {errors.name.message}
                    </p>
                )}
            </div>

            <div className="space-y-2">
                <Label htmlFor="create-system-level">
                    {fm({ id: message.systemHierarchy.fields.systemLevel })}
                </Label>
                {onlyOneLevel ? (
                    <>
                        <div id="create-system-level">
                            <Badge
                                variant="outline"
                                className={cn(
                                    'px-3 py-1 text-sm',
                                    getBadgeVariantBySystemLevel(onlyLevel),
                                )}
                                data-testid="create-system-level-badge"
                            >
                                {onlyLevelLabel}
                            </Badge>
                        </div>
                        {parentLevelLabel && (
                            <p className="text-xs text-muted-foreground">
                                {fm(
                                    { id: message.systemHierarchy.create.onlyOneLevelHint },
                                    {
                                        levelLabel: onlyLevelLabel,
                                        parentLevelLabel,
                                    },
                                )}
                            </p>
                        )}
                    </>
                ) : (
                    <Controller
                        control={control}
                        name="systemLevel"
                        render={({ field }) => (
                            <Select value={field.value} onValueChange={field.onChange}>
                                <SelectTrigger
                                    id="create-system-level"
                                    data-testid="create-system-level"
                                    className="w-full"
                                >
                                    <SelectValue>
                                        {field.value &&
                                            fm({
                                                id: message.systemHierarchy.systemLevels[
                                                    field.value
                                                ],
                                            })}
                                    </SelectValue>
                                </SelectTrigger>
                                <SelectContent>
                                    {allowedLevels.map(level => (
                                        <SelectItem
                                            key={level}
                                            value={level}
                                            data-testid={`create-system-level-option-${level}`}
                                        >
                                            {fm({
                                                id: message.systemHierarchy.systemLevels[level],
                                            })}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        )}
                    />
                )}
            </div>

            {parent && (
                <div
                    className="rounded-md border bg-muted/40 p-3 space-y-3"
                    data-testid="create-system-inherited"
                >
                    <div className="space-y-1">
                        <p className="text-sm font-medium">
                            {fm({ id: message.systemHierarchy.create.inheritedTitle })}
                        </p>
                        <p className="text-xs text-muted-foreground">
                            {fm(
                                { id: message.systemHierarchy.create.inheritedHelp },
                                { parentName: parent.name },
                            )}
                        </p>
                    </div>

                    <dl className="space-y-2 text-sm">
                        {inheritedFields.map(({ key, icon: Icon, labelId, value }) => {
                            const hasValue = !!value
                            return (
                                <div
                                    key={key}
                                    className="flex items-center gap-3"
                                    data-testid={`create-system-inherited-${key}`}
                                >
                                    <Icon
                                        className={cn(
                                            'size-4 shrink-0',
                                            hasValue
                                                ? 'text-foreground'
                                                : 'text-muted-foreground/60',
                                        )}
                                    />
                                    <dt
                                        className={cn(
                                            'w-28 shrink-0',
                                            hasValue
                                                ? 'text-muted-foreground'
                                                : 'text-muted-foreground/70',
                                        )}
                                    >
                                        {fm({ id: labelId })}
                                    </dt>
                                    {parentLoading ? (
                                        <Skeleton className="h-4 w-32" />
                                    ) : hasValue ? (
                                        <dd className="text-foreground">{value}</dd>
                                    ) : (
                                        <dd className="flex items-baseline gap-2 text-muted-foreground/70">
                                            <span>—</span>
                                            <span className="text-xs">
                                                {fm({
                                                    id: message.systemHierarchy.create
                                                        .inheritedNotSet,
                                                })}
                                            </span>
                                        </dd>
                                    )}
                                </div>
                            )
                        })}
                    </dl>
                </div>
            )}

            <div className="flex justify-end gap-2 pt-2">
                <Button type="button" variant="outline" onClick={onClose} disabled={isPending}>
                    {fm({ id: message.systemHierarchy.create.cancel })}
                </Button>
                <Button
                    type="submit"
                    disabled={isPending || parentLoading}
                    data-testid="create-system-submit"
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
