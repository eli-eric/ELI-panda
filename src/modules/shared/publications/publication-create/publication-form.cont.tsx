import { yupResolver } from '@hookform/resolvers/yup'
import { useQueryClient } from '@tanstack/react-query'
import { type FC } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { FormattedMessage } from 'react-intl'

import { Form } from '@/components/form/Form'
import Card from '@/components/layout/Card'
import { useAccessControl } from '@/hooks/useAccessControl'
import { message } from '@/i18n/src/messages'
import {
  validationSchemeOther,
  validationSchemePeerReviewed
} from '@/modules/publication//form/scheme'
import { useMediaTypeStore } from '@/modules/publication/hooks/useMediaTypeStore'
import { usePublicationMutation } from '@/modules/publication/hooks/usePublicationMutation'
import { MEDIA_TYPE_CODE } from '@/modules/publication/types/constants'
import type { PublicationForm } from '@/modules/publication/types/form'
import type { Publication } from '@/modules/publication/types/responses'
import {
  formatFormData,
  formatPublication
} from '@/modules/publication/utils/formatters'
import { useModalGlobalStore } from '@/store/useModalGlobalStore'
import { ROLE } from '@/types/constants/roles'

import FileManager from '../../fileManager/FileManager'
import { FILE_TYPE } from '../../fileManager/types'
import { ModalHeaderWithButtons } from '../components/modal-buttons.comp'
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
        authorsDepartments: [{ department: null, authorsCount: '' }]
      } as unknown as PublicationForm)

  const formMethods = useForm<any>({
    defaultValues: publication ? formatPublication(publication) : defaultValues,
    resolver: yupResolver(
      mediaType === MEDIA_TYPE_CODE.PeerReviewedArticle
        ? validationSchemePeerReviewed
        : validationSchemeOther
    )
  })

  const { mutate } = usePublicationMutation()
  const { closeModal } = useModalGlobalStore()

  const onSuccessfulSubmit = () => {
    queryClient.invalidateQueries({ queryKey: [publicationsTableId] })
    refetch?.()
    toast.success('Publication was succesfuly saved')
    closeModal('sheet')
  }

  const onSubmit = formMethods.handleSubmit(data => {
    const formattedData = formatFormData(data)
    mutate(formattedData, {
      onSuccess: () => {
        onSuccessfulSubmit()
      }
    })
  })

  const onExit = () => {
    closeModal('sheet')
  }

  return (
    <Form formMethods={formMethods} enableLeaveWarning={true}>
      <ModalHeaderWithButtons
        editRole={ROLE.PUBLICATIONS_EDIT}
        onSubmit={onSubmit}
        onExit={onExit}
      />
      <PublicationFreeFormComponent />
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
