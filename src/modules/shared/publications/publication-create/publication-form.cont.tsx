import { useMutation, useQueryClient } from '@tanstack/react-query'
import { type FC } from 'react'
import { useForm } from 'react-hook-form'
import { FormattedMessage } from 'react-intl'
import { toast } from 'sonner'

import { Form } from '@/components/form/Form'
import { SheetFormButtons } from '@/components/sheet-form-buttons'
import { useAccessControl } from '@/hooks/useAccessControl'
import { message } from '@/i18n/src/messages'
import { publicationResolver } from '@/modules/publication/form/resolver'
import type { PublicationForm } from '@/modules/publication/types/form'
import type { Publication } from '@/modules/publication/types/responses'
import { formatFormData, formatPublication } from '@/modules/publication/utils/formatters'
import { PUBLICATION_EXECUTIVE_SUMMARY_KEY } from '@/modules/publications/analytics/hooks/usePublicationExecutiveSummary'
import { useDynamicModalStore } from '@/store/useDynamicModalStore'
import { ROLE } from '@/types/constants/roles'
import { queryMutate } from '@/utils/fetcher'

import FileManager from '../../fileManager/FileManager'
import { FILE_TYPE } from '../../fileManager/types'
import { PublicationFreeFormComponent } from '../components/publication-freeform.comp'

const messages = message.publication

interface Props {
    publication?: Publication
    refetch?: () => void
}

export const PublicationFormContainer: FC<Props> = ({ publication, refetch }) => {
    const hasEditRole = useAccessControl(ROLE.PUBLICATIONS_EDIT)()

    const publicationsTableId = 'publications'

    const queryClient = useQueryClient()

    const defaultValues = publication
        ? formatPublication(publication)
        : ({
              authorsDepartments: [{ department: null, authorsCount: 0 }],
              language: 'English',
          } as unknown as PublicationForm)

    const formMethods = useForm<any>({
        defaultValues: defaultValues,
        resolver: publicationResolver,
    })

    const {
        formState: { isDirty },
    } = formMethods

    const { mutate, isPending } = useMutation({
        mutationKey: publication?.uid ? ['publication', publication?.uid] : ['create-publication'],
        mutationFn: queryMutate<Publication, Publication>(
            'publication',
            publication?.uid ? 'put' : 'post',
            { uid: publication?.uid },
        ),
        onError: (error: any) => {
            toast.error(`Error: ${error.response?.data?.message}`)
        },
    })
    const { closeModal } = useDynamicModalStore()

    const onSuccessfulSubmit = (publication: Publication) => {
        queryClient.invalidateQueries({ queryKey: [PUBLICATION_EXECUTIVE_SUMMARY_KEY] })
        queryClient.invalidateQueries({ queryKey: [publicationsTableId] })
        refetch?.()
        toast.success('Publication was succesfuly saved')
        formMethods.reset(formatPublication(publication))
    }

    const onSubmit = formMethods.handleSubmit(data => {
        const formattedData = formatFormData(data)
        mutate(formattedData, {
            onSuccess: data => {
                data.data
                onSuccessfulSubmit(data.data)
            },
        })
    })

    const onExit = () => {
        // NOTE: Modal is opened with ID 'publication-create' or 'publication-edit-${uid}'
        // in usePublicationCreateSheet and usePublicationEditSheet
        const modalId = publication?.uid
            ? `publication-edit-${publication.uid}`
            : 'publication-create'
        closeModal(modalId)
    }

    return (
        <Form formMethods={formMethods}>
            <SheetFormButtons
                editRole={ROLE.PUBLICATIONS_EDIT}
                loading={isPending}
                onSubmit={onSubmit}
                onExit={onExit}
                isFormDirty={isDirty}
                saveLabel={publication ? 'Save Publication' : 'Create Publication'}
                loadingText={publication ? 'Saving publication...' : 'Creating publication...'}
            />
            <PublicationFreeFormComponent />
            <FileManager
                customTitle="Publication PDF file"
                allowMultiple={false}
                hasEditRole={publication ? hasEditRole : false}
                itemType={FILE_TYPE.PUBLICATION}
                uid={publication?.uid as string}
            />
            {!publication && (
                <h1 className="text-sm text-gray-600 pl-3">
                    <FormattedMessage id={messages.pdfFileMessage} />
                </h1>
            )}
        </Form>
    )
}
