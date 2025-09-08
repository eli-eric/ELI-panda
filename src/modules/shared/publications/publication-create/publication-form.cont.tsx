import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { type FC } from 'react'
import { useForm } from 'react-hook-form'
import { FormattedMessage } from 'react-intl'
import { toast } from 'sonner'

import { Form } from '@/components/form/Form'
import { SheetFormButtons } from '@/components/sheet-form-buttons'
import { useAccessControl } from '@/hooks/useAccessControl'
import { message } from '@/i18n/src/messages'
import {
  publicationOtherSchema,
  publicationPeerReviewedSchema
} from '@/modules/publication/form/scheme'
import { useMediaTypeStore } from '@/modules/publication/hooks/useMediaTypeStore'
import { MEDIA_TYPE_CODE } from '@/modules/publication/types/constants'
import type { PublicationForm } from '@/modules/publication/types/form'
import type { Publication } from '@/modules/publication/types/responses'
import {
  formatFormData,
  formatPublication
} from '@/modules/publication/utils/formatters'
import { useModalGlobalStore } from '@/store/useModalGlobalStore'
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

export const PublicationFormContainer: FC<Props> = ({
  publication,
  refetch
}) => {
  const hasEditRole = useAccessControl(ROLE.PUBLICATIONS_EDIT)()

  const { mediaType } = useMediaTypeStore()

  const publicationsTableId = 'publications'

  const queryClient = useQueryClient()

  const defaultValues = publication
    ? formatPublication(publication)
    : ({
        authorsDepartments: [{ department: null, authorsCount: 0 }]
      } as unknown as PublicationForm)

  const formMethods = useForm<any>({
    defaultValues: publication ? formatPublication(publication) : defaultValues,
    resolver: zodResolver(
      mediaType === MEDIA_TYPE_CODE.PeerReviewedArticle
        ? publicationPeerReviewedSchema
        : publicationOtherSchema
    )
  })

  const {
    formState: { isDirty }
  } = formMethods

  const { mutate, isPending } = useMutation({
    mutationKey: publication?.uid
      ? ['publication', publication?.uid]
      : ['create-publication'],
    mutationFn: queryMutate<Publication, Publication>(
      'publication',
      publication?.uid ? 'put' : 'post',
      publication?.uid
    ),
    onError: (error: any) => {
      toast.error(`Error: ${error.response?.data?.message}`)
    }
  })
  const { closeModal } = useModalGlobalStore()

  const onSuccessfulSubmit = (publication: Publication) => {
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
      }
    })
  })

  const onExit = () => {
    closeModal('sheet')
  }

  return (
    <Form formMethods={formMethods}>
      <SheetFormButtons
        editRole={ROLE.PUBLICATIONS_EDIT}
        loading={isPending}
        onSubmit={onSubmit}
        onExit={onExit}
        isFormDirty={isDirty}
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
