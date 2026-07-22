import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2, Plus } from 'lucide-react'
import type { FC } from 'react'
import { useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { useIntl } from 'react-intl'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { message } from '@/i18n/src/messages'

import { useTeamCreate } from '../hooks/useTeamCreate'
import type { Team } from '../types/team.types'
import { buildTeamCreateSchema, type TeamCreateData } from './team-create.schema'

interface TeamCreateDialogProps {
    onClose?: () => void
    onCreated?: (uid: string) => void
}

const fields = message.teamsPage.fields
const create = message.teamsPage.create

export const TeamCreateDialog: FC<TeamCreateDialogProps> = ({ onClose, onCreated }) => {
    const { formatMessage: fm } = useIntl()
    const { mutateAsync, isPending } = useTeamCreate({
        onSuccess: (team: Team) => onCreated?.(team.uid),
    })

    const schema = useMemo(() => buildTeamCreateSchema(fm({ id: fields.nameRequired })), [fm])

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<TeamCreateData>({
        resolver: zodResolver(schema),
        defaultValues: { name: '', code: '', description: '' },
        mode: 'onSubmit',
    })

    const onSubmit = handleSubmit(data => {
        const promise = mutateAsync(data)
        toast.promise(promise, {
            loading: fm({ id: create.creating }),
            success: () => {
                onClose?.()
                return fm({ id: create.created })
            },
            error: fm({ id: create.saveFailed }),
        })
        return promise.catch(() => undefined)
    })

    return (
        <form onSubmit={onSubmit} className="space-y-4" data-testid="team-create-dialog">
            <div className="space-y-2">
                <Label htmlFor="team-name">{fm({ id: fields.name.label })}</Label>
                <Input
                    id="team-name"
                    autoFocus
                    placeholder={fm({ id: fields.name.placeholder })}
                    aria-invalid={!!errors.name}
                    data-testid="team-create-name"
                    {...register('name')}
                />
                {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
            </div>

            <div className="space-y-2">
                <Label htmlFor="team-code">{fm({ id: fields.code.label })}</Label>
                <Input
                    id="team-code"
                    placeholder={fm({ id: fields.code.placeholder })}
                    {...register('code')}
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="team-description">{fm({ id: fields.description.label })}</Label>
                <Textarea
                    id="team-description"
                    rows={3}
                    placeholder={fm({ id: fields.description.placeholder })}
                    {...register('description')}
                />
            </div>

            <div className="flex justify-end gap-2 pt-2">
                <Button type="button" variant="outline" onClick={onClose} disabled={isPending}>
                    {fm({ id: create.cancel })}
                </Button>
                <Button type="submit" disabled={isPending} data-testid="team-create-submit">
                    {isPending ? (
                        <Loader2 className="size-4 animate-spin" />
                    ) : (
                        <Plus className="size-4" />
                    )}
                    {fm({ id: create.submit })}
                </Button>
            </div>
        </form>
    )
}
