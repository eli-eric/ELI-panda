import { type QueryObserverResult, type RefetchOptions, useMutation } from '@tanstack/react-query'
import { Edit, MoreVertical, Trash2 } from 'lucide-react'
import { type FC } from 'react'
import { useForm } from 'react-hook-form'
import { FormattedMessage, useIntl } from 'react-intl'
import { toast } from 'sonner'

import { Form } from '@/components/form/Form'
import { Input } from '@/components/form/inputs'
import Listbox from '@/components/form/Listbox'
import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import axiosInstance from '@/core/axios/axiosInstance'
import usePermission from '@/hooks/usePermission'
import useWarningModal from '@/hooks/useWarningModal'
import { message } from '@/i18n/src/messages'
import { cn } from '@/lib/utils'
import { useDynamicModalStore } from '@/store/useDynamicModalStore'
import { CODEBOOK } from '@/types/constants/codebook'
import { BASE_URL } from '@/types/constants/common'
import { ROLE } from '@/types/constants/roles'

import type { SystemTypesResponse } from '../types'

const messages = message.common.buttons

interface Props {
    systemType: SystemTypesResponse
    groupUid?: string | null
    refetch: (
        options?: RefetchOptions | undefined,
    ) => Promise<QueryObserverResult<SystemTypesResponse[], Error>>
}

// Store modalId in closure for EditSystemTypeModalContent to access
let currentEditTypeModalId: string | undefined

function openEditSystemTypeModal(
    systemType: SystemTypesResponse,
    groupUid: string | null | undefined,
    refetch: Props['refetch'],
) {
    if (typeof window === 'undefined') return // Prevent SSR execution

    const { openModal } = useDynamicModalStore.getState()

    currentEditTypeModalId = openModal('dialog', {
        id: `edit-system-type-${systemType.uid}`,
        component: () => (
            <EditSystemTypeModalContent
                systemType={systemType}
                groupUid={groupUid}
                refetch={refetch}
            />
        ),
        props: {
            title: 'Edit System Type',
            size: 'm' as const,
        },
    })

    return currentEditTypeModalId
}

const EditSystemTypeModalContent: FC<{
    systemType: SystemTypesResponse
    groupUid: string | null | undefined
    refetch: Props['refetch']
}> = ({ systemType, groupUid, refetch }) => {
    const { closeModal } = useDynamicModalStore()
    const canEdit = usePermission([ROLE.SYSTEM_TYPE_EDIT])

    const formMethods = useForm({
        defaultValues: {
            name: systemType.name,
            code: systemType.code,
            mask: systemType.mask,
            systemAttribute: systemType.systemAttribute,
        },
    })

    const { mutate, isPending } = useMutation({
        mutationFn: async () => {
            const res = await axiosInstance
                .put(
                    BASE_URL +
                        `/system/system-type-group/${groupUid}/system-type/${systemType.uid}`,
                    formMethods.getValues(),
                )
                .then(res => res.data)
            return res.data
        },
        onSuccess: () => {
            refetch()
            if (currentEditTypeModalId) {
                closeModal(currentEditTypeModalId)
            }
            toast.success(`${systemType.name} was updated.`)
        },
        onError: () => {
            toast.error(`Failed to update ${systemType.name}.`)
            if (currentEditTypeModalId) {
                closeModal(currentEditTypeModalId)
            }
        },
    })

    const handleSubmit = () => {
        mutate()
    }

    return (
        <div className="space-y-4 pt-4">
            <Form formMethods={formMethods} className="flex flex-col gap-2">
                <Input name="name" label="Name" rounded="rounded-md" disabled={!canEdit} />
                <Input name="code" label="Code" rounded="rounded-md" disabled={!canEdit} />
                <Input name="mask" label="Mask" rounded="rounded-md" disabled={!canEdit} />
                <Listbox
                    name="systemAttribute"
                    codebook={CODEBOOK.SYSTEM_ATTRIBUTE}
                    rounded="rounded-md"
                    customLabel="System Attribute"
                    disabled={!canEdit}
                    emptyOption="Select System Attribute"
                />
            </Form>
            <div className="flex justify-end gap-2">
                <Button
                    variant="outline"
                    onClick={() => {
                        if (currentEditTypeModalId) {
                            closeModal(currentEditTypeModalId)
                        }
                    }}
                    disabled={isPending}
                >
                    <FormattedMessage id={messages.cancel} defaultMessage="Cancel" />
                </Button>
                <Button onClick={handleSubmit} disabled={isPending || !canEdit}>
                    <FormattedMessage id={messages.save} defaultMessage="Save" />
                </Button>
            </div>
        </div>
    )
}

export const SystemTypeItem: FC<Props> = ({ systemType, refetch, groupUid }) => {
    const { formatMessage: fm } = useIntl()
    const canEdit = usePermission([ROLE.SYSTEM_TYPE_EDIT])

    const withWarningModal = useWarningModal(`Are you sure you want to delete ${systemType.name}?`)

    const { mutate: deleteType } = useMutation({
        mutationFn: async () => {
            const res = await axiosInstance
                .delete(BASE_URL + `/system/system-type/${systemType.uid}`)
                .then(res => res.data)
            return res.data
        },
        onSuccess: () => {
            refetch()
            toast.success(`${systemType.name} was deleted.`)
        },
    })

    return (
        <div
            className={cn(
                'group p-3 rounded-lg transition-all duration-200',
                'border border-transparent hover:border-border hover:bg-accent/50',
                'flex items-center justify-between',
            )}
        >
            <div className="min-w-0 flex-1">
                <div className="truncate font-medium">{systemType.name}</div>
                {systemType.code && (
                    <div className="text-sm text-muted-foreground">{systemType.code}</div>
                )}
            </div>
            <div className="flex items-center pl-2">
                <div className="self-center h-6 w-px bg-muted mx-1" />
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="ghost"
                            size="sm"
                            aria-label="System type actions"
                            className="h-8 w-8 p-0"
                        >
                            <MoreVertical className="h-4 w-4 text-muted-foreground" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" sideOffset={4}>
                        <DropdownMenuItem
                            onClick={() => {
                                openEditSystemTypeModal(systemType, groupUid, refetch)
                            }}
                            className="cursor-pointer"
                        >
                            <Edit className="h-4 w-4 mr-2" />
                            {fm({ id: message.common.systemTypeEdit.editType })}
                        </DropdownMenuItem>
                        {canEdit && (
                            <DropdownMenuItem
                                onClick={() => withWarningModal(deleteType)()}
                                className="cursor-pointer text-destructive focus:text-destructive"
                            >
                                <Trash2 className="h-4 w-4 mr-2" />
                                {fm({ id: message.common.systemTypeEdit.deleteType })}
                            </DropdownMenuItem>
                        )}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    )
}
