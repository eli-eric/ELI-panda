import type { QueryObserverResult, RefetchOptions } from '@tanstack/react-query'
import { useMutation } from '@tanstack/react-query'
import { Plus } from 'lucide-react'
import { type FC } from 'react'
import { useForm } from 'react-hook-form'
import { FormattedMessage, useIntl } from 'react-intl'
import { toast } from 'sonner'

import { Form } from '@/components/form/Form'
import { Input } from '@/components/form/inputs'
import Listbox from '@/components/form/Listbox'
import { Button } from '@/components/ui/button'
import axiosInstance from '@/core/axios/axiosInstance'
import usePermission from '@/hooks/usePermission'
import { message } from '@/i18n/src/messages'
import { useDynamicModalStore } from '@/store/useDynamicModalStore'
import { CODEBOOK } from '@/types/constants/codebook'
import { BASE_URL } from '@/types/constants/common'
import { ROLE } from '@/types/constants/roles'

import type { SystemTypesResponse } from '../types'

const messages = message.common.buttons

interface Props {
    selectedGroup: string | null
    refetch: (
        options?: RefetchOptions | undefined,
    ) => Promise<QueryObserverResult<SystemTypesResponse[], Error>>
}

// Store modalId in closure for AddSystemTypeModalContent to access
let currentAddSystemTypeModalId: string | undefined

function openAddSystemTypeModal(selectedGroup: string, refetch: Props['refetch']) {
    if (typeof window === 'undefined') return // Prevent SSR execution

    const { openModal } = useDynamicModalStore.getState()

    currentAddSystemTypeModalId = openModal('dialog', {
        id: `add-system-type-${selectedGroup}`,
        component: () => (
            <AddSystemTypeModalContent selectedGroup={selectedGroup} refetch={refetch} />
        ),
        props: {
            title: 'Add System Type',
            size: 'm' as const,
        },
    })

    return currentAddSystemTypeModalId
}

const AddSystemTypeModalContent: FC<Props> = ({ selectedGroup, refetch }) => {
    const { closeModal } = useDynamicModalStore()

    const formMethods = useForm({
        defaultValues: { mask: '{STC}{ZC}-{serial(3)}' },
    })

    const { mutate, isPending } = useMutation({
        mutationFn: async () => {
            const res = await axiosInstance
                .post(
                    BASE_URL + `/system/system-type-group/${selectedGroup}/system-type`,
                    formMethods.getValues(),
                )
                .then(res => res.data)
            return res.data
        },
        onSuccess: () => {
            refetch()
            if (currentAddSystemTypeModalId) {
                closeModal(currentAddSystemTypeModalId)
            }
            formMethods.reset()
            toast.success(`System Type was created.`)
        },
        onError: () => {
            toast.error(`Failed to create SystemType.`)
            if (currentAddSystemTypeModalId) {
                closeModal(currentAddSystemTypeModalId)
            }
        },
    })

    const handleSubmit = () => {
        mutate()
    }

    return (
        <div className="space-y-4">
            <Form formMethods={formMethods}>
                <Input name="name" label="Name" rounded="rounded-md" />
                <Input name="code" label="Code" rounded="rounded-md" />
                <Input name="mask" label="Mask" rounded="rounded-md" />
                <Listbox
                    name="systemAttribute"
                    codebook={CODEBOOK.SYSTEM_ATTRIBUTE}
                    rounded="rounded-md"
                    customLabel="System Attribute"
                    emptyOption="Select System Attribute"
                />
            </Form>
            <div className="flex justify-end gap-2">
                <Button
                    variant="outline"
                    onClick={() => {
                        if (currentAddSystemTypeModalId) {
                            closeModal(currentAddSystemTypeModalId)
                        }
                    }}
                    disabled={isPending}
                >
                    <FormattedMessage id={messages.cancel} defaultMessage="Cancel" />
                </Button>
                <Button onClick={handleSubmit} disabled={isPending}>
                    <FormattedMessage id={messages.save} defaultMessage="Save" />
                </Button>
            </div>
        </div>
    )
}

export const AddSystemTypeButton: FC<Props> = ({ selectedGroup, refetch }) => {
    const { formatMessage: fm } = useIntl()
    const canEdit = usePermission([ROLE.SYSTEM_TYPE_EDIT])

    return (
        <Button
            variant="outline"
            size="sm"
            disabled={!selectedGroup || !canEdit}
            onClick={() => selectedGroup && openAddSystemTypeModal(selectedGroup, refetch)}
            className="gap-2"
        >
            <Plus className="h-4 w-4" />
            {fm({ id: message.common.systemTypeEdit.addType })}
        </Button>
    )
}
