import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { type FC, useEffect } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { FormattedMessage } from 'react-intl'

import { Form } from '@/components/form/Form'
import { HeaderWithButtons } from '@/components/header/HeaderWithButtons'
import Card from '@/components/layout/Card'
import { useAccessControl } from '@/hooks/useAccessControl'
import { message } from '@/i18n/src/messages'
import { PATH } from '@/types/constants/paths'
import { ROLE } from '@/types/constants/roles'

import FileManager from '../shared/fileManager/FileManager'
import { FILE_TYPE } from '../shared/fileManager/types'
import { PublicationFormComponent } from './components/publication-form.comp'
import { publicationOtherSchema, publicationPeerReviewedSchema } from './form/scheme'
import { useMediaTypeStore } from './hooks/useMediaTypeStore'
import { usePublicationMutation } from './hooks/usePublicationMutation'
import { ELI_PUBLICATION, isPeerReviewedMediaType } from './types/constants'
import type { PublicationForm } from './types/form'
import type { Publication } from './types/responses'
import { formatFormData, formatPublication } from './utils/formatters'

/**
 * Dynamic resolver that selects validation schema based on media type.
 * Defined outside component to maintain stable reference.
 */
const dynamicResolver = async (values: any, context: any, options: any) => {
    const isPeerReviewed = isPeerReviewedMediaType(values.mediaTypeCb)
    const schema = isPeerReviewed ? publicationPeerReviewedSchema : publicationOtherSchema
    return zodResolver(schema)(values, context, options)
}

const messages = message.publication

interface Props {
    publication?: Publication
    refetch?: () => void
}

export const PublicationDetailContainer: FC<Props> = ({ publication, refetch }) => {
    const router = useRouter()

    const hasEditRole = useAccessControl(ROLE.PUBLICATIONS_EDIT)()

    const publicationsTableId = 'publications'

    const queryClient = useQueryClient()

    const defaultValues = publication
        ? formatPublication(publication)
        : ({
              eliPublication: ELI_PUBLICATION.YES,
              authorsDepartments: [{ department: null, authorsCount: 0 }],
          } as unknown as PublicationForm)

    const formMethods = useForm<any>({
        defaultValues: publication ? formatPublication(publication) : defaultValues,
        resolver: dynamicResolver,
    })

    const { setMediaTypeUid } = useMediaTypeStore()

    const watchedMediaTypeCb = useWatch({ control: formMethods.control, name: 'mediaTypeCb' })

    useEffect(() => {
        setMediaTypeUid(watchedMediaTypeCb?.uid)
    }, [watchedMediaTypeCb?.uid, setMediaTypeUid])

    const { mutate, isPending } = usePublicationMutation()

    const onSuccessfulSubmit = async () => {
        await queryClient.invalidateQueries({ queryKey: [publicationsTableId] })
        await queryClient.invalidateQueries({
            queryKey: ['publication', { uid: publication?.uid }],
        })
        refetch?.()
    }

    const onInvalid = (errors: any) => {
        // eslint-disable-next-line no-console -- keep form validation diagnostics during submission failures
        console.error('Publication form validation errors:', errors)
    }

    const onSubmit = formMethods.handleSubmit(data => {
        const formattedData = formatFormData(data)
        mutate(formattedData, {
            onSuccess: async ({ data }) => {
                await onSuccessfulSubmit()
                router.push(PATH.PUBLICATION + '/' + data.uid)
            },
        })
    }, onInvalid)

    const onSubmitAndExit = formMethods.handleSubmit(data => {
        mutate(formatFormData(data), {
            onSuccess: async () => {
                await onSuccessfulSubmit()
                router.push(PATH.PUBLICATIONS)
            },
        })
    }, onInvalid)

    return (
        <Form
            formMethods={formMethods}
            className="h-screen overflow-auto"
            enableLeaveWarning={true}
        >
            <HeaderWithButtons
                editRole={ROLE.PUBLICATIONS_EDIT}
                onSubmit={onSubmit}
                loading={isPending}
                isFormDirty={formMethods.formState.isDirty}
                onSubmitAndExit={onSubmitAndExit}
                customElement={
                    <h1 className="text-xl font-bold">
                        {publication ? 'EDIT PUBLICATION' : 'NEW PUBLICATION'}
                    </h1>
                }
            />
            <PublicationFormComponent />
            <Card>
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
            </Card>
        </Form>
    )
}
