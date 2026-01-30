import type { UseFormReturn } from 'react-hook-form'
import { useIntl } from 'react-intl'

import { Button } from '@/components/ui/button'
import { DialogFooter } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { message } from '@/i18n/src/messages'

import type { CodebookValueSchema } from '../schemas/codebook-value.schema'

interface Props {
    form: UseFormReturn<CodebookValueSchema>
    isPending: boolean
    onSubmit: (data: CodebookValueSchema) => void
    onCancel: () => void
}

export const CodebookAddFormComponent = ({ form, isPending, onSubmit, onCancel }: Props) => {
    const { formatMessage: fm } = useIntl()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = form

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <div className="space-y-2">
                <Label htmlFor="name">{fm({ id: message.codebooksPage.addForm.nameLabel })}</Label>
                <Input
                    id="name"
                    {...register('name')}
                    placeholder={fm({
                        id: message.codebooksPage.addForm.namePlaceholder,
                    })}
                    autoFocus
                />
                {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
            </div>

            <DialogFooter className="pt-4">
                <Button type="button" variant="outline" onClick={onCancel} disabled={isPending}>
                    {fm({ id: message.common.buttons.cancel })}
                </Button>
                <Button type="submit" disabled={isPending}>
                    {isPending
                        ? fm({ id: message.common.ui.loading })
                        : fm({ id: message.common.buttons.save })}
                </Button>
            </DialogFooter>
        </form>
    )
}
